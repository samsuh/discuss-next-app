'use client'

import { NextUIProvider } from '@nextui-org/react'
// SessionProvider gives us access to next-auth/react's useSession hook inside a client component to access session object
import { SessionProvider } from 'next-auth/react'

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <NextUIProvider>{children}</NextUIProvider>
    </SessionProvider>
  )
}
