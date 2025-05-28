"use client"

import { useEffect, useRef } from "react"
import type { Market } from "@/lib/types"

interface MarketCandlestickChartProps {
  market: Market
}

export function MarketCandlestickChart({ market }: MarketCandlestickChartProps) {
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

    // Draw simple background text "CXT Terminal Point" only
    ctx.save()
    ctx.globalAlpha = 0.08
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${rect.width < 400 ? "16px" : "20px"} Arial`
    ctx.textAlign = "center"
    ctx.fillText("CXT Terminal Point", rect.width / 2, rect.height / 2)
    ctx.restore()

    const historicalData = market.historicalData || []
    if (historicalData.length === 0) return

    // Calculate margins based on screen size
    const isMobile = rect.width < 500
    const leftMargin = isMobile ? 35 : 50
    const rightMargin = isMobile ? 15 : 20
    const topMargin = isMobile ? 25 : 30
    const bottomMargin = isMobile ? 25 : 30

    // Draw minimal grid lines
    ctx.strokeStyle = "#333333"
    ctx.lineWidth = 0.5

    // Horizontal grid lines (fewer on mobile)
    const gridCount = isMobile ? 4 : 6
    for (let i = 0; i <= gridCount; i++) {
      const y = topMargin + ((rect.height - topMargin - bottomMargin) / gridCount) * i
      ctx.beginPath()
      ctx.moveTo(leftMargin, y)
      ctx.lineTo(rect.width - rightMargin, y)
      ctx.stroke()
    }

    // Calculate price range with padding
    const prices = historicalData.flatMap((data) => [data.high, data.low])
    const minPrice = Math.min(...prices) * 0.99
    const maxPrice = Math.max(...prices) * 1.01
    const priceRange = maxPrice - minPrice

    // Draw candles with enhanced mobile-friendly styling
    const availableWidth = rect.width - leftMargin - rightMargin
    const candleWidth = availableWidth / historicalData.length
    const candleSpacing = candleWidth * 0.1
    const effectiveCandleWidth = Math.max(3, candleWidth - candleSpacing)

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

      // Draw candle body with high contrast colors
      ctx.fillStyle = candleColor
      const bodyHeight = Math.max(2, Math.abs(closeY - openY))
      ctx.fillRect(x, isUp ? closeY : openY, effectiveCandleWidth, bodyHeight)

      // Draw wicks with enhanced visibility
      ctx.strokeStyle = candleColor
      ctx.lineWidth = isMobile ? 1.5 : 2
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

      // Draw percentage change indicator (mobile optimized)
      if (Math.abs(data.percentChange) > 0 && !isMobile) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 9px Arial"
        ctx.textAlign = "center"

        const percentText = `${data.percentChange > 0 ? "+" : ""}${data.percentChange.toFixed(1)}%`
        const textY = isUp ? closeY - 12 : openY + 20

        // Draw text background
        const textMetrics = ctx.measureText(percentText)
        const textWidth = textMetrics.width + 4
        const textHeight = 10

        ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
        ctx.fillRect(x + effectiveCandleWidth / 2 - textWidth / 2, textY - textHeight / 2, textWidth, textHeight)

        // Draw text
        ctx.fillStyle = candleColor
        ctx.fillText(percentText, x + effectiveCandleWidth / 2, textY + 2)
      }

      // Draw date labels (optimized for mobile)
      const shouldShowDate = isMobile
        ? index === 0 || index === historicalData.length - 1
        : index % Math.ceil(historicalData.length / 5) === 0 || index === historicalData.length - 1

      if (shouldShowDate) {
        const date = new Date(data.date)
        const dateStr = `${date.getDate()}/${date.getMonth() + 1}`

        ctx.fillStyle = "#888888"
        ctx.font = `bold ${isMobile ? "9px" : "10px"} Arial`
        ctx.textAlign = "center"
        ctx.fillText(dateStr, x + effectiveCandleWidth / 2, rect.height - 8)
      }
    })

    // Draw price axis (mobile optimized)
    ctx.fillStyle = "#cccccc"
    ctx.font = `bold ${isMobile ? "9px" : "10px"} Arial`
    ctx.textAlign = "right"

    const priceSteps = isMobile ? 4 : 6
    for (let i = 0; i <= priceSteps; i++) {
      const price = minPrice + priceRange * (i / priceSteps)
      const y =
        topMargin +
        (rect.height - topMargin - bottomMargin) -
        ((price - minPrice) / priceRange) * (rect.height - topMargin - bottomMargin)

      // Draw price background
      ctx.fillStyle = "rgba(0, 0, 0, 0.8)"
      const priceText = `$${price.toFixed(isMobile ? 1 : 2)}`
      const textWidth = ctx.measureText(priceText).width + 4
      ctx.fillRect(5, y - 6, textWidth, 12)

      // Draw price text
      ctx.fillStyle = "#ffffff"
      ctx.fillText(priceText, leftMargin - 5, y + 3)
    }

    // Draw clean title
    ctx.fillStyle = "#ffffff"
    ctx.font = `bold ${isMobile ? "12px" : "14px"} Arial`
    ctx.textAlign = "center"
    ctx.fillText(`${market.name} - Live Chart`, rect.width / 2, 18)
  }, [market])

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full rounded-lg border border-gray-800"
      style={{ background: "#000000" }}
      data-chart-canvas
    />
  )
}
