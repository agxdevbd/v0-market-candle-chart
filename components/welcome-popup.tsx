"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export function WelcomePopup() {
  const [countdown, setCountdown] = useState(3)

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.5, rotateY: -180 }}
        animate={{ scale: 1, rotateY: 0 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 p-8 rounded-3xl shadow-2xl border border-blue-400/30 max-w-md mx-4"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-3xl animate-pulse"></div>

        <div className="relative text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="text-6xl mb-4"
          >
            🚀
          </motion.div>

          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-3xl font-bold text-white mb-2"
          >
            Welcome to CXT
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-blue-200 mb-6"
          >
            Projected by Pikota
          </motion.p>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto"
          >
            <span className="text-2xl font-bold text-white">{countdown}</span>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
