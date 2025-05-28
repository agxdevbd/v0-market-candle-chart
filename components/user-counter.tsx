"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Zap, Activity } from "lucide-react"

export function UserCounter() {
  const [userCount, setUserCount] = useState(() => {
    // ভিজিট শুরুতে ২ লাখ থেকে ২.৫ লাখের মধ্যে র্যান্ডম নাম্বার
    return Math.floor(Math.random() * 50000) + 200000
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

  // প্রতি মিলি সেকেন্ডে ইউজার কাউন্ট আপডেট
  useEffect(() => {
    const updateUserCount = () => {
      setUserCount((prev) => {
        const min = 200000
        const max = 500000

        // র্যান্ডম ইনক্রিমেন্ট: ১০, ২০, ১০০
        const increments = [10, 20, 100]
        const randomIncrement = increments[Math.floor(Math.random() * increments.length)]

        let newCount = prev

        if (isIncreasing) {
          newCount = prev + randomIncrement
          // ম্যাক্স রিচ করলে কমানো শুরু করি
          if (newCount >= max) {
            setIsIncreasing(false)
            newCount = max
          }
        } else {
          newCount = prev - randomIncrement
          // মিনিমাম রিচ করলে বাড়ানো শুরু করি
          if (newCount <= min) {
            setIsIncreasing(true)
            newCount = min
          }
        }

        return newCount
      })
    }

    // প্রতি মিলি সেকেন্ডে আপডেট
    const intervalId = setInterval(updateUserCount, 1)

    return () => clearInterval(intervalId)
  }, [isIncreasing])

  const getActivityStatus = () => {
    if (userCount >= 450000) return "Peak Activity"
    if (userCount >= 350000) return "High Activity"
    if (userCount >= 250000) return "Active Users"
    return "Growing Fast"
  }

  const getStatusColor = () => {
    if (userCount >= 450000) return "text-red-400"
    if (userCount >= 350000) return "text-orange-400"
    if (userCount >= 250000) return "text-green-400"
    return "text-blue-400"
  }

  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ delay: 0.8 }}
      className="relative z-10 text-center mb-8"
    >
      <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-4 max-w-sm mx-auto">
        <div className="flex items-center justify-center space-x-3">
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
              key={Math.floor(userCount / 100)} // Update animation every 100 users
              initial={{ scale: 1.1, color: isIncreasing ? "#10b981" : "#ef4444" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.1 }}
              className="text-2xl font-bold text-white font-mono"
            >
              {userCount.toLocaleString()}
            </motion.div>
            <div className={`text-xs mt-1 flex items-center justify-center ${getStatusColor()}`}>
              <Zap className="w-3 h-3 mr-1 text-yellow-400" />
              <span>{getActivityStatus()}</span>
              <motion.span
                animate={{
                  rotate: isIncreasing ? 0 : 180,
                }}
                transition={{ duration: 0.3 }}
                className="ml-1"
              >
                {isIncreasing ? "📈" : "📉"}
              </motion.span>
            </div>
            <div className="text-xs text-blue-300/70 mt-1">Range: 200K - 500K • Live Updates</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
