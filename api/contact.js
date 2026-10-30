module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const { name = '', email = '', message = '', company = '' } = req.body || {};
  if (company) return res.status(200).json({ ok: true }); // honeypot: bots fill this in
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!name.trim() || !validEmail || message.trim().length < 10 || message.length > 5000) {
    return res.status(400).json({ error: 'Please enter your name, a valid email, and a message of at least 10 characters.' });
  }
  const cleanName = name.replace(/[\r\n]/g, ' ').slice(0, 80);
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO],
      reply_to: email,
      subject: `Portfolio message from ${cleanName}`,
      text: `Name: ${cleanName}\nEmail: ${email}\n\n${message}`
    })
  });
  if (!r.ok) return res.status(502).json({ error: 'Could not send right now. Please email me directly.' });
  return res.status(200).json({ ok: true });
};
