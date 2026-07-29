import { writeFileSync } from "node:fs"
import {
  AlignmentType,
  BorderStyle,
  Document,
  HeadingLevel,
  Packer,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
} from "docx"

const ACCENT = "B81D24"
const INK = "1A1A1A"
const MUTED = "5A5A5A"

function title(text) {
  return new Paragraph({
    spacing: { before: 0, after: 120 },
    children: [new TextRun({ text, bold: true, size: 56, color: INK, font: "Calibri" })],
  })
}

function subtitle(text) {
  return new Paragraph({
    spacing: { after: 400 },
    children: [new TextRun({ text, size: 26, color: MUTED, font: "Calibri", italics: true })],
  })
}

function h1(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: ACCENT, space: 6 } },
    children: [new TextRun({ text, bold: true, size: 32, color: ACCENT, font: "Calibri" })],
  })
}

function h2(text) {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 240, after: 100 },
    children: [new TextRun({ text, bold: true, size: 26, color: INK, font: "Calibri" })],
  })
}

function p(text) {
  return new Paragraph({
    spacing: { after: 120, line: 300 },
    children: [new TextRun({ text, size: 22, color: INK, font: "Calibri" })],
  })
}

function bullet(text, level = 0) {
  return new Paragraph({
    bullet: { level },
    spacing: { after: 80, line: 290 },
    children: [new TextRun({ text, size: 22, color: INK, font: "Calibri" })],
  })
}

function numbered(text) {
  return new Paragraph({
    numbering: { reference: "steps", level: 0 },
    spacing: { after: 90, line: 290 },
    children: [new TextRun({ text, size: 22, color: INK, font: "Calibri" })],
  })
}

function code(text) {
  return new Paragraph({
    spacing: { after: 60 },
    shading: { type: ShadingType.CLEAR, fill: "F2F2F2" },
    children: [new TextRun({ text, size: 20, color: "222222", font: "Consolas" })],
  })
}

function cell(text, { bold = false, header = false, width = 33 } = {}) {
  return new TableCell({
    width: { size: width, type: WidthType.PERCENTAGE },
    shading: header ? { type: ShadingType.CLEAR, fill: ACCENT } : undefined,
    margins: { top: 90, bottom: 90, left: 120, right: 120 },
    children: [
      new Paragraph({
        children: [
          new TextRun({
            text,
            bold: bold || header,
            size: 20,
            color: header ? "FFFFFF" : INK,
            font: "Calibri",
          }),
        ],
      }),
    ],
  })
}

function table(headers, rows) {
  const widths = headers.length === 2 ? [34, 66] : [26, 24, 50]
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      left: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      right: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "D9D9D9" },
    },
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map((t, i) => cell(t, { header: true, width: widths[i] })),
      }),
      ...rows.map(
        (r) =>
          new TableRow({
            children: r.map((t, i) => cell(t, { bold: i === 0, width: widths[i] })),
          }),
      ),
    ],
  })
}

function spacer() {
  return new Paragraph({ spacing: { after: 200 }, children: [] })
}

const children = [
  title("Streamly — Streaming Landing Page with Firebase Auth"),
  subtitle("A responsive React / Next.js streaming-service front end with email and password authentication"),

  h1("1. Project Overview"),
  p(
    "Streamly is a responsive front end for a video streaming service, built as a study of modern " +
      "streaming-platform interface patterns. The visual layout was reproduced from a reference " +
      "screenshot supplied by the client, while all branding, copy and artwork in the finished " +
      "product are original so the project carries no third-party trademarks or licensed images.",
  ),
  p(
    "The application pairs a marketing landing page with a working authentication system. Visitors " +
      "can browse the promotional page, create an account, sign in, and reach a members-only area " +
      "that is closed to anonymous users.",
  ),

  h2("Objectives"),
  bullet("Recreate a polished, production-quality streaming landing page in React."),
  bullet("Match the reference layout closely across desktop, tablet and mobile widths."),
  bullet("Add real authentication backed by a hosted service rather than mock or local-only logins."),
  bullet("Protect member content behind a route guard and keep session state in sync across the app."),
  bullet("Meet accessibility basics: semantic landmarks, labelled controls and keyboard operability."),

  h1("2. Technology Stack"),
  table(
    ["Layer", "Technology", "Why it was chosen"],
    [
      ["Framework", "Next.js 16 (App Router)", "File-based routing, server components and built-in image optimisation."],
      ["UI library", "React 19", "Component model, hooks and Context for sharing session state."],
      ["Language", "TypeScript", "Compile-time safety on props, context values and auth payloads."],
      ["Styling", "Tailwind CSS v4", "Utility-first styling with design tokens defined in globals.css."],
      ["Authentication", "Firebase Authentication", "Managed email and password accounts, secure password hashing, no server to maintain."],
      ["Fonts", "Poppins and Inter", "Poppins for display headings, Inter for body text, loaded via next/font."],
      ["Icons", "Lucide React", "Consistent, lightweight SVG icon set."],
      ["Imagery", "AI-generated artwork", "Original poster and collage images, avoiding licensed stills."],
    ],
  ),
  spacer(),

  h1("3. Application Architecture"),
  p(
    "The project separates routing, presentation and authentication concerns. Route files under app/ " +
      "stay thin and delegate to focused components; all shared session logic lives in a single " +
      "provider so that any component can read the current user without prop drilling.",
  ),

  h2("Routes"),
  table(
    ["Route", "Purpose"],
    [
      ["/", "Public landing page: promotional banner, hero, trending row, feature cards, FAQ and footer."],
      ["/signup", "Registration form. Creates a Firebase account and sets the user's display name."],
      ["/login", "Sign-in form for returning members."],
      ["/browse", "Protected members area. Redirects anonymous visitors to the login page."],
    ],
  ),
  spacer(),

  h2("Component Breakdown"),
  table(
    ["File", "Responsibility"],
    [
      ["components/promo-banner.tsx", "Full-width gradient strip announcing the trial offer."],
      ["components/site-header.tsx", "Logo, language selector and a call to action that reflects sign-in state."],
      ["components/hero-section.tsx", "Poster-collage background, headline, pricing line, email capture and curved divider."],
      ["components/trending-row.tsx", "Horizontally scrollable, scroll-snapped carousel with large outlined rank numerals."],
      ["components/reasons-to-join.tsx", "Four gradient feature cards describing platform benefits."],
      ["components/faq-section.tsx", "Accessible accordion driven by aria-expanded and aria-controls."],
      ["components/site-footer.tsx", "Support number, four-column link grid, language selector and legal note."],
      ["components/email-signup-form.tsx", "Reusable email capture that forwards the address into the signup flow."],
      ["components/auth-provider.tsx", "React Context exposing the user, loading flag, signUp, signIn and signOut."],
      ["components/auth-form.tsx", "Shared form used by both auth pages, with validation and error display."],
      ["components/auth-shell.tsx", "Dark, collage-backed layout wrapper for the authentication pages."],
      ["components/require-auth.tsx", "Client-side guard that redirects unauthenticated visitors to /login."],
      ["components/browse-screen.tsx", "Members area greeting, content row and sign-out control."],
      ["lib/firebase.ts", "Lazy Firebase initialisation plus a Firebase error-code to message mapper."],
    ],
  ),
  spacer(),

  h1("4. Design System"),
  p(
    "Design decisions are centralised as CSS custom properties in app/globals.css and consumed through " +
      "Tailwind utility classes, so the palette and radii can be retuned in one place.",
  ),

  h2("Colour palette"),
  bullet("Near-black background — the primary surface behind all content."),
  bullet("Elevated dark grey — cards, FAQ rows and input fields, to separate them from the page."),
  bullet("Crimson red — the single brand accent, used for primary buttons, the logo and the hero arc."),
  bullet("Off-white and mid grey — headings and secondary body copy respectively."),
  p(
    "The palette is deliberately limited to one accent plus neutrals. Every element that overrides a " +
      "background also overrides its text colour, which keeps text and background contrast within " +
      "accessible ranges.",
  ),

  h2("Typography"),
  bullet("Poppins, in heavy weights, for the hero headline and section headings."),
  bullet("Inter for body copy, form labels, links and helper text."),
  bullet("Relaxed line height on paragraphs for comfortable reading."),
  bullet("Fluid heading sizes that step up at each breakpoint so the hero stays proportional."),

  h2("Layout approach"),
  bullet("Flexbox handles the majority of layouts, including the header, hero stack and form rows."),
  bullet("CSS Grid is reserved for genuinely two-dimensional areas such as the feature cards and footer link columns."),
  bullet("Spacing uses the Tailwind scale and gap utilities rather than arbitrary pixel values."),
  bullet("The build is mobile-first: base styles target small screens and responsive prefixes enhance upward."),

  h1("5. Authentication Flow"),
  p(
    "Firebase Authentication handles credential storage and verification. The browser SDK is " +
      "initialised once behind a lazy singleton, which prevents duplicate app instances during " +
      "development hot reloads.",
  ),

  h2("Registration"),
  numbered("The visitor opens /signup, optionally arriving with their email already prefilled from the landing page."),
  numbered("The form validates that the name is present, the email is well formed and the password is at least six characters."),
  numbered("On submit, createUserWithEmailAndPassword requests a new Firebase account."),
  numbered("updateProfile stores the chosen display name against the new account."),
  numbered("Firebase issues a session, the auth listener fires, and the user is routed to /browse."),

  h2("Sign in"),
  numbered("The visitor opens /login and submits their email and password."),
  numbered("signInWithEmailAndPassword verifies the credentials against Firebase."),
  numbered("On success the session is restored and the user is routed to /browse."),
  numbered("On failure a specific, human-readable message is shown beneath the form."),

  h2("Session handling and route protection"),
  bullet("onAuthStateChanged runs inside the provider and keeps the current user in React state."),
  bullet("A loading flag prevents a brief flash of signed-out UI while Firebase restores the session."),
  bullet("The RequireAuth guard renders a spinner while loading, then redirects to /login if no user is present."),
  bullet("Sessions persist across page reloads, so a returning visitor stays signed in."),
  bullet("The header call to action switches from Sign In to Browse once a session exists."),

  h2("Error handling"),
  p(
    "Raw Firebase error codes are unhelpful to end users, so lib/firebase.ts maps them to plain " +
      "language. Handled cases include an email already in use, an invalid email, a weak password, " +
      "incorrect credentials, too many attempts, network failure, a disabled sign-in provider, an " +
      "invalid API key and an unauthorised domain. The last three describe configuration problems and " +
      "state the exact console screen to visit, which turns a dead end into an actionable instruction.",
  ),

  h1("6. Environment Configuration"),
  p(
    "Firebase web configuration values are read from environment variables rather than hard-coded. " +
      "They use the NEXT_PUBLIC_ prefix because the browser SDK needs them at runtime; these " +
      "identifiers are safe to expose, and access is controlled by Firebase security rules and the " +
      "authorised-domain list, not by secrecy.",
  ),
  code("NEXT_PUBLIC_FIREBASE_API_KEY"),
  code("NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN"),
  code("NEXT_PUBLIC_FIREBASE_PROJECT_ID"),
  code("NEXT_PUBLIC_FIREBASE_APP_ID"),
  spacer(),
  p("These values are found in the Firebase console under Project settings, then Your apps, then SDK setup and configuration."),

  h1("7. Firebase Console Setup"),
  p("Two console settings must be in place before authentication will succeed:"),
  numbered("Open Authentication, then Sign-in method, and enable the Email/Password provider. Until this is done, Firebase rejects every attempt with a configuration-not-found error."),
  numbered("Open Authentication, then Settings, then Authorised domains, and add the preview and production domains so sign-in requests from those origins are accepted."),
  p(
    "The application detects both misconfigurations and displays the corrective step directly in the " +
      "form, so the cause is never ambiguous during setup.",
  ),

  h1("8. Accessibility and Quality"),
  bullet("Semantic landmarks — header, main, section and footer — give assistive technology a clear document outline."),
  bullet("Every input has an associated label; decorative icons are hidden from screen readers."),
  bullet("The FAQ accordion exposes state through aria-expanded and links each panel with aria-controls."),
  bullet("Error messages use a live region so they are announced when they appear."),
  bullet("Interactive elements are reachable by keyboard and show a visible focus ring."),
  bullet("Images carry descriptive alternative text, and the hero background is marked decorative."),
  bullet("Buttons disable themselves while a request is in flight, preventing duplicate submissions."),

  h2("Verification performed"),
  bullet("The landing page and both auth pages were rendered and inspected at desktop and mobile widths."),
  bullet("The FAQ accordion, language selectors and trending carousel were exercised directly in the browser."),
  bullet("Visiting /browse while signed out was confirmed to redirect to /login."),
  bullet("A live registration attempt confirmed requests reach the configured Firebase project."),

  h1("9. Possible Next Steps"),
  bullet("Password reset by email, using Firebase's built-in reset flow."),
  bullet("Email address verification before granting access to member content."),
  bullet("Additional sign-in providers, such as Google, if required later."),
  bullet("Server-side session verification so protected routes are enforced before rendering."),
  bullet("A profile area allowing members to update their display name and password."),
  bullet("A real content catalogue backed by a database, replacing the sample poster row."),

  h1("10. Summary"),
  p(
    "The delivered project is a complete, responsive streaming landing page in React and Next.js, " +
      "faithful to the supplied reference layout while using entirely original branding and artwork. " +
      "It is backed by a working Firebase email and password authentication system covering " +
      "registration, sign-in, persistent sessions, sign-out and route protection, with clear error " +
      "reporting throughout. The codebase is componentised, typed and themed through design tokens, " +
      "leaving it straightforward to extend with verification, password reset or a live content " +
      "catalogue.",
  ),
]

const doc = new Document({
  numbering: {
    config: [
      {
        reference: "steps",
        levels: [
          {
            level: 0,
            format: "decimal",
            text: "%1.",
            alignment: AlignmentType.START,
            style: { paragraph: { indent: { left: 620, hanging: 300 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: { page: { margin: { top: 1000, bottom: 1000, left: 1000, right: 1000 } } },
      children,
    },
  ],
})

const buffer = await Packer.toBuffer(doc)
writeFileSync("public/Streamly-Project-Report.docx", buffer)
console.log("[v0] wrote public/Streamly-Project-Report.docx", buffer.length, "bytes")
