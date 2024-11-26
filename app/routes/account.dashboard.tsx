import { prisma } from "~/db/db.server"
import type { LoaderFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useLoaderData } from '@remix-run/react'
import { authenticator } from '~/modules/auth/auth.server'


export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: '/',
  })
  return json({ user })
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
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>{user && `Welcome ${user.email}`}</h1>
      <Form action="/account/logout" method="POST">
        <button>Log out</button>
      </Form>
    </div>
    );
  }