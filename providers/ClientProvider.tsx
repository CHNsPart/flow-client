// Path: providers/ClientProvider.tsx
'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { companySiteConfigs } from '@/config';

// Client context type
type ClientContextType = {
  clientId: string;
  isDefaultClient: boolean;
  companyName: string;
};

// Create context with default values
const ClientContext = createContext<ClientContextType>({
  clientId: 'default',
  isDefaultClient: true,
  companyName: 'Flow Hub Inc.',
});

// Provider component
export function ClientProvider({ 
  children,
  initialClient 
}: { 
  children: ReactNode;
  initialClient?: string;
}) {
  // Get the client parameter from URL
  const params = useParams<{ client: string }>();
  const clientId = params?.client || initialClient || 'default';
  
  // Determine if it's the default client
  const isDefaultClient = clientId === 'default';
  
  // Get company name from config
  const companyName = isDefaultClient 
    ? 'Flow Hub Inc.' 
    : companySiteConfigs[clientId]?.company?.name || 'Flow Hub Inc.';
  
  return (
    <ClientContext.Provider value={{ 
      clientId, 
      isDefaultClient,
      companyName
    }}>
      {children}
    </ClientContext.Provider>
  );
}

// Hook to use client context
export function useClient() {
  return useContext(ClientContext);
}