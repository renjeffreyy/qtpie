import { createCookieSessionStorage } from '@remix-run/node'

export const authSessionStorage = createCookieSessionStorage({
  cookie: {
    name: '_auth',
    path: '/',
    sameSite: 'lax',
    httpOnly: true,
    secrets: [process.env.SESSION_SECRET || "NOT a Strong Secret"],
    secure: process.env.NODE_ENV === 'production',
  },
})

export const { getSession, commitSession, destroySession } = authSessionStorage