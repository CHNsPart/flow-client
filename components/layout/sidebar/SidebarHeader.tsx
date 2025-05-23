// Path: components/layout/sidebar/SidebarHeader.tsx
import Image from 'next/image';
import { BsBriefcase } from 'react-icons/bs';
import { SidebarHeaderProps } from './types';
import { cn } from '@/lib/utils';
import { useParams } from 'next/navigation';
import { getThemeForClient, getSiteConfigForClient } from '@/config/themes';

/**
 * Header component for the sidebar with company logo and info
 */
export function SidebarHeader({ 
  isCollapsed
}: Omit<SidebarHeaderProps, 'companyName' | 'companyLogo' | 'appTagline'>) {
  // Get client ID from URL params 
  const params = useParams<{ client: string }>();
  const urlClientId = params?.client || 'default';
  
  // Give environment variable precedence
  const envThemeId = process.env.NEXT_PUBLIC_THEME;
  const effectiveClientId = envThemeId || urlClientId;
  
  // Get theme and site config based on effective client ID
  const theme = getThemeForClient(effectiveClientId);
  const siteConfig = getSiteConfigForClient(effectiveClientId);
  
  // Get values from theme and config
  const companyName = theme.company;
  const companyLogo = siteConfig.company.logo;
  const appTagline = siteConfig.description;
  
  return (
    <div className={cn(
      "flex items-center gap-3 px-2 py-3 border-b", 
      isCollapsed ? "justify-center" : "flex-col"
    )}>
      <div className={cn("rounded-md flex items-center justify-center text-primary-foreground", !isCollapsed ? "size-24" : "size-8 overflow-hidden shrink-0")}>
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
      {!isCollapsed && (
        <div className="grid flex-1 text-center text-sm leading-tight">
          <h2 className="font-semibold truncate dark:text-white">
            {companyName}
          </h2>
          <p className="text-xs truncate text-muted-foreground">{appTagline}</p>
        </div>
      )}
    </div>
  );
}