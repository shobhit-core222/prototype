export default async function EdgeHomePage() {
  const res = await fetch(`https://prototype.free.beeceptor.com/todos`, {
    headers: {
      "x-ip-country": "india",
      "x-vercel-ip-country": country,
    },
  });
  // console.log(res);

  const todos = await res.json();

  return (
    <div>
      <ul>
        {todos.map(({ id, title, completed }, idx) => {
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
