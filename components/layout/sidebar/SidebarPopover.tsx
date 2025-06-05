// Path: components/layout/sidebar/SidebarPopover.tsx
import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/lib/utils';

interface SidebarPopoverProps {
  children: React.ReactNode;
  triggerRef: React.RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  getPosition?: () => { top: number; left: number };
}

/**
 * A popover component for displaying content next to sidebar items when collapsed
 * Uses a portal to render outside the sidebar layout constraints
 */
export function SidebarPopover({ 
  children, 
  triggerRef, 
  isOpen, 
  onClose,
  className,
  getPosition
}: SidebarPopoverProps) {
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const popoverRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Set up portal after mount
  useEffect(() => {
    setMounted(true);
    
    // Add click outside handler
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popoverRef.current && 
        !popoverRef.current.contains(event.target as Node) &&
        triggerRef.current && 
        !triggerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose, triggerRef]);

  // Calculate position based on trigger element or custom position function
  useEffect(() => {
    if (!isOpen) return;
    
    if (getPosition) {
      // Use custom position function if provided
      setPosition(getPosition());
    } else if (triggerRef.current) {
      // Default positioning logic
      const rect = triggerRef.current.getBoundingClientRect();
      
      // Make sure popover appears within viewport bounds
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      
      // Default position
      let top = rect.top;
      let left = rect.right + 8; // 8px offset from the sidebar
      
      // Check if popover would go off the bottom of the screen
      // We need to approximate the height, as we don't know exact dimensions
      const approximateHeight = 300; // Reasonable default
      if (top + approximateHeight > viewportHeight) {
        top = Math.max(viewportHeight - approximateHeight, 0);
      }
      
      // Check if popover would go off the right of the screen
      const approximateWidth = 220; // Reasonable default width
      if (left + approximateWidth > viewportWidth) {
        // Place on the left side of the sidebar instead
        left = Math.max(rect.left - approximateWidth - 8, 0);
      }
      
      setPosition({ top, left });
    }
  }, [isOpen, triggerRef, getPosition]);

  // Exit early if not mounted or not open
  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      ref={popoverRef}
      className={cn(
        "absolute z-50 min-w-[200px] rounded-md shadow-md border border-border",
        "bg-popover text-popover-foreground animate-in fade-in-50 zoom-in-95",
        className
      )}
      style={{ 
        top: `${position.top}px`, 
        left: `${position.left}px` 
      }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      {children}
    </div>,
    document.body
  );
}