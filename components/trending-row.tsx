'use client'

import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { useRef } from 'react'

const titles = [
  { rank: 1, name: 'Locked Room', src: '/images/poster-1.png' },
  { rank: 2, name: 'Wanderer Cafe', src: '/images/poster-2.png' },
  { rank: 3, name: 'High Court', src: '/images/poster-3.png' },
  { rank: 4, name: 'Duststorm', src: '/images/poster-4.png' },
  { rank: 5, name: 'Red Alert', src: '/images/poster-5.png' },
  { rank: 6, name: 'Night Castle', src: '/images/poster-6.png' },
  { rank: 7, name: 'Locked Room II', src: '/images/poster-1.png' },
  { rank: 8, name: 'Golden Field', src: '/images/poster-2.png' },
  { rank: 9, name: 'The Verdict', src: '/images/poster-3.png' },
  { rank: 10, name: 'Last Stand', src: '/images/poster-4.png' },
]

export function TrendingRow() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const node = scrollerRef.current
    if (!node) return
    node.scrollBy({ left: direction * node.clientWidth * 0.8, behavior: 'smooth' })
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <h2 className="font-display text-2xl font-bold text-foreground">Trending Now</h2>

      <div className="group relative mt-6">
        <div
          ref={scrollerRef}
          className="flex snap-x snap-mandatory gap-2 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {titles.map((title) => (
            <article
              key={title.rank}
              className="relative shrink-0 basis-[45%] snap-start pl-8 sm:basis-[30%] lg:basis-[19%]"
            >
              <div className="relative aspect-[2/3] overflow-hidden rounded-md">
                <Image
                  src={title.src || '/placeholder.svg'}
                  alt={`${title.name} poster`}
                  fill
                  sizes="(min-width: 1024px) 20vw, 45vw"
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <span
                aria-hidden="true"
                className="font-display pointer-events-none absolute bottom-0 left-0 text-[5rem] leading-[0.8] font-bold text-background [-webkit-text-stroke:2px_var(--muted-foreground)] sm:text-[6rem]"
              >
                {title.rank}
              </span>
              <span className="sr-only">{`Number ${title.rank}: ${title.name}`}</span>
            </article>
          ))}
        </div>

        <button
          type="button"
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
          className="absolute top-1/2 left-0 hidden h-24 -translate-y-1/2 items-center rounded-r-md bg-background/70 px-1 text-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
        >
          <ChevronLeft className="size-6" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
          className="absolute top-1/2 right-0 hidden h-24 -translate-y-1/2 items-center rounded-l-md bg-background/70 px-1 text-foreground opacity-0 transition-opacity group-hover:opacity-100 sm:flex"
        >
          <ChevronRight className="size-6" aria-hidden="true" />
        </button>
      </div>
    </section>
  )
}
