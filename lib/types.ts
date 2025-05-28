export interface Market {
  id: string
  name: string
  logo: string
  price: number
  percentChange: number
  ytdChange: number
  investment: number
  marketCap?: number
  volume24h?: number
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

export interface APIResponse {
  markets: Array<{
    symbol: string
    name: string
    price: string
    change_24h: string
    change_7d: string
    market_cap: string
    volume_24h: string
    logo?: string
  }>
  last_updated: string
  status: string
}
