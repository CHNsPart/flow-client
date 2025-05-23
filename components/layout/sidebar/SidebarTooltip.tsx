// Path: components/layout/sidebar/SidebarTooltip.tsx
'use client';

import { ReactNode } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface SidebarTooltipProps {
  content: string;
  children: ReactNode;
  isCollapsed: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  align?: 'start' | 'center' | 'end';
}

/**
 * Simple tooltip wrapper for sidebar items when collapsed
 * Shows tooltip only when sidebar is collapsed
 */
export function SidebarTooltip({
  content,
  children,
  isCollapsed,
  side = 'right',
  align = 'center'
}: SidebarTooltipProps) {
  // Don't show tooltip if sidebar is expanded
  if (!isCollapsed) {
    return <>{children}</>;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip content>
        <TooltipTrigger asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} align={align} className="z-50">
          <p className="text-sm">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}