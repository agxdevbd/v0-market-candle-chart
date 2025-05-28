"use client"

import { useState, useEffect } from "react"
import { WelcomePopup } from "@/components/welcome-popup"
import { EnhancedTradingLanding } from "@/components/enhanced-trading-landing"

export default function Home() {
  const [showPopup, setShowPopup] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(false)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      {showPopup && <WelcomePopup />}
      <EnhancedTradingLanding />
    </main>
  )
}
