"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"

interface Candlestick {
  id: number
  x: number
  y: number
  isUp: boolean
  height: number
  width: number
  opacity: number
}

interface ProfitLoss {
  id: number
  value: string
  x: number
  y: number
  color: string
  opacity: number
}

export function BackgroundAnimation() {
  const [candlesticks, setCandlesticks] = useState<Candlestick[]>([])
  const [profits, setProfits] = useState<ProfitLoss[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    // Generate candlesticks
    const generateCandlestick = () => {
      const isUp = Math.random() > 0.5
      const height = Math.random() * 60 + 20
      const width = Math.random() * 10 + 5

      const newCandlestick = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        isUp,
        height,
        width,
        opacity: Math.random() * 0.3 + 0.1,
      }

      setCandlesticks((prev) => [...prev.slice(-15), newCandlestick])
    }

    // Generate profit/loss indicators
    const generateProfit = () => {
      const isProfit = Math.random() > 0.5
      const value = (Math.random() * 1000 + 100).toFixed(2)
      const newProfit = {
        id: Date.now() + Math.random(),
        value: `${isProfit ? "+" : "-"}$${value}`,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: isProfit ? "text-green-400" : "text-red-400",
        opacity: Math.random() * 0.5 + 0.5,
      }

      setProfits((prev) => [...prev.slice(-12), newProfit])
    }

    const candlestickInterval = setInterval(generateCandlestick, isMobile ? 3000 : 2000)
    const profitInterval = setInterval(generateProfit, isMobile ? 2500 : 1500)

    // Initial population
    for (let i = 0; i < (isMobile ? 5 : 8); i++) {
      generateCandlestick()
      generateProfit()
    }

    return () => {
      clearInterval(candlestickInterval)
      clearInterval(profitInterval)
    }
  }, [isMobile])

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-black animate-pulse"></div>

      {/* Candlesticks */}
      {candlesticks.map((candle) => (
        <motion.div
          key={candle.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: candle.opacity,
            scale: 1,
            y: [0, window.innerHeight * 0.7],
            rotate: [0, Math.random() * 10 - 5],
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: isMobile ? 15 : 20, ease: "linear" }}
          className="absolute pointer-events-none"
          style={{
            left: `${candle.x}%`,
            top: `${candle.y}%`,
            width: `${candle.width}px`,
            height: `${candle.height}px`,
            backgroundColor: candle.isUp ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)",
            boxShadow: candle.isUp ? "0 0 10px rgba(16, 185, 129, 0.3)" : "0 0 10px rgba(239, 68, 68, 0.3)",
            borderRadius: "1px",
          }}
        >
          {/* Wick */}
          <div
            className="absolute left-1/2 -translate-x-1/2 w-0.5"
            style={{
              height: `${candle.height * 0.3}px`,
              top: `-${candle.height * 0.3}px`,
              backgroundColor: candle.isUp ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)",
            }}
          />
          <div
            className="absolute left-1/2 -translate-x-1/2 w-0.5"
            style={{
              height: `${candle.height * 0.3}px`,
              bottom: `-${candle.height * 0.3}px`,
              backgroundColor: candle.isUp ? "rgba(16, 185, 129, 0.4)" : "rgba(239, 68, 68, 0.4)",
            }}
          />
        </motion.div>
      ))}

      {/* Floating profit/loss indicators */}
      {profits.map((profit) => (
        <motion.div
          key={profit.id}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: profit.opacity,
            scale: 1,
            y: [0, -100],
            x: [0, Math.random() * 40 - 20],
          }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: isMobile ? 8 : 10, ease: "easeOut" }}
          className={`absolute text-sm font-bold ${profit.color} pointer-events-none`}
          style={{ left: `${profit.x}%`, top: `${profit.y}%` }}
        >
          {profit.value}
        </motion.div>
      ))}

      {/* Animated particles */}
      <div className="absolute inset-0">
        {[...Array(isMobile ? 20 : 40)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              opacity: [0, 0.7, 0],
              scale: [0, Math.random() + 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
