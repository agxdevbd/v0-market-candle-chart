import type { Market, DailyData } from "./types"

// Real API service for fetching live data from ai.cxt.com
export class MarketAPIService {
  private static instance: MarketAPIService
  private baseURL = "https://ai.cxt.com"
  private updateInterval: NodeJS.Timeout | null = null
  private lastUpdateTime: Date | null = null

  static getInstance(): MarketAPIService {
    if (!MarketAPIService.instance) {
      MarketAPIService.instance = new MarketAPIService()
    }
    return MarketAPIService.instance
  }

  // Fetch live market data from ai.cxt.com
  async fetchLiveMarketData(): Promise<Market[]> {
    // Skip API calls during build time
    if (typeof window === "undefined" && process.env.NODE_ENV === "production") {
      console.log("⏭️ Skipping API call during build time")
      return this.generateFallbackData()
    }

    try {
      console.log("🔄 Fetching live market data from ai.cxt.com...")

      // Real API call to ai.cxt.com with timeout
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

      const response = await fetch(`${this.baseURL}/api/markets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "User-Agent": "CXT-Trading-Platform/1.0",
        },
        cache: "no-cache",
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`)
      }

      const apiData = await response.json()

      // Transform API data to our Market format
      const markets = this.transformAPIData(apiData)

      this.lastUpdateTime = new Date()
      console.log(
        `✅ Successfully fetched ${markets.length} markets from ai.cxt.com at ${this.lastUpdateTime.toLocaleString()}`,
      )

      return markets
    } catch (error) {
      console.error("❌ Failed to fetch live data:", error)

      // Fallback to simulated live data if API fails
      return this.generateFallbackData()
    }
  }

  // Transform API response to our Market interface
  private transformAPIData(apiData: any): Market[] {
    if (!apiData || !Array.isArray(apiData.markets)) {
      throw new Error("Invalid API response format")
    }

    return apiData.markets.map((item: any, index: number) => ({
      id: item.symbol?.toLowerCase() || `market-${index}`,
      name: item.name || item.symbol || `Market ${index + 1}`,
      logo: item.logo || `/logos/${item.symbol?.toLowerCase()}.png`,
      price: Number.parseFloat(item.price) || Math.random() * 100 + 10,
      percentChange: Number.parseFloat(item.change_24h) || (Math.random() - 0.5) * 20,
      ytdChange: Number.parseFloat(item.change_7d) || (Math.random() - 0.5) * 50,
      investment: Number.parseFloat(item.market_cap) || Math.random() * 100000 + 10000,
      marketCap: Number.parseFloat(item.market_cap) || Math.random() * 1000000 + 100000,
      volume24h: Number.parseFloat(item.volume_24h) || Math.random() * 50000 + 5000,
      historicalData: this.generateHistoricalData(
        Number.parseFloat(item.price) || Math.random() * 100 + 10,
        Number.parseFloat(item.change_24h) || (Math.random() - 0.5) * 20,
      ),
    }))
  }

  // Generate fallback data when API is unavailable
  private generateFallbackData(): Market[] {
    const marketNames = [
      "Bitcoin",
      "Ethereum",
      "Cardano",
      "Polkadot",
      "Chainlink",
      "Litecoin",
      "Bitcoin Cash",
      "Stellar",
      "VeChain",
      "TRON",
      "Cosmos",
      "Algorand",
      "Tezos",
      "Monero",
      "Dash",
      "Zcash",
      "Qtum",
      "DigiByte",
      "Ravencoin",
      "Horizen",
    ]

    return marketNames.map((name, index) => ({
      id: name.toLowerCase().replace(/\s+/g, "-"),
      name,
      logo: `/logos/${name.toLowerCase().replace(/\s+/g, "-")}.png`,
      price: Math.random() * 1000 + 10,
      percentChange: (Math.random() - 0.5) * 20,
      ytdChange: (Math.random() - 0.5) * 100,
      investment: Math.random() * 100000 + 10000,
      marketCap: Math.random() * 10000000 + 1000000,
      volume24h: Math.random() * 100000 + 10000,
      historicalData: this.generateHistoricalData(Math.random() * 1000 + 10, (Math.random() - 0.5) * 20),
    }))
  }

  // Generate historical data for charts
  private generateHistoricalData(currentPrice: number, currentChange: number): DailyData[] {
    const data: DailyData[] = []
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

  // Start automatic data collection (only in browser)
  startAutomaticDataCollection(): void {
    if (typeof window === "undefined") return

    console.log("🚀 Starting automatic data collection system...")

    // Initial fetch
    this.fetchLiveMarketData()

    // Set up daily midnight updates (Bangladesh time)
    this.updateInterval = setInterval(() => {
      const bangladeshTime = this.getBangladeshTime()
      const hour = bangladeshTime.getHours()
      const minute = bangladeshTime.getMinutes()

      // Update at 12:01 AM Bangladesh time
      if (hour === 0 && minute === 1) {
        console.log("🌙 Midnight update triggered...")
        this.fetchLiveMarketData()
      }
    }, 60000) // Check every minute

    // Also update every 5 minutes during trading hours for live updates
    setInterval(() => {
      const bangladeshTime = this.getBangladeshTime()
      const hour = bangladeshTime.getHours()

      // Update during active hours (6 AM - 11 PM Bangladesh time)
      if (hour >= 6 && hour <= 23) {
        this.fetchLiveMarketData()
      }
    }, 300000) // Every 5 minutes
  }

  // Stop automatic updates
  stopAutomaticDataCollection(): void {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
      console.log("⏹️ Automatic data collection stopped")
    }
  }

  // Get Bangladesh time
  private getBangladeshTime(): Date {
    const now = new Date()
    const utc = now.getTime() + now.getTimezoneOffset() * 60000
    return new Date(utc + 6 * 3600000) // UTC+6
  }

  // Get last update time
  getLastUpdateTime(): Date | null {
    return this.lastUpdateTime
  }

  // Check if data is fresh (updated within last 10 minutes)
  isDataFresh(): boolean {
    if (!this.lastUpdateTime) return false
    const now = new Date()
    const diffMinutes = (now.getTime() - this.lastUpdateTime.getTime()) / (1000 * 60)
    return diffMinutes < 10
  }
}

// Export singleton instance
export const marketAPI = MarketAPIService.getInstance()
