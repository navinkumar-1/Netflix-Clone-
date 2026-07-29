'use client'

import { LogOut } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/components/auth-provider'
import { TrendingRow } from '@/components/trending-row'

export function BrowseScreen() {
  const { user, signOut } = useAuth()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  async function handleSignOut() {
    setSigningOut(true)
    await signOut()
    router.replace('/')
  }

  const greetingName = user?.displayName || user?.email?.split('@')[0] || 'there'

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between border-b border-border/40 px-4 py-4 sm:px-8 lg:px-12">
        <Link
          href="/browse"
          className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl"
        >
          STREAMLY
        </Link>

        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-muted-foreground sm:inline">
            {user?.email}
          </span>
          <button
            type="button"
            onClick={handleSignOut}
            disabled={signingOut}
            className="inline-flex items-center gap-2 rounded-sm border border-border px-3 py-1.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary disabled:opacity-70"
          >
            <LogOut className="size-4" aria-hidden="true" />
            {signingOut ? 'Signing out' : 'Sign Out'}
          </button>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 pt-12 pb-2 sm:px-8">
          <h1 className="font-display text-3xl font-bold text-balance text-foreground sm:text-4xl">
            {`Welcome back, ${greetingName}`}
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your membership is active. Pick something to watch.
          </p>
        </section>

        <TrendingRow />
      </main>
    </div>
  )
}
