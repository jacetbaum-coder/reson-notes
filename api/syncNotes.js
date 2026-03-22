export default async function handler(req, res) {
  const CF_ACCOUNT_ID = '0df0747b5cc853943508584dadcb9413';
  const CF_API_TOKEN = 'fIvEkWRGsyaMpclVw4uPiaJDie2ng3O07afehp0S';
  const BUCKET = 'reson-notes-storage';
  const OBJECT_KEY = 'notes_db.json';

  const CF_URL = `https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/r2/buckets/${BUCKET}/objects/${OBJECT_KEY}`;

  try {
    if (req.method === 'GET') {
      const resp = await fetch(CF_URL, {
        headers: { 'Authorization': `Bearer ${CF_API_TOKEN}` }
      });
      const data = await resp.json();
      return res.status(200).json(data);
    } else if (req.method === 'POST') {
      const body = JSON.stringify(req.body);
      await fetch(CF_URL, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${CF_API_TOKEN}`,
          'Content-Type': 'application/json'
        },
        body
      });
      return res.status(200).json({ success: true });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Cloud fetch failed' });
  }
}
