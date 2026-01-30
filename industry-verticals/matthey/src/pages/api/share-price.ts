import type { NextApiRequest, NextApiResponse } from 'next';

const TICKER = 'JMAT.L'; // Johnson Matthey on Yahoo Finance :contentReference[oaicite:2]{index=2}

type ApiResp = {
  symbol: string;
  currency: string;
  regularMarketPrice: number;
  previousClose: number;
  change: number;
  changePercent: number;
  marketTimeISO: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResp | { error: string }>
) {
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${TICKER}?interval=1d&range=2d`; // endpoint used by many clients :contentReference[oaicite:3]{index=3}

    const r = await fetch(url, {
      headers: {
        // Helps avoid some basic bot blocks
        'User-Agent': 'Mozilla/5.0',
        Accept: 'application/json',
      },
    });

    if (!r.ok) {
      return res.status(r.status).json({ error: `Upstream error: ${r.status}` });
    }

    const data = await r.json();

    const result = data?.chart?.result?.[0];
    if (!result) return res.status(502).json({ error: 'Malformed upstream response' });

    const meta = result.meta;
    const price = Number(meta?.regularMarketPrice ?? 0);
    const prev = Number(meta?.chartPreviousClose ?? meta?.previousClose ?? 0);

    const change = price - prev;
    const changePercent = prev ? (change / prev) * 100 : 0;

    // Cache at the edge / CDN for 60s (tune as you like)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');

    return res.status(200).json({
      symbol: meta?.symbol ?? TICKER,
      currency: meta?.currency ?? 'GBX',
      regularMarketPrice: price,
      previousClose: prev,
      change: Number(change.toFixed(4)),
      changePercent: Number(changePercent.toFixed(4)),
      marketTimeISO: meta?.regularMarketTime
        ? new Date(meta.regularMarketTime * 1000).toISOString()
        : new Date().toISOString(),
    });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message ?? 'Unknown error' });
  }
}
