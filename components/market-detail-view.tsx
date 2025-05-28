"use client"

import type { Market } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from "lucide-react"
import { MarketCandlestick } from "@/components/market-candlestick"

function getCompanyDescription(companyName: string): string {
  const descriptions: Record<string, string> = {
    Adsterra:
      "অ্যাডস্টেরা একটি বিজ্ঞাপন নেটওয়ার্ক কোম্পানি যা ওয়েবসাইট এবং অ্যাপের জন্য বিজ্ঞাপন সেবা প্রদান করে। এটি পাবলিশার এবং বিজ্ঞাপনদাতাদের মধ্যে সেতুবন্ধন হিসেবে কাজ করে।",
    Alpha: "আলফা একটি বিনিয়োগ এবং আর্থিক সেবা প্রদানকারী কোম্পানি যা পোর্টফোলিও ম্যানেজমেন্ট এবং আর্থিক পরামর্শ সেবা দিয়ে থাকে।",
    ArrowPrime: "অ্যারো প্রাইম একটি লজিস্টিক এবং ডেলিভারি সেবা প্রদানকারী কোম্পানি যা দ্রুত এবং নির্ভরযোগ্য পণ্য সরবরাহের সেবা দেয়।",
    "Cool Agency": "কুল এজেন্সি একটি ডিজিটাল মার্কেটিং এবং বিজ্ঞাপন এজেন্সি যা ব্র্যান্ড প্রমোশন এবং অনলাইন মার্কেটিং সেবা প্রদান করে।",
    CXT: "সিএক্সটি একটি প্রযুক্তি কোম্পানি যা সফটওয়্যার সমাধান এবং ডিজিটাল সেবা প্রদান করে ব্যবসায়িক প্রতিষ্ঠানের জন্য।",
    Flooido: "ফ্লুইডো একটি ক্রিয়েটিভ ডিজাইন এজেন্সি যা গ্রাফিক্স ডিজাইন, ব্র্যান্ডিং এবং ভিজ্যুয়াল কন্টেন্ট তৈরির সেবা দেয়।",
    "Found Stock": "ফাউন্ড স্টক একটি স্টক ফটোগ্রাফি এবং মিডিয়া কোম্পানি যা উচ্চমানের ছবি এবং ভিডিও কন্টেন্ট বিক্রয় করে।",
    "Grow Co": "গ্রো কো একটি বিজনেস গ্রোথ এবং মার্কেটিং কোম্পানি যা ছোট ও মাঝারি ব্যবসার উন্নতিতে সহায়তা করে।",
    KT: "কেটি একটি টেলিকমিউনিকেশন কোম্পানি যা ইন্টারনেট, মোবাইল এবং ডিজিটাল সেবা প্রদান করে।",
    "Making m": "মেকিং এম একটি মিডিয়া এবং কন্টেন্ট প্রোডাকশন কোম্পানি যা ভিডিও, অডিও এবং ডিজিটাল কন্টেন্ট তৈরি করে।",
    Monetag: "মনেটাগ একটি বিজ্ঞাপন মনিটাইজেশন প্ল্যাটফর্ম যা ওয়েবসাইট এবং অ্যাপ থেকে আয় বৃদ্ধির সমাধান প্রদান করে।",
    "Nexus Digital": "নেক্সাস ডিজিটাল একটি ডিজিটাল মার্কেটিং এবং প্রযুক্তি কোম্পানি যা অনলাইন ব্যবসার জন্য সমন্বিত সমাধান দেয়।",
    NX: "এনএক্স একটি প্রযুক্তি কোম্পানি যা ইনোভেটিভ সফটওয়্যার এবং ডিজিটাল সমাধান তৈরি করে।",
    "O X W": "ও এক্স ডব্লিউ একটি ক্রিয়েটিভ এজেন্সি যা ব্র্যান্ডিং, ডিজাইন এবং মার্কেটিং সেবা প্রদান করে।",
    Onclicka: "অনক্লিকা একটি ডিজিটাল বিজ্ঞাপন প্ল্যাটফর্ম যা পারফরমেন্স মার্কেটিং এবং অ্যাফিলিয়েট মার্কেটিং সেবা দেয়।",
    Pikota: "পিকোটা একটি ই-কমার্স এবং অনলাইন রিটেইল কোম্পানি যা বিভিন্ন পণ্যের অনলাইন বিক্রয় করে।",
    Pinterest: "পিন্টারেস্ট একটি সামাজিক মিডিয়া প্ল্যাটফর্ম যা ভিজ্যুয়াল কন্টেন্ট শেয়ারিং এবং আবিষ্কারের জন্য ব্যবহৃত হয়।",
    Practiq: "প্র্যাক্টিক একটি প্র্যাকটিস ম্যানেজমেন্ট সফটওয়্যার কোম্পানি যা পেশাদার সেবা প্রদানকারীদের জন্য ব্যবস্থাপনা সমাধান দেয়।",
    Redfin: "রেডফিন একটি রিয়েল এস্টেট প্ল্যাটফর্ম যা অনলাইনে সম্পত্তি ক্রয়-বিক্রয় এবং রিয়েল এস্টেট সেবা প্রদান করে।",
    Renerald: "রেনেরাল্ড একটি নবায়নযোগ্য শক্তি এবং পরিবেশ বান্ধব প্রযুক্তি কোম্পানি যা সবুজ শক্তির সমাধান প্রদান করে।",
  }

  return descriptions[companyName] || "এই কোম্পানি সম্পর্কে বিস্তারিত তথ্য এখনও উপলব্ধ নেই।"
}

interface MarketDetailViewProps {
  market: Market
}

export function MarketDetailView({ market }: MarketDetailViewProps) {
  const isPositive = market.percentChange >= 0
  const isPositiveYTD = market.ytdChange >= 0

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Price Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Current Price:</span>
              <span className="font-medium">{formatCurrency(market.price)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">24h Change:</span>
              <span className={`flex items-center font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(market.percentChange)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">YTD Change:</span>
              <span className={`flex items-center font-medium ${isPositiveYTD ? "text-green-500" : "text-red-500"}`}>
                {isPositiveYTD ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
                {Math.abs(market.ytdChange)}%
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Investment Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Total Investment:</span>
              <span className="font-medium">{formatCurrency(market.investment)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily P/L:</span>
              <span className={`font-medium ${isPositive ? "text-green-500" : "text-red-500"}`}>
                {formatCurrency((market.percentChange / 100) * market.investment)}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">কোম্পানি সম্পর্কে</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">{getCompanyDescription(market.name)}</p>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">Today's Candlestick</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-48 w-full">
            <MarketCandlestick market={market} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
