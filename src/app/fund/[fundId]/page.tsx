
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ChartContainer, ChartTooltipContent, ChartLegendContent, type ChartConfig } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, ArrowLeft, Loader2, AlertTriangle, Info, Percent, Sigma, Activity } from "lucide-react"; // Added new icons
import { useState, useEffect, use } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface FundMetric {
  value: string;
  label: string;
  asOfDate: string;
  icon: React.ElementType;
}

interface FundDetail {
  name: string;
  strategy: string;
  tokenPrice: FundMetric;
  sharpeRatio: FundMetric;
  entrySensitivity: FundMetric;
}

// Mock data for fund details - updated structure
const fundsDetailsMap: { [key: string]: FundDetail } = {
  btc: { 
    name: "Bitcoin Fund", 
    strategy: "The Bitcoin Fund is solely and passively invested in Bitcoin. Its investment objective is to reflect the value of Bitcoin held by the Trust, less expenses and other liabilities. Bitcoin is a digital asset that is created and transmitted through the operations of the peer-to-peer Bitcoin Network, a decentralized network of computers that operates on cryptographic protocols.",
    tokenPrice: { value: "$65,432.10", label: "Current Fund Token Price", asOfDate: "05/21/2025", icon: DollarSignIcon },
    sharpeRatio: { value: "1.85", label: "Sharpe Ratio (Annualized)", asOfDate: "05/21/2025", icon: Sigma},
    entrySensitivity: { value: "Low", label: "Entry Sensitivity", asOfDate: "05/21/2025", icon: Activity }
  },
  eth: { 
    name: "Ethereum Fund", 
    strategy: "The Ethereum Fund provides exposure to Ethereum, the backbone of decentralized applications and smart contracts. It aims to track ETH performance, reflecting its utility in transaction fees (gas) and as collateral in DeFi.",
    tokenPrice: { value: "$3,567.89", label: "Current Fund Token Price", asOfDate: "05/21/2025", icon: DollarSignIcon },
    sharpeRatio: { value: "2.10", label: "Sharpe Ratio (Annualized)", asOfDate: "05/21/2025", icon: Sigma },
    entrySensitivity: { value: "Medium", label: "Entry Sensitivity", asOfDate: "05/21/2025", icon: Activity }
  },
  sol: { 
    name: "Solana Fund", 
    strategy: "The Solana Fund invests in SOL, the native token of the Solana blockchain, known for its high throughput and scalability. The strategy focuses on capturing growth from Solana's expanding ecosystem of dApps and NFT marketplaces.",
    tokenPrice: { value: "$172.45", label: "Current Fund Token Price", asOfDate: "05/21/2025", icon: DollarSignIcon },
    sharpeRatio: { value: "1.95", label: "Sharpe Ratio (Annualized)", asOfDate: "05/21/2025", icon: Sigma },
    entrySensitivity: { value: "High", label: "Entry Sensitivity", asOfDate: "05/21/2025", icon: Activity }
  },
  dff: { 
    name: "Digital Future Fund", 
    strategy: "The Digital Future Fund is a diversified portfolio targeting key growth areas in the digital asset ecosystem, including Web3 infrastructure, Metaverse platforms, and decentralized identity solutions. It aims for broad exposure to innovative blockchain technologies.",
    tokenPrice: { value: "$123.45", label: "Current Fund Token Price", asOfDate: "05/21/2025", icon: DollarSignIcon },
    sharpeRatio: { value: "N/A", label: "Sharpe Ratio (Annualized)", asOfDate: "05/21/2025", icon: Sigma },
    entrySensitivity: { value: "Medium", label: "Entry Sensitivity", asOfDate: "05/21/2025", icon: Activity }
  },
  aia: { 
    name: "AI Agents Fund", 
    strategy: "The AI Agents Fund invests in projects at the intersection of Artificial Intelligence and blockchain, focusing on decentralized AI marketplaces, AI-powered oracles, and autonomous agent technologies. The fund seeks to capitalize on the synergy between AI and Web3.",
    tokenPrice: { value: "$88.90", label: "Current Fund Token Price", asOfDate: "05/21/2025", icon: DollarSignIcon },
    sharpeRatio: { value: "N/A", label: "Sharpe Ratio (Annualized)", asOfDate: "05/21/2025", icon: Sigma },
    entrySensitivity: { value: "High", label: "Entry Sensitivity", asOfDate: "05/21/2025", icon: Activity }
  },
};

// Placeholder for DollarSign icon, can be replaced with actual lucide icon
const DollarSignIcon = ({className}: {className?: string}) => <DollarSign className={className} />;


const defaultFundDetails: FundDetail = {
  name: "Selected Fund", 
  strategy: "Strategy details for this fund are currently unavailable. Please check back later or contact support for more information.",
  tokenPrice: { value: "$0.00", label: "Current Fund Token Price", asOfDate: "N/A", icon: DollarSignIcon },
  sharpeRatio: { value: "N/A", label: "Sharpe Ratio (Annualized)", asOfDate: "N/A", icon: Sigma },
  entrySensitivity: { value: "N/A", label: "Entry Sensitivity", asOfDate: "N/A", icon: Activity }
};

const chartConfig = {
  close: { 
    label: "Fund Value (Close Price)", 
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

type PerformanceDataPoint = { date: string; close: number }; 

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
    if (!fundId) return; // Don't fetch if fundId is not available

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
            const MAX_POINTS = 250; 
            
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
            if (data.length > 0 && data[0] && typeof data[0].date === 'undefined') missingProps.push("'date'");
            if (data.length > 0 && data[0] && typeof data[0].close === 'undefined') missingProps.push("'close'");
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
  }, [fundId]); // Add fundId as dependency


  if (!isMounted) {
    // Skeleton loader for initial mount
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex items-center mb-6">
            <div className="h-8 w-8 bg-muted rounded mr-4"></div>
            <div>
                <div className="h-8 w-48 bg-muted rounded mb-2"></div>
                <div className="h-4 w-64 bg-muted rounded"></div>
            </div>
        </div>
        
        <Card><CardHeader><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader><CardContent><div className="h-64 w-full bg-muted rounded"></div></CardContent></Card>
        <Card><CardHeader><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader><CardContent><div className="h-20 w-full bg-muted rounded"></div></CardContent></Card>
        <Card><CardHeader><div className="h-6 w-1/3 bg-muted rounded"></div></CardHeader><CardContent><div className="h-20 w-full bg-muted rounded"></div></CardContent></Card>
      </div>
    );
  }
  
  const fundName = fundDetails.name || `${fundId.toUpperCase()} Fund`;

  // Helper component for metric items
  const MetricItem = ({ metric }: { metric: FundMetric }) => (
    <div className="flex flex-col items-center text-center p-4 border border-border/50 rounded-lg shadow-sm hover:shadow-md transition-shadow bg-card">
      <metric.icon className="h-8 w-8 text-primary mb-2" />
      <h3 className="text-2xl font-bold text-foreground">{metric.value}</h3>
      <p className="text-sm text-muted-foreground">{metric.label}</p>
      <p className="text-xs text-muted-foreground/70 mt-1">As of {metric.asOfDate}</p>
    </div>
  );

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
            Detailed performance, strategy, and key metrics for {fundName.toLowerCase()}.
            </p>
        </div>
      </header>

      <section>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-primary" />
              Performance Data
            </CardTitle>
            <CardDescription>Historical performance data.</CardDescription>
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
                      dot={false}
                      activeDot={false}
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
              <Info className="h-6 w-6 mr-2 text-primary" />
              Investment Strategy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {fundDetails.strategy}
            </p>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Percent className="h-6 w-6 mr-2 text-primary" />
              Key Metrics
            </CardTitle>
            <CardDescription>Essential indicators for this fund.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <MetricItem metric={fundDetails.tokenPrice} />
              <MetricItem metric={fundDetails.sharpeRatio} />
              <MetricItem metric={fundDetails.entrySensitivity} />
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

    