"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketCandlestick } from "@/components/market-candlestick"
import { MarketDetailView } from "@/components/market-detail-view"
import { TrendingUp, TrendingDown, BarChart3, X, Calendar, TimerIcon as Timeline } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { allMarkets as marketData } from "@/lib/market-data"
import type { Market } from "@/lib/types"

export function MarketOverview() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleViewChart = (market: Market) => {
    setSelectedMarket(market)
    setIsDialogOpen(true)
  }

  const positiveMarkets = marketData.filter((market) => market.percentChange > 0)
  const negativeMarkets = marketData.filter((market) => market.percentChange < 0)
  const neutralMarkets = marketData.filter((market) => market.percentChange === 0)

  // Get today's date for display
  const today = new Date()
  const todayString = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  })

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="relative z-10 px-4 pb-16"
    >
      <div className="container mx-auto">
        <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-400/30 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-white flex items-center justify-center">
              <BarChart3 className="w-6 h-6 mr-2 text-blue-400" />
              4-Day Market Analysis
              <motion.div
                animate={{
                  rotate: [0, 10, 0, -10, 0],
                  scale: [1, 1.1, 1, 1.1, 1],
                }}
                transition={{
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 4,
                  repeatType: "loop",
                }}
                className="ml-2"
              >
                📊
              </motion.div>
            </CardTitle>
            <div className="text-center text-blue-200 text-sm flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                <span>Historical candlestick charts (23/01 - 26/01/2024)</span>
              </div>
              <div className="flex items-center">
                <Timeline className="w-4 h-4 mr-1" />
                <span>Latest: {todayString}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Market Statistics */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.3 }}
                className="bg-green-500/20 border border-green-400/30 rounded-lg p-3 text-center"
              >
                <div className="text-green-400 font-bold text-lg">{positiveMarkets.length}</div>
                <div className="text-green-300 text-xs">Today's Gainers</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.4 }}
                className="bg-red-500/20 border border-red-400/30 rounded-lg p-3 text-center"
              >
                <div className="text-red-400 font-bold text-lg">{negativeMarkets.length}</div>
                <div className="text-red-300 text-xs">Today's Losers</div>
              </motion.div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.5 }}
                className="bg-blue-500/20 border border-blue-400/30 rounded-lg p-3 text-center"
              >
                <div className="text-blue-400 font-bold text-lg">{marketData.length}</div>
                <div className="text-blue-300 text-xs">Total Markets</div>
              </motion.div>
            </div>

            {/* Market Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {marketData.map((market, index) => (
                <motion.div
                  key={market.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6 + index * 0.05 }}
                  whileHover={{ scale: 1.05 }}
                  className={`
                    p-3 rounded-lg border-2 transition-all duration-300 cursor-pointer
                    ${
                      market.percentChange > 0
                        ? "bg-green-500/10 border-green-400/30 hover:bg-green-500/20"
                        : market.percentChange < 0
                          ? "bg-red-500/10 border-red-400/30 hover:bg-red-500/20"
                          : "bg-blue-500/10 border-blue-400/30 hover:bg-blue-500/20"
                    }
                  `}
                >
                  {/* Market Name */}
                  <div className="text-center mb-2">
                    <h3 className="text-white font-bold text-xs md:text-sm truncate">{market.name}</h3>
                    <div className="text-xs text-gray-400">{formatCurrency(market.price)}</div>
                  </div>

                  {/* 3-Day Candlestick Chart */}
                  <div className="h-20 mb-2">
                    <MarketCandlestick market={market} showPercentage={false} showDates={false} />
                  </div>

                  {/* Today's Percentage */}
                  <div className="text-center mb-2">
                    <div
                      className={`flex items-center justify-center text-xs font-bold ${
                        market.percentChange > 0
                          ? "text-green-400"
                          : market.percentChange < 0
                            ? "text-red-400"
                            : "text-blue-400"
                      }`}
                    >
                      {market.percentChange > 0 ? (
                        <TrendingUp className="w-3 h-3 mr-1" />
                      ) : market.percentChange < 0 ? (
                        <TrendingDown className="w-3 h-3 mr-1" />
                      ) : null}
                      {market.percentChange > 0 ? "+" : ""}
                      {market.percentChange}%
                    </div>
                    <div className="text-xs text-gray-500">Today</div>
                  </div>

                  {/* Historical Performance Summary */}
                  <div className="text-center mb-2">
                    <div className="text-xs text-gray-400">3-Day Trend:</div>
                    <div className="flex justify-center space-x-1">
                      {market.historicalData?.map((data, idx) => (
                        <div
                          key={idx}
                          className={`w-2 h-2 rounded-full ${
                            data.percentChange > 0
                              ? "bg-green-400"
                              : data.percentChange < 0
                                ? "bg-red-400"
                                : "bg-gray-400"
                          }`}
                          title={`${data.date}: ${data.percentChange > 0 ? "+" : ""}${data.percentChange}%`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs h-6 border-blue-400/50 text-blue-300 hover:bg-blue-400 hover:text-white"
                      onClick={() => handleViewChart(market)}
                    >
                      <BarChart3 className="w-3 h-3 mr-1" />
                      View Chart
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Top Performers */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Top Gainers */}
              <div className="bg-green-500/10 border border-green-400/30 rounded-lg p-4">
                <h4 className="text-green-400 font-bold mb-2 flex items-center">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  Today's Top Gainers
                </h4>
                <div className="space-y-1">
                  {positiveMarkets
                    .sort((a, b) => b.percentChange - a.percentChange)
                    .slice(0, 3)
                    .map((market) => (
                      <div key={market.name} className="flex justify-between text-xs">
                        <span className="text-white">{market.name}</span>
                        <span className="text-green-400 font-bold">+{market.percentChange}%</span>
                      </div>
                    ))}
                </div>
              </div>

              {/* Top Losers */}
              <div className="bg-red-500/10 border border-red-400/30 rounded-lg p-4">
                <h4 className="text-red-400 font-bold mb-2 flex items-center">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  Today's Top Losers
                </h4>
                <div className="space-y-1">
                  {negativeMarkets
                    .sort((a, b) => a.percentChange - b.percentChange)
                    .slice(0, 3)
                    .map((market) => (
                      <div key={market.name} className="flex justify-between text-xs">
                        <span className="text-white">{market.name}</span>
                        <span className="text-red-400 font-bold">{market.percentChange}%</span>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Historical Summary */}
            <div className="mt-6 bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
              <h4 className="text-blue-400 font-bold mb-2 flex items-center">
                <Timeline className="w-4 h-4 mr-1" />
                3-Day Market Summary
              </h4>
              <div className="grid grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-white font-bold">23/01/2024</div>
                  <div className="text-xs text-gray-400">Day 1</div>
                </div>
                <div>
                  <div className="text-white font-bold">24/01/2024</div>
                  <div className="text-xs text-gray-400">Day 2</div>
                </div>
                <div>
                  <div className="text-white font-bold">25/01/2024</div>
                  <div className="text-xs text-gray-400">Day 3</div>
                </div>
                <div>
                  <div className="text-blue-400 font-bold">26/01/2024</div>
                  <div className="text-xs text-blue-300">Today</div>
                </div>
              </div>
              <div className="mt-2 text-center text-xs text-gray-400">
                📈 Complete historical data available • New candlesticks added daily
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Market Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMarket && (
          <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1">{selectedMarket.name} - 4-Day Market Analysis</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)} className="md:hidden p-2">
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <Tabs defaultValue="chart">
              <TabsList>
                <TabsTrigger value="chart">3-Day Chart</TabsTrigger>
                <TabsTrigger value="details">Today's Details</TabsTrigger>
                <TabsTrigger value="history">Historical Data</TabsTrigger>
                <TabsTrigger value="future">Future Analysis</TabsTrigger>
              </TabsList>
              <TabsContent value="chart">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="text-lg font-bold mb-2">3-Day Candlestick Chart</h3>
                    <p className="text-sm text-muted-foreground">Complete historical view from 23/01 to 26/01/2024</p>
                  </div>
                  <div className="h-96 w-full border rounded-lg">
                    <MarketCandlestick market={selectedMarket} showPercentage={true} showDates={true} />
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center text-sm">
                    {selectedMarket.historicalData?.map((data, index) => (
                      <div key={index} className="bg-gray-100 dark:bg-gray-800 p-2 rounded">
                        <div className="font-bold">{data.date}</div>
                        <div className={`${data.percentChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {data.percentChange >= 0 ? "+" : ""}
                          {data.percentChange}%
                        </div>
                        <div className="text-xs text-muted-foreground">${data.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="details">
                <MarketDetailView market={selectedMarket} />
              </TabsContent>
              <TabsContent value="history">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold">Historical Performance</h3>
                  <div className="space-y-2">
                    {selectedMarket.historicalData?.map((data, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-800 rounded"
                      >
                        <div>
                          <div className="font-bold">{data.date}</div>
                          <div className="text-sm text-muted-foreground">
                            Open: ${data.open} | High: ${data.high} | Low: ${data.low} | Close: ${data.close}
                          </div>
                        </div>
                        <div className={`font-bold ${data.percentChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {data.percentChange >= 0 ? "+" : ""}
                          {data.percentChange}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="future">
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold mb-4">Future Market Projections</h3>
                  <p className="text-muted-foreground mb-4">
                    Advanced AI analysis based on 3-day historical performance data.
                  </p>
                  <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                    <div className="text-blue-400 font-bold mb-2">AI Insights Available:</div>
                    <ul className="text-sm text-blue-300 space-y-1">
                      <li>• 3-day trend analysis complete</li>
                      <li>• Pattern recognition active</li>
                      <li>• Volatility assessment ready</li>
                      <li>• Next-day prediction models</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>
    </motion.section>
  )
}
