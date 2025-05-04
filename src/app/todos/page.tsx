import { headers } from "next/headers";

export default async function EdgeHomePage() {
  const headerList = await headers();
  const country = headerList.get("x-vercel-ip-country") || "US";
  const res = await fetch(`https://prototype.free.beeceptor.com/todos`, {
    headers: {
      "x-ip-country": "india",
      "x-vercel-ip-country": country,
    },
  });
  // console.log(res);

  const todos = await res.json();
  interface todo {
    id: number;
    title: string;
    completed: boolean;
  }
  return (
    <div>
      <ul>
        {todos.map(({ id, title, completed }: todo, idx: number) => {
          return (
            <li key={idx}>
              <p>
                `${id} ${title} ${completed}`
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
