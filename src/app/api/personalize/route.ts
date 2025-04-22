// src/app/api/personalize/route.ts
export const runtime = 'edge';

export async function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  const banner = country === 'US' ? 'sale-us.jpg' : 'sale-eu.jpg';
  const currency = country === 'US' ? 'USD' : 'EUR';

  const products = [
    { id: 1, name: `Product A (${country})`, price: 10 },
    { id: 2, name: `Product B (${country})`, price: 15 },
  ];

  return new Response(JSON.stringify({ banner, currency, products }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
