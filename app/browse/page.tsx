import type { Metadata } from 'next'
import { BrowseScreen } from '@/components/browse-screen'
import { RequireAuth } from '@/components/require-auth'

export const metadata: Metadata = {
  title: 'Browse — Streamly',
  description: 'Browse trending titles on Streamly.',
}

export default function BrowsePage() {
  return (
    <RequireAuth>
      <BrowseScreen />
    </RequireAuth>
  )
}
