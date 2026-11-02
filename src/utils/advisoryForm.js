const DOMAIN_LABELS = {
  defense_cryptography: 'Post-Quantum Cryptography & Defense',
  lattice_geometry: 'High-Dimensional Lattices (E8 / Leech)',
  quantum_emergence: 'Quasicrystalline Spin Networks & Emergence',
  executive_advisory: 'Strategic Mathematical Retainer',
};

export function buildAdvisoryMailto(formData) {
  const domainLabel = DOMAIN_LABELS[formData.domain] || formData.domain;
  const subject = `[Advisory] ${formData.organization} — ${formData.name}`;
  const body = [
    'Advisory / retainer inquiry (via donniebugden.com form)',
    '',
    `Name: ${formData.name}`,
    `Email: ${formData.email}`,
    `Organization: ${formData.organization}`,
    `Practice domain: ${domainLabel}`,
    '',
    'Project scope / requirements:',
    formData.inquiry,
  ].join('\n');

  const params = new URLSearchParams({
    subject,
    body,
  });
  return `mailto:donnie.bugden@gmail.com?${params.toString()}`;
}

/**
 * Submit advisory form: Web3Forms (if key set) → /api/advisory → mailto fallback hint.
 */
export async function submitAdvisoryInquiry(formData) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

  if (accessKey) {
    const domainLabel = DOMAIN_LABELS[formData.domain] || formData.domain;
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `[Advisory] ${formData.organization} — ${formData.name}`,
        from_name: formData.name,
        email: formData.email,
        organization: formData.organization,
        domain: domainLabel,
        message: formData.inquiry,
      }),
    });
    const data = await response.json().catch(() => ({}));
    if (response.ok && data.success) {
      return { ok: true, channel: 'web3forms' };
    }
  }

  const response = await fetch('/api/advisory', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(formData),
  });

  const data = await response.json().catch(() => ({}));

  if (response.ok && data.ok) {
    return { ok: true, channel: 'api' };
  }

  return {
    ok: false,
    error: data.error || 'submit_failed',
    message: data.message,
    mailto: buildAdvisoryMailto(formData),
  };
}
