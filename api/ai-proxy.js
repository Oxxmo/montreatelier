export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return res.status(500).json({ error: 'ANTHROPIC_API_KEY manquante dans les variables Vercel.' });

  try {
    const { system, messages, max_tokens, useSearch, image, model } = req.body;

    // Construire le contenu du dernier message user
    const lastMsg = messages?.[messages.length - 1]?.content || '';
    let userContent;
    if (image) {
      userContent = [
        { type: 'image', source: { type: 'base64', media_type: image.mimeType, data: image.data } },
        { type: 'text', text: lastMsg },
      ];
    } else {
      userContent = lastMsg;
    }

    // Construire les messages : passer tous les messages fournis (support prefill)
    let apiMessages;
    if (messages && messages.length > 1) {
      // Multi-tours : passer les messages tels quels sauf le dernier si image
      apiMessages = messages.map((m, i) => {
        if (i === messages.length - 1 && image) {
          return { role: m.role, content: userContent };
        }
        return { role: m.role, content: m.content };
      });
    } else {
      apiMessages = [{ role: 'user', content: userContent }];
    }

    const body = {
      model: model || 'claude-opus-4-5',
      max_tokens: max_tokens || 1000,
      messages: apiMessages,
    };
    if (system) body.system = system;
    if (useSearch) body.tools = [{ type: 'web_search_20250305', name: 'web_search' }];

    const headers = {
      'Content-Type': 'application/json',
      'x-api-key': key,
      'anthropic-version': '2023-06-01',
    };
    if (useSearch) headers['anthropic-beta'] = 'web-search-2025-03-05';

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers,
      body: JSON.stringify(body),
    });

    const data = await response.json();

    if (!response.ok || data.type === 'error') {
      return res.status(response.status).json({ error: data?.error?.message || `Erreur Anthropic ${response.status}` });
    }

    const texts = (data.content || []).filter(b => b.type === 'text' && b.text?.trim());
    const text = texts.length ? texts[texts.length - 1].text.trim() : '';
    return res.status(200).json({ text });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
