import { json } from "@remix-run/node"; // or cloudflare/deno
import { prisma } from "~/db/db.server"
import { useLoaderData } from "@remix-run/react";


export async function loader() {
  const user = await prisma.user.findUnique({
    where: {
      email: 'renjeffreyy@gmail.com',
    },
  })
  console.log(user)
  return json(user);

}


export default function AccountPage() {
  const user = useLoaderData<typeof loader>();
    if(!user){
      return (
        <>
          Something went wrong!
        </>
      )
    }
    return (
      <>
      <h1 className="">Hi {user.name}</h1>

      </>
    );
  }