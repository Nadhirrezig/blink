'use client';

export function ClientWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col md:ml-40">
      {children}
    </div>
  );
}
