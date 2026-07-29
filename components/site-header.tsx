'use client'

import Link from 'next/link'
import { useAuth } from '@/components/auth-provider'
import { LanguagePicker } from '@/components/language-picker'

export function SiteHeader() {
  const { user, loading } = useAuth()

  return (
    <header className="relative z-20 flex items-center justify-between px-4 py-4 sm:px-8 lg:px-12">
      <Link
        href="/"
        className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl"
      >
        STREAMLY
      </Link>

      <div className="flex items-center gap-3">
        <LanguagePicker />
        {loading ? (
          <span className="h-8 w-20 rounded-sm bg-secondary/60" aria-hidden="true" />
        ) : (
          <Link
            href={user ? '/browse' : '/login'}
            className="rounded-sm bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
          >
            {user ? 'Browse' : 'Sign In'}
          </Link>
        )}
      </div>
    </header>
  )
}
