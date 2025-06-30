import { ReactNode } from 'react';
import { ClientNav, ClientWrapper } from '@/components/ui/menu/client-nav';

export default function ClientLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-[#F7F8FB]">
      <ClientNav />
      <ClientWrapper>
        {children}
      </ClientWrapper>
    </div>
  );
}