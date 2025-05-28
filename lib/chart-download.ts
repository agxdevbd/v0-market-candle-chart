import type { Market } from "./types"

export async function downloadChartAsPDF(market: Market) {
  try {
    // Create a temporary canvas for high-quality chart rendering
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) throw new Error("Canvas context not available")

    // Set high resolution for PDF
    const width = 1200
    const height = 800
    canvas.width = width
    canvas.height = height

    // Draw chart background
    ctx.fillStyle = "#000000"
    ctx.fillRect(0, 0, width, height)

    // Draw title
    ctx.fillStyle = "#ffffff"
    ctx.font = "bold 24px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`${market.name} - Trading Chart`, width / 2, 40)

    // Draw subtitle
    ctx.font = "16px Arial"
    ctx.fillStyle = "#cccccc"
    ctx.fillText("CXT Terminal Point", width / 2, 70)

    // Draw current price info
    ctx.font = "bold 20px Arial"
    ctx.fillStyle = "#ffffff"
    ctx.textAlign = "left"
    ctx.fillText(`Current Price: $${market.price.toFixed(2)}`, 50, 120)

    const changeColor = market.percentChange >= 0 ? "#00ff88" : "#ff4444"
    ctx.fillStyle = changeColor
    ctx.fillText(`24h Change: ${market.percentChange >= 0 ? "+" : ""}${market.percentChange.toFixed(2)}%`, 50, 150)

    // Draw historical data if available
    const historicalData = market.historicalData || []
    if (historicalData.length > 0) {
      const chartStartY = 200
      const chartHeight = 400
      const chartWidth = width - 100
      const leftMargin = 50

      // Calculate price range
      const prices = historicalData.flatMap((data) => [data.high, data.low])
      const minPrice = Math.min(...prices) * 0.99
      const maxPrice = Math.max(...prices) * 1.01
      const priceRange = maxPrice - minPrice

      // Draw grid
      ctx.strokeStyle = "#333333"
      ctx.lineWidth = 1

      // Horizontal grid lines
      for (let i = 0; i <= 5; i++) {
        const y = chartStartY + (chartHeight / 5) * i
        ctx.beginPath()
        ctx.moveTo(leftMargin, y)
        ctx.lineTo(leftMargin + chartWidth, y)
        ctx.stroke()
      }

      // Draw candles
      const candleWidth = chartWidth / historicalData.length
      const candleSpacing = candleWidth * 0.1
      const effectiveCandleWidth = candleWidth - candleSpacing

      historicalData.forEach((data, index) => {
        const x = leftMargin + index * candleWidth + candleSpacing / 2

        // Calculate y positions
        const openY = chartStartY + chartHeight - ((data.open - minPrice) / priceRange) * chartHeight
        const closeY = chartStartY + chartHeight - ((data.close - minPrice) / priceRange) * chartHeight
        const highY = chartStartY + chartHeight - ((data.high - minPrice) / priceRange) * chartHeight
        const lowY = chartStartY + chartHeight - ((data.low - minPrice) / priceRange) * chartHeight

        const isUp = data.close >= data.open
        const candleColor = isUp ? "#00ff88" : "#ff4444"

        // Draw candle body
        ctx.fillStyle = candleColor
        const bodyHeight = Math.max(3, Math.abs(closeY - openY))
        ctx.fillRect(x, isUp ? closeY : openY, effectiveCandleWidth, bodyHeight)

        // Draw wicks
        ctx.strokeStyle = candleColor
        ctx.lineWidth = 2
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

        // Draw date
        if (index % Math.ceil(historicalData.length / 6) === 0) {
          const date = new Date(data.date)
          const dateStr = `${date.getDate()}/${date.getMonth() + 1}`

          ctx.fillStyle = "#888888"
          ctx.font = "12px Arial"
          ctx.textAlign = "center"
          ctx.fillText(dateStr, x + effectiveCandleWidth / 2, chartStartY + chartHeight + 25)
        }
      })

      // Draw price labels
      ctx.fillStyle = "#ffffff"
      ctx.font = "12px Arial"
      ctx.textAlign = "right"

      for (let i = 0; i <= 5; i++) {
        const price = minPrice + priceRange * (i / 5)
        const y = chartStartY + chartHeight - ((price - minPrice) / priceRange) * chartHeight

        ctx.fillText(`$${price.toFixed(2)}`, leftMargin - 10, y + 4)
      }
    }

    // Draw footer info
    ctx.fillStyle = "#888888"
    ctx.font = "12px Arial"
    ctx.textAlign = "center"
    ctx.fillText(`Generated on ${new Date().toLocaleDateString()} • CXT Trading Platform`, width / 2, height - 30)

    // Convert canvas to PDF
    const imageData = canvas.toDataURL("image/png", 1.0)

    // Create PDF using jsPDF (we'll simulate this for now)
    const link = document.createElement("a")
    link.download = `${market.name}-chart-${new Date().toISOString().split("T")[0]}.png`
    link.href = imageData
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // For actual PDF generation, you would use jsPDF:
    /*
    const { jsPDF } = await import('jspdf');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    pdf.addImage(imageData, 'PNG', 10, 10, 277, 180);
    pdf.save(`${market.name}-chart-${new Date().toISOString().split('T')[0]}.pdf`);
    */

    return true
  } catch (error) {
    console.error("Chart download failed:", error)
    throw error
  }
}

// Alternative method using html2canvas for better quality
export async function downloadChartAsPDFAdvanced(market: Market) {
  try {
    // This would require html2canvas and jsPDF libraries
    // For now, we'll use the canvas method above

    // const html2canvas = await import('html2canvas');
    // const { jsPDF } = await import('jspdf');

    // const chartElement = document.getElementById(`chart-${market.id}`);
    // if (!chartElement) throw new Error('Chart element not found');

    // const canvas = await html2canvas.default(chartElement, {
    //   backgroundColor: '#000000',
    //   scale: 2,
    //   useCORS: true
    // });

    // const imgData = canvas.toDataURL('image/png');
    // const pdf = new jsPDF('landscape', 'mm', 'a4');
    // const imgWidth = 277;
    // const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    // pdf.save(`${market.name}-chart-${new Date().toISOString().split('T')[0]}.pdf`);

    return downloadChartAsPDF(market)
  } catch (error) {
    console.error("Advanced chart download failed:", error)
    throw error
  }
}
