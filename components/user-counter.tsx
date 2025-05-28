"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Users, Zap, Activity } from "lucide-react"

export function UserCounter() {
  const [userCount, setUserCount] = useState(200000)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const getTimeBasedRange = () => {
    const now = new Date()
    const hour = now.getHours()

    // 6 AM to 12 PM (6-11 in 24-hour format)
    if (hour >= 6 && hour < 12) {
      return { min: 250000, max: 300000 }
    } else {
      return { min: 200000, max: 250000 }
    }
  }

  useEffect(() => {
    // Set initial value based on current time
    const { min } = getTimeBasedRange()
    setUserCount(min + Math.floor(Math.random() * 20000))

    const updateUserCount = () => {
      const { min, max } = getTimeBasedRange()

      setUserCount((prev) => {
        // Generate a random increment between 100-1000
        const increment = Math.floor(Math.random() * 900) + 100
        let newCount = prev + increment

        // If we exceed max, reset to min range
        if (newCount > max) {
          newCount = min + Math.floor(Math.random() * 10000)
        }

        return newCount
      })
    }

    // Random interval between 2-5 seconds
    const createRandomInterval = () => {
      const randomDelay = Math.random() * 3000 + 2000 // 2-5 seconds
      return setTimeout(() => {
        updateUserCount()
        createRandomInterval() // Schedule next update
      }, randomDelay)
    }

    const timeoutId = createRandomInterval()

    // Cleanup function
    return () => clearTimeout(timeoutId)
  }, [])

  // Get current time range for display
  const { min, max } = getTimeBasedRange()
  const currentHour = new Date().getHours()
  const timeStatus = currentHour >= 6 && currentHour < 12 ? "Peak Hours" : "Regular Hours"

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
                duration: 2,
                repeatType: "loop",
              }}
              className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center text-sm text-blue-200">
              <span>Active Users</span>
              <motion.div
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 3,
                  ease: "linear",
                }}
                className="ml-1.5"
              >
                <Activity className="w-3 h-3 text-green-400" />
              </motion.div>
            </div>
            <motion.div
              key={userCount}
              initial={{ scale: 1.2, color: "#10b981" }}
              animate={{ scale: 1, color: "#ffffff" }}
              transition={{ duration: 0.3 }}
              className="text-2xl font-bold text-white"
            >
              {userCount.toLocaleString()}
            </motion.div>
            <div className="text-xs text-blue-300 mt-1 flex items-center justify-center">
              <Zap className="w-3 h-3 mr-1 text-yellow-400" />
              <span>{timeStatus}</span>
              <span className="mx-1">•</span>
              <span className="text-blue-300/70">
                {min.toLocaleString()} - {max.toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
