"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { TrendingUp, Users, Globe, Sparkles, Brain, Bot, Rocket, Award, ChevronRight, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaderboard } from "@/components/leaderboard"
import { SocialProfiles } from "@/components/social-profiles"
import { UpcomingMarkets } from "@/components/upcoming-markets"
import { UserCounter } from "@/components/user-counter"
import { BackgroundAnimation } from "@/components/background-animation"
import { BankStatus } from "@/components/bank-status"
import { AIEnhancedMarketList } from "@/components/ai-enhanced-market-list"
import Link from "next/link"

export function EnhancedTradingLanding() {
  const [currentPrice, setCurrentPrice] = useState(31.31) // CXT price from real data
  const [isMobile, setIsMobile] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    setIsLoaded(true)

    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const change = (Math.random() - 0.5) * 0.1
        return Math.max(30, Math.min(33, prev + change))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const handleMarketDetails = () => {
    const marketSection = document.querySelector("[data-market-section]")
    if (marketSection) {
      marketSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  const floatingElements = Array.from({ length: isMobile ? 10 : 20 }, (_, i) => ({
    id: i,
    icon: [
      "🤖",
      "🧠",
      "⚡",
      "🌟",
      "💰",
      "📊",
      "🔥",
      "✨",
      "🎯",
      "🏆",
      "💡",
      "🌊",
      "🔮",
      "⭐",
      "🎨",
      "🌈",
      "🎪",
      "🎭",
      "🚀",
      "💎",
    ][i],
    delay: Math.random() * 5,
    duration: 10 + Math.random() * 10,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }))

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 via-blue-900 to-black">
      <BackgroundAnimation />

      {/* Mobile-Optimized Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingElements.map((element) => (
          <motion.div
            key={element.id}
            className={`absolute ${isMobile ? "text-lg opacity-10" : "text-2xl opacity-20"}`}
            initial={{
              x: `${element.x}%`,
              y: `${element.y}%`,
              scale: 0,
              rotate: 0,
            }}
            animate={{
              y: [`${element.y}%`, `${element.y - 20}%`, `${element.y}%`],
              x: [`${element.x}%`, `${element.x + 10}%`, `${element.x}%`],
              scale: [0, isMobile ? 0.8 : 1, isMobile ? 0.6 : 0.8, isMobile ? 0.8 : 1],
              rotate: [0, 360, 0],
              opacity: [0, isMobile ? 0.2 : 0.3, 0.1, isMobile ? 0.2 : 0.3],
            }}
            transition={{
              duration: element.duration,
              repeat: Number.POSITIVE_INFINITY,
              delay: element.delay,
              ease: "easeInOut",
            }}
          >
            {element.icon}
          </motion.div>
        ))}
      </div>

      {/* Mobile-Optimized Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-10 p-3 md:p-6 sticky top-0 backdrop-blur-xl bg-black/40 border-b border-blue-500/20"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center space-x-2 md:space-x-3"
          >
            <motion.div
              className={`${isMobile ? "w-10 h-10" : "w-12 h-12"} bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center relative overflow-hidden`}
              animate={{
                boxShadow: [
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                  "0 0 30px rgba(147, 51, 234, 0.5)",
                  "0 0 20px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            >
              <Brain className={`${isMobile ? "w-5 h-5" : "w-7 h-7"} text-white relative z-10`} />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />
            </motion.div>
            <div>
              <span
                className={`${isMobile ? "text-2xl" : "text-3xl"} font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent`}
              >
                CXT
              </span>
              <div className={`${isMobile ? "text-xs" : "text-xs"} text-blue-300 flex items-center`}>
                <Bot className="w-3 h-3 mr-1" />
                AI Trading
              </div>
            </div>
          </motion.div>

          <div className="flex space-x-1 md:space-x-2">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="sm"
                className="border-blue-400/50 text-blue-400 hover:bg-blue-400 hover:text-white backdrop-blur-sm bg-blue-500/10 text-xs md:text-sm px-2 md:px-4"
              >
                <Link href="https://ai.cxt.com/user/login">
                  <span className="flex items-center">
                    Login
                    {!isMobile && <Smartphone className="ml-1 w-4 h-4" />}
                  </span>
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-500/25 text-xs md:text-sm px-2 md:px-4"
              >
                <Link href="https://ai.cxt.com/user/register">
                  <span className="flex items-center">
                    Register
                    {!isMobile && <ChevronRight className="ml-1 w-4 h-4" />}
                  </span>
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Mobile-Optimized Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`relative z-10 text-center ${isMobile ? "py-6 px-3" : "py-8 md:py-20 px-4"}`}
      >
        <div className="container mx-auto">
          {/* Mobile-Optimized AI Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
            className={`inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm ${isMobile ? "px-4 py-1.5" : "px-6 py-2"} rounded-full mb-4 md:mb-6 border border-blue-400/30`}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            >
              <Brain className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} text-blue-300`} />
            </motion.div>
            <span className={`text-blue-300 font-medium ${isMobile ? "text-xs" : "text-sm"}`}>
              🤖 AI-Powered Trading Platform
            </span>
            <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}>
              <Sparkles className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} text-yellow-400`} />
            </motion.div>
          </motion.div>

          {/* Mobile-Optimized Main Title */}
          <motion.h1
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className={`${isMobile ? "text-2xl" : "text-4xl md:text-7xl"} font-bold text-white mb-4 md:mb-6 leading-tight`}
          >
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
              className="bg-gradient-to-r from-blue-400 via-purple-400 via-pink-400 to-blue-400 bg-300% bg-clip-text text-transparent"
              style={{ backgroundSize: "300% 100%" }}
            >
              Trade Smarter
            </motion.span>
            <br />
            <span className="text-white">with</span>
            <div className="relative inline-block ml-2 md:ml-4">
              <motion.span
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-300% bg-clip-text text-transparent"
                style={{ backgroundSize: "300% 100%" }}
              >
                🧠 AI Technology
              </motion.span>
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.2, 1, 1.2, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  repeatType: "loop",
                }}
                className={`absolute ${isMobile ? "-top-4 -right-4 text-xl" : "-top-8 -right-8 text-3xl"} text-yellow-400`}
              >
                ✨
              </motion.div>
            </div>
          </motion.h1>

          {/* Mobile-Optimized CXT Price Display */}
          <motion.div
            initial={{ scale: 0, rotateY: -180 }}
            animate={{ scale: 1, rotateY: 0 }}
            transition={{ delay: 0.9, type: "spring", stiffness: 100 }}
            className={`relative bg-gradient-to-r from-blue-600/30 to-purple-600/30 backdrop-blur-xl border border-blue-400/50 rounded-2xl md:rounded-3xl ${isMobile ? "p-4 mb-6" : "p-6 md:p-8 mb-8"} max-w-lg mx-auto overflow-hidden`}
          >
            <div className={`relative z-10 flex items-center justify-center ${isMobile ? "space-x-3" : "space-x-6"}`}>
              <motion.div
                className={`${isMobile ? "w-12 h-12" : "w-16 h-16"} bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl md:rounded-2xl flex items-center justify-center relative overflow-hidden`}
                animate={{
                  boxShadow: [
                    "0 0 30px rgba(59, 130, 246, 0.6)",
                    "0 0 40px rgba(147, 51, 234, 0.6)",
                    "0 0 30px rgba(236, 72, 153, 0.6)",
                    "0 0 40px rgba(59, 130, 246, 0.6)",
                  ],
                }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
              >
                <span className={`text-white font-bold ${isMobile ? "text-sm" : "text-xl"} relative z-10`}>CXT</span>
              </motion.div>

              <div>
                <motion.div
                  className={`${isMobile ? "text-xl" : "text-3xl md:text-4xl"} font-bold text-white`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  ${currentPrice.toFixed(2)}
                </motion.div>
                <motion.div
                  className={`text-green-400 ${isMobile ? "text-xs" : "text-sm md:text-base"} flex items-center justify-center`}
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <TrendingUp className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} mr-1`} />
                  +1.31% (24h)
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="ml-1.5"
                  >
                    🤖
                  </motion.span>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Mobile-Optimized Action Buttons */}
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-col gap-3 md:flex-row md:items-center md:justify-center md:gap-4"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={handleMarketDetails}
                size={isMobile ? "default" : "lg"}
                className={`bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 ${isMobile ? "text-base px-6 py-3" : "text-lg px-8 py-4"} w-full sm:w-auto shadow-xl shadow-blue-500/25 border border-blue-400/50`}
              >
                <Brain className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} mr-2`} />🤖 AI Markets
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="ml-2"
                >
                  →
                </motion.div>
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size={isMobile ? "default" : "lg"}
                className={`border-2 border-blue-400/50 text-blue-400 hover:bg-blue-400 hover:text-white w-full sm:w-auto backdrop-blur-sm bg-blue-500/10 ${isMobile ? "text-base px-6 py-3" : "text-lg px-8 py-4"}`}
              >
                <Link href="https://ai.cxt.com/user/register">
                  <Rocket className={`${isMobile ? "w-4 h-4" : "w-5 h-5"} mr-2`} />
                  Start AI Trading
                  <motion.div
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                    className="ml-2"
                  >
                    🚀
                  </motion.div>
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* User Counter */}
      <UserCounter />

      {/* Bank Status Section */}
      <BankStatus />

      {/* AI Enhanced Market List Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="relative z-10 py-4 md:py-8"
        data-market-section
      >
        <AIEnhancedMarketList />
      </motion.section>

      {/* Mobile-Optimized Main Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
        className={`relative z-10 ${isMobile ? "px-3 pb-24" : "px-4 pb-20"}`}
      >
        <div className="container mx-auto">
          <Tabs defaultValue="leaderboard" className="w-full">
            <TabsList
              className={`grid w-full grid-cols-3 bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-400/30 mb-4 md:mb-6 backdrop-blur-sm ${isMobile ? "h-12" : ""}`}
            >
              <TabsTrigger
                value="leaderboard"
                className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 ${isMobile ? "text-xs" : ""}`}
              >
                <Award className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} mr-1 md:mr-2`} />
                <span className={isMobile ? "text-xs" : "hidden sm:inline"}>
                  🏆 {isMobile ? "Leaders" : "Leaderboard"}
                </span>
                <span className="sm:hidden md:inline">{isMobile ? "" : "Leaders"}</span>
              </TabsTrigger>
              <TabsTrigger
                value="social"
                className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 ${isMobile ? "text-xs" : ""}`}
              >
                <Users className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} mr-1 md:mr-2`} />
                <span className={isMobile ? "text-xs" : "hidden sm:inline"}>
                  👥 {isMobile ? "Social" : "AI Traders"}
                </span>
                <span className="sm:hidden md:inline">{isMobile ? "" : "Social"}</span>
              </TabsTrigger>
              <TabsTrigger
                value="upcoming"
                className={`data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 ${isMobile ? "text-xs" : ""}`}
              >
                <Globe className={`${isMobile ? "w-3 h-3" : "w-4 h-4"} mr-1 md:mr-2`} />
                <span className={isMobile ? "text-xs" : "hidden sm:inline"}>
                  🚀 {isMobile ? "Markets" : "Upcoming"}
                </span>
                <span className="sm:hidden md:inline">{isMobile ? "" : "Markets"}</span>
              </TabsTrigger>
            </TabsList>

            <AnimatePresence mode="wait">
              <TabsContent value="leaderboard">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <Leaderboard />
                </motion.div>
              </TabsContent>

              <TabsContent value="social">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <SocialProfiles />
                </motion.div>
              </TabsContent>

              <TabsContent value="upcoming">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <UpcomingMarkets />
                </motion.div>
              </TabsContent>
            </AnimatePresence>
          </Tabs>
        </div>
      </motion.section>

      {/* Enhanced Mobile App Banner */}
      <AnimatePresence>
        {isMobile && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 1.5 }}
            className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-3 z-50 border-t border-blue-400/30 safe-area-bottom"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <motion.div
                  animate={{ rotate: [0, 10, 0, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Brain className="w-5 h-5 text-white mr-2" />
                </motion.div>
                <div>
                  <div className="text-white font-bold text-sm">🤖 AI Mobile Trading</div>
                  <div className="text-blue-100 text-xs">Neural networks in your pocket</div>
                </div>
              </div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="sm" variant="secondary" asChild className="shadow-lg text-xs px-3">
                  <Link href="https://ai.cxt.com/user/register">
                    Try AI Now
                    <motion.span
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                      className="ml-1"
                    >
                      🚀
                    </motion.span>
                  </Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
