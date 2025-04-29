// /components/layout/sidebar/SidebarHeader.tsx
import Image from 'next/image';
import { BsBriefcase } from 'react-icons/bs';
import { SidebarHeaderProps } from './types';

/**
 * Header component for the sidebar with company logo and info
 */
export function SidebarHeader({ companyName, companyLogo, appTagline }: SidebarHeaderProps) {
  return (
    <header className="px-4 py-5 border-b">
      <div className="flex flex-col items-center gap-3">
        <div className="size-20 bg-none rounded-md flex items-center justify-center text-white overflow-hidden">
          {companyLogo ? (
            <Image 
              src={companyLogo} 
              alt={companyName || 'Company logo'} 
              width={22}
              height={22}
              className="size-full object-contain"
            />
          ) : (
            <BsBriefcase className="size-5" />
          )}
        </div>
        <div className="grid flex-1 text-center text-sm leading-tight">
          <h2 className="font-semibold truncate dark:text-white">
            {companyName}
          </h2>
          <p className="text-xs truncate text-gray-500">{appTagline}</p>
        </div>
      </div>
    </header>
  );
}