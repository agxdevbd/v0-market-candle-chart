export interface Market {
  id: string
  name: string
  logo: string
  price: number
  percentChange: number
  ytdChange: number
  investment: number
  historicalData?: DailyData[]
}

export interface DailyData {
  date: string
  price: number
  percentChange: number
  open: number
  high: number
  low: number
  close: number
}

export interface MarketDescription {
  [key: string]: string
}
