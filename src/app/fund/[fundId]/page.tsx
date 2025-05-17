
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Users, ListCollapse, TrendingUp, Zap, ArrowLeft } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";
import { useState, useEffect } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";

// Mock data for fund details - this would ideally come from a service based on fundId
const fundsDetailsMap: { [key: string]: { name: string; aum: string; aumChange: string; userShare: string; userShareTokens: string; } } = {
  btc: { name: "Bitcoin Fund", aum: "$6,500,820.75", aumChange: "+4.8% from last month", userShare: "$2,105.50", userShareTokens: "0.0321 BTC Token" },
  eth: { name: "Ethereum Fund", aum: "$3,210,400.10", aumChange: "+3.5% from last month", userShare: "$1,530.20", userShareTokens: "0.428 ETH Token" },
  sol: { name: "Solana Fund", aum: "$1,850,600.90", aumChange: "+6.1% from last month", userShare: "$970.00", userShareTokens: "5.62 SOL Token" },
  dff: { name: "Digital Future Fund", aum: "$2,115,750.00", aumChange: "+2.9% from last month", userShare: "$750.40", userShareTokens: "6.08 DFF Token" },
  aia: { name: "AI Agents Fund", aum: "$980,300.25", aumChange: "+7.3% from last month", userShare: "$420.90", userShareTokens: "4.73 AIA Token" },
};

const defaultFundDetails = {
  name: "Selected Fund", aum: "$1,000,000.00", aumChange: "+0.0% from last month", userShare: "$0.00", userShareTokens: "0.00 TST Token"
};


const mockFundPerformanceData = [
  { date: "Jan '23", value: 10000 },
  { date: "Feb '23", value: 10500 },
  { date: "Mar '23", value: 11000 },
  { date: "Apr '23", value: 12000 },
  { date: "May '23", value: 11800 },
  { date: "Jun '23", value: 12500 },
  { date: "Jul '23", value: 13000 },
  { date: "Aug '23", value: 13200 },
  { date: "Sep '23", value: 12800 },
  { date: "Oct '23", value: 13500 },
  { date: "Nov '23", value: 14000 },
  { date: "Dec '23", value: 14500 },
];

const chartConfig = {
  value: {
    label: "Fund Value",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const mockTransactions = [
  { id: "TX001", date: "2024-07-20", type: "Deposit", amount: "2.5 Units", status: "Completed" },
  { id: "TX002", date: "2024-07-18", type: "Withdrawal", amount: "0.5 Units", status: "Completed" },
  { id: "TX003", date: "2024-07-15", type: "Investment Rebalance", amount: "Internal Transfer", status: "Completed" },
  { id: "TX004", date: "2024-07-12", type: "Fee", amount: "0.01 Units", status: "Completed" },
  { id: "TX005", date: "2024-07-10", type: "Deposit", amount: "5.0 Units", status: "Pending" },
];

export default function FundDetailPage({ params }: { params: { fundId: string } }) {
  const [isMounted, setIsMounted] = useState(false);
  const fundId = params.fundId;
  const fundDetails = fundsDetailsMap[fundId] || defaultFundDetails;


  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="flex items-center mb-6">
            <Button variant="outline" size="icon" asChild className="mr-4">
                <Link href="/fund-overview"><ArrowLeft className="h-4 w-4" /></Link>
            </Button>
            <div className="animate-pulse">
                <div className="h-8 w-48 bg-muted rounded mb-2"></div>
                <div className="h-4 w-64 bg-muted rounded"></div>
            </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-6 w-1/2 bg-muted rounded"></div>
                <div className="h-8 w-8 bg-muted rounded-full"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-3/4 bg-muted rounded mb-2"></div>
                <div className="h-4 w-1/2 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-1/3 bg-muted rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="h-64 w-full bg-muted rounded"></div>
          </CardContent>
        </Card>

        <Card className="animate-pulse">
          <CardHeader>
            <div className="h-6 w-1/4 bg-muted rounded"></div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[1,2,3,4,5].map(i => ( <div key={i} className="h-10 w-full bg-muted rounded"></div> ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  const fundName = fundDetails.name || `${fundId.toUpperCase()} Fund`;

  return (
    <div className="space-y-8">
      <header className="flex items-center mb-6">
        <Button variant="outline" size="icon" asChild className="mr-4 hover:bg-accent transition-colors">
            <Link href="/fund-overview" aria-label="Back to all funds">
                <ArrowLeft className="h-5 w-5" />
            </Link>
        </Button>
        <div>
            <h1 className="text-4xl font-bold tracking-tight text-primary">{fundName} Overview</h1>
            <p className="text-lg text-muted-foreground mt-1">
            Track your investments and {fundName.toLowerCase()} performance.
            </p>
        </div>
      </header>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value Locked (TVL)</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fundDetails.aum}</div>
            <p className="text-xs text-muted-foreground">{fundDetails.aumChange}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Share (Mock)</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{fundDetails.userShare}</div>
            <p className="text-xs text-muted-foreground">Equivalent to {fundDetails.userShareTokens}</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Fund Strategy</CardTitle>
            <ListCollapse className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold">{fundId.toUpperCase()} Focused</div>
            <p className="text-xs text-muted-foreground">Concentrated exposure to {fundName.toLowerCase()}</p>
          </CardContent>
        </Card>
      </section>

      {/* Fund Performance Chart */}
      <section>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-primary" />
              {fundName} Performance
            </CardTitle>
            <CardDescription>Monthly fund value over the past year (mock data).</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full p-0">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={mockFundPerformanceData}
                  margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))" 
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value / 1000}k`}
                  />
                  <Tooltip
                    cursor={{ fill: "hsla(var(--accent), 0.1)" }}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Legend content={<ChartLegendContent />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="hsl(var(--primary))"
                    fill="hsla(var(--primary), 0.2)"
                    strokeWidth={2}
                    dot={{
                      r: 4,
                      fill: "hsl(var(--primary))",
                      stroke: "hsl(var(--background))",
                      strokeWidth: 2,
                    }}
                    activeDot={{
                      r: 6,
                      fill: "hsl(var(--primary))",
                      stroke: "hsl(var(--background))",
                      strokeWidth: 2,
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </section>

      {/* Recent Transactions Table */}
      <section>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Zap className="h-6 w-6 mr-2 text-primary" />
              Recent Transactions (Mock)
            </CardTitle>
            <CardDescription>A log of recent activities related to your account in this fund.</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount/Details</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.date}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell className={`text-right font-semibold ${tx.status === "Completed" ? "text-green-400" : "text-yellow-400"}`}>
                      {tx.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

    