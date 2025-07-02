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

  const showBack = depth > 3 // Show back button if depth is greater than 3
  const stepTitles = [
    'Select Category',
    `Select Your ${'Item'}`,
    'Customize Your Order',
  ]
  const stepTitle = stepTitles[depth - 4]

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
