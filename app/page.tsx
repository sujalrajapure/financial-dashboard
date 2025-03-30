"use client"
import { MarqueeScroller } from "@/components/marquee-scroller"
import { DashboardHero } from "@/components/dashboard/dashboard-hero"
import { MarketOverview } from "@/components/dashboard/market-overview"
import { PortfolioSummary } from "@/components/dashboard/portfolio-summary"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { TopStocks } from "@/components/dashboard/top-stocks"

export default function Home() {
  return (
    <div className="min-h-screen text-green-400 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-bg.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-500/10 to-transparent"></div>
      </div>

      {/* Ticker */}
      <div className="border-b border-green-500/30 bg-[#0a0a14] py-2 relative z-10">
        <MarqueeScroller />
      </div>

      {/* Main content */}
      <div className="container mx-auto p-4 relative z-10">
        {/* Hero section */}
        <DashboardHero />

        {/* Market overview and portfolio summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <div className="lg:col-span-2">
            <MarketOverview />
          </div>
          <div>
            <PortfolioSummary />
          </div>
        </div>

        {/* Top stocks and recent activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TopStocks />
          </div>
          <div>
            <RecentActivity />
          </div>
        </div>
      </div>

      {/* Money animation */}
      <div className="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-0 opacity-20">
        <div className="absolute bottom-0 left-1/4 animate-float-slow">
          <div className="w-16 h-8 bg-green-500 rounded-sm flex items-center justify-center text-black font-bold">
            ₹
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 animate-float-medium">
          <div className="w-16 h-8 bg-green-500 rounded-sm flex items-center justify-center text-black font-bold">
            ₹
          </div>
        </div>
        <div className="absolute bottom-0 left-3/4 animate-float-fast">
          <div className="w-16 h-8 bg-green-500 rounded-sm flex items-center justify-center text-black font-bold">
            ₹
          </div>
        </div>
      </div>
    </div>
  )
}

