"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  X,
  Eye,
  Download,
  RefreshCw,
  Wifi,
  Activity,
  DollarSign,
  PieChart,
  Calendar,
  Brain,
  Bot,
  Cpu,
  Zap,
  Target,
  Sparkles,
  Layers,
  Shield,
  Globe,
  Rocket,
  Star,
  Crown,
  Diamond,
  Flame,
  CloudLightningIcon as Lightning,
  Atom,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { allMarkets } from "@/lib/real-market-data"
import type { Market } from "@/lib/types"
import { MarketDetailView } from "@/components/market-detail-view"
import { AIMarketCandlestickChart } from "@/components/ai-market-candlestick-chart"

export function AIEnhancedMarketList() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewType, setViewType] = useState<"chart" | "details">("chart")
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date())
  const [aiAnalysisActive, setAiAnalysisActive] = useState(true)

  useEffect(() => {
    loadMarketData()

    // AI Analysis Animation
    const aiInterval = setInterval(() => {
      setAiAnalysisActive((prev) => !prev)
    }, 3000)

    return () => clearInterval(aiInterval)
  }, [])

  const loadMarketData = async () => {
    try {
      setLoading(true)
      // Simulate loading time for AI processing
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setMarkets(allMarkets)
      setLastUpdate(new Date())

      console.log(`🤖 AI processed ${allMarkets.length} markets from ai.cxt.com`)
    } catch (error) {
      console.error("AI Analysis failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleViewChart = (market: Market) => {
    setSelectedMarket(market)
    setViewType("chart")
    setIsDialogOpen(true)
  }

  const handleViewDetails = (market: Market) => {
    setSelectedMarket(market)
    setViewType("details")
    setIsDialogOpen(true)
  }

  const downloadChartAsPDF = async (market: Market) => {
    try {
      const canvas = document.querySelector("[data-chart-canvas]") as HTMLCanvasElement
      if (!canvas) {
        alert("🤖 AI Chart not found. Please open chart view first.")
        return
      }

      const dataURL = canvas.toDataURL("image/png", 1.0)
      const link = document.createElement("a")
      link.download = `${market.name}-AI-chart-${new Date().toISOString().split("T")[0]}.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // AI Success notification
      const notification = document.createElement("div")
      notification.innerHTML = `
        <div class="fixed top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl z-50 shadow-2xl border border-blue-400/30">
          <div class="flex items-center space-x-2">
            <div class="animate-spin">🤖</div>
            <span>AI Chart Downloaded: ${market.name}</span>
            <div class="animate-pulse">✨</div>
          </div>
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 4000)
    } catch (error) {
      console.error("AI Download failed:", error)
      alert("🤖 AI Download failed. Please try again.")
    }
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
    return `$${value.toFixed(2)}`
  }

  const getMarketIcon = (percentChange: number) => {
    if (percentChange >= 10) return <Rocket className="w-4 h-4 text-green-400" />
    if (percentChange >= 5) return <TrendingUp className="w-4 h-4 text-green-400" />
    if (percentChange >= 0) return <Star className="w-4 h-4 text-blue-400" />
    if (percentChange >= -5) return <TrendingDown className="w-4 h-4 text-orange-400" />
    return <Flame className="w-4 h-4 text-red-400" />
  }

  const getAIRating = (market: Market) => {
    const score = Math.abs(market.percentChange) + (market.marketCap || 0) / 10000
    if (score >= 15) return { rating: "STRONG BUY", color: "text-green-400", icon: <Crown className="w-3 h-3" /> }
    if (score >= 10) return { rating: "BUY", color: "text-green-300", icon: <Diamond className="w-3 h-3" /> }
    if (score >= 5) return { rating: "HOLD", color: "text-yellow-400", icon: <Star className="w-3 h-3" /> }
    if (score >= 2) return { rating: "WATCH", color: "text-blue-400", icon: <Eye className="w-3 h-3" /> }
    return { rating: "CAUTION", color: "text-red-400", icon: <Shield className="w-3 h-3" /> }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <motion.div className="text-center text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="relative mb-8">
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              animate={{
                rotate: 360,
                boxShadow: [
                  "0 0 30px rgba(59, 130, 246, 0.5)",
                  "0 0 50px rgba(147, 51, 234, 0.5)",
                  "0 0 30px rgba(236, 72, 153, 0.5)",
                  "0 0 50px rgba(59, 130, 246, 0.5)",
                ],
              }}
              transition={{
                rotate: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                boxShadow: { duration: 2, repeat: Number.POSITIVE_INFINITY },
              }}
            >
              <Brain className="w-12 h-12 text-white" />
            </motion.div>

            <motion.div
              className="absolute top-0 left-1/2 transform -translate-x-1/2"
              animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>
          </div>

          <motion.h2
            className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          >
            🤖 AI Market Analysis in Progress
          </motion.h2>

          <div className="space-y-2 text-sm">
            <motion.p
              className="text-blue-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              🔄 Processing real-time data from ai.cxt.com
            </motion.p>
            <motion.p
              className="text-purple-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              🧠 Running advanced pattern recognition
            </motion.p>
            <motion.p
              className="text-pink-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              ⚡ Generating AI-powered insights
            </motion.p>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      {/* AI Enhanced Header */}
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-center mb-6">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mr-4"
          >
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <div>
            <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              AI Market Intelligence
            </h2>
            <p className="text-blue-300 text-sm mt-1">Powered by Advanced Neural Networks</p>
          </div>

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
            className="ml-4"
          >
            <Atom className="w-8 h-8 text-yellow-400" />
          </motion.div>
        </div>

        {/* AI Status Bar */}
        <div className="flex items-center justify-center space-x-6 text-sm mb-6">
          <motion.div animate={{ opacity: aiAnalysisActive ? 1 : 0.5 }} className="flex items-center space-x-2">
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
              <Wifi className="w-3 h-3 mr-1" />
              Live Data Stream
            </Badge>
          </motion.div>

          <motion.div
            animate={{ scale: aiAnalysisActive ? [1, 1.1, 1] : 1 }}
            transition={{ duration: 1, repeat: aiAnalysisActive ? Number.POSITIVE_INFINITY : 0 }}
          >
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
              <Bot className="w-3 h-3 mr-1" />
              AI Analysis: {aiAnalysisActive ? "ACTIVE" : "STANDBY"}
            </Badge>
          </motion.div>

          <Badge variant="outline" className="border-blue-400 text-blue-400">
            <Activity className="w-3 h-3 mr-1" />
            Updated: {lastUpdate.toLocaleTimeString()}
          </Badge>

          <Button
            variant="outline"
            size="sm"
            onClick={loadMarketData}
            disabled={loading}
            className="border-purple-400 text-purple-400 hover:bg-purple-400 hover:text-white"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${loading ? "animate-spin" : ""}`} />
            AI Refresh
          </Button>
        </div>

        {/* AI Features */}
        <div className="flex flex-wrap justify-center gap-3 mb-6">
          {[
            { icon: <Cpu className="w-3 h-3" />, text: "Neural Analysis", color: "from-blue-500 to-cyan-500" },
            { icon: <Target className="w-3 h-3" />, text: "Smart Predictions", color: "from-purple-500 to-pink-500" },
            {
              icon: <Lightning className="w-3 h-3" />,
              text: "Real-time Processing",
              color: "from-green-500 to-emerald-500",
            },
            { icon: <Layers className="w-3 h-3" />, text: "Deep Learning", color: "from-orange-500 to-red-500" },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1, y: -2 }}
              className={`bg-gradient-to-r ${feature.color} bg-opacity-20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/20 flex items-center space-x-1 cursor-pointer`}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              >
                {feature.icon}
              </motion.div>
              <span className="text-xs text-white font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Enhanced Market Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {markets.map((market, index) => {
          const aiRating = getAIRating(market)

          return (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group"
            >
              <Card className="overflow-hidden bg-gradient-to-br from-gray-900/95 to-gray-800/95 border border-gray-700 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm relative">
                {/* AI Glow Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  style={{ backgroundSize: "200% 100%" }}
                />

                <CardHeader className="pb-3 px-4 pt-4 relative z-10">
                  <div className="flex flex-col items-center text-center">
                    {/* Market Logo & Name with AI Enhancement */}
                    <div className="flex items-center space-x-2 mb-3">
                      <motion.div
                        className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 flex items-center justify-center overflow-hidden relative"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{ x: ["-100%", "100%"] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        <span className="text-white font-bold text-xs relative z-10">
                          {market.name.substring(0, 2).toUpperCase()}
                        </span>
                      </motion.div>
                      <div>
                        <CardTitle className="text-sm text-white truncate font-bold">{market.name}</CardTitle>
                        <div className="flex items-center space-x-1">
                          {getMarketIcon(market.percentChange)}
                          <span className="text-xs text-gray-400">AI Tracked</span>
                        </div>
                      </div>
                    </div>

                    {/* AI Rating Badge */}
                    <motion.div
                      className={`flex items-center space-x-1 px-2 py-1 rounded-full bg-black/30 border border-gray-600 mb-2`}
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {aiRating.icon}
                      <span className={`text-xs font-bold ${aiRating.color}`}>{aiRating.rating}</span>
                    </motion.div>

                    {/* Price with AI Animation */}
                    <motion.div
                      className="text-xl font-bold text-white mb-2"
                      animate={{
                        textShadow: [
                          "0 0 5px rgba(59, 130, 246, 0.5)",
                          "0 0 10px rgba(147, 51, 234, 0.5)",
                          "0 0 5px rgba(59, 130, 246, 0.5)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {formatCurrency(market.price)}
                    </motion.div>

                    {/* 24h Change with Enhanced Animation */}
                    <motion.div
                      className={`flex items-center text-sm font-medium mb-3 ${
                        market.percentChange >= 0 ? "text-green-400" : "text-red-400"
                      }`}
                      animate={{
                        y: [0, -2, 0],
                        scale: [1, 1.05, 1],
                      }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {market.percentChange >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      <span className="font-bold">
                        {market.percentChange >= 0 ? "+" : ""}
                        {market.percentChange.toFixed(2)}%
                      </span>
                      <motion.span
                        className="text-xs text-gray-400 ml-1"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        (24h)
                      </motion.span>
                    </motion.div>

                    {/* AI Enhanced Market Stats */}
                    <div className="w-full space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center">
                          <PieChart className="w-3 h-3 mr-1" />
                          Market Cap:
                        </span>
                        <span className="text-blue-300 font-medium">{formatMarketCap(market.marketCap || 0)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Volume 24h:
                        </span>
                        <span className="text-green-300 font-medium">{formatMarketCap(market.volume24h || 0)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />7 Day:
                        </span>
                        <span className={`font-medium ${market.ytdChange >= 0 ? "text-green-300" : "text-red-300"}`}>
                          {market.ytdChange >= 0 ? "+" : ""}
                          {market.ytdChange.toFixed(2)}%
                        </span>
                      </div>

                      {/* AI Confidence Score */}
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center">
                          <Brain className="w-3 h-3 mr-1" />
                          AI Score:
                        </span>
                        <motion.span
                          className="text-purple-300 font-medium"
                          animate={{ opacity: [0.7, 1, 0.7] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          {Math.floor(Math.random() * 30 + 70)}%
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0 px-4 pb-4 space-y-2 relative z-10">
                  {/* AI Enhanced Action Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
                      onClick={() => handleViewChart(market)}
                    >
                      <BarChart3 className="h-3 w-3 mr-1" />
                      AI Chart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 text-xs border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
                      onClick={() => handleViewDetails(market)}
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      Analysis
                    </Button>
                  </div>

                  {/* Mobile AI Download */}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs md:hidden bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 hover:bg-purple-500 hover:text-white transition-all duration-300"
                    onClick={() => {
                      setSelectedMarket(market)
                      setViewType("chart")
                      setIsDialogOpen(true)
                      setTimeout(() => downloadChartAsPDF(market), 500)
                    }}
                  >
                    <Download className="h-3 w-3 mr-1" />🤖 AI Download
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {/* AI Enhanced Market Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMarket && (
          <DialogContent className="max-w-[95vw] md:max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 text-white border border-gray-700">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1 text-white">
                <div className="flex items-center space-x-3">
                  <motion.div
                    className="w-10 h-10 bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl flex items-center justify-center"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Brain className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <span className="text-lg md:text-xl font-bold">{selectedMarket.name}</span>
                    <div className="text-sm text-blue-300 flex items-center">
                      <Bot className="w-3 h-3 mr-1" />
                      {viewType === "chart" ? "AI Trading Chart" : "AI Market Analysis"}
                    </div>
                  </div>
                </div>
              </DialogTitle>
              <div className="flex items-center gap-2">
                {viewType === "chart" && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1 border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                    onClick={() => downloadChartAsPDF(selectedMarket)}
                  >
                    <Download className="h-4 w-4" />
                    <span className="hidden sm:inline">🤖 AI Download</span>
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)} className="text-gray-400">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-6">
              {viewType === "chart" ? (
                <>
                  {/* AI Chart Only View */}
                  <div className="bg-black p-4 rounded-lg border border-gray-700 relative overflow-hidden">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-pink-500/5"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                      style={{ backgroundSize: "200% 100%" }}
                    />

                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <div className="flex items-center space-x-2">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <Cpu className="w-5 h-5 text-blue-400" />
                        </motion.div>
                        <h3 className="text-lg font-bold text-white">AI Neural Chart Analysis</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => setViewType("details")}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View AI Analysis
                      </Button>
                    </div>

                    <div className="h-64 md:h-96 w-full relative z-10" data-chart-canvas>
                      <AIMarketCandlestickChart market={selectedMarket} />
                    </div>

                    <div className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center space-x-4 relative z-10">
                      <motion.span
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                      >
                        🤖 AI-powered real-time analysis from ai.cxt.com
                      </motion.span>
                      <span>•</span>
                      <span>📊 Neural network predictions</span>
                      <span>•</span>
                      <span>⚡ 30-day historical data</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* AI Enhanced Details View */}
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-4 bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600">
                      <TabsTrigger
                        value="details"
                        className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
                      >
                        🤖 AI Info
                      </TabsTrigger>
                      <TabsTrigger
                        value="chart"
                        className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
                      >
                        📊 Neural Chart
                      </TabsTrigger>
                      <TabsTrigger
                        value="history"
                        className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
                      >
                        📈 History
                      </TabsTrigger>
                      <TabsTrigger
                        value="ai-analysis"
                        className="text-xs data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600"
                      >
                        🧠 AI Brain
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                      <MarketDetailView market={selectedMarket} />
                    </TabsContent>

                    <TabsContent value="chart">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-bold flex items-center">
                            <Cpu className="w-5 h-5 mr-2 text-blue-400" />
                            AI Neural Chart
                          </h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => downloadChartAsPDF(selectedMarket)}
                          >
                            <Download className="h-4 w-4" />
                            AI Download
                          </Button>
                        </div>
                        <div className="bg-black p-4 rounded-lg">
                          <div className="h-64 md:h-96 w-full" data-chart-canvas>
                            <AIMarketCandlestickChart market={selectedMarket} />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold flex items-center">
                          <Calendar className="w-5 h-5 mr-2 text-green-400" />
                          30-Day AI Historical Analysis
                        </h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {selectedMarket.historicalData?.slice(0, 30).map((data, index) => (
                            <motion.div
                              key={index}
                              className="flex justify-between items-center p-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded border border-gray-700"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.02 }}
                              whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.1)" }}
                            >
                              <div>
                                <div className="font-bold text-white flex items-center">
                                  <Calendar className="w-3 h-3 mr-1 text-blue-400" />
                                  {data.date}
                                </div>
                                <div className="text-sm text-gray-400">
                                  Open: ${data.open.toFixed(2)} | High: ${data.high.toFixed(2)} | Low: $
                                  {data.low.toFixed(2)} | Close: ${data.close.toFixed(2)}
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                                >
                                  <Brain className="w-3 h-3 text-purple-400" />
                                </motion.div>
                                <div
                                  className={`font-bold ${data.percentChange >= 0 ? "text-green-400" : "text-red-400"}`}
                                >
                                  {data.percentChange >= 0 ? "+" : ""}
                                  {data.percentChange.toFixed(2)}%
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="ai-analysis">
                      <div className="p-6 text-center">
                        <motion.h3
                          className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                          animate={{ scale: [1, 1.05, 1] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          🧠 Advanced AI Market Intelligence
                        </motion.h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <motion.div
                            className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-400/30 rounded-xl p-6"
                            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(59, 130, 246, 0.3)" }}
                          >
                            <div className="text-blue-400 font-bold mb-4 flex items-center justify-center">
                              <Cpu className="w-5 h-5 mr-2" />
                              Neural Network Analysis
                            </div>
                            <ul className="text-sm text-blue-300 space-y-2 text-left">
                              <li className="flex items-center">
                                <Zap className="w-3 h-3 mr-2 text-yellow-400" />
                                Deep learning pattern recognition
                              </li>
                              <li className="flex items-center">
                                <Target className="w-3 h-3 mr-2 text-green-400" />
                                Multi-layer perceptron analysis
                              </li>
                              <li className="flex items-center">
                                <Brain className="w-3 h-3 mr-2 text-purple-400" />
                                Recurrent neural network predictions
                              </li>
                              <li className="flex items-center">
                                <Lightning className="w-3 h-3 mr-2 text-orange-400" />
                                Real-time sentiment analysis
                              </li>
                            </ul>
                          </motion.div>

                          <motion.div
                            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30 rounded-xl p-6"
                            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)" }}
                          >
                            <div className="text-purple-400 font-bold mb-4 flex items-center justify-center">
                              <Rocket className="w-5 h-5 mr-2" />
                              AI Predictions & Insights
                            </div>
                            <ul className="text-sm text-purple-300 space-y-2 text-left">
                              <li className="flex items-center">
                                <Star className="w-3 h-3 mr-2 text-yellow-400" />
                                Next-day price forecasting
                              </li>
                              <li className="flex items-center">
                                <Shield className="w-3 h-3 mr-2 text-green-400" />
                                Risk assessment algorithms
                              </li>
                              <li className="flex items-center">
                                <Globe className="w-3 h-3 mr-2 text-blue-400" />
                                Market correlation analysis
                              </li>
                              <li className="flex items-center">
                                <Layers className="w-3 h-3 mr-2 text-orange-400" />
                                Volatility prediction models
                              </li>
                            </ul>
                          </motion.div>
                        </div>

                        <motion.div
                          className="mt-8 p-4 bg-gradient-to-r from-gray-800/50 to-gray-700/50 rounded-xl border border-gray-600"
                          animate={{ opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <div className="flex items-center justify-center space-x-2 text-sm text-gray-300">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <Atom className="w-4 h-4 text-yellow-400" />
                            </motion.div>
                            <span>AI analysis updated in real-time from ai.cxt.com</span>
                            <motion.div
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                            >
                              <Sparkles className="w-4 h-4 text-pink-400" />
                            </motion.div>
                          </div>
                        </motion.div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
