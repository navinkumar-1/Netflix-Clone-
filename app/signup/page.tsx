import type { Metadata } from 'next'
import { Suspense } from 'react'
import { AuthForm } from '@/components/auth-form'
import { AuthShell } from '@/components/auth-shell'

export const metadata: Metadata = {
  title: 'Create Account — Streamly',
  description: 'Create your Streamly membership and start watching in minutes.',
}

export default function SignupPage() {
  return (
    <AuthShell>
      <Suspense fallback={null}>
        <AuthForm mode="signup" />
      </Suspense>
    </AuthShell>
  )
}
