// app/[lang]/root-shell.tsx
'use client'

import { ReactNode } from 'react'

// Client component that wraps the content
export default function RootShell({
  children
}: {
  children: ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}