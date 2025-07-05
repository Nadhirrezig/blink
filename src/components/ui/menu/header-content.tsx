'use client'

import React from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'

interface HeaderContentProps {
  pointId: string
}

export const HeaderContent: React.FC<HeaderContentProps> = ({
  pointId,
}) => {
  const pathname = usePathname()
  const router = useRouter()

  const segments = pathname.split('/').filter(Boolean)
  const depth = segments.length

  // More robust back button logic
  const showBack = depth > 2 // Show back button if we're deeper than just the profile

  // Better step title logic based on path structure
  const getStepTitle = () => {
    // /profile-1/menu (depth 2) - Select Category
    if (depth === 2 && segments[1] === 'menu') {
      return 'Select Category'
    }
    
    // /profile-1/menu/cat-1 (depth 3) - Select Your Item
    if (depth === 3 && segments[1] === 'menu') {
      return 'Select Your Item'
    }
    
    // /profile-1/menu/cat-1/order/espresso (depth 5) - Customize Your Order
    if (depth === 5 && segments[1] === 'menu' && segments[3] === 'order') {
      return 'Customize Your Order'
    }
    
    // Fallback
    return 'Menu'
  }

  const stepTitle = getStepTitle()

  return (
    <header className="sticky top-0 z-30 px-6 pt-6 pb-4 bg-white/95 backdrop-blur-sm shadow-md border-b border-[#EEA4CE]/10">
      <div className="flex items-center gap-2 mb-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="p-2 rounded-full bg-[#F7F8FB] hover:bg-[#EEA4CE]/20 text-[#1D1721] transition"
            aria-label="Go Back"
          >
            <IconArrowLeft size={22} />
          </button>
        )}
        <h1 className="text-lg font-semibold text-[#1D1721]">
          Welcome to{' '}
          <span className="text-[#EEA4CE] font-bold text-2xl uppercase">
            {pointId}
          </span>{' '}
          Menu!
        </h1>
      </div>
      <h2 className="text-base font-medium text-[#1D1721] opacity-80">
        {stepTitle}
      </h2>
    </header>
  )
}
