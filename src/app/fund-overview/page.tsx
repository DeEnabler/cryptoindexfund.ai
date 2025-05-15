
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Users, ListCollapse, TrendingUp, Zap } from "lucide-react";
import type { ChartConfig } from "@/components/ui/chart";
import { useState, useEffect } from 'react';

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
  { id: "TX001", date: "2024-07-20", type: "Deposit", amount: "2.5 ETH", status: "Completed" },
  { id: "TX002", date: "2024-07-18", type: "Withdrawal", amount: "0.5 ETH", status: "Completed" },
  { id: "TX003", date: "2024-07-15", type: "Investment", amount: "1.0 ETH to Alpha Fund", status: "Completed" },
  { id: "TX004", date: "2024-07-12", type: "Fee", amount: "0.01 ETH", status: "Completed" },
  { id: "TX005", date: "2024-07-10", type: "Deposit", amount: "5.0 ETH", status: "Pending" },
];

export default function FundOverviewPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-8">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-muted rounded mb-4"></div>
          <div className="h-4 w-1/2 bg-muted rounded"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight text-primary">Fund Overview</h1>
        <p className="text-lg text-muted-foreground mt-2">
          Track your investments and fund performance in real-time.
        </p>
      </header>

      {/* Key Metrics */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assets Under Management</CardTitle>
            <DollarSign className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234,567.89</div>
            <p className="text-xs text-muted-foreground">+5.2% from last month</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Your Share (Mock)</CardTitle>
            <Users className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$5,678.90</div>
            <p className="text-xs text-muted-foreground">Equivalent to 12.345 TSTV Tokens</p>
          </CardContent>
        </Card>
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Funds</CardTitle>
            <ListCollapse className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Alpha, Beta, Gamma Funds</p>
          </CardContent>
        </Card>
      </section>

      {/* Fund Performance Chart */}
      <section>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-primary" />
              Fund Performance
            </CardTitle>
            <CardDescription>Monthly fund value over the past year.</CardDescription>
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
            <CardDescription>A log of recent activities related to your account.</CardDescription>
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

