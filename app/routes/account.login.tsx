import Login from "~/components/login";
import type { LoaderFunctionArgs, ActionFunctionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import {  useLoaderData } from '@remix-run/react'
import { authenticator } from '~/modules/auth/auth.server'
import { getSession, commitSession } from '~/modules/auth/auth-session.server'

export async function loader({ request }: LoaderFunctionArgs) {
  await authenticator.isAuthenticated(request, {
    successRedirect: '/account/dashboard',
  })
  const session = await getSession(request.headers.get('Cookie'))
  const authError = session.get(authenticator.sessionErrorKey)

  // Commit session to clear any `flash` error message.
  return json(
    { authError },
    {
      headers: {
        'set-cookie': await commitSession(session),
      },
    },
  )
}

export async function action({ request }: ActionFunctionArgs) {
  await authenticator.authenticate('TOTP', request, {
    // The `successRedirect` route will be used to verify the OTP code.
    // This could be the current pathname or any other route that renders the verification form.
    successRedirect: '/account/verify',

    // The `failureRedirect` route will be used to render any possible error.
    // This could be the current pathname or any other route that renders the login form.
    failureRedirect: '/account/login',
  })
}

export default function LoginPage() {
  const { authError } = useLoaderData<typeof loader>()
    return (
      <>
      <h1 className="">Login</h1>
      <Login />
      {/* Login Errors Handling. */}
      <span>{authError?.message}</span>
      </>
    );
  }