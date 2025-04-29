// /components/layout/sidebar/SidebarFooter.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { BsPerson, BsBoxArrowRight, BsChevronRight, BsInfoCircle } from 'react-icons/bs';
import { SidebarFooterProps } from './types';

/**
 * Footer component for the sidebar with user profile and logout
 */
export function SidebarFooter({ user, t }: SidebarFooterProps) {
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

  return (
    <>
      {/* User Profile Section */}
      <div className="mt-auto border-t">
        <div className="p-2 relative" ref={userMenuRef}>
          {/* User Profile Button */}
          <button 
            className="flex items-center gap-3 w-full px-2 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-left"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            aria-expanded={userMenuOpen}
            aria-haspopup="true"
          >
            <div className="relative">
              <div className="size-9 rounded-md overflow-hidden bg-gray-100 dark:bg-gray-800">
                <Image 
                  src={user.avatar} 
                  alt={user.name}
                  width={40}
                  height={40}
                  className="object-cover size-full rounded-md"
                />
              </div>
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm truncate dark:text-white">{user.name}</div>
              <div className="text-xs text-muted-foreground truncate">{user.email}</div>
            </div>
            <div className="flex-shrink-0 text-gray-400">
              <BsChevronRight className={cn("size-4 transition-transform", 
                userMenuOpen ? "rotate-90" : ""
              )} />
            </div>
          </button>
          
          {/* User Dropdown Menu */}
          {userMenuOpen && (
            <div className="absolute bottom-full mb-1 left-2 right-2 bg-white dark:bg-gray-900 rounded-md shadow-lg border overflow-hidden z-10">
              <div className="py-1">
                <Link 
                  href="/account" 
                  className="flex items-center px-4 py-2 text-sm"
                >
                  <BsPerson className="size-4 mr-2 text-muted-foreground" />
                  Account
                </Link>
                <button 
                  className="flex items-center w-full text-left px-4 py-2 text-sm"
                  onClick={() => console.log('Log out clicked')}
                >
                  <BsBoxArrowRight className="size-4 mr-2 text-muted-foreground" />
                  Log out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer with copyright */}
      <footer className="px-4 py-2.5 border-t">
        <div className="flex items-center text-xs text-muted-foreground/50">
          <BsInfoCircle className="size-3.5 mr-2 text-gray-400" />
          <span>{t('common.app.copyright').replace('{{year}}', currentYear.toString())}</span>
        </div>
      </footer>
    </>
  );
}