import { MarketDashboard } from "@/components/market-dashboard"
import { marketData } from "@/lib/market-data"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

// Make this page dynamic to handle API calls
export const dynamic = "force-dynamic"
export const revalidate = 0

export default function MarketDetailsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-4 md:p-8">
      <div className="container mx-auto">
        <div className="flex items-center mb-6">
          <Button
            asChild
            variant="outline"
            className="mr-4 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-white">Market Dashboard</h1>
        </div>
        <MarketDashboard markets={marketData} />
      </div>
    </main>
  )
}
