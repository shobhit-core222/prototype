import { headers } from 'next/headers';
import ProductList from '@/components/ProductList';

export const dynamic = 'force-dynamic'; // Force full SSR

export default async function SsrHomePage() {
  const headerList = await headers();
  const country = headerList.get('x-vercel-ip-country') || 'US';
  const host = headerList.get('host')|| "localhost:3000";
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';

  const res = await fetch(`${protocol}://${host}/api/ssr`, {
    headers: {
      'x-vercel-ip-country': country,
    },
    cache: 'no-store', // Full SSR freshness
  });
  // console.log(res);

  const { banner, currency, products } = await res.json();

  return (
    <div>
      <h1>SSR Personalized Homepage</h1>
      <img src={banner} alt="Sale Banner" />
      <p>Currency: {currency}</p>
      <ProductList products={products} />
    </div>
  );
}


// import { headers } from 'next/headers';
// import ProductList from '../../components/ProductList';

// export default async function SsrHomePage() {
//   const country = (await headers()).get('x-vercel-ip-country') || 'US';
//   // const banner = country === 'US' ? 'sale-us.jpg' : 'sale-eu.jpg';
//   const currency = country === 'US' ? 'USD' : 'EUR';

//   // Fake data like in the API
//   const products = [
//     { id: 1, name: `Product A (${country})`, price: 10 },
//     { id: 2, name: `Product B (${country})`, price: 15 },
//   ];

//   return (
//     <div>
//       <h1>SSR Personalized Homepage</h1>
//       <img src={"https://cdn.pixabay.com/user/2015/10/16/09-28-45-303_250x250.png"} alt="Sale Banner" />
//       <p>Currency: {currency}</p>
//       <ProductList products={products} />
//     </div>
//   );
// }
