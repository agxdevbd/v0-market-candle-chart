"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Activity, TrendingUp } from "lucide-react"

export function UserCounter() {
  const [userCount, setUserCount] = useState(200000) // ২ লাখ থেকে শুরু
  const [targetReached, setTargetReached] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // প্রতি মিলিসেকেন্ডে ইউজার কাউন্ট আপডেট
  useEffect(() => {
    const updateUserCount = () => {
      setUserCount((prev) => {
        // যদি ৫ লাখে পৌঁছে গেছে, তাহলে ২ লাখ থেকে আবার শুরু
        if (prev >= 500000) {
          setTargetReached(false)
          return 200000 + Math.floor(Math.random() * 1000)
        }

        // র‍্যান্ডম ইনক্রিমেন্ট: ১০, ২০, ১০০
        const increments = [10, 20, 100]
        const randomIncrement = increments[Math.floor(Math.random() * increments.length)]

        const newCount = prev + randomIncrement

        // ৫ লাখে পৌঁছলে টার্গেট রিচড সেট করি
        if (newCount >= 500000) {
          setTargetReached(true)
          return 500000
        }

        return newCount
      })
    }

    // প্রতি মিলিসেকেন্ডে আপডেট (১০০০ মিলিসেকেন্ড = ১ সেকেন্ড)
    const intervalId = setInterval(updateUserCount, 1) // ১ মিলিসেকেন্ড

    return () => clearInterval(intervalId)
  }, [])

  const getActivityStatus = () => {
    if (userCount < 250000) return "Rising Fast"
    if (userCount < 350000) return "High Activity"
    if (userCount < 450000) return "Peak Hours"
    return "Maximum Capacity"
  }

  const getActivityColor = () => {
    if (userCount < 250000) return "text-green-400"
    if (userCount < 350000) return "text-yellow-400"
    if (userCount < 450000) return "text-orange-400"
    return "text-red-400"
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

            {/* Real-time Counter with Animation */}
            <motion.div
              key={Math.floor(userCount / 1000)} // Re-animate every 1000 users
              initial={{ scale: 1.1, color: "#10b981" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.2 }}
              className="text-2xl font-bold text-white font-mono"
            >
              {userCount.toLocaleString()}
            </motion.div>

            <div className={`text-xs mt-1 flex items-center justify-center ${getActivityColor()}`}>
              <TrendingUp className="w-3 h-3 mr-1" />
              <span>{getActivityStatus()}</span>
              {targetReached && (
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: 3, duration: 0.5 }}
                  className="ml-1"
                >
                  🔥
                </motion.span>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
              <motion.div
                className="bg-gradient-to-r from-green-400 to-blue-500 h-1.5 rounded-full"
                initial={{ width: "0%" }}
                animate={{
                  width: `${((userCount - 200000) / (500000 - 200000)) * 100}%`,
                }}
                transition={{ duration: 0.1 }}
              />
            </div>

            <div className="text-xs text-blue-300/70 mt-1">Range: 200K - 500K • Live Updates</div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
