'use client'

import { ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useId, useState } from 'react'

type Props = {
  className?: string
}

export function EmailSignupForm({ className = '' }: Props) {
  const id = useId()
  const router = useRouter()
  const [email, setEmail] = useState('')

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        // Hand the address off to the signup page so it is prefilled there.
        router.push(`/signup?email=${encodeURIComponent(email)}`)
      }}
      className={`flex w-full flex-col items-stretch gap-3 sm:flex-row sm:justify-center ${className}`}
    >
      <div className="relative w-full sm:max-w-[22rem]">
        <label htmlFor={id} className="sr-only">
          Email address
        </label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
          className="h-14 w-full rounded-sm border border-input bg-black/60 px-4 text-base text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="inline-flex h-14 items-center justify-center gap-1 rounded-sm bg-primary px-6 text-lg font-semibold text-primary-foreground transition-colors hover:bg-primary/85"
      >
        Try 30 Days for ₹0
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
    </form>
  )
}
