// /components/layout/sidebar/SidebarFooter.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { BsPerson, BsBoxArrowRight, BsInfoCircle } from 'react-icons/bs';
import { SidebarFooterProps } from './types';
import { 
  Collapsible, 
  CollapsibleContent, 
  CollapsibleTrigger 
} from '@/components/ui/collapsible';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

/**
 * Footer component for the sidebar with user profile and logout
 */
export function SidebarFooter({ user, t, isCollapsed }: SidebarFooterProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get current year for copyright text
  const currentYear = new Date().getFullYear();

  if (isCollapsed) {
    return (
      <div className="py-4 flex flex-col items-center">
        <Avatar className="size-8 rounded-full">
          <AvatarImage src={user.avatar} alt={user.name} className="object-cover" />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  return (
    <div ref={userMenuRef} className="p-2">
      <div className="relative">
        <Collapsible open={userMenuOpen} onOpenChange={setUserMenuOpen}>
          <CollapsibleContent className="pb-2 pt-1">
            <div className="rounded-md bg-background shadow-sm border overflow-hidden">
              <div className="py-1">
                <Link 
                  href="/account" 
                  className="flex items-center px-4 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <BsPerson className="size-4 mr-2 text-muted-foreground" />
                  Account
                </Link>
                <button 
                  className="flex items-center w-full text-left px-4 py-2 text-sm hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  onClick={() => console.log('Log out clicked')}
                >
                  <BsBoxArrowRight className="size-4 mr-2 text-muted-foreground" />
                  Log out
                </button>
              </div>
            </div>
          </CollapsibleContent>
          <CollapsibleTrigger asChild>
            <div 
              className="flex items-center cursor-pointer justify-between w-full px-3 py-2.5 rounded-md 
              transition-colors duration-200 ease-in-out
              bg-sidebar-accent/5 hover:bg-primary-accent/20 
              dark:bg-primary-accent/10 dark:hover:bg-primary-accent/30
              border border-primary-border/40 hover:border-primary-border"
            >
              <div className="flex items-center gap-3">
                <Avatar className="size-10 ring-2 ring-sidebar-primary/10 object-contain">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-sidebar-primary/10 text-sidebar-primary font-medium">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0 text-left">
                  <div className="font-medium text-sm truncate text-sidebar-foreground">{user.name}</div>
                  <div className="text-xs text-sidebar-foreground/60 truncate">{user.email}</div>
                </div>
              </div>
              <div className="text-sidebar-foreground/40 hover:text-sidebar-foreground">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <path d="m6 9 6 6 6-6"/>
                </svg>
              </div>
            </div>
          </CollapsibleTrigger>
        </Collapsible>
      </div>
      
      {/* Footer with copyright */}
      <div className="mt-3 pt-3 border-t border-border">
        <div className="flex items-center text-xs text-muted-foreground/50">
          <BsInfoCircle className="size-3.5 mr-2" />
          <span>{t('common.app.copyright').replace('{{year}}', currentYear.toString())}</span>
        </div>
      </div>
    </div>
  );
}