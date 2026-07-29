'use client'

import { FirebaseError } from 'firebase/app'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { firebaseAuthErrorMessage } from '@/lib/firebase'

type Mode = 'signin' | 'signup'

const copy = {
  signin: {
    heading: 'Sign In',
    submit: 'Sign In',
    switchPrompt: 'New to Streamly?',
    switchAction: 'Sign up now.',
    switchHref: '/signup',
  },
  signup: {
    heading: 'Create your account',
    submit: 'Create Account',
    switchPrompt: 'Already have an account?',
    switchAction: 'Sign in.',
    switchHref: '/login',
  },
} as const

export function AuthForm({ mode }: { mode: Mode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { signIn, signUp, user, configured } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState(searchParams.get('email') ?? '')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [pending, setPending] = useState(false)

  // Already signed in? Skip the form entirely.
  useEffect(() => {
    if (user) router.replace('/browse')
  }, [user, router])

  const text = copy[mode]

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()
    setError('')

    if (!configured) {
      setError('Firebase is not configured yet. Add your Firebase environment variables.')
      return
    }

    setPending(true)
    try {
      if (mode === 'signup') {
        await signUp(email, password, name.trim() || undefined)
      } else {
        await signIn(email, password)
      }
      router.replace('/browse')
    } catch (caught) {
      setError(
        caught instanceof FirebaseError
          ? firebaseAuthErrorMessage(caught.code)
          : 'Something went wrong. Please try again.',
      )
    } finally {
      setPending(false)
    }
  }

  return (
    <>
      <h1 className="font-display text-3xl font-bold text-foreground">{text.heading}</h1>

      <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
        {error ? (
          <p
            role="alert"
            className="rounded-sm bg-primary/15 px-4 py-3 text-sm text-foreground"
          >
            {error}
          </p>
        ) : null}

        {mode === 'signup' ? (
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-sm text-muted-foreground">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="h-12 rounded-sm border border-input bg-input/40 px-4 text-base text-foreground focus:border-foreground focus:outline-none"
            />
          </div>
        ) : null}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm text-muted-foreground">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-12 rounded-sm border border-input bg-input/40 px-4 text-base text-foreground focus:border-foreground focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm text-muted-foreground">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            minLength={6}
            autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-12 rounded-sm border border-input bg-input/40 px-4 text-base text-foreground focus:border-foreground focus:outline-none"
          />
          {mode === 'signup' ? (
            <p className="text-xs text-muted-foreground">At least 6 characters.</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={pending}
          className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-sm bg-primary text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/85 disabled:opacity-70"
        >
          {pending ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              Please wait
            </>
          ) : (
            text.submit
          )}
        </button>
      </form>

      <p className="mt-8 text-sm text-muted-foreground">
        {text.switchPrompt}{' '}
        <Link href={text.switchHref} className="text-foreground hover:underline">
          {text.switchAction}
        </Link>
      </p>
    </>
  )
}
