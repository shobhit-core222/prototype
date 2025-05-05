// import { headers } from "next/headers";

export const revalidate = 600;

// interface PageProps {
//   params: {
//     name: string;
//   };
// }

export default async function EdgeHomePage(props: any) {
  // const headerList = await headers();
  // const country = headerList.get("x-vercel-ip-country") || "US";
  const { params } = await props;
  const { name } = await params;
  console.log(name);
  const res = await fetch(`https://prototype.free.beeceptor.com/todos/${name}`);
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
