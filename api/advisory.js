import nodemailer from 'nodemailer';

const DOMAIN_LABELS = {
  defense_cryptography: 'Post-Quantum Cryptography & Defense',
  lattice_geometry: 'High-Dimensional Lattices (E8 / Leech)',
  quantum_emergence: 'Quasicrystalline Spin Networks & Emergence',
  executive_advisory: 'Strategic Mathematical Retainer',
};

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const raw = Buffer.concat(chunks).toString('utf8') || '{}';
  return JSON.parse(raw);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email || '').trim());
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 204;
    return res.end();
  }

  if (req.method !== 'POST') {
    return json(res, 405, { ok: false, error: 'method_not_allowed' });
  }

  let body;
  try {
    body = await readJsonBody(req);
  } catch {
    return json(res, 400, { ok: false, error: 'invalid_json' });
  }

  if (body.website) {
    return json(res, 200, { ok: true });
  }

  const name = String(body.name || '').trim();
  const email = String(body.email || '').trim();
  const organization = String(body.organization || '').trim();
  const domain = String(body.domain || 'executive_advisory');
  const inquiry = String(body.inquiry || '').trim();

  if (!name || !email || !organization || !inquiry) {
    return json(res, 400, { ok: false, error: 'missing_fields' });
  }
  if (!isValidEmail(email)) {
    return json(res, 400, { ok: false, error: 'invalid_email' });
  }

  const to =
    process.env.ADVISORY_INBOX ||
    process.env.SMTP_TO ||
    'donnie.bugden@gmail.com';

  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS || process.env.SMTP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
  const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
  const smtpSecure = process.env.SMTP_SECURE !== 'false';

  if (!smtpUser || !smtpPass) {
    return json(res, 503, {
      ok: false,
      error: 'not_configured',
      message:
        'Server email is not configured yet. Use the email fallback or contact donnie.bugden@gmail.com directly.',
      mailto: 'donnie.bugden@gmail.com',
    });
  }

  const domainLabel = DOMAIN_LABELS[domain] || domain;
  const subject = `[Advisory] ${organization} — ${name}`;
  const text = [
    'New advisory / retainer inquiry from donniebugden.com',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Organization: ${organization}`,
    `Practice domain: ${domainLabel}`,
    '',
    'Project scope / requirements:',
    inquiry,
    '',
    `Submitted: ${new Date().toISOString()}`,
  ].join('\n');

  try {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM || `"Donnie Bugden Site" <${smtpUser}>`,
      to,
      replyTo: `"${name}" <${email}>`,
      subject,
      text,
    });

    return json(res, 200, { ok: true });
  } catch (err) {
    console.error('[advisory]', err);
    return json(res, 502, {
      ok: false,
      error: 'send_failed',
      message: 'Could not send email. Try the mailto fallback or email donnie.bugden@gmail.com directly.',
    });
  }
}
