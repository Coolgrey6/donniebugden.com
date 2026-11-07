"""Narrate The Unclosed Turn with Kokoro's clearest English voice.

One narrator, slightly under conversational speed. Chapter files are AAC so the
site can stream them. The manuscript is not rewritten; only the spoken copy is.
"""

from __future__ import annotations

import json
import re
import subprocess
from pathlib import Path

import numpy as np
import soundfile as sf
from kokoro_onnx import Kokoro

ROOT = Path(__file__).resolve().parents[1]
MANUSCRIPT = ROOT / "book" / "The Unclosed Turn.md"
MODELS = ROOT / "book" / "models"
OUT = ROOT / "public" / "audio" / "unclosed-turn"
VOICE = "af_heart"
SPEED = 0.92
SAMPLE_RATE = 24000
PARAGRAPH_PAUSE = 0.38

ROMAN = {
    "I": "One",
    "II": "Two",
    "III": "Three",
    "IV": "Four",
    "V": "Five",
    "VI": "Six",
    "VII": "Seven",
    "VIII": "Eight",
    "IX": "Nine",
    "X": "Ten",
    "XI": "Eleven",
}

# Spoken forms for names and symbols espeak regularly mishandles.
SPOKEN = [
    (r"\bGödel\b", "Gurdle"),
    (r"\bNoether\b", "Nurter"),
    (r"\bMeitner\b", "Mitenur"),
    (r"\bHeaviside\b", "Hevviside"),
    (r"\bRamanujan\b", "Rahmahnujan"),
    (r"\bBoltzmann\b", "Boltsmahn"),
    (r"\bGermain\b", "Zhermayn"),
    (r"\bSean\b", "Shawn"),
    (r"\bWu\b", "Woo"),
    (r"\bBlau\b", "Blaw"),
    (r"\bBohm\b", "Bome"),
    (r"\bHooke\b", "Hook"),
    (r"\bCantor\b", "Kantor"),
    (r"\bij is k\b", "i j is k"),
    (r"\bwanted k\b", "wanted kay"),
    (r"σ", "sigma"),
    (r"\bSet C\b", "set see"),
    (r"\bnoncommutative\b", "non-commutative"),
]


def slug(heading: str) -> str:
    return "ch-" + re.sub(r"^-|-$", "", re.sub(r"[^a-z0-9]+", "-", heading.lower()))


def parse(source: str) -> list[dict]:
    sections: list[dict] = [{"id": "opening", "title": "Opening", "heading": None, "paragraphs": []}]
    for line in source.replace("\r\n", "\n").split("\n"):
        if line.startswith("# ") or line.strip() == "---":
            continue
        if line.startswith("## "):
            title = line[3:].strip()
            sections.append({"id": slug(title), "title": title, "heading": title, "paragraphs": []})
            continue
        if not line.strip():
            continue
        if line.strip() == "*A romance in eight dimensions*":
            continue
        sections[-1]["paragraphs"].append(line.strip())
    return [section for section in sections if section["paragraphs"] or section["heading"]]


def speakable(text: str) -> str:
    text = text.replace("**", "").replace("*", "")
    text = text.replace("—", ", ").replace("–", ", ")
    text = text.replace("“", '"').replace("”", '"').replace("’", "'").replace("‘", "'")
    for pattern, replacement in SPOKEN:
        text = re.sub(pattern, replacement, text)
    text = re.sub(r"\s+", " ", text).strip()
    return text


def spoken_pieces(text: str) -> list[str]:
    """Short pieces. A long chain of 'and' is where this voice stops early."""
    sentences = re.split(r"(?<=[.!?])\s+", text.strip())
    pieces: list[str] = []
    for sentence in sentences:
        sentence = sentence.strip()
        if not sentence or sentence.lower() in {"end.", "end"}:
            continue
        if len(sentence) <= 180:
            pieces.append(sentence)
            continue
        clauses = [clause.strip() for clause in re.split(r"(?<=[,;:])\s+", sentence) if clause.strip()]
        buffer = ""
        for clause in clauses:
            candidate = f"{buffer} {clause}".strip()
            if buffer and len(candidate) > 180:
                pieces.append(buffer)
                buffer = clause
            else:
                buffer = candidate
        if buffer:
            pieces.append(buffer)
    return pieces


def heading_speech(title: str) -> str:
    match = re.match(r"^([IVX]+)\.\s+(.*)$", title)
    if not match:
        return speakable(title) + "."
    number = ROMAN[match.group(1)]
    return f"Chapter {number}. {speakable(match.group(2))}."


def silence(seconds: float) -> np.ndarray:
    return np.zeros(int(SAMPLE_RATE * seconds), dtype=np.float32)


def narrate_section(kokoro: Kokoro, section: dict) -> np.ndarray:
    pieces: list[str] = []
    if section["id"] == "opening":
        pieces.append("The Unclosed Turn. A romance in eight dimensions.")
    elif section["heading"]:
        pieces.append(heading_speech(section["heading"]))
    for paragraph in section["paragraphs"]:
        pieces.extend(spoken_pieces(speakable(paragraph)))
    chunks: list[np.ndarray] = []
    for piece in pieces:
        if not piece:
            continue
        audio, _sample_rate = kokoro.create(
            piece,
            voice=VOICE,
            speed=SPEED,
            lang="en-us",
            sentence_pause=0.36,
            clause_pause=0.16,
        )
        chunks.append(np.asarray(audio, dtype=np.float32).reshape(-1))
        chunks.append(silence(PARAGRAPH_PAUSE))
    if not chunks:
        raise RuntimeError(f"No audio for {section['id']}")
    return np.concatenate(chunks)


def to_m4a(wav_path: Path, m4a_path: Path) -> None:
    subprocess.run(
        [
            "afconvert",
            str(wav_path),
            str(m4a_path),
            "-f",
            "m4af",
            "-d",
            "aac",
        ],
        check=True,
    )
    wav_path.unlink()


def main() -> None:
    sections = parse(MANUSCRIPT.read_text())
    OUT.mkdir(parents=True, exist_ok=True)
    kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))
    manifest = {"voice": "Heart", "engine": "Kokoro", "tracks": []}

    for index, section in enumerate(sections):
        filename = f"{index:02d}-{section['id']}.m4a"
        target = OUT / filename
        if not target.exists():
            print(f"narrating {section['title']}", flush=True)
            audio = narrate_section(kokoro, section)
            wav_path = target.with_suffix(".wav")
            sf.write(wav_path, audio, SAMPLE_RATE)
            to_m4a(wav_path, target)
            print(f"  {audio.size / SAMPLE_RATE / 60:.1f} min", flush=True)
        else:
            print(f"keeping {filename}", flush=True)
        manifest["tracks"].append(
            {
                "id": section["id"],
                "title": section["title"],
                "src": f"/audio/unclosed-turn/{filename}",
            }
        )

    (OUT / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
    print(f"wrote {len(manifest['tracks'])} tracks", flush=True)


if __name__ == "__main__":
    main()
