import { ReactNode } from 'react';
import { ClientWrapper } from '@/components/ui/menu/client-nav';
import { HeaderContent } from '@/components/ui/menu/header-content';
import { NavLinks } from '@/components/ui/menu/deskNav';

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
      <NavLinks/>
      <ClientWrapper>
        <HeaderContent 
          pointId={point_id} 
        />
        {children}
      </ClientWrapper>
    </div>
  );
}