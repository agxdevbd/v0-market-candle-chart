"use client"

import { useEffect, useRef } from "react"
import type { Market } from "@/lib/types"

interface MarketCandlestickProps {
  market: Market
  showPercentage?: boolean
  showDates?: boolean
}

export function MarketCandlestick({ market, showPercentage = false, showDates = true }: MarketCandlestickProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    const historicalData = market.historicalData || []

    if (historicalData.length === 0) {
      // Fallback to single candle if no historical data
      drawSingleCandle(ctx, rect, market.percentChange, showPercentage)
      return
    }

    // Draw multiple candles
    const candleWidth = Math.min(40, (rect.width - 40) / historicalData.length)
    const spacing = Math.min(15, candleWidth * 0.3)
    const totalWidth = historicalData.length * (candleWidth + spacing) - spacing
    const startX = (rect.width - totalWidth) / 2

    historicalData.forEach((data, index) => {
      const candleX = startX + index * (candleWidth + spacing)
      const isPositive = data.percentChange >= 0
      const candleColor = isPositive ? "#10b981" : "#ef4444"

      // Calculate candle height based on percentage change
      const percentAbs = Math.abs(data.percentChange)
      const maxHeight = rect.height * 0.5
      const minHeight = 15
      const heightScale = Math.min(percentAbs * 2, 25) / 25
      const candleHeight = Math.max(minHeight, heightScale * maxHeight)

      const candleY = (rect.height - candleHeight) / 2 - (showDates ? 25 : 10)

      // Draw candle body
      ctx.fillStyle = candleColor
      ctx.fillRect(candleX, candleY, candleWidth, candleHeight)

      // Draw wick lines
      ctx.strokeStyle = candleColor
      ctx.lineWidth = 2

      // Top wick
      ctx.beginPath()
      ctx.moveTo(candleX + candleWidth / 2, candleY - rect.height * 0.06)
      ctx.lineTo(candleX + candleWidth / 2, candleY)
      ctx.stroke()

      // Bottom wick
      ctx.beginPath()
      ctx.moveTo(candleX + candleWidth / 2, candleY + candleHeight)
      ctx.lineTo(candleX + candleWidth / 2, candleY + candleHeight + rect.height * 0.06)
      ctx.stroke()

      // Draw percentage text
      if (showPercentage) {
        ctx.fillStyle = "#ffffff"
        ctx.font = "bold 10px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"

        const text = `${data.percentChange > 0 ? "+" : ""}${data.percentChange}%`
        const textX = candleX + candleWidth / 2
        const textY = candleY + candleHeight / 2

        // Draw text background
        const textMetrics = ctx.measureText(text)
        const textWidth = textMetrics.width + 4
        const textHeight = 14

        ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
        ctx.fillRect(textX - textWidth / 2, textY - textHeight / 2, textWidth, textHeight)

        // Draw text
        ctx.fillStyle = "#ffffff"
        ctx.fillText(text, textX, textY)
      }

      // Draw date below candle
      if (showDates) {
        ctx.fillStyle = "#9ca3af"
        ctx.font = "9px Arial"
        ctx.textAlign = "center"
        ctx.textBaseline = "top"

        const date = new Date(data.date)
        const dateText = `${date.getDate()}/${date.getMonth() + 1}`
        ctx.fillText(dateText, candleX + candleWidth / 2, candleY + candleHeight + rect.height * 0.08)
      }

      // Draw price above candle
      ctx.fillStyle = "#ffffff"
      ctx.font = "8px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "bottom"

      const priceText = `$${data.price.toFixed(2)}`
      ctx.fillText(priceText, candleX + candleWidth / 2, candleY - rect.height * 0.08)
    })

    // Draw chart title
    if (historicalData.length > 1) {
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 12px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "top"
      ctx.fillText(`${market.name} - 3 Day Chart`, rect.width / 2, 5)
    }
  }, [market, showPercentage, showDates])

  const drawSingleCandle = (
    ctx: CanvasRenderingContext2D,
    rect: DOMRect,
    percentChange: number,
    showPercentage: boolean,
  ) => {
    const isPositive = percentChange >= 0
    const candleColor = isPositive ? "#10b981" : "#ef4444"

    const candleWidth = 30
    const candleX = rect.width / 2 - candleWidth / 2

    const percentAbs = Math.abs(percentChange)
    const maxHeight = rect.height * 0.8
    const minHeight = 10
    const heightScale = Math.min(percentAbs * 3, 20) / 20
    const candleHeight = Math.max(minHeight, heightScale * maxHeight)

    const candleY = (rect.height - candleHeight) / 2

    // Draw candle body
    ctx.fillStyle = candleColor
    ctx.fillRect(candleX, candleY, candleWidth, candleHeight)

    // Draw wick lines
    ctx.strokeStyle = candleColor
    ctx.lineWidth = 2

    // Top wick
    ctx.beginPath()
    ctx.moveTo(rect.width / 2, candleY - rect.height * 0.1)
    ctx.lineTo(rect.width / 2, candleY)
    ctx.stroke()

    // Bottom wick
    ctx.beginPath()
    ctx.moveTo(rect.width / 2, candleY + candleHeight)
    ctx.lineTo(rect.width / 2, candleY + candleHeight + rect.height * 0.1)
    ctx.stroke()

    if (showPercentage) {
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 14px Arial"
      ctx.textAlign = "center"
      ctx.textBaseline = "middle"

      const text = `${percentChange > 0 ? "+" : ""}${percentChange}%`
      const textX = rect.width / 2
      const textY = rect.height / 2

      const textMetrics = ctx.measureText(text)
      const textWidth = textMetrics.width + 8
      const textHeight = 20

      ctx.fillStyle = "rgba(0, 0, 0, 0.7)"
      ctx.fillRect(textX - textWidth / 2, textY - textHeight / 2, textWidth, textHeight)

      ctx.fillStyle = "#ffffff"
      ctx.fillText(text, textX, textY)
    }
  }

  return <canvas ref={canvasRef} className="w-full h-full" data-chart-canvas />
}
