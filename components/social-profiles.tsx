"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Activity, Sparkles } from "lucide-react"

const socialProfiles = [
  { name: "XTH", country: "🇧🇩", fund: 100000, color: "border-green-400", emoji: "🚀" },
  { name: "Sakib Rahman", country: "🇧🇩", fund: 100000, color: "border-blue-400", emoji: "💎" },
  { name: "Nusrat Jahan", country: "🇧🇩", fund: 100000, color: "border-purple-400", emoji: "✨" },
  { name: "Alex Johnson", country: "🇺🇸", fund: 100000, color: "border-red-400", emoji: "🔥" },
  { name: "Yuki Tanaka", country: "🇯🇵", fund: 100000, color: "border-yellow-400", emoji: "⚡" },
  { name: "Maria Garcia", country: "🇪🇸", fund: 100000, color: "border-pink-400", emoji: "🌟" },
  { name: "Chen Wei", country: "🇨🇳", fund: 100000, color: "border-indigo-400", emoji: "💫" },
  { name: "Sophie Martin", country: "🇫🇷", fund: 100000, color: "border-orange-400", emoji: "🌈" },
  { name: "Raj Patel", country: "🇮🇳", fund: 100000, color: "border-teal-400", emoji: "🔮" },
  { name: "Emma Wilson", country: "🇬🇧", fund: 100000, color: "border-cyan-400", emoji: "💡" },
  { name: "Hans Mueller", country: "🇩🇪", fund: 100000, color: "border-lime-400", emoji: "🌠" },
  { name: "Isabella Silva", country: "🇧🇷", fund: 100000, color: "border-emerald-400", emoji: "🏆" },
  { name: "Ahmed Hassan", country: "🇪🇬", fund: 100000, color: "border-rose-400", emoji: "💰" },
  { name: "Olga Petrov", country: "🇷🇺", fund: 100000, color: "border-violet-400", emoji: "📈" },
  { name: "Carlos Mendez", country: "🇦🇷", fund: 100000, color: "border-amber-400", emoji: "🎯" },
  { name: "Priya Sharma", country: "🇮🇳", fund: 100000, color: "border-fuchsia-400", emoji: "💪" },
  { name: "David Kim", country: "🇰🇷", fund: 100000, color: "border-sky-400", emoji: "🌊" },
  { name: "Sarah Thompson", country: "🇨🇦", fund: 100000, color: "border-slate-400", emoji: "❄️" },
  { name: "Marco Rossi", country: "🇮🇹", fund: 100000, color: "border-zinc-400", emoji: "🍕" },
  { name: "Aisha Okafor", country: "🇳🇬", fund: 100000, color: "border-stone-400", emoji: "🌍" },
  { name: "Luis Rodriguez", country: "🇲🇽", fund: 100000, color: "border-neutral-400", emoji: "🌮" },
  { name: "Elena Kozlov", country: "🇺🇦", fund: 100000, color: "border-gray-400", emoji: "🌻" },
  { name: "Hiroshi Sato", country: "🇯🇵", fund: 100000, color: "border-red-300", emoji: "🎌" },
  { name: "Anna Kowalski", country: "🇵🇱", fund: 100000, color: "border-blue-300", emoji: "🌷" },
  { name: "Mohammed Ali", country: "🇦🇪", fund: 100000, color: "border-green-300", emoji: "🏜️" },
]

export function SocialProfiles() {
  return (
    <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-400/30 backdrop-blur-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-white flex items-center">
          <Users className="w-6 h-6 mr-2 text-blue-400" />
          Social Profiles
          <motion.div
            animate={{
              y: [0, -5, 0],
            }}
            transition={{
              repeat: Number.POSITIVE_INFINITY,
              duration: 2,
              repeatType: "loop",
            }}
            className="ml-2"
          >
            👥
          </motion.div>
        </CardTitle>
        <div className="text-xs text-blue-300 bg-blue-500/20 px-2 py-1 rounded-full flex items-center">
          <Activity className="w-3 h-3 mr-1" />
          Live Trading
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[60vh] md:max-h-96 overflow-y-auto pr-1 -mr-1">
          {socialProfiles.map((profile, index) => (
            <motion.div
              key={profile.name}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{
                scale: 1.05,
                boxShadow: `0 0 15px ${profile.color.replace("border-", "rgb(").replace("-400", ")")}`,
              }}
              className={`p-3 bg-blue-800/20 rounded-lg border-2 ${profile.color} hover:bg-blue-700/30 transition-all duration-300`}
            >
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xl">{profile.country}</span>
                <span className="text-white font-medium text-sm truncate">{profile.name}</span>
                <motion.span
                  animate={{
                    rotate: [0, 10, 0, -10, 0],
                    scale: [1, 1.2, 1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 3 + (index % 3),
                    repeatType: "loop",
                  }}
                >
                  {profile.emoji}
                </motion.span>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-green-400 font-bold text-sm">${profile.fund.toLocaleString()}</div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-3 h-3 text-yellow-400" />
                  <span className="text-xs text-blue-300">AI Trader</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
