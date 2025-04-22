import { headers } from 'next/headers';
import ProductList from '../../components/ProductList';

export default async function SsrHomePage() {
  const country = (await headers()).get('x-vercel-ip-country') || 'US';
  // const banner = country === 'US' ? 'sale-us.jpg' : 'sale-eu.jpg';
  const currency = country === 'US' ? 'USD' : 'EUR';

  // Fake data like in the API
  const products = [
    { id: 1, name: `Product A (${country})`, price: 10 },
    { id: 2, name: `Product B (${country})`, price: 15 },
  ];

  return (
    <div>
      <h1>SSR Personalized Homepage</h1>
      <img src={"https://cdn.pixabay.com/user/2015/10/16/09-28-45-303_250x250.png"} alt="Sale Banner" />
      <p>Currency: {currency}</p>
      <ProductList products={products} />
    </div>
  );
}
