"use client"

import { Calendar, ExternalLink } from "lucide-react"

export function MarketNews() {
  return (
    <div className="space-y-4">
      {newsData.map((news, index) => (
        <div
          key={index}
          className="p-4 border border-green-500/30 rounded-lg hover:bg-green-500/5 transition-colors cursor-pointer"
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-medium text-green-400">{news.title}</h3>
            <span className="text-xs text-green-400/70 flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {news.date}
            </span>
          </div>
          <p className="text-sm text-green-400/70 mb-2">{news.summary}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">{news.source}</span>
            <a href="#" className="text-xs text-green-500 flex items-center gap-1 hover:underline">
              Read more <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      ))}
    </div>
  )
}

const newsData = [
  {
    title: "RBI Keeps Repo Rate Unchanged at 6.5%",
    date: "Apr 30, 2024",
    summary:
      "The Reserve Bank of India's Monetary Policy Committee has decided to keep the repo rate unchanged at 6.5% for the seventh consecutive time, maintaining its stance on withdrawal of accommodation.",
    source: "Economic Times",
  },
  {
    title: "Sensex Hits New All-Time High, Crosses 72,500",
    date: "Apr 29, 2024",
    summary:
      "The BSE Sensex touched a new all-time high, crossing the 72,500 mark for the first time, driven by strong buying in banking and energy stocks amid positive global cues.",
    source: "Business Standard",
  },
  {
    title: "FIIs Turn Net Buyers in April After Three Months",
    date: "Apr 28, 2024",
    summary:
      "Foreign Institutional Investors (FIIs) have turned net buyers in the Indian equity market in April after being net sellers for three consecutive months, pumping in over ₹15,000 crore.",
    source: "Moneycontrol",
  },
  {
    title: "Government Approves 8.15% Interest Rate on EPF for FY24",
    date: "Apr 27, 2024",
    summary:
      "The government has approved 8.15% interest rate on Employees' Provident Fund (EPF) for 2023-24, benefiting over six crore subscribers of the retirement fund body EPFO.",
    source: "Financial Express",
  },
  {
    title: "IT Sector Faces Headwinds as Global Tech Spending Slows",
    date: "Apr 26, 2024",
    summary:
      "Indian IT companies are facing challenges as global corporations cut back on technology spending. Major IT firms have reported slower growth in the last quarter and have revised their guidance downward.",
    source: "Mint",
  },
]

