import type { Market, DailyData } from "./types"
import { allMarkets } from "./market-data"

// এই ফাংশনটি https://my.wefx.top/ থেকে মার্কেট ডেটা ফেচ করবে
// প্রতিদিন রাত ১২টার পর বাংলাদেশ টাইমে (ব্যাকগ্রাউন্ড প্রসেস)
export async function fetchMarketData(): Promise<Market[]> {
  try {
    // বর্তমানে ডামি ডেটা রিটার্ন করছে
    // পরবর্তীতে এখানে API কল করতে হবে:
    // const response = await fetch('https://my.wefx.top/api/markets');
    // const data = await response.json();

    // ব্যাকগ্রাউন্ড ডেটা আপডেট (ইউজারদের দেখানো হবে না)
    const bangladeshTime = getBangladeshTime()
    const hour = bangladeshTime.getHours()

    // রাত ১২টার পর সাইলেন্ট ডেটা আপডেট
    if (hour >= 0 && hour < 6) {
      // ব্যাকগ্রাউন্ড API কল
      await updateMarketDataSilently()
    }

    return allMarkets
  } catch (error) {
    console.error("Background data update error:", error)
    return allMarkets // ফলব্যাক ডেটা
  }
}

// সাইলেন্ট ব্যাকগ্রাউন্ড আপডেট (ইউজারদের দেখানো হবে না)
async function updateMarketDataSilently() {
  // এখানে my.wefx.top থেকে ডেটা ফেচ করে আপডেট করতে হবে
  // ইউজারদের কোন নোটিফিকেশন দেওয়া হবে না
}

// বাংলাদেশ টাইম পাওয়ার ফাংশন
function getBangladeshTime(): Date {
  const now = new Date()
  const utc = now.getTime() + now.getTimezoneOffset() * 60000
  const bangladeshTime = new Date(utc + 6 * 3600000) // UTC+6
  return bangladeshTime
}

// ব্যাকগ্রাউন্ড স্কেডিউলার (ইউজারদের দেখানো হবে না)
export function initializeBackgroundScheduler() {
  const silentUpdate = () => {
    const bangladeshTime = getBangladeshTime()
    const hour = bangladeshTime.getHours()
    const minute = bangladeshTime.getMinutes()

    // রাত ১২:০১ এ সাইলেন্ট আপডেট
    if (hour === 0 && minute === 1) {
      fetchMarketData() // ব্যাকগ্রাউন্ড আপডেট
    }
  }

  // প্রতি মিনিটে চেক করি (ব্যাকগ্রাউন্ডে)
  setInterval(silentUpdate, 60000)
}

// আজীবন চলমান হিস্টোরিক্যাল ডেটা জেনারেট করার ফাংশন
export function generateContinuousHistoricalData(currentPrice: number, currentPercentChange: number): DailyData[] {
  const data: DailyData[] = []
  let price = currentPrice

  // আজীবন চলমান সিস্টেমের জন্য ডেটা জেনারেট
  for (let i = 0; i < 30; i++) {
    // ৩০ দিনের ডেটা
    const date = new Date()
    date.setDate(date.getDate() - i)

    const percentChange = i === 0 ? currentPercentChange : (Math.random() - 0.5) * 15
    const prevPrice = price / (1 + percentChange / 100)

    if (i !== 0) {
      price = prevPrice
    }

    const variation = price * 0.08
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
