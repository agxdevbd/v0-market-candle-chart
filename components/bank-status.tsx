"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Building2,
  Wifi,
  WifiOff,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Zap,
  Clock,
  Calendar,
} from "lucide-react"

interface BankStatus {
  name: string
  isOnline: boolean
  lastUpdate: string
  transactionCount: number
  icon: string
  nextOnlineTime?: string
  nextOfflineTime?: string
}

export function BankStatus() {
  const [banks, setBanks] = useState<BankStatus[]>([
    {
      name: "Web Paymently",
      isOnline: false,
      lastUpdate: "Just now",
      transactionCount: 1247,
      icon: "🏦",
    },
    {
      name: "WEX",
      isOnline: false,
      lastUpdate: "Just now",
      transactionCount: 892,
      icon: "💳",
    },
  ])

  // Bangladesh timezone offset (UTC+6)
  const getBangladeshTime = () => {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    const bangladeshTime = new Date(utc + 6 * 3600000)
    return bangladeshTime
  }

  const isBankOnlineTime = () => {
    const bdTime = getBangladeshTime()
    const hour = bdTime.getHours()
    const minute = bdTime.getMinutes()
    const currentTime = hour + minute / 60

    // Bank online times (Bangladesh time):
    // 6:00 AM - 8:00 AM (6.0 - 8.0)
    // 2:00 PM - 4:00 PM (14.0 - 16.0)
    // 10:00 PM - 12:00 AM (22.0 - 24.0)
    const onlinePeriods = [
      { start: 6.0, end: 8.0, name: "Morning Session" },
      { start: 14.0, end: 16.0, name: "Afternoon Session" },
      { start: 22.0, end: 24.0, name: "Night Session" },
    ]

    for (const period of onlinePeriods) {
      if (currentTime >= period.start && currentTime < period.end) {
        return { isOnline: true, currentSession: period.name, nextChange: period.end }
      }
    }

    return { isOnline: false, currentSession: "Offline Period", nextChange: getNextOnlineTime(currentTime) }
  }

  const getNextOnlineTime = (currentTime: number) => {
    const onlineTimes = [6.0, 14.0, 22.0]

    for (const time of onlineTimes) {
      if (currentTime < time) {
        return time
      }
    }
    // If past all times today, next is 6 AM tomorrow
    return 6.0 + 24
  }

  const formatTimeFromHour = (hour: number) => {
    const actualHour = hour >= 24 ? hour - 24 : hour
    const hours = Math.floor(actualHour)
    const minutes = Math.floor((actualHour - hours) * 60)
    const period = hours >= 12 ? "PM" : "AM"
    const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours

    return `${displayHour}:${minutes.toString().padStart(2, "0")} ${period}`
  }

  const getTimeUntilChange = (nextChangeTime: number) => {
    const bdTime = getBangladeshTime()
    const currentHour = bdTime.getHours() + bdTime.getMinutes() / 60

    let timeDiff = nextChangeTime - currentHour
    if (timeDiff < 0) timeDiff += 24 // Next day

    const hours = Math.floor(timeDiff)
    const minutes = Math.floor((timeDiff - hours) * 60)

    if (hours === 0) {
      return `${minutes}m`
    }
    return `${hours}h ${minutes}m`
  }

  const getCurrentBangladeshTimeString = () => {
    const bdTime = getBangladeshTime()
    return bdTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  useEffect(() => {
    const updateBankStatus = () => {
      const { isOnline, currentSession, nextChange } = isBankOnlineTime()

      setBanks((prev) =>
        prev.map((bank) => ({
          ...bank,
          isOnline,
          lastUpdate: "Just now",
          transactionCount: isOnline ? bank.transactionCount + Math.floor(Math.random() * 5) : bank.transactionCount,
          nextOnlineTime: !isOnline ? formatTimeFromHour(nextChange) : undefined,
          nextOfflineTime: isOnline ? formatTimeFromHour(nextChange) : undefined,
        })),
      )
    }

    // Initial update
    updateBankStatus()

    // Update every minute
    const interval = setInterval(updateBankStatus, 60000)

    return () => clearInterval(interval)
  }, [])

  const allBanksOnline = banks.every((bank) => bank.isOnline)
  const allBanksOffline = banks.every((bank) => !bank.isOnline)
  const { currentSession } = isBankOnlineTime()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="relative z-10 px-4 mb-8"
    >
      <div className="container mx-auto">
        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-400/30 backdrop-blur-sm overflow-hidden">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center">
                <Building2 className="w-6 h-6 mr-2 text-blue-400" />
                Banking System Status
                <motion.div
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3,
                    repeatType: "loop",
                  }}
                  className="ml-2"
                >
                  🏛️
                </motion.div>
              </CardTitle>

              {/* Overall Status Badge */}
              <motion.div
                key={allBanksOnline ? "online" : allBanksOffline ? "offline" : "partial"}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
              >
                <Badge
                  variant={allBanksOnline ? "default" : allBanksOffline ? "destructive" : "secondary"}
                  className={`
                    ${allBanksOnline ? "bg-green-500 hover:bg-green-600" : ""}
                    ${allBanksOffline ? "bg-red-500 hover:bg-red-600" : ""}
                    ${!allBanksOnline && !allBanksOffline ? "bg-yellow-500 hover:bg-yellow-600" : ""}
                    text-white font-bold px-3 py-1
                  `}
                >
                  {allBanksOnline ? (
                    <>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      All Systems Online
                    </>
                  ) : allBanksOffline ? (
                    <>
                      <XCircle className="w-3 h-3 mr-1" />
                      All Systems Offline
                    </>
                  ) : (
                    <>
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Partial Service
                    </>
                  )}
                </Badge>
              </motion.div>
            </div>

            {/* Bangladesh Time Display */}
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center text-blue-200 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                <span>Bangladesh Time: {getCurrentBangladeshTimeString()}</span>
              </div>
              <div className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full">{currentSession}</div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Trading Status Alert */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`
                mb-4 p-3 rounded-lg border-2 flex items-center justify-between
                ${
                  allBanksOnline
                    ? "bg-green-500/20 border-green-400/50 text-green-300"
                    : "bg-red-500/20 border-red-400/50 text-red-300"
                }
              `}
            >
              <div className="flex items-center">
                {allBanksOnline ? <TrendingUp className="w-5 h-5 mr-2" /> : <TrendingDown className="w-5 h-5 mr-2" />}
                <div>
                  <div className="font-bold text-sm">{allBanksOnline ? "Trading Available" : "Trading Suspended"}</div>
                  <div className="text-xs opacity-80">
                    {allBanksOnline
                      ? "All payment systems are operational. You can buy/sell freely."
                      : "Payment systems are offline. Trading will resume during next session."}
                  </div>
                </div>
              </div>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2,
                  repeatType: "loop",
                }}
                className="text-2xl"
              >
                {allBanksOnline ? "✅" : "❌"}
              </motion.div>
            </motion.div>

            {/* Banking Schedule */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4 p-3 bg-blue-800/20 rounded-lg border border-blue-400/20"
            >
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                <span className="text-white font-bold text-sm">Daily Banking Schedule (BD Time)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                <div className="flex items-center justify-between bg-blue-700/20 px-2 py-1 rounded">
                  <span className="text-blue-200">Morning:</span>
                  <span className="text-white font-bold">6:00 AM - 8:00 AM</span>
                </div>
                <div className="flex items-center justify-between bg-blue-700/20 px-2 py-1 rounded">
                  <span className="text-blue-200">Afternoon:</span>
                  <span className="text-white font-bold">2:00 PM - 4:00 PM</span>
                </div>
                <div className="flex items-center justify-between bg-blue-700/20 px-2 py-1 rounded">
                  <span className="text-blue-200">Night:</span>
                  <span className="text-white font-bold">10:00 PM - 12:00 AM</span>
                </div>
              </div>
            </motion.div>

            {/* Bank Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {banks.map((bank, index) => (
                <motion.div
                  key={bank.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  className={`
                    p-4 rounded-xl border-2 transition-all duration-300
                    ${
                      bank.isOnline
                        ? "bg-green-500/10 border-green-400/30 hover:bg-green-500/20"
                        : "bg-red-500/10 border-red-400/30 hover:bg-red-500/20"
                    }
                  `}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{bank.icon}</span>
                      <div>
                        <h3 className="text-white font-bold text-sm md:text-base">{bank.name}</h3>
                        <p className="text-xs text-gray-400">Payment Gateway</p>
                      </div>
                    </div>

                    <motion.div
                      animate={{
                        rotate: bank.isOnline ? 360 : 0,
                        scale: [1, 1.1, 1],
                      }}
                      transition={{
                        rotate: { duration: 2, repeat: bank.isOnline ? Number.POSITIVE_INFINITY : 0 },
                        scale: { duration: 1.5, repeat: Number.POSITIVE_INFINITY },
                      }}
                    >
                      {bank.isOnline ? (
                        <Wifi className="w-6 h-6 text-green-400" />
                      ) : (
                        <WifiOff className="w-6 h-6 text-red-400" />
                      )}
                    </motion.div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Status:</span>
                      <Badge
                        variant={bank.isOnline ? "default" : "destructive"}
                        className={`
                          text-xs px-2 py-0.5
                          ${bank.isOnline ? "bg-green-500" : "bg-red-500"}
                        `}
                      >
                        {bank.isOnline ? "ONLINE" : "OFFLINE"}
                      </Badge>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Last Update:</span>
                      <span className="text-xs text-white">{bank.lastUpdate}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Transactions:</span>
                      <div className="flex items-center">
                        <Zap className="w-3 h-3 text-yellow-400 mr-1" />
                        <span className="text-xs text-white font-bold">{bank.transactionCount.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Next Change Time */}
                    {(bank.nextOnlineTime || bank.nextOfflineTime) && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">
                          {bank.isOnline ? "Goes Offline:" : "Goes Online:"}
                        </span>
                        <span className="text-xs text-yellow-300 font-bold">
                          {bank.isOnline ? bank.nextOfflineTime : bank.nextOnlineTime}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Status Indicator */}
                  <div className="mt-3 flex items-center justify-center">
                    <motion.div
                      animate={{
                        boxShadow: bank.isOnline
                          ? [
                              "0 0 0 0 rgba(34, 197, 94, 0.7)",
                              "0 0 0 10px rgba(34, 197, 94, 0)",
                              "0 0 0 0 rgba(34, 197, 94, 0)",
                            ]
                          : [
                              "0 0 0 0 rgba(239, 68, 68, 0.7)",
                              "0 0 0 10px rgba(239, 68, 68, 0)",
                              "0 0 0 0 rgba(239, 68, 68, 0)",
                            ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                      }}
                      className={`
                        w-3 h-3 rounded-full
                        ${bank.isOnline ? "bg-green-400" : "bg-red-400"}
                      `}
                    />
                    <span className={`ml-2 text-xs font-bold ${bank.isOnline ? "text-green-400" : "text-red-400"}`}>
                      {bank.isOnline ? "Ready for Trading" : "Service Unavailable"}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer Info */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-4 text-center"
            >
              <p className="text-xs text-gray-400">
                🔄 Status updates every minute • 🇧🇩 Bangladesh Time Zone •
                <span className="text-blue-400 ml-1">AI-Monitored Banking System</span>
              </p>
            </motion.div>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  )
}
