import { Gift } from 'lucide-react'

export function PromoBanner() {
  return (
    <div className="relative z-30 bg-[linear-gradient(90deg,#7b2ff7_0%,#c1177f_45%,#e50914_100%)]">
      <div className="flex items-center justify-center gap-2 px-4 py-3 text-center">
        <Gift className="size-4 shrink-0 text-primary-foreground" aria-hidden="true" />
        <p className="text-xs font-semibold text-primary-foreground sm:text-sm">
          New to Streamly? Try 30 days for ₹0.
        </p>
      </div>
    </div>
  )
}
