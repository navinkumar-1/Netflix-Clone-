import { type FirebaseApp, getApp, getApps, initializeApp } from 'firebase/app'
import { type Auth, getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.authDomain && firebaseConfig.projectId,
)

let app: FirebaseApp | undefined
let authInstance: Auth | undefined

/**
 * Lazily creates (or reuses) the Firebase app so hot reloads and
 * multiple imports never call initializeApp twice.
 */
export function getFirebaseAuth(): Auth {
  if (!isFirebaseConfigured) {
    throw new Error(
      'Firebase is not configured. Add NEXT_PUBLIC_FIREBASE_API_KEY, NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN, NEXT_PUBLIC_FIREBASE_PROJECT_ID and NEXT_PUBLIC_FIREBASE_APP_ID.',
    )
  }

  if (!app) {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig)
  }

  if (!authInstance) {
    authInstance = getAuth(app)
  }

  return authInstance
}

/** Maps Firebase error codes to copy we can show in the UI. */
export function firebaseAuthErrorMessage(code: string): string {
  switch (code) {
    case 'auth/invalid-email':
      return 'That email address does not look right.'
    case 'auth/missing-password':
      return 'Please enter your password.'
    case 'auth/weak-password':
      return 'Your password must be at least 6 characters long.'
    case 'auth/email-already-in-use':
      return 'An account already exists with this email. Try signing in instead.'
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Incorrect email or password. Please try again.'
    case 'auth/too-many-requests':
      return 'Too many attempts. Please wait a moment and try again.'
    case 'auth/network-request-failed':
      return 'Network error. Check your connection and try again.'
    case 'auth/operation-not-allowed':
    case 'auth/configuration-not-found':
      return 'Email/Password sign-in is not enabled yet. In the Firebase console, open Authentication → Sign-in method and enable the Email/Password provider.'
    case 'auth/api-key-not-valid.-please-pass-a-valid-api-key.':
      return 'Your Firebase API key is not valid. Double-check NEXT_PUBLIC_FIREBASE_API_KEY.'
    case 'auth/unauthorized-domain':
      return 'This domain is not authorised in Firebase. Add it under Authentication → Settings → Authorised domains.'
    default:
      return 'Something went wrong. Please try again.'
  }
}
