import Image from 'next/image'
import Link from 'next/link'
import { LanguagePicker } from '@/components/language-picker'

export function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh flex-col">
      <Image
        src="/images/hero-collage.png"
        alt=""
        fill
        priority
        aria-hidden="true"
        className="object-cover opacity-40"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.75),rgba(0,0,0,0.9))]"
      />

      <header className="relative z-10 border-b border-border/40 px-4 py-4 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl"
        >
          STREAMLY
        </Link>
      </header>

      <main className="relative z-10 flex flex-1 items-start justify-center px-4 py-8 sm:items-center sm:py-12">
        <div className="w-full max-w-md rounded-md bg-black/75 px-6 py-10 backdrop-blur-sm sm:px-12 sm:py-14">
          {children}
        </div>
      </main>

      <footer className="relative z-10 border-t border-border/40 px-4 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-4xl flex-col gap-4 text-sm text-muted-foreground">
          <p>
            Questions? Call{' '}
            <a href="tel:000-800-919-1743" className="underline hover:text-foreground">
              000-800-919-1743
            </a>
          </p>
          <LanguagePicker />
        </div>
      </footer>
    </div>
  )
}
