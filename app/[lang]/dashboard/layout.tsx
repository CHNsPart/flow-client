'use client'

import { ReactNode } from 'react'
import { ClientLayout } from '@/components/layout/ClientLayout'
import { Shell } from '@/components/layout/Shell'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <ClientLayout>
      <Shell>
        {children}
      </Shell>
    </ClientLayout>
  )
}