
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltipContent, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DollarSign, Users, ListCollapse, TrendingUp, Zap, ArrowLeft, Loader2, AlertTriangle } from "lucide-react";
import { useState, useEffect, use } from 'react';
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

const chartConfig = {
  close: { // Updated from 'value' to 'close'
    label: "Fund Value (Close Price)", 
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

type PerformanceDataPoint = { date: string; close: number }; // Updated from 'value' to 'close'

const formatDateForDisplay = (tickItem: string | number) => {
  if (typeof tickItem === 'string') {
    try {
      const dateStr = tickItem.includes(' ') ? tickItem.replace(' ', 'T') : tickItem;
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) {
        return String(tickItem); 
      }
      return date.toLocaleDateString(undefined, { month: 'short', year: '2-digit' });
    } catch (e) {
      return String(tickItem); 
    }
  }
  return String(tickItem);
};

const formatTooltipLabel = (label: string | number) => {
  if (typeof label === 'string') {
    try {
      const dateStr = label.includes(' ') ? label.replace(' ', 'T') : label;
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) { 
        return String(label); 
      }
      return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: '2-digit' });
    } catch (e) {
      return String(label);
    }
  }
  return String(label);
};


export default function FundDetailPage({ params: paramsProp }: { params: { fundId: string } | Promise<{ fundId: string }> }) {
  const [isMounted, setIsMounted] = useState(false);
  const [chartData, setChartData] = useState<PerformanceDataPoint[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(true);
  const [chartError, setChartError] = useState<string | null>(null);
  
  const resolvedParams = use(paramsProp as { fundId: string } | Promise<{ fundId: string }>); 

  const fundId = resolvedParams.fundId;
  const fundDetails = fundsDetailsMap[fundId] || defaultFundDetails;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsLoadingChart(true);
    setChartError(null); 
    console.log("[Chart Data] Fetching from /data/rebalancing_50_50_7d.json");
    fetch('/data/rebalancing_50_50_7d.json')
      .then(response => {
        if (!response.ok) {
          console.error("[Chart Data] Network response was not ok:", response.statusText);
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(data => {
        console.log("[Chart Data] Raw fetched data:", data);

        if (Array.isArray(data)) {
          if (data.length > 0 && data[0] && typeof data[0].date !== 'undefined' && typeof data[0].close !== 'undefined') {
            console.log("[Chart Data] Data appears valid.");
            
            let processedData = data as PerformanceDataPoint[];
            const MAX_POINTS = 250; // Target maximum number of points for the chart
            
            if (processedData.length > MAX_POINTS) {
              console.log(`[Chart Data] Original data has ${processedData.length} points. Downsampling to ~${MAX_POINTS}.`);
              const factor = Math.ceil(processedData.length / MAX_POINTS);
              processedData = processedData.filter((_, index) => index % factor === 0);
              console.log(`[Chart Data] Downsampled data has ${processedData.length} points.`);
            }
            
            setChartData(processedData);
            setChartError(null);
          } else if (data.length === 0) {
            const emptyMsg = "Fetched data is an empty array. No performance data to display.";
            console.warn(`[Chart Data] ${emptyMsg}`);
            setChartData([]);
            setChartError(emptyMsg);
          } else {
            const missingProps = [];
            if (typeof data[0]?.date === 'undefined') missingProps.push("'date'");
            if (typeof data[0]?.close === 'undefined') missingProps.push("'close'"); // Updated from 'value'
            const errorMsg = `Fetched data is an array, but items do not have expected ${missingProps.join(' and ')} properties. First item: ${JSON.stringify(data[0])}`;
            console.warn(`[Chart Data] ${errorMsg}`);
            setChartData([]);
            setChartError(errorMsg);
          }
        } else {
          const errorMsg = `Fetched data is not an array. Received: ${typeof data}, ${JSON.stringify(data)}`;
          console.warn(`[Chart Data] ${errorMsg}`);
          setChartData([]);
          setChartError(errorMsg);
        }
      })
      .catch(error => {
        const errorMsg = `Failed to fetch or process fund performance data: ${error.message}`;
        console.error(`[Chart Data] ${errorMsg}`);
        setChartData([]); 
        setChartError(errorMsg);
      })
      .finally(() => {
        setIsLoadingChart(false);
        console.log("[Chart Data] Finished loading chart data attempt.");
      });
  }, []); // Removed fundId from dependency array as data source is static


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

      <section>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-primary" />
              Performance Data
            </CardTitle>
            <CardDescription>Historical performance data (from static JSON: rebalancing_50_50_7d.json).</CardDescription>
          </CardHeader>
          <CardContent className="h-[350px] w-full p-0">
            {isLoadingChart ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="ml-2 text-muted-foreground">Loading chart data...</p>
              </div>
            ) : chartData.length > 0 ? (
              <ChartContainer config={chartConfig} className="h-full w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{ top: 5, right: 20, left: -20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis 
                      dataKey="date" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                      interval="preserveStartEnd"
                      tickFormatter={formatDateForDisplay}
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
                      content={<ChartTooltipContent indicator="dot" />}
                      labelFormatter={formatTooltipLabel}
                    />
                    <Legend content={<ChartLegendContent />} />
                    <Area
                      type="monotone"
                      dataKey="close" 
                      stroke="hsl(var(--primary))"
                      fill="hsla(var(--primary), 0.2)"
                      strokeWidth={2}
                      dot={false}          // Ensure dots are not rendered
                      activeDot={false}    // Ensure active dots are not rendered
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <AlertTriangle className="h-10 w-10 text-destructive mb-2" />
                <p className="text-lg font-semibold text-destructive">No performance data available.</p>
                {chartError && (
                  <p className="text-sm text-muted-foreground mt-1 max-w-md">{chartError}</p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </section>

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
