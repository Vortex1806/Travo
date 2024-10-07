'use client'

import { useState, useEffect, useRef } from 'react'

interface ExpandableBoxProps {
  title: string
  color: string
  children: React.ReactNode
}

export default function ExpandableBox({ title, color, children }: ExpandableBoxProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (contentRef.current && !contentRef.current.contains(event.target as Node)) {
        setIsExpanded(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      <button
        className={`w-full aspect-square ${color} text-white font-semibold flex items-center justify-center`}
        onClick={() => setIsExpanded(true)}
      >
        {title}
      </button>
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={contentRef} className="bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm w-full">
            <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
            <div className="text-gray-300">{children}</div>
          </div>
        </div>
      )}
    </>
  )
}