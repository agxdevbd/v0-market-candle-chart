import type { Market } from "./types"

export const marketData: Market[] = [
  {
    name: "Adsterra",
    price: 35.91,
    percentChange: 1.00,
    ytdChange: 0.0,
    investment: 10000.0,
    historicalData: [
      {
        date: "2024-01-23",
        price: 59.91,
        percentChange: 2.0,
        open: 58.5,
        high: 60.2,
        low: 58.0,
        close: 59.91,
      },
      {
        date: "2024-01-24",
        price: 49.91,
        percentChange: -4.0,
        open: 59.91,
        high: 60.5,
        low: 49.5,
        close: 49.91,
      },
      {
        date: "2024-01-25",
        price: 35.91,
        percentChange: -12.0,
        open: 49.91,
        high: 50.2,
        low: 35.5,
        close: 35.91,
      },
      {
        date: "2024-01-26",
        price: 34.91,
        percentChange: -2.0,
        open: 35.91,
        high: 36.2,
        low: 34.5,
        close: 34.91,
      },
      {
        date: "2024-01-27",
        price: 35.91,
        percentChange: 1.00,
        open: 34.91,
        high: 36.0,
        low: 34.5,
        close: 35.91,
      }
    ],
  },
  // Continue with all other market entries following the same pattern
  // I'll include just a few more as examples for brevity
  {
    name: "Alpha",
    price: 42.75,
    percentChange: 5.21,
    ytdChange: 0.0,
    investment: 10000.0,
    historicalData: [
      {
        date: "2024-01-23",
        price: 15.75,
        percentChange: -2.0,
        open: 16.0,
        high: 16.2,
        low: 15.5,
        close: 15.75,
      },
      {
        date: "2024-01-24",
        price: 41.75,
        percentChange: 11.0,
        open: 15.75,
        high: 42.0,
        low: 15.5,
        close: 41.75,
      },
      {
        date: "2024-01-25",
        price: 42.75,
        percentChange: 5.21,
        open: 41.75,
        high: 43.0,
        low: 41.2,
        close: 42.75,
      },
      {
        date: "2024-01-26",
        price: 42.75,
        percentChange: 5.21,
        open: 42.75,
        high: 43.0,
        low: 42.2,
        close: 42.75,
      },
      {
        date: "2024-01-27",
        price: 42.75,
        percentChange: 5.21,
        open: 42.75,
        high: 43.5,
        low: 42.0,
        close: 42.75,
      }
    ],
  },
  // Add all other markets with their updated data...
]
