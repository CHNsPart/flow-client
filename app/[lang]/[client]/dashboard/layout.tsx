// File: app/[lang]/dashboard/layout.tsx
'use client'

import { ReactNode } from 'react'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  // No need for Shell or ClientLayout here as they're now in the parent layout
  return <>{children}</>;
}