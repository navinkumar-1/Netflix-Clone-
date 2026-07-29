import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthForm } from '@/components/auth-form'
import { AuthShell } from '@/components/auth-shell'

export const metadata: Metadata = {
  title: 'Sign In — Streamly',
  description: 'Sign in to your Streamly account to watch unlimited movies and shows.',
}

export default function LoginPage() {
  return (
    <AuthShell>
      <Suspense fallback={null}>
        <AuthForm mode="signin" />
      </Suspense>
    </AuthShell>
  )
}
