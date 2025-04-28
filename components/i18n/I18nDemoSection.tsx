'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useTranslationHelper } from "@/hooks/use-translation-helper"

export function I18nDemoSection() {
  // Add mounted state to handle hydration
  const [mounted, setMounted] = useState(false)
  const { t, formatDate, formatCurrency, formatNumber } = useTranslationHelper('flowConfig')
  
  // Demo data - use a fixed date to avoid SSR/CSR differences
  const fixedDate = new Date('2023-01-01T12:00:00Z')
  const loanAmount = 25000
  const interestRate = 0.0549
  const numberOfTransactions = 1234567
  
  // Set mounted to true after initial render
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Return a skeleton/placeholder during server-side rendering
  if (!mounted) {
    return (
      <Card className="w-full max-w-2xl mt-8">
        <CardHeader>
          <CardTitle>I18n Demo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Loading...</h3>
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Loading...</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }
  
  // Render actual content after mounting (client-side only)
  return (
    <Card className="w-full max-w-2xl mt-8">
      <CardHeader>
        <CardTitle>{t('i18nDemo.title')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Text translations */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{t('i18nDemo.textSectionTitle')}</h3>
          <p>{t('i18nDemo.welcomeMessage')}</p>
          <p>{t('i18nDemo.description')}</p>
        </div>
        
        {/* Date formatting */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{t('i18nDemo.dateSectionTitle')}</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">{t('i18nDemo.currentDate')}:</div>
            <div>{formatDate(fixedDate)}</div>
            
            <div className="text-muted-foreground">{t('i18nDemo.longDate')}:</div>
            <div>{formatDate(fixedDate, { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</div>
            
            <div className="text-muted-foreground">{t('i18nDemo.shortDate')}:</div>
            <div>{formatDate(fixedDate, { 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}</div>
          </div>
        </div>
        
        {/* Number and currency formatting */}
        <div className="space-y-2">
          <h3 className="text-lg font-medium">{t('i18nDemo.currencySectionTitle')}</h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="text-muted-foreground">{t('i18nDemo.loanAmount')}:</div>
            <div>{formatCurrency(loanAmount)}</div>
            
            <div className="text-muted-foreground">{t('i18nDemo.interestRate')}:</div>
            <div>{formatNumber(interestRate, { style: 'percent', minimumFractionDigits: 2 })}</div>
            
            <div className="text-muted-foreground">{t('i18nDemo.transactions')}:</div>
            <div>{formatNumber(numberOfTransactions)}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}