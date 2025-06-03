"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Zap, Activity, Globe } from "lucide-react"

export function UserCounter() {
  const [totalUsers, setTotalUsers] = useState(() => {
    // টোটাল ইউজার ১ মিলিয়ন থেকে ১০ মিলিয়ন পর্যন্ত
    return Math.floor(Math.random() * 9000000) + 1000000
  })

  const [activeUsers, setActiveUsers] = useState(() => {
    // অ্যাক্টিভ ইউজার ১-৪ মিলিয়ন পর্যন্ত
    return Math.floor(Math.random() * 4) + 1
  })

  const [timeOnPage, setTimeOnPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isIncreasing, setIsIncreasing] = useState(true)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // প্রতি সেকেন্ডে টাইম ট্র্যাক করি
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeOnPage((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // টোটাল ইউজার কাউন্ট আপডেট (১-১০ মিলিয়ন)
  useEffect(() => {
    const updateTotalUsers = () => {
      setTotalUsers((prev) => {
        const min = 1000000 // ১ মিলিয়ন
        const max = 10000000 // ১০ মিলিয়ন

        // র্যান্ডম ইনক্রিমেন্ট: ১০০০, ৫০০০, ১০০০০
        const increments = [1000, 5000, 10000]
        const randomIncrement = increments[Math.floor(Math.random() * increments.length)]

        let newCount = prev

        if (isIncreasing) {
          newCount = prev + randomIncrement
          if (newCount >= max) {
            setIsIncreasing(false)
            newCount = max
          }
        } else {
          newCount = prev - randomIncrement
          if (newCount <= min) {
            setIsIncreasing(true)
            newCount = min
          }
        }

        return newCount
      })
    }

    // প্রতি ১০০ মিলি সেকেন্ডে আপডেট
    const intervalId = setInterval(updateTotalUsers, 100)

    return () => clearInterval(intervalId)
  }, [isIncreasing])

  // অ্যাক্টিভ ইউজার আপডেট (১-৪ মিলিয়ন)
  useEffect(() => {
    const updateActiveUsers = () => {
      setActiveUsers((prev) => {
        const options = [1, 2, 3, 4] // ১, ২, ৩, ৪ মিলিয়ন
        return options[Math.floor(Math.random() * options.length)]
      })
    }

    // প্রতি ৫ সেকেন্ডে অ্যাক্টিভ ইউজার চেঞ্জ
    const intervalId = setInterval(updateActiveUsers, 5000)

    return () => clearInterval(intervalId)
  }, [])

  const getActivityStatus = () => {
    if (activeUsers >= 4) return "Peak Activity"
    if (activeUsers >= 3) return "High Activity"
    if (activeUsers >= 2) return "Active Users"
    return "Growing Fast"
  }

  const getStatusColor = () => {
    if (activeUsers >= 4) return "text-red-400"
    if (activeUsers >= 3) return "text-orange-400"
    if (activeUsers >= 2) return "text-green-400"
    return "text-blue-400"
  }

  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    }
    return num.toLocaleString()
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8 }}
      className="relative z-10 text-center mb-8"
    >
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-4 max-w-md mx-auto">
        {/* টোটাল ইউজার */}
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="relative">
            <Globe className="w-6 h-6 text-purple-400" />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 2,
                repeatType: "loop",
              }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full"
            />
          </div>
          <div>
            <div className="text-sm text-purple-200">Total Users</div>
            <motion.div
              key={Math.floor(totalUsers / 100000)}
              initial={{ scale: 1.1, color: isIncreasing ? "#10b981" : "#ef4444" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
              className="text-xl font-bold text-white font-mono"
            >
              {formatNumber(totalUsers)}
            </motion.div>
          </div>
        </div>

        {/* অ্যাক্টিভ ইউজার */}
        <div className="flex items-center justify-center space-x-3 border-t border-blue-400/20 pt-3">
          <div className="relative">
            <Users className="w-6 h-6 text-blue-400" />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 1,
                repeatType: "loop",
              }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center text-sm text-blue-200">
              <span>Live Active Users</span>
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  ease: "linear",
                }}
                className="ml-1.5"
              >
                <Activity className="w-3 h-3 text-green-400" />
              </motion.div>
            </div>
            <motion.div
              key={activeUsers}
              initial={{ scale: 1.2, color: "#10b981" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white font-mono"
            >
              {activeUsers}.0M
            </motion.div>
            <div className={`text-xs mt-1 flex items-center justify-center ${getStatusColor()}`}>
              <Zap className="w-3 h-3 mr-1 text-yellow-400" />
              <span>{getActivityStatus()}</span>
              <motion.span
                animate={{
                  rotate: activeUsers >= 3 ? 0 : 180,
                }}
                transition={{ duration: 0.3 }}
                className="ml-1"
              >
                {activeUsers >= 3 ? "📈" : "📊"}
              </motion.span>
            </div>
            <div className="text-xs text-blue-300/70 mt-1">Range: 1M - 4M Active • Live Updates</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
