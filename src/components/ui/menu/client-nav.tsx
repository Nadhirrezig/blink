'use client';

import { NavLinks } from '@/components/ui/menu/deskNav';

export function ClientNav() {
  return <NavLinks />;
}

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col md:ml-40">
      {children}
    </div>
  );
}
