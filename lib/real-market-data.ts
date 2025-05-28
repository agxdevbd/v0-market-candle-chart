import type { Market, DailyData } from "./types"

// আজকের তারিখ (২৬/০১/২০২৪) - প্রথম দিন
const TODAY = "2024-01-26"

// ai.cxt.com থেকে পাওয়া সঠিক মার্কেট ডেটা
export const realMarketData: Market[] = [
  {
    id: "adsterra",
    name: "Adsterra",
    logo: "/logos/adsterra.png",
    price: 33.91,
    percentChange: -3.0,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 15000,
    historicalData: generateHistoricalData(33.91, -3.0, 1),
  },
  {
    id: "alpha",
    name: "Alpha",
    logo: "/logos/alpha.png",
    price: 42.75,
    percentChange: 5.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 18000,
    historicalData: generateHistoricalData(42.75, 5.21, 1),
  },
  {
    id: "arrowprime",
    name: "ArrowPrime",
    logo: "/logos/arrowprime.png",
    price: 40.65,
    percentChange: -1.24,
    ytdChange: 16.74,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 16500,
    historicalData: generateHistoricalData(40.65, -1.24, 1),
  },
  {
    id: "cool-agency",
    name: "Cool Agency",
    logo: "/logos/cool-agency.png",
    price: 57.0,
    percentChange: -1.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 22000,
    historicalData: generateHistoricalData(57.0, -1.21, 1),
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
    historicalData: generateHistoricalData(31.31, 1.31, 1),
  },
  {
    id: "flooido",
    name: "Flooido",
    logo: "/logos/flooido.png",
    price: 28.0,
    percentChange: 7.0,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 12000,
    historicalData: generateHistoricalData(28.0, 7.0, 1),
  },
  {
    id: "found-stock",
    name: "Found Stock",
    logo: "/logos/found-stock.png",
    price: 59.98,
    percentChange: 3.79,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 25000,
    historicalData: generateHistoricalData(59.98, 3.79, 1),
  },
  {
    id: "grow-co",
    name: "Grow Co",
    logo: "/logos/grow-co.png",
    price: 28.0,
    percentChange: 14.64,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 18500,
    historicalData: generateHistoricalData(28.0, 14.64, 1),
  },
  {
    id: "kt",
    name: "KT",
    logo: "/logos/kt.png",
    price: 60.0,
    percentChange: 12.76,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 28000,
    historicalData: generateHistoricalData(60.0, 12.76, 1),
  },
  {
    id: "making-m",
    name: "Making m",
    logo: "/logos/making-m.png",
    price: 40.0,
    percentChange: 18.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 32000,
    historicalData: generateHistoricalData(40.0, 18.21, 1),
  },
  {
    id: "monetag",
    name: "Monetag",
    logo: "/logos/monetag.png",
    price: 45.76,
    percentChange: -1.79,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 19000,
    historicalData: generateHistoricalData(45.76, -1.79, 1),
  },
  {
    id: "nexus-digital",
    name: "Nexus Digital",
    logo: "/logos/nexus-digital.png",
    price: 18.0,
    percentChange: -10.0,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 8500,
    historicalData: generateHistoricalData(18.0, -10.0, 1),
  },
  {
    id: "nx",
    name: "NX",
    logo: "/logos/nx.png",
    price: 40.76,
    percentChange: -0.79,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 16000,
    historicalData: generateHistoricalData(40.76, -0.79, 1),
  },
  {
    id: "oxw",
    name: "O X W",
    logo: "/logos/oxw.png",
    price: 47.06,
    percentChange: 4.88,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 21000,
    historicalData: generateHistoricalData(47.06, 4.88, 1),
  },
  {
    id: "onclicka",
    name: "Onclicka",
    logo: "/logos/onclicka.png",
    price: 39.0,
    percentChange: -3.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 14500,
    historicalData: generateHistoricalData(39.0, -3.21, 1),
  },
  {
    id: "pikota",
    name: "Pikota",
    logo: "/logos/pikota.png",
    price: 13.9,
    percentChange: 7.34,
    ytdChange: 0.0,
    investment: 8000000.0,
    marketCap: 8000000.0,
    volume24h: 95000,
    historicalData: generateHistoricalData(13.9, 7.34, 1),
  },
  {
    id: "pinterest",
    name: "Pinterest",
    logo: "/logos/pinterest.png",
    price: 42.0,
    percentChange: -2.0,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 17500,
    historicalData: generateHistoricalData(42.0, -2.0, 1),
  },
  {
    id: "practiq",
    name: "Practiq",
    logo: "/logos/practiq.png",
    price: 29.45,
    percentChange: 3.21,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 13000,
    historicalData: generateHistoricalData(29.45, 3.21, 1),
  },
  {
    id: "redfin",
    name: "Redfin",
    logo: "/logos/redfin.png",
    price: 40.0,
    percentChange: 1.2,
    ytdChange: 0.0,
    investment: 50000.0,
    marketCap: 50000.0,
    volume24h: 24000,
    historicalData: generateHistoricalData(40.0, 1.2, 1),
  },
  {
    id: "renerald",
    name: "Renerald",
    logo: "/logos/renerald.png",
    price: 36.0,
    percentChange: 1.0,
    ytdChange: 0.0,
    investment: 10000.0,
    marketCap: 10000.0,
    volume24h: 15500,
    historicalData: generateHistoricalData(36.0, 1.0, 1),
  },
]

// ৩০ দিনের হিস্টোরিক্যাল ডেটা জেনারেট করার ফাংশন (আজ থেকে শুরু)
function generateHistoricalData(currentPrice: number, currentChange: number, dayNumber: number): DailyData[] {
  const data: DailyData[] = []

  // আজকের ডেটা (প্রথম দিন)
  const today = new Date(TODAY)
  const variation = currentPrice * 0.03
  const open = currentPrice - (currentChange / 100) * currentPrice
  const high = Math.max(currentPrice, open) + variation * 0.5
  const low = Math.min(currentPrice, open) - variation * 0.5

  data.push({
    date: TODAY,
    price: currentPrice,
    percentChange: currentChange,
    open: open,
    high: high,
    low: low,
    close: currentPrice,
  })

  // ভবিষ্যতে আরো দিন যোগ হবে যখন নতুন ডেটা আসবে
  // এখন শুধু আজকের ডেটা আছে

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

export { realMarketData as allMarkets }
