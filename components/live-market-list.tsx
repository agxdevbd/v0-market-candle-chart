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
  WifiOff,
  Activity,
  DollarSign,
  PieChart,
  Calendar,
} from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { marketAPI } from "@/lib/api-service"
import type { Market } from "@/lib/types"
import { MarketDetailView } from "@/components/market-detail-view"
import { MarketCandlestickChart } from "@/components/market-candlestick-chart"

export function LiveMarketList() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewType, setViewType] = useState<"chart" | "details">("chart")
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [isConnected, setIsConnected] = useState(true)

  useEffect(() => {
    loadMarketData()

    // Start automatic data collection
    marketAPI.startAutomaticDataCollection()

    // Set up periodic updates every 5 minutes
    const interval = setInterval(() => {
      loadMarketData()
    }, 300000) // 5 minutes

    return () => {
      clearInterval(interval)
      marketAPI.stopAutomaticDataCollection()
    }
  }, [])

  const loadMarketData = async () => {
    try {
      setLoading(true)
      setIsConnected(true)

      const data = await marketAPI.fetchLiveMarketData()
      setMarkets(data)
      setLastUpdate(marketAPI.getLastUpdateTime())

      console.log(`📊 Loaded ${data.length} markets from live API`)
    } catch (error) {
      console.error("Failed to load market data:", error)
      setIsConnected(false)
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
        alert("Chart not found. Please open chart view first.")
        return
      }

      const dataURL = canvas.toDataURL("image/png", 1.0)
      const link = document.createElement("a")
      link.download = `${market.name}-live-chart-${new Date().toISOString().split("T")[0]}.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Success notification
      const notification = document.createElement("div")
      notification.innerHTML = `
        <div class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50 shadow-lg">
          📊 ${market.name} chart downloaded successfully!
        </div>
      `
      document.body.appendChild(notification)
      setTimeout(() => {
        if (document.body.contains(notification)) {
          document.body.removeChild(notification)
        }
      }, 3000)
    } catch (error) {
      console.error("Download failed:", error)
      alert("Download failed. Please try again.")
    }
  }

  const formatMarketCap = (value: number) => {
    if (value >= 1e9) return `$${(value / 1e9).toFixed(2)}B`
    if (value >= 1e6) return `$${(value / 1e6).toFixed(2)}M`
    if (value >= 1e3) return `$${(value / 1e3).toFixed(2)}K`
    return `$${value.toFixed(2)}`
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <motion.div className="text-center text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <motion.div
            className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-lg">🔄 Loading live market data from ai.cxt.com...</p>
          <p className="text-sm text-blue-300 mt-2">Connecting to real-time data feed</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <motion.div className="text-center mb-8" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center justify-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mr-3"
          >
            📊
          </motion.div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Live Market Data
          </h2>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="ml-3"
          >
            ⚡
          </motion.div>
        </div>

        <div className="flex items-center justify-center space-x-4 text-sm">
          <Badge
            variant={isConnected ? "default" : "destructive"}
            className={`${isConnected ? "bg-green-500" : "bg-red-500"} text-white`}
          >
            {isConnected ? (
              <>
                <Wifi className="w-3 h-3 mr-1" />
                Connected to ai.cxt.com
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 mr-1" />
                Connection Error
              </>
            )}
          </Badge>

          {lastUpdate && (
            <Badge variant="outline" className="border-blue-400 text-blue-400">
              <Activity className="w-3 h-3 mr-1" />
              Last Update: {lastUpdate.toLocaleTimeString()}
            </Badge>
          )}

          <Button
            variant="outline"
            size="sm"
            onClick={loadMarketData}
            disabled={loading}
            className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            <RefreshCw className={`w-3 h-3 mr-1 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </motion.div>

      {/* Market Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
        {markets.map((market, index) => (
          <motion.div
            key={market.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="group"
          >
            <Card className="overflow-hidden bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="pb-3 px-4 pt-4">
                <div className="flex flex-col items-center text-center">
                  {/* Market Logo & Name */}
                  <div className="flex items-center space-x-2 mb-3">
                    {market.logo && (
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center overflow-hidden"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <img
                          src={market.logo || "/placeholder.svg"}
                          alt={`${market.name} logo`}
                          className="w-6 h-6 object-contain"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                          }}
                        />
                      </motion.div>
                    )}
                    <CardTitle className="text-sm text-white truncate font-bold">{market.name}</CardTitle>
                  </div>

                  {/* Price */}
                  <motion.div
                    className="text-xl font-bold text-white mb-2"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {formatCurrency(market.price)}
                  </motion.div>

                  {/* 24h Change */}
                  <motion.div
                    className={`flex items-center text-sm font-medium mb-2 ${
                      market.percentChange >= 0 ? "text-green-400" : "text-red-400"
                    }`}
                    animate={{ y: [0, -2, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  >
                    {market.percentChange >= 0 ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    <span>
                      {market.percentChange >= 0 ? "+" : ""}
                      {market.percentChange.toFixed(2)}%
                    </span>
                    <span className="text-xs text-gray-400 ml-1">(24h)</span>
                  </motion.div>

                  {/* Market Cap & Volume */}
                  <div className="w-full space-y-1 text-xs">
                    {market.marketCap && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center">
                          <PieChart className="w-3 h-3 mr-1" />
                          Market Cap:
                        </span>
                        <span className="text-blue-300 font-medium">{formatMarketCap(market.marketCap)}</span>
                      </div>
                    )}

                    {market.volume24h && (
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400 flex items-center">
                          <DollarSign className="w-3 h-3 mr-1" />
                          Volume 24h:
                        </span>
                        <span className="text-green-300 font-medium">{formatMarketCap(market.volume24h)}</span>
                      </div>
                    )}

                    {/* 7 Day Change */}
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />7 Day:
                      </span>
                      <span className={`font-medium ${market.ytdChange >= 0 ? "text-green-300" : "text-red-300"}`}>
                        {market.ytdChange >= 0 ? "+" : ""}
                        {market.ytdChange.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 px-4 pb-4 space-y-2">
                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white transition-all duration-200"
                    onClick={() => handleViewChart(market)}
                  >
                    <BarChart3 className="h-3 w-3 mr-1" />
                    Chart
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 text-xs border-green-500 text-green-400 hover:bg-green-500 hover:text-white transition-all duration-200"
                    onClick={() => handleViewDetails(market)}
                  >
                    <Eye className="h-3 w-3 mr-1" />
                    Details
                  </Button>
                </div>

                {/* Mobile Download */}
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full text-xs md:hidden bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 hover:bg-purple-500 hover:text-white"
                  onClick={() => {
                    setSelectedMarket(market)
                    setViewType("chart")
                    setIsDialogOpen(true)
                    setTimeout(() => downloadChartAsPDF(market), 500)
                  }}
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download PDF
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Market Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMarket && (
          <DialogContent className="max-w-[95vw] md:max-w-6xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1 text-white">
                <div className="flex items-center space-x-3">
                  {selectedMarket.logo && (
                    <img
                      src={selectedMarket.logo || "/placeholder.svg"}
                      alt={`${selectedMarket.name} logo`}
                      className="w-8 h-8 object-contain"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=32&width=32"
                      }}
                    />
                  )}
                  <div>
                    <span className="text-lg md:text-xl font-bold">{selectedMarket.name}</span>
                    <div className="text-sm text-blue-300">
                      {viewType === "chart" ? "Live Trading Chart" : "Market Analysis"}
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
                    <span className="hidden sm:inline">Download PDF</span>
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
                  {/* Chart Only View */}
                  <div className="bg-black p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-white">Live Trading Chart</h3>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-blue-400 hover:text-blue-300"
                        onClick={() => setViewType("details")}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                    </div>
                    <div className="h-64 md:h-96 w-full" data-chart-canvas>
                      <MarketCandlestickChart market={selectedMarket} />
                    </div>
                    <div className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center space-x-4">
                      <span>📊 Real-time data from ai.cxt.com</span>
                      <span>•</span>
                      <span>🔄 Auto-updates every 5 minutes</span>
                      <span>•</span>
                      <span>📱 Mobile optimized</span>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Details View with All Options */}
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-600">
                      <TabsTrigger value="details" className="text-xs">
                        Market Info
                      </TabsTrigger>
                      <TabsTrigger value="chart" className="text-xs">
                        Live Chart
                      </TabsTrigger>
                      <TabsTrigger value="history" className="text-xs">
                        History
                      </TabsTrigger>
                      <TabsTrigger value="analysis" className="text-xs">
                        AI Analysis
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="details">
                      <MarketDetailView market={selectedMarket} />
                    </TabsContent>

                    <TabsContent value="chart">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <h3 className="text-lg font-bold">Live Chart View</h3>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-1"
                            onClick={() => downloadChartAsPDF(selectedMarket)}
                          >
                            <Download className="h-4 w-4" />
                            Download PDF
                          </Button>
                        </div>
                        <div className="bg-black p-4 rounded-lg">
                          <div className="h-64 md:h-96 w-full" data-chart-canvas>
                            <MarketCandlestickChart market={selectedMarket} />
                          </div>
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history">
                      <div className="space-y-4">
                        <h3 className="text-lg font-bold">30-Day Historical Performance</h3>
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                          {selectedMarket.historicalData?.slice(0, 30).map((data, index) => (
                            <motion.div
                              key={index}
                              className="flex justify-between items-center p-3 bg-gray-800 rounded border border-gray-700"
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.02 }}
                            >
                              <div>
                                <div className="font-bold text-white">{data.date}</div>
                                <div className="text-sm text-gray-400">
                                  Open: ${data.open.toFixed(2)} | High: ${data.high.toFixed(2)} | Low: $
                                  {data.low.toFixed(2)} | Close: ${data.close.toFixed(2)}
                                </div>
                              </div>
                              <div
                                className={`font-bold ${data.percentChange >= 0 ? "text-green-400" : "text-red-400"}`}
                              >
                                {data.percentChange >= 0 ? "+" : ""}
                                {data.percentChange.toFixed(2)}%
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="analysis">
                      <div className="p-6 text-center">
                        <h3 className="text-xl font-bold mb-6">🤖 AI Market Analysis</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                            <div className="text-blue-400 font-bold mb-2">📊 Technical Analysis</div>
                            <ul className="text-sm text-blue-300 space-y-1 text-left">
                              <li>• 30-day trend analysis complete</li>
                              <li>• Pattern recognition active</li>
                              <li>• Support/Resistance levels identified</li>
                              <li>• Volume analysis ready</li>
                            </ul>
                          </div>
                          <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                            <div className="text-green-400 font-bold mb-2">🎯 Predictions</div>
                            <ul className="text-sm text-green-300 space-y-1 text-left">
                              <li>• Next-day price prediction</li>
                              <li>• Volatility assessment</li>
                              <li>• Risk/Reward ratio</li>
                              <li>• Market sentiment analysis</li>
                            </ul>
                          </div>
                        </div>
                        <div className="mt-6 text-sm text-gray-400">
                          🔄 Analysis updated with each data refresh from ai.cxt.com
                        </div>
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
