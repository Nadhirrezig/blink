'use client';
import Image from "next/image";
import { useState } from "react";
import DialogMenu from "@/components/ui/dialogmenu";

export default function AddNewItem() {
    const [open, setOpen] = useState(false);
    return (
        <>
            <div
                className="flex flex-col items-center justify-center rounded-xl bg-[#f8f8f8] p-4 shadow-sm hover:shadow-md cursor-pointer transition duration-200 ease-in-out"
                onClick={() => setOpen(true)}
                tabIndex={0}
                role="button"
                aria-label="Add new menu item"
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(true); }}
            >
                <div className="relative w-20 h-20 mb-2 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl">
                    <Image
                        src="/coffee/pressed.png"
                        alt="Add Item"
                        fill
                        className="object-contain rounded-md opacity-70"
                    />
                </div>
                <p className="text-sm font-medium text-gray-500 capitalize">Add Item</p>
            </div>
            {open && (
                <div className="fixed inset-0 z-40 bg-opacity-40 backdrop-blur-sm transition-opacity"></div>
            )}
            <DialogMenu open={open} setOpen={setOpen} />
        </>
    )
}