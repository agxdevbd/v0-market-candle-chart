"use client"

import { motion } from "framer-motion"
import { Trophy, Medal, Award, Star, TrendingUp, Zap, Crown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const leaderboardData = [
  { name: "Ahmed Hassan", country: "🇪🇬", amount: 1000000, rank: 1 },
  { name: "Yuki Tanaka", country: "🇯🇵", amount: 985000, rank: 2 },
  { name: "Maria Silva", country: "🇧🇷", amount: 970000, rank: 3 },
  { name: "Rajesh Kumar", country: "🇮🇳", amount: 955000, rank: 4 },
  { name: "Fatima Al-Zahra", country: "🇸🇦", amount: 940000, rank: 5 },
  { name: "Chen Wei", country: "🇨🇳", amount: 925000, rank: 6 },
  { name: "Isabella Rodriguez", country: "🇲🇽", amount: 910000, rank: 7 },
  { name: "Mohammed Ali", country: "🇦🇪", amount: 895000, rank: 8 },
  { name: "Sophie Martin", country: "🇫🇷", amount: 880000, rank: 9 },
  { name: "Arif Rahman", country: "🇧🇩", amount: 865000, rank: 10 },
  { name: "James Wilson", country: "🇺🇸", amount: 850000, rank: 11 },
  { name: "Anna Kowalski", country: "🇵🇱", amount: 835000, rank: 12 },
  { name: "Carlos Mendez", country: "🇦🇷", amount: 820000, rank: 13 },
  { name: "Priya Sharma", country: "🇮🇳", amount: 805000, rank: 14 },
  { name: "Hans Mueller", country: "🇩🇪", amount: 790000, rank: 15 },
  { name: "Elena Popov", country: "🇷🇺", amount: 775000, rank: 16 },
  { name: "David Kim", country: "🇰🇷", amount: 760000, rank: 17 },
  { name: "Sarah Johnson", country: "🇨🇦", amount: 745000, rank: 18 },
  { name: "Marco Rossi", country: "🇮🇹", amount: 730000, rank: 19 },
  { name: "Aisha Okafor", country: "🇳🇬", amount: 715000, rank: 20 },
  { name: "Luis Garcia", country: "🇪🇸", amount: 700000, rank: 21 },
  { name: "Olga Petrov", country: "🇺🇦", amount: 685000, rank: 22 },
  { name: "Hiroshi Sato", country: "🇯🇵", amount: 670000, rank: 23 },
  { name: "Emma Thompson", country: "🇬🇧", amount: 655000, rank: 24 },
  { name: "Ahmed Farouk", country: "🇪🇬", amount: 640000, rank: 25 },
  { name: "Liam O'Connor", country: "🇮🇪", amount: 625000, rank: 26 },
  { name: "Zara Khan", country: "🇵🇰", amount: 610000, rank: 27 },
  { name: "Viktor Novak", country: "🇨🇿", amount: 595000, rank: 28 },
  { name: "Camila Santos", country: "🇵🇹", amount: 580000, rank: 29 },
  { name: "Raj Patel", country: "🇮🇳", amount: 565000, rank: 30 },
  { name: "Noor Al-Ahmad", country: "🇯🇴", amount: 550000, rank: 31 },
  { name: "Erik Larsson", country: "🇸🇪", amount: 535000, rank: 32 },
  { name: "Maya Johansson", country: "🇳🇴", amount: 520000, rank: 33 },
  { name: "Alex Dimitrov", country: "🇧🇬", amount: 505000, rank: 34 },
  { name: "Fatou Diallo", country: "🇸🇳", amount: 490000, rank: 35 },
  { name: "Tomás Novák", country: "🇸🇰", amount: 475000, rank: 36 },
  { name: "Leila Hosseini", country: "🇮🇷", amount: 460000, rank: 37 },
  { name: "Kwame Asante", country: "🇬🇭", amount: 445000, rank: 38 },
  { name: "Ingrid Hansen", country: "🇩🇰", amount: 430000, rank: 39 },
  { name: "Dmitri Volkov", country: "🇷🇺", amount: 415000, rank: 40 },
  { name: "Amara Osei", country: "🇨🇮", amount: 400000, rank: 41 },
  { name: "Finn Virtanen", country: "🇫🇮", amount: 385000, rank: 42 },
  { name: "Zoe Papadopoulos", country: "🇬🇷", amount: 370000, rank: 43 },
  { name: "Mateo Fernandez", country: "🇨🇴", amount: 355000, rank: 44 },
  { name: "Anya Kozlov", country: "🇧🇾", amount: 340000, rank: 45 },
  { name: "Omar Benali", country: "🇲🇦", amount: 325000, rank: 46 },
  { name: "Isla MacLeod", country: "🏴󠁧󠁢󠁳󠁣󠁴󠁿", amount: 310000, rank: 47 },
  { name: "Kai Nakamura", country: "🇯🇵", amount: 295000, rank: 48 },
  { name: "Thabo Mthembu", country: "🇿🇦", amount: 280000, rank: 49 },
  { name: "Luca Bianchi", country: "🇨🇭", amount: 107000, rank: 50 },
]

export function Leaderboard() {
  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="w-5 h-5 text-yellow-400" />
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-300" />
    if (rank === 3) return <Award className="w-5 h-5 text-amber-600" />
    if (rank <= 10) return <Star className="w-5 h-5 text-blue-400" />
    return <span className="text-blue-400 font-bold">#{rank}</span>
  }

  const getAmountColor = (rank: number) => {
    if (rank === 1) return "text-yellow-400"
    if (rank === 2) return "text-gray-300"
    if (rank === 3) return "text-amber-600"
    if (rank <= 10) return "text-green-400"
    return "text-green-400/80"
  }

  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-400/30 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center">
          <Trophy className="w-6 h-6 mr-2 text-yellow-400" />
          Global Leaderboard
          <motion.div
            animate={{
              rotate: [0, 10, 0, -10, 0],
              scale: [1, 1.1, 1, 1.1, 1],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 5,
              repeatType: "loop",
            }}
            className="ml-2"
          >
            🏆
          </motion.div>
        </CardTitle>
        <div className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full flex items-center">
          <Zap className="w-3 h-3 mr-1" />
          AI Ranked
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 max-h-[60vh] md:max-h-96 overflow-y-auto pr-1 -mr-1">
          {leaderboardData.map((trader, index) => (
            <motion.div
              key={trader.rank}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center justify-between p-2.5 md:p-3 bg-blue-800/20 rounded-lg border border-blue-400/20 hover:bg-blue-700/30 transition-colors"
            >
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-7 flex justify-center">{getRankIcon(trader.rank)}</div>
                <span className="text-xl md:text-2xl">{trader.country}</span>
                <span className="text-white font-medium text-xs md:text-sm truncate max-w-[100px] md:max-w-none">
                  {trader.name}
                </span>
                {trader.rank <= 3 && (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
                    className="text-xs"
                  >
                    {trader.rank === 1 ? "🔥" : trader.rank === 2 ? "⚡" : "✨"}
                  </motion.span>
                )}
              </div>
              <div className={`${getAmountColor(trader.rank)} font-bold text-xs md:text-sm flex items-center`}>
                {trader.rank <= 10 && <TrendingUp className="w-3 h-3 mr-1 hidden md:inline" />}$
                {trader.amount.toLocaleString()}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
