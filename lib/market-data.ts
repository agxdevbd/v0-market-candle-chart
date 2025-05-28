import type { Market } from "./types"
import { marketAPI } from "./api-service"

// Fallback market data for when API fails
export const marketData: Market[] = [
  {
    id: "bitcoin",
    name: "Bitcoin",
    logo: "/logos/bitcoin.png",
    price: 43250.75,
    percentChange: 2.45,
    ytdChange: 15.8,
    investment: 85000,
    marketCap: 850000000,
    volume24h: 25000000,
    historicalData: generateHistoricalData(43250.75, 2.45),
  },
  {
    id: "ethereum",
    name: "Ethereum",
    logo: "/logos/ethereum.png",
    price: 2580.32,
    percentChange: -1.23,
    ytdChange: 8.5,
    investment: 45000,
    marketCap: 310000000,
    volume24h: 15000000,
    historicalData: generateHistoricalData(2580.32, -1.23),
  },
  {
    id: "cardano",
    name: "Cardano",
    logo: "/logos/cardano.png",
    price: 0.485,
    percentChange: 3.67,
    ytdChange: -5.2,
    investment: 12000,
    marketCap: 17000000,
    volume24h: 800000,
    historicalData: generateHistoricalData(0.485, 3.67),
  },
  {
    id: "polkadot",
    name: "Polkadot",
    logo: "/logos/polkadot.png",
    price: 7.23,
    percentChange: 1.89,
    ytdChange: 12.3,
    investment: 18000,
    marketCap: 9500000,
    volume24h: 450000,
    historicalData: generateHistoricalData(7.23, 1.89),
  },
  {
    id: "chainlink",
    name: "Chainlink",
    logo: "/logos/chainlink.png",
    price: 14.67,
    percentChange: -0.95,
    ytdChange: 22.1,
    investment: 25000,
    marketCap: 8200000,
    volume24h: 380000,
    historicalData: generateHistoricalData(14.67, -0.95),
  },
]

// This will be populated by real API data
export let allMarkets: Market[] = [...marketData]

// Generate historical data helper function
function generateHistoricalData(currentPrice: number, currentChange: number) {
  const data = []
  let price = currentPrice

  for (let i = 29; i >= 0; i--) {
    const date = new Date()
    date.setDate(date.getDate() - i)

    const percentChange = i === 0 ? currentChange : (Math.random() - 0.5) * 15
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

  return data
}

// Initialize markets with live data
export async function initializeMarkets(): Promise<Market[]> {
  try {
    console.log("🚀 Initializing markets with live data from ai.cxt.com...")
    const liveMarkets = await marketAPI.fetchLiveMarketData()
    allMarkets = liveMarkets.length > 0 ? liveMarkets : marketData
    return allMarkets
  } catch (error) {
    console.error("Failed to initialize markets:", error)
    // Fallback to static data
    allMarkets = marketData
    return allMarkets
  }
}

// Update markets data (called by API service)
export function updateMarkets(newMarkets: Market[]): void {
  allMarkets = newMarkets.length > 0 ? newMarkets : marketData
  console.log(`📊 Markets updated: ${allMarkets.length} markets loaded`)
}

// Get current markets
export function getCurrentMarkets(): Market[] {
  return allMarkets.length > 0 ? allMarkets : marketData
}

// Get market by ID
export function getMarketById(id: string): Market | undefined {
  const markets = getCurrentMarkets()
  return markets.find((market) => market.id === id)
}

// Get top gainers
export function getTopGainers(limit = 5): Market[] {
  const markets = getCurrentMarkets()
  return markets
    .filter((market) => market.percentChange > 0)
    .sort((a, b) => b.percentChange - a.percentChange)
    .slice(0, limit)
}

// Get top losers
export function getTopLosers(limit = 5): Market[] {
  const markets = getCurrentMarkets()
  return markets
    .filter((market) => market.percentChange < 0)
    .sort((a, b) => a.percentChange - b.percentChange)
    .slice(0, limit)
}

// Get markets by market cap
export function getMarketsByMarketCap(limit = 10): Market[] {
  const markets = getCurrentMarkets()
  return markets
    .filter((market) => market.marketCap && market.marketCap > 0)
    .sort((a, b) => (b.marketCap || 0) - (a.marketCap || 0))
    .slice(0, limit)
}

// Search markets
export function searchMarkets(query: string): Market[] {
  const markets = getCurrentMarkets()
  const lowercaseQuery = query.toLowerCase()
  return markets.filter(
    (market) => market.name.toLowerCase().includes(lowercaseQuery) || market.id.toLowerCase().includes(lowercaseQuery),
  )
}

// Initialize on module load (only in browser)
if (typeof window !== "undefined") {
  initializeMarkets()
}

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
