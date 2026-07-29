import Image from 'next/image'
import { EmailSignupForm } from '@/components/email-signup-form'
import { SiteHeader } from '@/components/site-header'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-collage.png"
          alt="A wall of movie and show posters"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[linear-gradient(to_top,#000_8%,transparent_100%)]" />
      </div>

      <SiteHeader />

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-4 pt-16 pb-28 text-center sm:pt-24 sm:pb-36">
        <h1 className="font-display text-4xl leading-tight font-bold text-balance text-foreground sm:text-5xl lg:text-6xl">
          Unlimited movies, shows, and more
        </h1>

        <p className="mt-5 text-lg font-semibold text-foreground sm:text-xl">
          Plans start at ₹149. Cancel anytime.
        </p>

        <p className="mt-6 text-base text-foreground sm:text-lg">
          Ready to watch? Enter your email to start your membership.
        </p>

        <EmailSignupForm className="mt-5" />

        <p className="mt-4 text-sm text-muted-foreground">New members only. Terms below.</p>
      </div>

      {/* curved glow divider */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-px left-1/2 z-10 h-20 w-[140%] -translate-x-1/2 rounded-t-[50%] border-t-2 border-primary bg-background"
      />
    </section>
  )
}
