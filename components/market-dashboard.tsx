"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Eye, TrendingUp, X, Download } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MarketCandlestick } from "@/components/market-candlestick"
import { MarketDetailView } from "@/components/market-detail-view"
import { formatCurrency } from "@/lib/utils"
import type { Market } from "@/lib/types"

interface MarketDashboardProps {
  markets: Market[]
}

export function MarketDashboard({ markets }: MarketDashboardProps) {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [selectedChartMarket, setSelectedChartMarket] = useState<Market | null>(null)
  const [isChartDialogOpen, setIsChartDialogOpen] = useState(false)
  const [viewType, setViewType] = useState<"chart" | "details">("chart")

  const handleViewDetails = (market: Market) => {
    setSelectedMarket(market)
    setViewType("details")
    setIsDialogOpen(true)
  }

  const handleViewChart = (market: Market) => {
    setSelectedChartMarket(market)
    setViewType("chart")
    setIsChartDialogOpen(true)
  }

  // PDF ডাউনলোড ফাংশন
  const downloadChartAsPDF = async (market: Market) => {
    try {
      // Canvas থেকে PDF তৈরি করার জন্য
      const canvas = document.querySelector("[data-chart-canvas]") as HTMLCanvasElement
      if (!canvas) return

      // jsPDF এর মতো লাইব্রেরি ব্যবহার করতে হবে, এখানে সিমুলেট করছি
      const dataURL = canvas.toDataURL("image/png")

      // Temporary solution - create a download link
      const link = document.createElement("a")
      link.download = `${market.name}-chart.png`
      link.href = dataURL
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      // Success message
      alert(`${market.name} chart downloaded successfully!`)
    } catch (error) {
      console.error("Download failed:", error)
      alert("Download failed. Please try again.")
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {markets.map((market) => (
        <Card key={market.name} className="overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">{market.name}</CardTitle>
              <div className={`flex items-center ${market.percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                {market.percentChange >= 0 ? (
                  <ArrowUp className="h-4 w-4 mr-1" />
                ) : (
                  <ArrowDown className="h-4 w-4 mr-1" />
                )}
                <span className="font-medium">{Math.abs(market.percentChange)}%</span>
              </div>
            </div>
            <CardDescription>{formatCurrency(market.price)}</CardDescription>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-sm text-muted-foreground">Investment: {formatCurrency(market.investment)}</div>
          </CardContent>
          <CardFooter className="flex justify-between pt-2 flex-col gap-2">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleViewChart(market)}
              >
                <TrendingUp className="h-4 w-4" />
                <span>View Chart</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1"
                onClick={() => handleViewDetails(market)}
              >
                <Eye className="h-4 w-4" />
                <span>Details</span>
              </Button>
            </div>
            {/* Mobile Download Button */}
            <Button
              variant="secondary"
              size="sm"
              className="w-full flex items-center gap-1 md:hidden"
              onClick={() => downloadChartAsPDF(market)}
            >
              <Download className="h-4 w-4" />
              <span>Download Chart</span>
            </Button>
          </CardFooter>
        </Card>
      ))}

      {/* Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        {selectedMarket && (
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1">{selectedMarket.name} - Market Details</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsDialogOpen(false)} className="md:hidden p-2">
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Today's Details</TabsTrigger>
                <TabsTrigger value="chart">Chart View</TabsTrigger>
                <TabsTrigger value="future">Future</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <MarketDetailView market={selectedMarket} />
              </TabsContent>
              <TabsContent value="chart">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Chart View</h3>
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
                  <div className="h-96 w-full" data-chart-canvas>
                    <MarketCandlestick market={selectedMarket} showPercentage={true} />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="future">
                <div className="p-4">
                  <p className="text-muted-foreground">
                    Future market projections will be available based on daily updates.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        )}
      </Dialog>

      {/* Chart Only Dialog */}
      <Dialog open={isChartDialogOpen} onOpenChange={setIsChartDialogOpen}>
        {selectedChartMarket && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1">{selectedChartMarket.name} - Chart View</DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                  onClick={() => downloadChartAsPDF(selectedChartMarket)}
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIsChartDialogOpen(false)} className="md:hidden p-2">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogHeader>
            <div className="h-96 w-full" data-chart-canvas>
              <MarketCandlestick market={selectedChartMarket} showPercentage={true} />
            </div>
            <div className="text-center text-sm text-muted-foreground mt-2">
              Click "Download PDF" to save this chart for offline viewing
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
