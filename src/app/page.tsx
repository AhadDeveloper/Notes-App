import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createSupabaseServerClient();
  const { data: products, error } = await supabase.from("products").select();
  console.log(products);

  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <>
      <h1 className="text-lg font-bold">Supabase</h1>
      <ul>
        {products?.map((product) => (
          <li key={product.id}>
            <h3>{product.title}</h3>
            <p>{product.price}</p>
          </li>
        ))}
      </ul>
    </>
  );
}
