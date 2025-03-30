"use client"

import { DollarSign, TrendingDown, TrendingUp } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function RecentActivity() {
  return (
    <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
      <CardHeader className="pb-2">
        <CardTitle className="text-green-400">Recent Activity</CardTitle>
        <CardDescription className="text-green-400/70">Latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-3 p-2 rounded-md hover:bg-green-500/5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activity.type === "buy"
                    ? "bg-green-500/20"
                    : activity.type === "sell"
                      ? "bg-red-500/20"
                      : "bg-blue-500/20"
                }`}
              >
                {activity.type === "buy" ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : activity.type === "sell" ? (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                ) : (
                  <DollarSign className="h-4 w-4 text-blue-500" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium text-green-400">{activity.description}</p>
                  <p
                    className={`text-sm ${
                      activity.type === "buy"
                        ? "text-green-500"
                        : activity.type === "sell"
                          ? "text-red-500"
                          : "text-blue-500"
                    }`}
                  >
                    {activity.type === "buy" ? "-" : activity.type === "sell" ? "+" : ""}₹{activity.amount}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-green-400/70">{activity.time}</p>
                  <p className="text-xs text-green-400/70">{activity.status}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const recentActivity = [
  {
    type: "buy",
    description: "Bought Reliance Industries",
    amount: "125,000",
    time: "10:30 AM",
    status: "Completed",
  },
  {
    type: "sell",
    description: "Sold Infosys",
    amount: "72,500",
    time: "11:15 AM",
    status: "Completed",
  },
  {
    type: "dividend",
    description: "Dividend from HDFC Bank",
    amount: "12,500",
    time: "12:00 PM",
    status: "Credited",
  },
  {
    type: "buy",
    description: "Bought Tata Motors",
    amount: "85,000",
    time: "2:45 PM",
    status: "Completed",
  },
  {
    type: "sell",
    description: "Sold Bharti Airtel",
    amount: "47,500",
    time: "3:30 PM",
    status: "Completed",
  },
]

