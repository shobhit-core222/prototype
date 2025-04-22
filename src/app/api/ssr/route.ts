
function delay(ms: number) {
    console.log("ssr")
    return new Promise(resolve => setTimeout(resolve, ms));
  }

export async function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country') || 'US';
  const banner = country === 'US' ? 'https://cdn.pixabay.com/user/2015/10/16/09-28-45-303_250x250.png' : 'https://cdn.pixabay.com/user/2015/10/16/09-28-45-303_250x250.png';
  const currency = country === 'US' ? 'USD' : 'EUR';

  await delay(4000);
  const products = [
    { id: 1, name: `Product A (${country})`, price: 10 },
    { id: 2, name: `Product B (${country})`, price: 15 },
  ];

  return new Response(JSON.stringify({ banner, currency, products }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
