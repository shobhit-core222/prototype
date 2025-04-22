import ProductList from "../../components/ProductList";


export default async function EdgeHomePage() {
    console.log(ProductList);
  const res = await fetch(`/api/personalize`, {
    next: { revalidate: 600 },
  });
  const { currency, products } = await res.json();

  return (
    <div>
      <h1>Edge Personalized Homepage</h1>
      <img src={"https://cdn.pixabay.com/user/2015/10/16/09-28-45-303_250x250.png"} alt="Sale Banner" />
      <p>Currency: {currency}</p>
      <ProductList products={products} />
    </div>
  );
}
