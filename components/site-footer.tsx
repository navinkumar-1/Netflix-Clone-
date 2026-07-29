import { EmailSignupForm } from '@/components/email-signup-form'
import { LanguagePicker } from '@/components/language-picker'

const footerLinks = [
  ['FAQ', 'Investor Relations', 'Privacy', 'Speed Test'],
  ['Help Centre', 'Jobs', 'Cookie Preferences', 'Legal Notices'],
  ['Account', 'Ways to Watch', 'Corporate Information', 'Only on Streamly'],
  ['Media Centre', 'Terms of Use', 'Contact Us'],
]

export function SiteFooter() {
  return (
    <footer className="mx-auto max-w-6xl px-4 pt-12 pb-20 sm:px-8">
      <div className="flex flex-col items-center text-center">
        <p className="text-base text-foreground">
          Ready to watch? Enter your email to start your membership.
        </p>
        <EmailSignupForm className="mt-4" />
      </div>

      <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
        This offer is only valid for new members. This offer is non-transferrable. You agree that
        Streamly will charge the membership fee at the end of the free trial to your payment method
        and will automatically continue your membership until you cancel. Some methods of payment
        may not be eligible to redeem this offer.
      </p>

      <p className="mt-12 text-sm text-muted-foreground">
        Questions? Call{' '}
        <a href="tel:000-800-919-1743" className="underline hover:text-foreground">
          000-800-919-1743
        </a>
      </p>

      <nav aria-label="Footer" className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 lg:grid-cols-4">
        {footerLinks.map((column, index) => (
          <ul key={index} className="flex flex-col gap-4">
            {column.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-muted-foreground underline hover:text-foreground"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        ))}
      </nav>

      <LanguagePicker className="mt-10" />

      <p className="mt-8 text-sm text-muted-foreground">Streamly India</p>

      <p className="mt-8 text-xs text-muted-foreground">
        This page is a design demo and is not affiliated with any streaming provider.
      </p>
    </footer>
  )
}
