import { ReactNode } from 'react';
import { ClientNav, ClientWrapper } from '@/components/ui/menu/client-nav';
import { HeaderContent } from '@/components/ui/menu/header-content';
import { placeholderCategories } from '@/lib/placeholder-data';

export default async function ClientLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ point_id: string }>;
}) {
  const { point_id } = await params;
  
  return (
    <div className="min-h-screen flex bg-[#F7F8FB]">
      <ClientNav />
      <ClientWrapper>
        <HeaderContent 
          pointId={point_id} 
          categories={placeholderCategories} 
        />
        {children}
      </ClientWrapper>
    </div>
  );
}