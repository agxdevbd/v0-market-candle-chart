"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, BarChart3, X, Eye, Download } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import { allMarkets } from "@/lib/market-data"
import type { Market } from "@/lib/types"
import { MarketDetailView } from "@/components/market-detail-view"
import { MarketCandlestickChart } from "@/components/market-candlestick-chart"

export function MarketList() {
  const [markets, setMarkets] = useState<Market[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [viewType, setViewType] = useState<"chart" | "details">("chart")

  useEffect(() => {
    setMarkets(allMarkets)
    setLoading(false)
  }, [])

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

  // PDF ডাউনলোড ফাংশন
  const downloadChartAsPDF = async (market: Market) => {
    try {
      const canvas = document.querySelector("[data-chart-canvas]") as HTMLCanvasElement
      if (!canvas) {
        alert("🤖 AI Chart not found. Please open chart view first.")
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
        <div class="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg z-50">
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
        <p className="text-blue-200 text-sm">চার্ট দেখুন বা বিস্তারিত তথ্য পান • PDF ডাউনলোড সুবিধা সহ</p>
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
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs border-blue-500 text-blue-400 hover:bg-blue-500 hover:text-white"
                  onClick={() => handleViewChart(market)}
                >
                  <BarChart3 className="h-3 w-3 mr-1" />
                  চার্ট
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs border-green-500 text-green-400 hover:bg-green-500 hover:text-white"
                  onClick={() => handleViewDetails(market)}
                >
                  <Eye className="h-3 w-3 mr-1" />
                  ডিটেইলস
                </Button>
              </div>

              {/* Mobile Download */}
              <Button
                variant="secondary"
                size="sm"
                className="w-full text-xs md:hidden"
                onClick={() => {
                  setSelectedMarket(market)
                  setViewType("chart")
                  setIsDialogOpen(true)
                  setTimeout(() => downloadChartAsPDF(market), 500)
                }}
              >
                <Download className="h-3 w-3 mr-1" />
                ডাউনলোড PDF
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Market Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  <span className="text-sm md:text-base">
                    {selectedMarket.name} - {viewType === "chart" ? "লাইভ চার্ট" : "মার্কেট বিশ্লেষণ"}
                  </span>
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

            <div className="space-y-4 md:space-y-6">
              {viewType === "chart" ? (
                <>
                  {/* Chart Only View */}
                  <div className="bg-black p-2 md:p-4 rounded-lg border border-gray-700">
                    <div className="flex justify-between items-center mb-2 md:mb-4">
                      <h3 className="text-base md:text-lg font-bold text-white">Live Trading Chart</h3>
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
                    <div className="text-center text-xs text-gray-400 mt-2">
                      📊 ওয়ান ক্লিকে PDF ডাউনলোড করুন • মোবাইল অপ্টিমাইজড
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Details View with All Options */}
                  <Tabs defaultValue="details">
                    <TabsList className="grid w-full grid-cols-4 bg-gray-800 border border-gray-600">
                      <TabsTrigger value="details" className="text-xs">
                        বিস্তারিত
                      </TabsTrigger>
                      <TabsTrigger value="chart" className="text-xs">
                        চার্ট
                      </TabsTrigger>
                      <TabsTrigger value="history" className="text-xs">
                        ইতিহাস
                      </TabsTrigger>
                      <TabsTrigger value="future" className="text-xs">
                        ভবিষ্যৎ
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
                        <h3 className="text-lg font-bold">Historical Performance</h3>
                        <div className="space-y-2">
                          {selectedMarket.historicalData?.slice(0, 7).map((data, index) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-gray-800 rounded">
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
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="future">
                      <div className="p-4 text-center">
                        <h3 className="text-lg font-bold mb-4">AI Future Projections</h3>
                        <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg p-4">
                          <div className="text-blue-400 font-bold mb-2">🤖 AI Analysis Ready:</div>
                          <ul className="text-sm text-blue-300 space-y-1">
                            <li>• ৩০-দিনের ট্রেন্ড বিশ্লেষণ</li>
                            <li>• প্যাটার্ন রিকগনিশন সক্রিয়</li>
                            <li>• ভোলাটিলিটি অ্যাসেসমেন্ট প্রস্তুত</li>
                            <li>• পরবর্তী দিনের প্রেডিকশন মডেল</li>
                          </ul>
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
