// /components/layout/sidebar/SidebarError.tsx
import { Button } from '@/components/ui/button';
import { BsExclamationTriangle } from 'react-icons/bs';
import { SidebarErrorProps } from './types';

/**
 * Error state component for the sidebar
 */
export function SidebarError({ error, onRetry }: SidebarErrorProps) {
  return (
    <aside className="h-screen w-60 bg-none border-r border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-4">
      <BsExclamationTriangle className="size-12 text-red-500 mb-4" />
      <p className="text-gray-800 mb-4 text-center dark:text-gray-200">{error}</p>
      <Button 
        onClick={onRetry}
        variant="outline"
        className="w-full max-w-52"
      >
        Retry
      </Button>
    </aside>
  );
}