'use client';

import { DeskNav, MobileNav } from '@/components/ui/menu/deskNav';
import { useIsMobile } from '@/hooks/use-mobile';

export function ClientNav() {
  const isMobile = useIsMobile();

  return (
    <>
      {!isMobile && <DeskNav />}
      {isMobile && <MobileNav />}
    </>
  );
}

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile();
  
  return (
    <div className={`flex-1 flex flex-col ${!isMobile ? 'ml-40' : ''}`}>
      {children}
    </div>
  );
} 