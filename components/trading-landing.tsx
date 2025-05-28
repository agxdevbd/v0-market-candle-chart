"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  TrendingUp,
  Users,
  Globe,
  BarChart3,
  Zap,
  Sparkles,
  Brain,
  Bot,
  Rocket,
  Award,
  Cpu,
  ChevronRight,
  Smartphone,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Leaderboard } from "@/components/leaderboard"
import { SocialProfiles } from "@/components/social-profiles"
import { UpcomingMarkets } from "@/components/upcoming-markets"
import { UserCounter } from "@/components/user-counter"
import { BackgroundAnimation } from "@/components/background_animation"
import { BankStatus } from "@/components/bank-status"
import { MarketList } from "@/components/market-list"
import Link from "next/link"

export function TradingLanding() {
  const [currentPrice, setCurrentPrice] = useState(36.0)
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
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const change = (Math.random() - 0.5) * 0.1
        return Math.max(35, Math.min(37, prev + change))
      })
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  // Internal market details handler
  const handleMarketDetails = () => {
    // Scroll to market list section
    const marketSection = document.querySelector("[data-market-section]")
    if (marketSection) {
      marketSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BackgroundAnimation />

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-10 p-4 md:p-6 sticky top-0 backdrop-blur-md bg-black/30"
      >
        <div className="container mx-auto flex justify-between items-center">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">CXT</span>
          </motion.div>

          <div className="flex space-x-2">
            <Button
              asChild
              variant="outline"
              size={isMobile ? "sm" : "default"}
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
            >
              <Link href="https://ai.cxt.com/user/login">
                {isMobile ? (
                  "Login"
                ) : (
                  <span className="flex items-center">
                    Login <Smartphone className="ml-1 w-4 h-4" />
                  </span>
                )}
              </Link>
            </Button>
            <Button
              asChild
              size={isMobile ? "sm" : "default"}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
            >
              <Link href="https://ai.cxt.com/user/register">
                {isMobile ? (
                  "Register"
                ) : (
                  <span className="flex items-center">
                    Register <ChevronRight className="ml-1 w-4 h-4" />
                  </span>
                )}
              </Link>
            </Button>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative z-10 text-center py-6 md:py-16 px-4"
      >
        <div className="container mx-auto">
          <motion.div
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center justify-center space-x-2 bg-blue-500/20 backdrop-blur-sm px-4 py-1 rounded-full mb-4"
          >
            <Brain className="w-4 h-4 text-blue-300" />
            <span className="text-blue-300 text-sm">AI-Powered Trading</span>
          </motion.div>

          <motion.h1
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="text-3xl md:text-6xl font-bold text-white mb-4 leading-tight"
          >
            Trade Smarter with
            <div className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 ml-2">
                AI Technology
              </span>
              <motion.div
                animate={{
                  rotate: [0, 5, 0, -5, 0],
                  scale: [1, 1.05, 1, 1.05, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 5,
                  repeatType: "loop",
                }}
                className="absolute -top-6 -right-6 text-yellow-400 text-2xl"
              >
                ✨
              </motion.div>
            </div>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-lg text-blue-200 mb-6 max-w-2xl mx-auto"
          >
            <span className="hidden md:inline">Experience the future of trading with our AI-controlled platform</span>
            <span className="md:hidden">AI-powered trading platform</span>
          </motion.p>

          {/* AI Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap justify-center gap-3 mb-8"
          >
            {[
              { icon: <Bot className="w-4 h-4" />, text: "AI Trading" },
              { icon: <Cpu className="w-4 h-4" />, text: "Smart Analysis" },
              { icon: <Sparkles className="w-4 h-4" />, text: "Auto Signals" },
              { icon: <BarChart3 className="w-4 h-4" />, text: "Live Charts" },
            ].map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-blue-900/30 backdrop-blur-sm px-3 py-1.5 rounded-full border border-blue-400/20 flex items-center space-x-1.5"
              >
                {feature.icon}
                <span className="text-xs text-blue-200">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CXT Price Display */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, type: "spring" }}
            className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-4 md:p-6 mb-6 max-w-md mx-auto"
          >
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">CXT</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">${currentPrice.toFixed(2)}</div>
                <div className="text-green-400 text-sm flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2.5% (24h)
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button
              onClick={handleMarketDetails}
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg px-8 py-3 w-full sm:w-auto"
            >
              <BarChart3 className="w-5 h-5 mr-2" />
              Market Details
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white w-full sm:w-auto"
            >
              <Link href="https://ai.cxt.com/user/register">
                <Rocket className="w-5 h-5 mr-2" />
                Start Trading
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* User Counter */}
      <UserCounter />

      {/* Bank Status Section */}
      <BankStatus />

      {/* Market List Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0 }}
        className="relative z-10 py-8"
        data-market-section
      >
        <MarketList />
      </motion.section>

      {/* Main Content */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="relative z-10 px-4 pb-16"
      >
        <div className="container mx-auto">
          <Tabs defaultValue="leaderboard" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-blue-900/30 border border-blue-400/30 mb-4">
              <TabsTrigger value="leaderboard" className="data-[state=active]:bg-blue-600">
                <Award className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Leaderboard</span>
                <span className="sm:hidden">Leaders</span>
              </TabsTrigger>
              <TabsTrigger value="social" className="data-[state=active]:bg-blue-600">
                <Users className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Social Profiles</span>
                <span className="sm:hidden">Social</span>
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="data-[state=active]:bg-blue-600">
                <Globe className="w-4 h-4 mr-2" />
                <span className="hidden sm:inline">Upcoming Markets</span>
                <span className="sm:hidden">Markets</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leaderboard">
              <Leaderboard />
            </TabsContent>

            <TabsContent value="social">
              <SocialProfiles />
            </TabsContent>

            <TabsContent value="upcoming">
              <UpcomingMarkets />
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Mobile App Banner - Only on Mobile */}
      {isMobile && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 p-3 z-20"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Smartphone className="w-6 h-6 text-white mr-2" />
              <div>
                <div className="text-white font-bold text-sm">Mobile Experience</div>
                <div className="text-blue-100 text-xs">Trade anywhere, anytime</div>
              </div>
            </div>
            <Button size="sm" variant="secondary" asChild>
              <Link href="https://ai.cxt.com/user/register">Try Now</Link>
            </Button>
          </div>
        </motion.div>
      )}
    </div>
  )
}
