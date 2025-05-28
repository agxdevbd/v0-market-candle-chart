"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import type { Market } from "@/lib/types"

interface AIMarketCandlestickChartProps {
  market: Market
}

export function AIMarketCandlestickChart({ market }: AIMarketCandlestickChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with high DPI support
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas with pure black background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, rect.width, rect.height)

    // Draw AI background elements
    drawAIBackground(ctx, rect)

    const historicalData = market.historicalData || []
    if (historicalData.length === 0) return

    // Calculate margins based on screen size
    const isMobile = rect.width < 500
    const leftMargin = isMobile ? 40 : 60
    const rightMargin = isMobile ? 20 : 30
    const topMargin = isMobile ? 30 : 40
    const bottomMargin = isMobile ? 30 : 40

    // Draw AI-enhanced grid
    drawAIGrid(ctx, rect, leftMargin, rightMargin, topMargin, bottomMargin, isMobile)

    // Calculate price range with AI optimization
    const prices = historicalData.flatMap((data) => [data.high, data.low])
    const minPrice = Math.min(...prices) * 0.98
    const maxPrice = Math.max(...prices) * 1.02
    const priceRange = maxPrice - minPrice

    // Draw AI-enhanced candles
    drawAICandlesticks(
      ctx,
      rect,
      historicalData,
      minPrice,
      maxPrice,
      priceRange,
      leftMargin,
      rightMargin,
      topMargin,
      bottomMargin,
      isMobile,
    )

    // Draw AI price axis
    drawAIPriceAxis(ctx, rect, minPrice, maxPrice, priceRange, leftMargin, topMargin, bottomMargin, isMobile)

    // Draw AI title and indicators
    drawAITitle(ctx, rect, market, isMobile)
  }, [market])

  const drawAIBackground = (ctx: CanvasRenderingContext2D, rect: DOMRect) => {
    // AI Neural Network Background Pattern
    ctx.save()
    ctx.globalAlpha = 0.03

    // Draw neural network nodes
    for (let i = 0; i < 20; i++) {
      const x = (rect.width / 20) * i
      const y = rect.height / 2 + Math.sin(i * 0.5) * 50

      ctx.beginPath()
      ctx.arc(x, y, 2, 0, Math.PI * 2)
      ctx.fillStyle = "#3b82f6"
      ctx.fill()

      // Draw connections
      if (i > 0) {
        const prevX = (rect.width / 20) * (i - 1)
        const prevY = rect.height / 2 + Math.sin((i - 1) * 0.5) * 50

        ctx.beginPath()
        ctx.moveTo(prevX, prevY)
        ctx.lineTo(x, y)
        ctx.strokeStyle = "#8b5cf6"
        ctx.lineWidth = 0.5
        ctx.stroke()
      }
    }

    // AI Text Background
    ctx.globalAlpha = 0.05
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${rect.width < 400 ? "14px" : "18px"} Arial`
    ctx.textAlign = "center"
    ctx.fillText("🤖 AI NEURAL ANALYSIS", rect.width / 2, rect.height / 2)

    ctx.restore()
  }

  const drawAIGrid = (
    ctx: CanvasRenderingContext2D,
    rect: DOMRect,
    leftMargin: number,
    rightMargin: number,
    topMargin: number,
    bottomMargin: number,
    isMobile: boolean,
  ) => {
    // AI-enhanced grid with glowing effect
    ctx.strokeStyle = "#1e40af"
    ctx.lineWidth = 0.5
    ctx.shadowColor = "#3b82f6"
    ctx.shadowBlur = 2

    // Horizontal grid lines
    const gridCount = isMobile ? 4 : 6
    for (let i = 0; i <= gridCount; i++) {
      const y = topMargin + ((rect.height - topMargin - bottomMargin) / gridCount) * i
      ctx.beginPath()
      ctx.moveTo(leftMargin, y)
      ctx.lineTo(rect.width - rightMargin, y)
      ctx.stroke()
    }

    // Vertical grid lines
    const verticalLines = isMobile ? 3 : 5
    for (let i = 0; i <= verticalLines; i++) {
      const x = leftMargin + ((rect.width - leftMargin - rightMargin) / verticalLines) * i
      ctx.beginPath()
      ctx.moveTo(x, topMargin)
      ctx.lineTo(x, rect.height - bottomMargin)
      ctx.stroke()
    }

    ctx.shadowBlur = 0
  }

  const drawAICandlesticks = (
    ctx: CanvasRenderingContext2D,
    rect: DOMRect,
    historicalData: any[],
    minPrice: number,
    maxPrice: number,
    priceRange: number,
    leftMargin: number,
    rightMargin: number,
    topMargin: number,
    bottomMargin: number,
    isMobile: boolean,
  ) => {
    const availableWidth = rect.width - leftMargin - rightMargin
    const candleWidth = availableWidth / historicalData.length
    const candleSpacing = candleWidth * 0.1
    const effectiveCandleWidth = Math.max(4, candleWidth - candleSpacing)

    historicalData.forEach((data, index) => {
      const x = leftMargin + index * candleWidth + candleSpacing / 2

      // Calculate y positions
      const chartHeight = rect.height - topMargin - bottomMargin
      const openY = topMargin + chartHeight - ((data.open - minPrice) / priceRange) * chartHeight
      const closeY = topMargin + chartHeight - ((data.close - minPrice) / priceRange) * chartHeight
      const highY = topMargin + chartHeight - ((data.high - minPrice) / priceRange) * chartHeight
      const lowY = topMargin + chartHeight - ((data.low - minPrice) / priceRange) * chartHeight

      // Determine if it's an up or down candle
      const isUp = data.close >= data.open
      const candleColor = isUp ? "#00ff88" : "#ff4444"

      // AI-enhanced candle with glow effect
      ctx.shadowColor = candleColor
      ctx.shadowBlur = 3
      ctx.fillStyle = candleColor
      const bodyHeight = Math.max(2, Math.abs(closeY - openY))
      ctx.fillRect(x, isUp ? closeY : openY, effectiveCandleWidth, bodyHeight)

      // Draw wicks with AI enhancement
      ctx.strokeStyle = candleColor
      ctx.lineWidth = isMobile ? 2 : 3
      ctx.lineCap = "round"

      // Top wick
      ctx.beginPath()
      ctx.moveTo(x + effectiveCandleWidth / 2, isUp ? closeY : openY)
      ctx.lineTo(x + effectiveCandleWidth / 2, highY)
      ctx.stroke()

      // Bottom wick
      ctx.beginPath()
      ctx.moveTo(x + effectiveCandleWidth / 2, isUp ? openY : closeY)
      ctx.lineTo(x + effectiveCandleWidth / 2, lowY)
      ctx.stroke()

      ctx.shadowBlur = 0

      // AI percentage indicator
      if (Math.abs(data.percentChange) > 0 && !isMobile) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 8px Arial"
        ctx.textAlign = "center"

        const percentText = `${data.percentChange > 0 ? "+" : ""}${data.percentChange.toFixed(1)}%`
        const textY = isUp ? closeY - 15 : openY + 25

        // AI glow background
        const textMetrics = ctx.measureText(percentText)
        const textWidth = textMetrics.width + 6
        const textHeight = 12

        ctx.shadowColor = candleColor
        ctx.shadowBlur = 5
        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fillRect(x + effectiveCandleWidth / 2 - textWidth / 2, textY - textHeight / 2, textWidth, textHeight)

        ctx.shadowBlur = 0
        ctx.fillStyle = candleColor
        ctx.fillText(percentText, x + effectiveCandleWidth / 2, textY + 2)
      }

      // Date labels with AI styling
      const shouldShowDate = isMobile
        ? index === 0 || index === historicalData.length - 1
        : index % Math.ceil(historicalData.length / 5) === 0 || index === historicalData.length - 1

      if (shouldShowDate) {
        const date = new Date(data.date)
        const dateStr = `${date.getDate()}/${date.getMonth() + 1}`

        ctx.fillStyle = "#60a5fa"
        ctx.font = `bold ${isMobile ? "9px" : "10px"} Arial`
        ctx.textAlign = "center"
        ctx.shadowColor = "#3b82f6"
        ctx.shadowBlur = 2
        ctx.fillText(dateStr, x + effectiveCandleWidth / 2, rect.height - 8)
        ctx.shadowBlur = 0
      }
    })
  }

  const drawAIPriceAxis = (
    ctx: CanvasRenderingContext2D,
    rect: DOMRect,
    minPrice: number,
    maxPrice: number,
    priceRange: number,
    leftMargin: number,
    topMargin: number,
    bottomMargin: number,
    isMobile: boolean,
  ) => {
    ctx.fillStyle = "#e2e8f0"
    ctx.font = `bold ${isMobile ? "9px" : "10px"} Arial`
    ctx.textAlign = "right"

    const priceSteps = isMobile ? 4 : 6
    for (let i = 0; i <= priceSteps; i++) {
      const price = minPrice + priceRange * (i / priceSteps)
      const y =
        topMargin +
        (rect.height - topMargin - bottomMargin) -
        ((price - minPrice) / priceRange) * (rect.height - topMargin - bottomMargin)

      // AI-enhanced price background
      ctx.shadowColor = "#3b82f6"
      ctx.shadowBlur = 3
      ctx.fillStyle = "rgba(0, 0, 0, 0.9)"
      const priceText = `$${price.toFixed(isMobile ? 1 : 2)}`
      const textWidth = ctx.measureText(priceText).width + 6
      ctx.fillRect(5, y - 8, textWidth, 16)

      // AI price text with glow
      ctx.fillStyle = "#60a5fa"
      ctx.fillText(priceText, leftMargin - 5, y + 3)
      ctx.shadowBlur = 0
    }
  }

  const drawAITitle = (ctx: CanvasRenderingContext2D, rect: DOMRect, market: Market, isMobile: boolean) => {
    // AI-enhanced title with neural network styling
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${isMobile ? "12px" : "16px"} Arial`
    ctx.textAlign = "center"
    ctx.shadowColor = "#8b5cf6"
    ctx.shadowBlur = 5

    const title = `🤖 ${market.name} - AI Neural Analysis`
    ctx.fillText(title, rect.width / 2, 20)

    // AI indicators
    ctx.font = `${isMobile ? "8px" : "10px"} Arial`
    ctx.fillStyle = "#60a5fa"
    ctx.fillText("⚡ Real-time AI Processing", rect.width / 2, rect.height - 5)

    ctx.shadowBlur = 0
  }

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg border border-gray-800"
        style={{ background: "#000000" }}
        data-chart-canvas
      />

      {/* AI Processing Overlay */}
      <motion.div
        className="absolute top-2 right-2 flex items-center space-x-1 bg-black/70 px-2 py-1 rounded-full border border-blue-500/30"
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        >
          🤖
        </motion.div>
        <span className="text-xs text-blue-400 font-bold">AI ACTIVE</span>
      </motion.div>
    </div>
  )
}
