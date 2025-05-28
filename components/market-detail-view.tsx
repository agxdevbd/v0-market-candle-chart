"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { formatCurrency } from "@/lib/utils"
import type { Market } from "@/lib/types"
import { marketDescriptions } from "@/lib/market-descriptions"

interface MarketDetailViewProps {
  market: Market
}

export function MarketDetailView({ market }: MarketDetailViewProps) {
  const isPositive = market.percentChange >= 0
  const isPositiveYTD = market.ytdChange >= 0

  // Get the Bengali description for this market
  const description = marketDescriptions[market.name] || "এই কোম্পানি সম্পর্কে বিস্তারিত তথ্য এখনও উপলব্ধ নেই।"

  // Calculate 7-day performance if historical data is available
  let sevenDayPerformance = 0
  if (market.historicalData && market.historicalData.length > 0) {
    const oldestData = market.historicalData[0]
    const latestData = market.historicalData[market.historicalData.length - 1]
    sevenDayPerformance = ((latestData.price - oldestData.price) / oldestData.price) * 100
  }

  const isPositiveSevenDay = sevenDayPerformance >= 0

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">মূল্য তথ্য</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">বর্তমান মূল্য:</span>
              <span className="font-medium text-white">{formatCurrency(market.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">২৪ঘ পরিবর্তন:</span>
              <span className={`flex items-center font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(market.percentChange).toFixed(2)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">৭ দিনের পরিবর্তন:</span>
              <span
                className={`flex items-center font-medium ${isPositiveSevenDay ? "text-green-500" : "text-red-500"}`}
              >
                {isPositiveSevenDay ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(sevenDayPerformance).toFixed(2)}%
              </span>
            </div>
            {market.ytdChange !== 0 && (
              <div className="flex justify-between">
                <span className="text-gray-400">বছরের শুরু থেকে পরিবর্তন:</span>
                <span className={`flex items-center font-medium ${isPositiveYTD ? "text-green-500" : "text-red-500"}`}>
                  {isPositiveYTD ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                  {Math.abs(market.ytdChange).toFixed(2)}%
                </span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">বিনিয়োগ বিবরণ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-400">মোট বিনিয়োগ:</span>
              <span className="font-medium text-white">{formatCurrency(market.investment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">দৈনিক লাভ/ক্ষতি:</span>
              <span className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {formatCurrency((market.percentChange / 100) * market.investment)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">৭ দিনের লাভ/ক্ষতি:</span>
              <span className={`font-medium ${isPositiveSevenDay ? "text-green-500" : "text-red-500"}`}>
                {formatCurrency((sevenDayPerformance / 100) * market.investment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">কোম্পানি সম্পর্কে</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-300 leading-relaxed">{description}</p>
        </CardContent>
      </Card>

      {market.historicalData && market.historicalData.length > 0 && (
        <Card className="md:col-span-2 bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg text-white">৭ দিনের ডেটা</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-300">
                <thead className="text-xs uppercase bg-gray-700">
                  <tr>
                    <th className="px-4 py-2">তারিখ</th>
                    <th className="px-4 py-2">খোলা</th>
                    <th className="px-4 py-2">সর্বোচ্চ</th>
                    <th className="px-4 py-2">সর্বনিম্ন</th>
                    <th className="px-4 py-2">বন্ধ</th>
                    <th className="px-4 py-2">পরিবর্তন %</th>
                  </tr>
                </thead>
                <tbody>
                  {market.historicalData.map((data, index) => (
                    <tr key={index} className="border-b border-gray-700">
                      <td className="px-4 py-2">{data.date}</td>
                      <td className="px-4 py-2">${data.open.toFixed(2)}</td>
                      <td className="px-4 py-2">${data.high.toFixed(2)}</td>
                      <td className="px-4 py-2">${data.low.toFixed(2)}</td>
                      <td className="px-4 py-2">${data.close.toFixed(2)}</td>
                      <td className={`px-4 py-2 ${data.percentChange >= 0 ? "text-green-500" : "text-red-500"}`}>
                        {data.percentChange >= 0 ? "+" : ""}
                        {data.percentChange.toFixed(2)}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
