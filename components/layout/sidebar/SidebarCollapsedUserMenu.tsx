// Path: components/layout/sidebar/SidebarCollapsedUserMenu.tsx
import React, { useRef, useState, useCallback } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { SidebarPopover } from './SidebarPopover';
import { BsPerson, BsBoxArrowRight, BsInfoCircle } from 'react-icons/bs';
import Link from 'next/link';

interface SidebarCollapsedUserMenuProps {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
  t: (key: string) => string;
}

/**
 * Enhanced user menu component for collapsed sidebar
 * Shows user profile options in a popover with smart positioning
 */
export function SidebarCollapsedUserMenu({
  user,
  t
}: SidebarCollapsedUserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);
  
  // Get current year for copyright text
  const currentYear = new Date().getFullYear();
  
  // Close menu handler
  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle keyboard interactions
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Custom popover position calculation with smart viewport positioning
  const getPopoverPosition = useCallback(() => {
    if (!avatarRef.current) return { top: 0, left: 0 };
    
    const rect = avatarRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    
    // Calculate an approximate height for the popover
    // This is a reasonable estimate for the user menu with all content
    const approximateMenuHeight = 220;
    
    // Default position - to the right of the avatar
    let top = rect.top;
    let left = rect.right + 8; // 8px offset
    
    // Check if we're near the bottom of the viewport
    // If placing it at avatar top would push it off screen, adjust upward
    if (top + approximateMenuHeight > viewportHeight) {
      // Place it higher so it fits in the viewport
      // Align bottom of menu with bottom of viewport minus padding
      top = Math.max(viewportHeight - approximateMenuHeight - 16, 0);
    }
    
    // Check if we're near the right edge of the viewport
    const viewportWidth = window.innerWidth;
    const approximateMenuWidth = 224; // Width of menu (w-56 = 14rem = 224px)
    
    if (left + approximateMenuWidth > viewportWidth) {
      // Place it to the left of the sidebar instead
      left = Math.max(rect.left - approximateMenuWidth - 8, 0);
    }
    
    return { top, left };
  }, []);

  return (
    <div className="relative" ref={avatarRef}>
      {/* Avatar button */}
      <div 
        className="flex justify-center cursor-pointer my-2 p-1 rounded-full hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        role="button"
        aria-haspopup="true"
        aria-expanded={isOpen}
        tabIndex={0}
        title={user.name}
      >
        <Avatar className="size-8 ring-1 ring-sidebar-border">
          <AvatarImage 
            src={user.avatar} 
            alt={user.name} 
            className="object-cover" 
          />
          <AvatarFallback className="bg-sidebar-primary/10 text-sidebar-primary">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
      </div>
      
      {/* User menu popover */}
      <SidebarPopover
        triggerRef={avatarRef}
        isOpen={isOpen}
        onClose={closeMenu}
        className="w-56"
        getPosition={getPopoverPosition}
      >
        <div className="p-3 border-b border-border">
          <div className="flex items-center gap-3">
            <Avatar className="size-10  object-contain">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>
        
        <div className="py-1">
          <Link
            href="/account"
            className="flex items-center px-3 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer outline-none focus:ring-1 focus:ring-primary/50"
            onClick={closeMenu}
          >
            <BsPerson className="size-4 mr-2 text-muted-foreground" />
            Account
          </Link>
          <button
            className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground cursor-pointer outline-none focus:ring-1 focus:ring-primary/50"
            onClick={() => {
              console.log('Log out clicked');
              closeMenu();
            }}
          >
            <BsBoxArrowRight className="size-4 mr-2 text-muted-foreground" />
            Log out
          </button>
        </div>
        
        <div className="px-3 py-2 border-t border-border">
          <div className="flex items-center text-xs text-muted-foreground/50">
            <BsInfoCircle className="size-3.5 mr-2" />
            <span>{t('common.app.copyright').replace('{{year}}', currentYear.toString())}</span>
          </div>
        </div>
      </SidebarPopover>
    </div>
  );
}