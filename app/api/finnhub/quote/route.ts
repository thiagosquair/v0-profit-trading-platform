// app/api/finnhub/quote/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return NextResponse.json({ error: 'Missing symbol' }, { status: 400 });
  }

  const apiKey = process.env.FINNHUB_API_KEY;
  const res = await fetch(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`);

  if (!res.ok) {
    return NextResponse.json({ error: 'Failed to fetch data from Finnhub' }, { status: 500 });
  }

  const data = await res.json();
  return NextResponse.json(data);
}
