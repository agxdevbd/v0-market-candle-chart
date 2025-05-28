"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, TrendingUp, Zap, Timer, Calendar } from "lucide-react"

const upcomingMarkets = [
  "TechFlow",
  "CryptoVault",
  "DigitalEdge",
  "BlockChain Pro",
  "MetaVerse",
  "AI Dynamics",
  "Quantum Tech",
  "NeoFinance",
  "SmartTrade",
  "FutureStock",
  "InnovateCorp",
  "TechNova",
  "CyberLink",
  "DataStream",
  "CloudBase",
  "NetCore",
  "InfoTech",
  "DigitalWave",
  "TechSphere",
  "CyberFlow",
  "SmartLink",
  "DataCore",
  "CloudTech",
  "NetWave",
  "InfoFlow",
  "DigitalCore",
  "TechLink",
  "CyberBase",
  "SmartWave",
  "DataLink",
  "CloudFlow",
  "NetCore Pro",
  "InfoBase",
  "DigitalLink",
  "TechWave",
  "CyberCore",
  "SmartBase",
  "DataWave",
  "CloudLink",
  "NetFlow",
  "InfoCore",
  "DigitalBase",
  "TechCore",
  "CyberWave",
  "SmartCore",
  "DataBase",
  "CloudCore",
  "NetBase",
  "InfoLink",
  "DigitalFlow",
]

// Generate random days for launch
const getRandomDays = () => Math.floor(Math.random() * 30) + 1

// Generate random emojis for markets
const marketEmojis = ["🚀", "💹", "📊", "📈", "💰", "💎", "🔋", "🌐", "🔑", "🛡️", "🧠", "⚡", "🔮", "🌟"]
const getRandomEmoji = () => marketEmojis[Math.floor(Math.random() * marketEmojis.length)]

export function UpcomingMarkets() {
  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-400/30 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center">
          <Clock className="w-6 h-6 mr-2 text-purple-400" />
          Upcoming Markets
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 10,
              ease: "linear",
            }}
            className="ml-2"
          >
            🔄
          </motion.div>
        </CardTitle>
        <div className="text-xs text-purple-300 bg-purple-500/20 px-2 py-1 rounded-full flex items-center">
          <Calendar className="w-3 h-3 mr-1" />
          Coming Soon
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[60vh] md:max-h-96 overflow-y-auto pr-1 -mr-1">
          {upcomingMarkets.map((market, index) => {
            const days = getRandomDays()
            const emoji = getRandomEmoji()

            return (
              <motion.div
                key={market}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.02 }}
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(147, 51, 234, 0.3)",
                }}
                className="p-3 bg-purple-800/20 rounded-lg border border-purple-400/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{emoji}</span>
                    <span className="text-white font-medium text-sm">{market}</span>
                  </div>
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                </div>
                <div className="flex justify-between items-center">
                  <div className="text-purple-300 text-xs">Capital: $50,000</div>
                  <div className="flex items-center space-x-1 bg-purple-500/20 px-1.5 py-0.5 rounded-full">
                    <Timer className="w-3 h-3 text-purple-300" />
                    <span className="text-xs text-purple-200">{days}d</span>
                  </div>
                </div>
                <div className="mt-1 flex items-center">
                  <Zap className="w-3 h-3 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-xs">24/7 Available</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
