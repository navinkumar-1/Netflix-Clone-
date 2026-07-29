'use client'

import { Plus, X } from 'lucide-react'
import { useState } from 'react'

const faqs = [
  {
    question: 'What is Streamly?',
    answer:
      'Streamly is a streaming service that offers a wide variety of award-winning films, series, documentaries and more on thousands of internet-connected devices. You can watch as much as you want, whenever you want, without a single advert — all for one low monthly price.',
  },
  {
    question: 'How much does Streamly cost?',
    answer:
      'Watch on your phone, tablet, laptop, and TV for one fixed monthly fee. Plans start at ₹149 and go up to ₹649 per month. No extra costs, no contracts.',
  },
  {
    question: 'Where can I watch?',
    answer:
      'Watch anywhere, anytime. Sign in with your account to start watching instantly on the web, or on any supported device. You can also download your favourite shows on the mobile app to take with you offline.',
  },
  {
    question: 'How do I cancel?',
    answer:
      'Streamly is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees — start or stop your account anytime.',
  },
  {
    question: 'What can I watch on Streamly?',
    answer:
      'Streamly has an extensive library of feature films, documentaries, series, originals and more. Watch as much as you want, any time you want.',
  },
  {
    question: 'Is Streamly good for kids?',
    answer:
      'The Streamly Kids experience is included in your membership to give parents control while kids enjoy family-friendly series and films in their own space. Kids profiles come with PIN-protected parental controls.',
  },
]

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-8">
      <h2 className="font-display text-2xl font-bold text-foreground">
        Frequently Asked Questions
      </h2>

      <div className="mt-6 flex flex-col gap-2">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index
          return (
            <div key={faq.question} className="bg-secondary">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-6 text-left transition-colors hover:bg-accent"
                >
                  <span className="text-lg font-medium text-secondary-foreground sm:text-xl">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <X className="size-7 shrink-0 text-secondary-foreground" aria-hidden="true" />
                  ) : (
                    <Plus className="size-7 shrink-0 text-secondary-foreground" aria-hidden="true" />
                  )}
                </button>
              </h3>
              {isOpen && (
                <div id={`faq-panel-${index}`} className="border-t border-background px-6 py-6">
                  <p className="text-base leading-relaxed text-secondary-foreground sm:text-lg">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
