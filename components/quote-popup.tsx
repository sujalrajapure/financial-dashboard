"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"

interface QuotePopupProps {
  onClose: () => void
}

export function QuotePopup({ onClose }: QuotePopupProps) {
  const quotes = [
    "Risk hai toh ishq hai",
    "Market kabhi wrong nahi hota, investor wrong hote hain",
    "Success ke peeche sirf mehnat nahi, vision bhi hota hai",
    "Jab tak baazar hai, tab tak business hai",
    "Profit and loss are just part of the game",
  ]

  const [quote, setQuote] = useState(quotes[0])

  useEffect(() => {
    // Play bell sound
    const bellSound = new Audio("/bell.mp3")
    bellSound.volume = 0.3
    bellSound.play().catch(() => {
      // Handle autoplay restrictions
      console.log("Audio autoplay was prevented")
    })

    // Randomly select a quote
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
    setQuote(randomQuote)

    // Auto close after 5 seconds
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => {
      bellSound.pause()
      clearTimeout(timer)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-[#0f1117] border-2 border-green-500 max-w-md w-full rounded-md shadow-[0_0_30px_rgba(16,185,129,0.3)] animate-pulse-slow">
        <div className="p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-green-400 hover:text-green-500 rounded-full p-1"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="text-center py-6">
            <p className="text-2xl font-bold text-green-500 mb-2">"{quote}"</p>
            <p className="text-sm text-green-400/70">- Harshad Mehta</p>
          </div>
        </div>
      </div>
    </div>
  )
}

