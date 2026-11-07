import { useEffect, useMemo, useRef, useState } from 'react';
import manuscript from '../../book/The Unclosed Turn.md?raw';

function slug(heading) {
  return `ch-${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
}

function renderInline(text) {
  const nodes = [];
  const pattern = /\*\*([^*]+)\*\*|\*([^*]+)\*/g;
  let last = 0;
  let match;
  let key = 0;
  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    if (match[1]) {
      nodes.push(<strong key={key} className="font-semibold text-slate-100">{match[1]}</strong>);
    } else {
      nodes.push(<em key={key}>{match[2]}</em>);
    }
    key += 1;
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseManuscript(source) {
  const blocks = [];
  let paragraph = [];
  const flush = () => {
    if (!paragraph.length) return;
    blocks.push({ type: 'p', text: paragraph.join(' ') });
    paragraph = [];
  };

  source.replace(/\r\n/g, '\n').split('\n').forEach((line) => {
    if (line.startsWith('# ')) return;
    if (line.startsWith('## ')) {
      flush();
      const text = line.slice(3).trim();
      blocks.push({ type: 'h2', text, id: slug(text) });
      return;
    }
    if (line.trim() === '---') {
      flush();
      blocks.push({ type: 'hr' });
      return;
    }
    if (line.trim() === '') {
      flush();
      return;
    }
    paragraph.push(line.trim());
  });
  flush();
  return blocks;
}

function ListenPanel() {
  const audioRef = useRef(null);
  const continueRef = useRef(false);
  const [tracks, setTracks] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    fetch('/audio/unclosed-turn/manifest.json')
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => {
        if (!cancelled && data?.tracks?.length) setTracks(data.tracks);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const track = tracks[index];
    if (!audio || !track) return;
    audio.src = track.src;
    if (continueRef.current) {
      continueRef.current = false;
      audio.play().catch(() => {});
    }
  }, [index, tracks]);

  if (!tracks.length) return null;
  const track = tracks[index];

  return (
    <section className="px-4 max-w-3xl mx-auto mb-12" aria-label="Listen">
      <div className="rounded-2xl border border-rose-900/60 bg-slate-950/80 p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-end gap-3">
          <label className="flex-1 text-left">
            <span className="block text-[11px] font-mono uppercase tracking-widest text-rose-300 mb-2">
              Listen, read by Heart
            </span>
            <select
              value={index}
              onChange={(event) => setIndex(Number(event.target.value))}
              className="w-full rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-sm text-slate-100"
            >
              {tracks.map((item, itemIndex) => (
                <option key={item.id} value={itemIndex}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            onClick={() => {
              continueRef.current = true;
              setIndex(0);
              if (index === 0) audioRef.current?.play().catch(() => {});
            }}
            className="px-4 py-2.5 rounded-xl bg-rose-900/80 hover:bg-rose-800 border border-rose-700 text-rose-100 text-xs font-mono"
          >
            Play from the opening
          </button>
        </div>
        <audio
          ref={audioRef}
          controls
          preload="none"
          className="mt-4 w-full"
          onEnded={() => {
            if (index < tracks.length - 1) {
              continueRef.current = true;
              setIndex(index + 1);
            }
          }}
        />
        <p className="mt-3 text-xs text-slate-500 leading-relaxed">
          One narrator, a little slower than conversation. {track.title} plays through to the next chapter.
        </p>
      </div>
    </section>
  );
}

export default function BookPage() {
  const blocks = useMemo(() => parseManuscript(manuscript), []);
  const chapters = blocks.filter((block) => block.type === 'h2');

  return (
    <div className="pt-28 md:pt-36 pb-20">
      <header className="px-4 max-w-3xl mx-auto text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-950/50 border border-rose-800/60 text-rose-300 text-xs font-mono uppercase tracking-widest mb-4">
          From both dedications
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight">
          The Unclosed Turn
        </h1>
        <p className="mt-4 text-lg text-slate-400 italic">A romance in eight dimensions</p>
      </header>

      <ListenPanel />

      <nav className="px-4 max-w-3xl mx-auto mb-12" aria-label="Chapters">
        <div className="flex flex-wrap gap-2 justify-center">
          {chapters.map((chapter) => (
            <a
              key={chapter.id}
              href={`#${chapter.id}`}
              className="px-2.5 py-1 rounded-lg border border-slate-800 bg-slate-950/80 text-[11px] font-mono text-slate-400 hover:text-rose-200 hover:border-rose-800"
            >
              {chapter.text.replace(/\.$/, '')}
            </a>
          ))}
        </div>
      </nav>

      <article className="px-4 max-w-2xl mx-auto font-serif text-lg text-slate-300 leading-8">
        {blocks.map((block, index) => {
          if (block.type === 'h2') {
            return (
              <h2
                key={block.id}
                id={block.id}
                className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight mt-16 mb-6 scroll-mt-36"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === 'hr') {
            return <hr key={`hr-${index}`} className="my-10 border-slate-800" />;
          }
          if (block.text === '*A romance in eight dimensions*') return null;
          const end = block.text === '*End.*';
          return (
            <p key={`p-${index}`} className={`mb-6 ${end ? 'text-center text-slate-500 italic' : ''}`}>
              {renderInline(block.text)}
            </p>
          );
        })}
      </article>
    </div>
  );
}
