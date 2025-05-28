import type { Market } from "./types"
import { marketAPI } from "./api-service"

// This will be populated by real API data
export let allMarkets: Market[] = []

// Initialize markets with live data
export async function initializeMarkets(): Promise<Market[]> {
  try {
    console.log("🚀 Initializing markets with live data from ai.cxt.com...")
    allMarkets = await marketAPI.fetchLiveMarketData()
    return allMarkets
  } catch (error) {
    console.error("Failed to initialize markets:", error)
    // Fallback to empty array, will be populated by API service
    return []
  }
}

// Update markets data (called by API service)
export function updateMarkets(newMarkets: Market[]): void {
  allMarkets = newMarkets
  console.log(`📊 Markets updated: ${newMarkets.length} markets loaded`)
}

// Get current markets
export function getCurrentMarkets(): Market[] {
  return allMarkets
}

// Get market by ID
export function getMarketById(id: string): Market | undefined {
  return allMarkets.find((market) => market.id === id)
}

// Get top gainers
export function getTopGainers(limit = 5): Market[] {
  return allMarkets
    .filter((market) => market.percentChange > 0)
    .sort((a, b) => b.percentChange - a.percentChange)
    .slice(0, limit)
}

// Get top losers
export function getTopLosers(limit = 5): Market[] {
  return allMarkets
    .filter((market) => market.percentChange < 0)
    .sort((a, b) => a.percentChange - b.percentChange)
    .slice(0, limit)
}

// Get markets by market cap
export function getMarketsByMarketCap(limit = 10): Market[] {
  return allMarkets
    .filter((market) => market.marketCap && market.marketCap > 0)
    .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0))
    .slice(0, limit)
}

// Search markets
export function searchMarkets(query: string): Market[] {
  const lowercaseQuery = query.toLowerCase()
  return allMarkets.filter(
    (market) => market.name.toLowerCase().includes(lowercaseQuery) || market.id.toLowerCase().includes(lowercaseQuery),
  )
}

// Initialize on module load
initializeMarkets()

// আজীবন চলমান হিস্টোরিক্যাল ডেটা জেনারেট করার ফাংশন
function generateContinuousHistoricalData(currentPrice: number, currentPercentChange: number) {
  const data = []
  let price = currentPrice

  // ৩০ দিনের ডেটা জেনারেট (আজীবন চলমান সিস্টেম)
  for (let i = 0; i < 30; i++) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const percentChange = i === 0 ? currentPercentChange : (Math.random() - 0.5) * 20
    const prevPrice = price / (1 + percentChange / 100)

    if (i !== 0) {
      price = prevPrice
    }

    const variation = price * 0.05
    const open = price - variation / 2 + Math.random() * variation
    const high = Math.max(price, open) + (Math.random() * variation) / 2
    const low = Math.min(price, open) - (Math.random() * variation) / 2

    data.push({
      date: date.toISOString().split("T")[0],
      price: price,
      percentChange: percentChange,
      open: open,
      high: high,
      low: low,
      close: price,
    })
  }

  return data.reverse()
}
