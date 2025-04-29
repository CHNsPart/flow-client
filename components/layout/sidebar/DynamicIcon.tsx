// /components/layout/sidebar/DynamicIcon.tsx
'use client';

import { DynamicIconProps } from './types';
import * as Icons from 'react-icons/bs';
import { cn } from '@/lib/utils';

/**
 * Dynamic icon component with proper typing for Bootstrap Icons
 * @param iconName The name of the icon to render from react-icons/bs
 * @param className Optional className for additional styling
 */
export function DynamicIcon({ iconName, className }: DynamicIconProps) {
  // Check if the iconName exists in Icons
  const IconComponent = Icons[iconName as keyof typeof Icons] || Icons.BsQuestionCircle;
  
  return (
    <IconComponent className={cn("size-4.5", className)} />
  );
}