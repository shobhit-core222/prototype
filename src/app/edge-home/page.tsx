import { headers } from "next/headers";
import ProductList from "@/components/ProductList";

// export const runtime = "edge";
export const revalidate = 600;

export default async function EdgeHomePage() {
  const headerList = await headers();
  const country = headerList.get("x-vercel-ip-country") || "US";
  const host = headerList.get("host") || "localhost:3000";
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const res = await fetch(`${protocol}://${host}/api/edge`, {
    headers: {
      "x-vercel-ip-country": country,
    },
    next: { revalidate: 300 },
  });
  // console.log(res);

  const { banner, currency, products } = await res.json();

  return (
    <div>
      <h1>Edge Personalized Homepage</h1>
      <img src={banner} alt="Sale Banner" />
      <p>Currency: {currency}</p>
      <ProductList products={products} />
    </div>
  );
}

// import ProductList from "../../components/ProductList";

// export default async function EdgeHomePage() {
//     console.log(ProductList);
//   const res = await fetch(`/api/personalize`, {
//     next: { revalidate: 600 },
//   });
//   const { currency, products } = await res.json();

//   return (
//     <div>
//       <h1>Edge Personalized Homepage</h1>
//       <img src={"https://cdn.pixabay.com/user/2015/10/16/09-28-45-303_250x250.png"} alt="Sale Banner" />
//       <p>Currency: {currency}</p>
//       <ProductList products={products} />
//     </div>
//   );
// }
