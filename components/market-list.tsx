"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { TrendingUp, TrendingDown, BarChart3, X, Eye, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { allMarkets } from "@/lib/market-data"
import type { Market } from "@/lib/types"
import { MarketDetailView } from "@/components/market-detail-view"
import { MarketCandlestickChart } from "@/components/market-candlestick-chart"
import { downloadChartAsPDF } from "@/lib/chart-download"

export function MarketList() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [isChartDialogOpen, setIsChartDialogOpen] = useState(false)
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  useEffect(() => {
    // সব মার্কেট লোড করি
    setMarkets(allMarkets)
    setLoading(false)
  }, [])

  // শুধু চার্ট দেখানোর জন্য
  const handleViewChart = (market: Market) => {
    setSelectedMarket(market)
    setIsChartDialogOpen(true)
  }

  // সব ডিটেইলস দেখানোর জন্য
  const handleViewDetails = (market: Market) => {
    setSelectedMarket(market)
    setIsDetailsDialogOpen(true)
  }

  // চার্ট ডাউনলোড করার জন্য
  const handleDownloadChart = async (market: Market) => {
    setIsDownloading(true)
    try {
      await downloadChartAsPDF(market)
    } catch (error) {
      console.error("Download failed:", error)
    } finally {
      setIsDownloading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>মার্কেট ডেটা লোড হচ্ছে...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">আজকের মার্কেট</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {markets.map((market) => (
          <Card
            key={market.id}
            className="overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300"
          >
            <CardHeader className="pb-2 px-3 pt-3">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center space-x-2 mb-2">
                  {market.logo && (
                    <div className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center">
                      <img
                        src={market.logo || "/placeholder.svg"}
                        alt={`${market.name} logo`}
                        className="w-4 h-4 object-contain"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=16&width=16"
                        }}
                      />
                    </div>
                  )}
                  <CardTitle className="text-sm text-white truncate">{market.name}</CardTitle>
                </div>
                <div className="text-gray-400 text-xs mb-1">{formatCurrency(market.price)}</div>
                <div
                  className={`flex items-center text-xs ${market.percentChange >= 0 ? "text-green-500" : "text-red-500"}`}
                >
                  {market.percentChange >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  <span className="font-medium">
                    {market.percentChange >= 0 ? "+" : ""}
                    {market.percentChange.toFixed(2)}%
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 px-3 pb-3 space-y-2">
              {/* View Chart Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                onClick={() => handleViewChart(market)}
              >
                <BarChart3 className="h-3 w-3 mr-1" />
                View Chart
              </Button>

              {/* Details Button */}
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                onClick={() => handleViewDetails(market)}
              >
                <Eye className="h-3 w-3 mr-1" />
                Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart Only Dialog */}
      <Dialog open={isChartDialogOpen} onOpenChange={setIsChartDialogOpen}>
        {selectedMarket && (
          <DialogContent className="max-w-[95vw] md:max-w-4xl max-h-[90vh] overflow-y-auto bg-black text-white border-gray-700">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1 text-white">
                <div className="flex items-center space-x-2">
                  {selectedMarket.logo && (
                    <img
                      src={selectedMarket.logo || "/placeholder.svg"}
                      alt={`${selectedMarket.name} logo`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                      }}
                    />
                  )}
                  <span className="text-sm md:text-base">{selectedMarket.name} - Live Chart</span>
                </div>
              </DialogTitle>
              <div className="flex items-center space-x-2">
                {/* Download Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadChart(selectedMarket)}
                  disabled={isDownloading}
                  className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  {isDownloading ? "Downloading..." : "PDF"}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsChartDialogOpen(false)} className="text-gray-400">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4">
              {/* Pure Chart View */}
              <div className="bg-black p-2 md:p-4 rounded-lg border border-gray-700">
                <div className="h-64 md:h-96 w-full" id={`chart-${selectedMarket.id}`}>
                  <MarketCandlestickChart market={selectedMarket} />
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white font-bold">{formatCurrency(selectedMarket.price)}</div>
                  <div className="text-gray-400 text-xs">Current Price</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className={`font-bold ${selectedMarket.percentChange >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {selectedMarket.percentChange >= 0 ? "+" : ""}
                    {selectedMarket.percentChange.toFixed(2)}%
                  </div>
                  <div className="text-gray-400 text-xs">24h Change</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-white font-bold">{formatCurrency(selectedMarket.investment)}</div>
                  <div className="text-gray-400 text-xs">Investment</div>
                </div>
                <div className="bg-gray-800 p-3 rounded-lg">
                  <div className="text-blue-400 font-bold">Live</div>
                  <div className="text-gray-400 text-xs">Status</div>
                </div>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>

      {/* Full Details Dialog */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        {selectedMarket && (
          <DialogContent className="max-w-[95vw] md:max-w-5xl max-h-[90vh] overflow-y-auto bg-gray-900 text-white border-gray-700">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1 text-white">
                <div className="flex items-center space-x-2">
                  {selectedMarket.logo && (
                    <img
                      src={selectedMarket.logo || "/placeholder.svg"}
                      alt={`${selectedMarket.name} logo`}
                      className="w-6 h-6 object-contain"
                      onError={(e) => {
                        ;(e.target as HTMLImageElement).src = "/placeholder.svg?height=24&width=24"
                      }}
                    />
                  )}
                  <span className="text-sm md:text-base">{selectedMarket.name} - Complete Analysis</span>
                </div>
              </DialogTitle>
              <div className="flex items-center space-x-2">
                {/* Download Button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleDownloadChart(selectedMarket)}
                  disabled={isDownloading}
                  className="border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                >
                  <Download className="h-4 w-4 mr-1" />
                  {isDownloading ? "Downloading..." : "PDF"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsDetailsDialogOpen(false)}
                  className="text-gray-400"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-4 md:space-y-6">
              {/* Candlestick Chart */}
              <div className="bg-black p-2 md:p-4 rounded-lg border border-gray-700">
                <h3 className="text-base md:text-lg font-bold mb-2 md:mb-4 text-white text-center">
                  Live Trading Chart
                </h3>
                <div className="h-64 md:h-96 w-full" id={`detailed-chart-${selectedMarket.id}`}>
                  <MarketCandlestickChart market={selectedMarket} />
                </div>
              </div>

              {/* Complete Market Details */}
              <MarketDetailView market={selectedMarket} />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
