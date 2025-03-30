"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PerformanceAnalytics } from "@/components/analytics/performance-analytics"
import { SectorAnalytics } from "@/components/analytics/sector-analytics"
import { RiskAnalytics } from "@/components/analytics/risk-analytics"
import { ComparisonAnalytics } from "@/components/analytics/comparison-analytics"

export default function AnalyticsPage() {
  return (
    <div className="container mx-auto p-4 text-green-400">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-bg.svg')] bg-repeat"></div>
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-green-500/10 to-transparent"></div>
      </div>

      <div className="flex flex-col gap-6">
        {/* Analytics header */}
        <div>
          <h1 className="text-3xl font-bold text-green-500">Portfolio Analytics</h1>
          <p className="text-green-400/70">Advanced insights and analysis of your investments</p>
        </div>

        {/* Analytics tabs */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="bg-[#0f1117] border border-green-500/30 w-full justify-start">
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="sectors"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Sectors
            </TabsTrigger>
            <TabsTrigger
              value="risk"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Risk Analysis
            </TabsTrigger>
            <TabsTrigger
              value="comparison"
              className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
            >
              Benchmark Comparison
            </TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="mt-6">
            <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-400">Performance Analytics</CardTitle>
                <CardDescription className="text-green-400/70">
                  Historical performance of your portfolio
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PerformanceAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sectors" className="mt-6">
            <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-400">Sector Analysis</CardTitle>
                <CardDescription className="text-green-400/70">Breakdown of your investments by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <SectorAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="mt-6">
            <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-400">Risk Analysis</CardTitle>
                <CardDescription className="text-green-400/70">Volatility and risk metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <RiskAnalytics />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="mt-6">
            <Card className="bg-[#0f1117] border-green-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
              <CardHeader className="pb-2">
                <CardTitle className="text-green-400">Benchmark Comparison</CardTitle>
                <CardDescription className="text-green-400/70">
                  Compare your portfolio against market indices
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ComparisonAnalytics />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

