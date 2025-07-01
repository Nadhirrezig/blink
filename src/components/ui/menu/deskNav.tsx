'use client';
import { IconGift, IconReceipt } from "@tabler/icons-react";
import { IconBuildingStore } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  {
    name: "Menu",
    icon: IconBuildingStore,
    path: "menu",
  },
  {
    name: "Gifts",
    icon: IconGift,
    path: "menu/gifts",
  },
  {
    name: "Orders",
    icon: IconReceipt,
    path: "menu/orders",
  },
];

export function NavLinks() {
  const pathname = usePathname();
  const match = pathname.match(/^\/client\/([^/]+)/);
  const pointId = match ? match[1] : null;

  return (
    <>
      {/* Desktop Nav */}
      <nav className="fixed top-0 left-0 h-full w-40 bg-white border-r border-[#EEA4CE]/20 flex-col items-center py-6 shadow-sm z-50 hidden md:flex">
        <div className="mb-10">
          <Image
            src="/favicon.ico"
            alt="Blink Logo"
            width={40}
            height={40}
            className="rounded-full border border-[#F7F8FB] shadow-sm"
            priority
          />
        </div>
        <div className="flex flex-col gap-8 items-center flex-1 justify-center w-full">
          {links.map((link) => {
            const LinkIcon = link.icon;
            const href = pointId ? `/client/${pointId}/${link.path}` : '#';
            const isActive = pathname === href;
            return (
              <Link
                key={link.name}
                href={href}
                className={clsx(
                  'group flex flex-col items-center w-full text-[#1D1721] hover:bg-[#F7F8FB] hover:text-[#EEA4CE] transition rounded-xl p-2',
                  { 'bg-[#F7F8FB] text-[#EEA4CE]': isActive }
                )}
              >
                <LinkIcon size={28} />
                <span className="text-sm mt-1">{link.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>
      {/* Mobile Nav */}
      <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-[#EEA4CE]/20 flex justify-around items-center h-16 z-40 shadow-sm flex md:hidden">
        {links.map((link) => {
          const LinkIcon = link.icon;
          const href = pointId ? `/client/${pointId}/${link.path}` : '#';
          const isActive = pathname === href;
          return (
            <Link
              key={link.name}
              href={href}
              className={clsx(
                'flex flex-col items-center text-[#1D1721] opacity-80 hover:opacity-100 transition cursor-pointer',
                { 'text-[#EEA4CE]': isActive }
              )}
            >
              <LinkIcon size={24} />
              <span className="text-xs mt-1">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}