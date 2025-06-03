import type { Market, DailyData } from "./types"

// আজকের তারিখ (২৭/০১/২০২৪) - দ্বিতীয় দিন
const TODAY = "2024-01-27"
const YESTERDAY = "2024-01-26"

// ai.cxt.com থেকে পাওয়া আপডেটেড সঠিক মার্কেট ডেটা (২৭/০১/২০২৪)
export const realMarketData: Market[] = [
  {
    id: "adsterra",
    name: "Adsterra",
    logo: "/logos/adsterra.png",
    price: 32.91,
    percentChange: 2.31,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 15000,
    historicalData: generateHistoricalData(32.91, 2.31, 33.91, -3.0),
  },
  {
    id: "alpha",
    name: "Alpha",
    logo: "/logos/alpha.png",
    price: 43.75,
    percentChange: 1.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 18000,
    historicalData: generateHistoricalData(43.75, 1.21, 42.75, 5.21),
  },
  {
    id: "arrowprime",
    name: "ArrowPrime",
    logo: "/logos/arrowprime.png",
    price: 42.65,
    percentChange: 2.76,
    ytdChange: 16.74,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 16500,
    historicalData: generateHistoricalData(42.65, 2.76, 40.65, -1.24),
  },
  {
    id: "cool-agency",
    name: "Cool Agency",
    logo: "/logos/cool-agency.png",
    price: 56.21,
    percentChange: 0.79,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 22000,
    historicalData: generateHistoricalData(56.21, 0.79, 57.0, -1.21),
  },
  {
    id: "cxt",
    name: "CXT",
    logo: "/logos/cxt.png",
    price: 31.31,
    percentChange: 1.31,
    ytdChange: 0.0,
    investment: 50000.0,
    marketCap: 50000.0,
    volume24h: 45000,
    historicalData: generateHistoricalData(31.31, 1.31, 31.31, 1.31),
  },
  {
    id: "flooido",
    name: "Flooido",
    logo: "/logos/flooido.png",
    price: 31.63,
    percentChange: 1.53,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 12000,
    historicalData: generateHistoricalData(31.63, 1.53, 28.0, 7.0),
  },
  {
    id: "found-stock",
    name: "Found Stock",
    logo: "/logos/found-stock.png",
    price: 58.98,
    percentChange: 1.79,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 25000,
    historicalData: generateHistoricalData(58.98, 1.79, 59.98, 3.79),
  },
  {
    id: "grow-co",
    name: "Grow Co",
    logo: "/logos/grow-co.png",
    price: 30.38,
    percentChange: 2.64,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 18500,
    historicalData: generateHistoricalData(30.38, 2.64, 28.0, 14.64),
  },
  {
    id: "kt",
    name: "KT",
    logo: "/logos/kt.png",
    price: 54.21,
    percentChange: -2.24,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 28000,
    historicalData: generateHistoricalData(54.21, -2.24, 60.0, 12.76),
  },
  {
    id: "making-m",
    name: "Making m",
    logo: "/logos/making-m.png",
    price: 43.21,
    percentChange: 2.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 32000,
    historicalData: generateHistoricalData(43.21, 2.21, 40.0, 18.21),
  },
  {
    id: "monetag",
    name: "Monetag",
    logo: "/logos/monetag.png",
    price: 50.76,
    percentChange: 8.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 19000,
    historicalData: generateHistoricalData(50.76, 8.21, 45.76, -1.79),
  },
  {
    id: "nexus-digital",
    name: "Nexus Digital",
    logo: "/logos/nexus-digital.png",
    price: 24.64,
    percentChange: 6.53,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 8500,
    historicalData: generateHistoricalData(24.64, 6.53, 18.0, -10.0),
  },
  {
    id: "nx",
    name: "NX",
    logo: "/logos/nx.png",
    price: 40.76,
    percentChange: 1.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 16000,
    historicalData: generateHistoricalData(40.76, 1.21, 40.76, -0.79),
  },
  {
    id: "oxw",
    name: "O X W",
    logo: "/logos/oxw.png",
    price: 47.06,
    percentChange: 2.88,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 21000,
    historicalData: generateHistoricalData(47.06, 2.88, 47.06, 4.88),
  },
  {
    id: "onclicka",
    name: "Onclicka",
    logo: "/logos/onclicka.png",
    price: 42.69,
    percentChange: 0.79,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 14500,
    historicalData: generateHistoricalData(42.69, 0.79, 39.0, -3.21),
  },
  {
    id: "pikota",
    name: "Pikota",
    logo: "/logos/pikota.png",
    price: 13.9,
    percentChange: 1.34,
    ytdChange: 0.0,
    investment: 8000000.0,
    marketCap: 8000000.0,
    volume24h: 95000,
    historicalData: generateHistoricalData(13.9, 1.34, 13.9, 7.34),
  },
  {
    id: "pinterest",
    name: "Pinterest",
    logo: "/logos/pinterest.png",
    price: 45.78,
    percentChange: 1.22,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 17500,
    historicalData: generateHistoricalData(45.78, 1.22, 42.0, -2.0),
  },
  {
    id: "practiq",
    name: "Practiq",
    logo: "/logos/practiq.png",
    price: 31.45,
    percentChange: 2.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 13000,
    historicalData: generateHistoricalData(31.45, 2.21, 29.45, 3.21),
  },
  {
    id: "redfin",
    name: "Redfin",
    logo: "/logos/redfin.png",
    price: 43.28,
    percentChange: 3.2,
    ytdChange: 0.0,
    investment: 50000.0,
    marketCap: 50000.0,
    volume24h: 24000,
    historicalData: generateHistoricalData(43.28, 3.2, 40.0, 1.2),
  },
  {
    id: "renerald",
    name: "Renerald",
    logo: "/logos/renerald.png",
    price: 37.0,
    percentChange: 2.0,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 15500,
    historicalData: generateHistoricalData(37.0, 2.0, 36.0, 1.0),
  },
]

// ২ দিনের হিস্টোরিক্যাল ডেটা জেনারেট করার ফাংশন (আজ ও গতকাল)
function generateHistoricalData(
  currentPrice: number,
  currentChange: number,
  yesterdayPrice: number,
  yesterdayChange: number,
): DailyData[] {
  const data: DailyData[] = []

  // গতকালের ডেটা (২৬/০১/২০২৪)
  const yesterdayVariation = yesterdayPrice * 0.03
  const yesterdayOpen = yesterdayPrice - (yesterdayChange / 100) * yesterdayPrice
  const yesterdayHigh = Math.max(yesterdayPrice, yesterdayOpen) + yesterdayVariation * 0.5
  const yesterdayLow = Math.min(yesterdayPrice, yesterdayOpen) - yesterdayVariation * 0.5

  data.push({
    date: YESTERDAY,
    price: yesterdayPrice,
    percentChange: yesterdayChange,
    open: yesterdayOpen,
    high: yesterdayHigh,
    low: yesterdayLow,
    close: yesterdayPrice,
  })

  // আজকের ডেটা (২৭/০১/২০২৪)
  const todayVariation = currentPrice * 0.03
  const todayOpen = currentPrice - (currentChange / 100) * currentPrice
  const todayHigh = Math.max(currentPrice, todayOpen) + todayVariation * 0.5
  const todayLow = Math.min(currentPrice, todayOpen) - todayVariation * 0.5

  data.push({
    date: TODAY,
    price: currentPrice,
    percentChange: currentChange,
    open: todayOpen,
    high: todayHigh,
    low: todayLow,
    close: currentPrice,
  })

  return data
}

// নতুন দিনের ডেটা যোগ করার ফাংশন
export function addNewDayData(marketId: string, newPrice: number, newPercentChange: number, newDate: string): void {
  const market = realMarketData.find((m) => m.id === marketId)
  if (market && market.historicalData) {
    const variation = newPrice * 0.03
    const open = newPrice - (newPercentChange / 100) * newPrice
    const high = Math.max(newPrice, open) + variation * 0.5
    const low = Math.min(newPrice, open) - variation * 0.5

    const newDayData: DailyData = {
      date: newDate,
      price: newPrice,
      percentChange: newPercentChange,
      open: open,
      high: high,
      low: low,
      close: newPrice,
    }

    // নতুন দিনের ডেটা যোগ করি
    market.historicalData.push(newDayData)

    // ৩০ দিনের বেশি হলে পুরানো ডেটা সরিয়ে দেই
    if (market.historicalData.length > 30) {
      market.historicalData = market.historicalData.slice(-30)
    }

    // বর্তমান প্রাইস আপডেট করি
    market.price = newPrice
    market.percentChange = newPercentChange
  }
}

// সব মার্কেট আপডেট করার ফাংশন (প্রতিদিনের জন্য)
export function updateAllMarkets(newMarketData: any[], newDate: string): void {
  newMarketData.forEach((newData) => {
    const marketId = newData.name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "")
    addNewDayData(marketId, newData.price, newData.percentChange, newDate)
  })
}

// ২৮/০১/২০২৪ এর জন্য তৃতীয় দিনের ডেটা যোগ করার প্রস্তুতি
export function addThirdDayData(): void {
  const thirdDay = "2024-01-28"

  // এখানে ভবিষ্যতে তৃতীয় দিনের ডেটা যোগ করা হবে
  // যখন ai.cxt.com থেকে নতুন ডেটা আসবে

  console.log(`📅 Ready to add data for ${thirdDay}`)
}

// ৭ দিনের পারফরমেন্স ক্যালকুলেট করার ফাংশন
export function calculateSevenDayPerformance(market: Market): number {
  if (!market.historicalData || market.historicalData.length < 2) {
    return 0
  }

  const oldestData = market.historicalData[0]
  const latestData = market.historicalData[market.historicalData.length - 1]

  return ((latestData.price - oldestData.price) / oldestData.price) * 100
}

export { realMarketData as allMarkets }
