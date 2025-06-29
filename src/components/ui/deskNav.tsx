import { IconGift, IconReceipt } from "@tabler/icons-react";
import { IconBuildingStore } from "@tabler/icons-react";
import Image from "next/image";

export function MobileNav() {
    return (
        <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-[#EEA4CE]/20 flex justify-around items-center h-16 z-40 shadow-sm">
        <button className="flex flex-col items-center text-[#1D1721] opacity-80 hover:opacity-100 transition cursor-pointer">
          <IconBuildingStore size={24} />
          <span className="text-xs mt-1">Menu</span>
        </button>
        <button className="flex flex-col items-center text-[#1D1721] opacity-80 hover:opacity-100 transition cursor-pointer">
          <IconGift size={24} />
          <span className="text-xs mt-1">Gifts</span>
        </button>
        <button className="flex flex-col items-center text-[#1D1721] opacity-80 hover:opacity-100 transition cursor-pointer">
          <IconReceipt size={24} />
          <span className="text-xs mt-1">Orders</span>
        </button>
      </nav>
    )
}
export function DeskNav() {
  return (
    <nav className="fixed top-0 left-0 h-full w-40 bg-white border-r border-[#EEA4CE]/20 flex flex-col items-center py-6 shadow-sm z-50">
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
    <div className="flex flex-col gap-8 items-center flex-1 justify-center">
      <button className="group flex flex-col items-center text-[#1D1721] hover:bg-[#F7F8FB] hover:text-[#EEA4CE] transition rounded-xl p-2">
        <IconBuildingStore size={28} />
        <span className="text-sm mt-1">Menu</span>
      </button>
      <button className="group flex flex-col items-center text-[#1D1721] hover:bg-[#F7F8FB] hover:text-[#EEA4CE] transition rounded-xl p-2">
        <IconGift size={28} />
        <span className="text-sm left-1">Gifts</span>
      </button>
      <button className="group flex flex-col items-center text-[#1D1721] hover:bg-[#F7F8FB] hover:text-[#EEA4CE] transition rounded-xl p-2">
        <IconReceipt size={28} />
        <span className="text-sm mt-1">Orders</span>
      </button>
    </div>
  </nav>   
  )
}