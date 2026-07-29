'use client'

import { ChevronDown, Languages } from 'lucide-react'
import { useId } from 'react'

type Props = {
  className?: string
}

export function LanguagePicker({ className = '' }: Props) {
  const id = useId()

  return (
    <div
      className={`relative inline-flex items-center rounded-sm border border-border bg-black/70 ${className}`}
    >
      <Languages
        className="pointer-events-none absolute left-2 size-4 text-foreground"
        aria-hidden="true"
      />
      <label htmlFor={id} className="sr-only">
        Select language
      </label>
      <select
        id={id}
        defaultValue="en"
        className="appearance-none bg-transparent py-1.5 pr-8 pl-8 text-sm font-medium text-foreground focus:outline-none"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-2 size-4 text-foreground"
        aria-hidden="true"
      />
    </div>
  )
}
