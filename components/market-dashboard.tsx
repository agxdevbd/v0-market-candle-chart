"use client"

import { useState } from "react"
import { ArrowDown, ArrowUp, Eye, TrendingUp, X } from "lucide-react"
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

  const handleViewDetails = (market: Market) => {
    setSelectedMarket(market)
    setIsDialogOpen(true)
  }

  const handleViewChart = (market: Market) => {
    setSelectedChartMarket(market)
    setIsChartDialogOpen(true)
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
          <CardFooter className="flex justify-between pt-2">
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
          </CardFooter>
        </Card>
      ))}

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
                <TabsTrigger value="future">Future</TabsTrigger>
              </TabsList>
              <TabsContent value="details">
                <MarketDetailView market={selectedMarket} />
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

      <Dialog open={isChartDialogOpen} onOpenChange={setIsChartDialogOpen}>
        {selectedChartMarket && (
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader className="flex flex-row items-center justify-between">
              <DialogTitle className="flex-1">{selectedChartMarket.name} - Candlestick Chart</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setIsChartDialogOpen(false)} className="md:hidden p-2">
                <X className="h-4 w-4" />
              </Button>
            </DialogHeader>
            <div className="h-96 w-full">
              <MarketCandlestick market={selectedChartMarket} showPercentage={true} />
            </div>
          </DialogContent>
        )}
      </Dialog>
    </div>
  )
}
