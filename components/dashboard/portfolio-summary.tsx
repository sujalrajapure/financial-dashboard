"use client"

import { ArrowDown, ArrowUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function PortfolioSummary() {
  return (
    <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-400">Portfolio Summary</CardTitle>
        <CardDescription className="text-green-400/70">Your investment breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-green-400">Invested</span>
              <span className="text-sm font-medium text-green-400">₹3,500 Cr</span>
            </div>
            <Progress value={70} className="h-2 bg-green-500/20" indicatorClassName="bg-green-500" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-green-400">Returns</span>
              <span className="text-sm font-medium text-green-500">₹1,500 Cr (+42.8%)</span>
            </div>
            <Progress value={30} className="h-2 bg-green-500/20" indicatorClassName="bg-green-500" />
          </div>

          <div className="pt-2 space-y-2">
            <h4 className="text-sm font-medium text-green-400">Top Performers</h4>

            <div className="flex items-center justify-between p-2 rounded-md bg-green-500/5">
              <div>
                <div className="font-medium text-green-400">Reliance</div>
                <div className="text-xs text-green-400/70">Energy</div>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUp className="h-3 w-3" />
                <span>68.5%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md bg-green-500/5">
              <div>
                <div className="font-medium text-green-400">HDFC Bank</div>
                <div className="text-xs text-green-400/70">Banking</div>
              </div>
              <div className="flex items-center gap-1 text-green-500">
                <ArrowUp className="h-3 w-3" />
                <span>42.3%</span>
              </div>
            </div>

            <h4 className="text-sm font-medium text-green-400 pt-2">Underperformers</h4>

            <div className="flex items-center justify-between p-2 rounded-md bg-red-500/5">
              <div>
                <div className="font-medium text-green-400">Infosys</div>
                <div className="text-xs text-green-400/70">IT</div>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                <ArrowDown className="h-3 w-3" />
                <span>12.8%</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-2 rounded-md bg-red-500/5">
              <div>
                <div className="font-medium text-green-400">Bharti Airtel</div>
                <div className="text-xs text-green-400/70">Telecom</div>
              </div>
              <div className="flex items-center gap-1 text-red-500">
                <ArrowDown className="h-3 w-3" />
                <span>8.5%</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

