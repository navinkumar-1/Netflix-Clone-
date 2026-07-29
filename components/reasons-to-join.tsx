import { CircleArrowDown, Monitor, Smile, Tv } from 'lucide-react'

const reasons = [
  {
    title: 'Enjoy on your TV',
    body: 'Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.',
    Icon: Tv,
  },
  {
    title: 'Download your shows to watch offline',
    body: 'Save your favourites easily and always have something to watch.',
    Icon: CircleArrowDown,
  },
  {
    title: 'Watch everywhere',
    body: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
    Icon: Monitor,
  },
  {
    title: 'Create profiles for kids',
    body: 'Send kids on adventures with their favourite characters in a space made just for them — free with your membership.',
    Icon: Smile,
  },
]

export function ReasonsToJoin() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-8">
      <h2 className="font-display text-2xl font-bold text-foreground">More reasons to join</h2>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {reasons.map(({ title, body, Icon }) => (
          <article
            key={title}
            className="relative flex min-h-56 flex-col rounded-xl bg-[linear-gradient(149deg,#192247_0%,#210e17_96.9%)] p-6"
          >
            <h3 className="font-display text-xl font-semibold text-balance text-card-foreground">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            <Icon className="mt-auto ml-auto size-10 text-primary" aria-hidden="true" />
          </article>
        ))}
      </div>
    </section>
  )
}
