
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Layers, Zap, Briefcase, Cpu, type LucideIcon } from "lucide-react";
import Link from "next/link";

interface Fund {
  id: string;
  ticker: string;
  name: string;
  description: string;
  marketPrice: string;
  asOfDate: string;
  icon: LucideIcon;
  category: "single-coin" | "sector";
  href: string;
}

const fundsData: Fund[] = [
  {
    id: "btc",
    ticker: "BTC",
    name: "BTC Fund",
    description: "Focused investment in Bitcoin, the leading cryptocurrency, aiming for long-term capital appreciation.",
    marketPrice: "$65,432.10",
    asOfDate: "05/18/2025",
    icon: DollarSign,
    category: "single-coin",
    href: "/fund/btc"
  },
  {
    id: "eth",
    ticker: "ETH",
    name: "ETH Fund",
    description: "Exposure to Ethereum, the backbone of decentralized applications and smart contracts.",
    marketPrice: "$3,567.89",
    asOfDate: "05/18/2025",
    icon: Layers,
    category: "single-coin",
    href: "/fund/eth"
  },
  {
    id: "sol",
    ticker: "SOL",
    name: "Solana Fund",
    description: "Investing in Solana, a high-performance blockchain known for its speed and scalability.",
    marketPrice: "$172.45",
    asOfDate: "05/18/2025",
    icon: Zap,
    category: "single-coin",
    href: "/fund/sol"
  },
  {
    id: "dff",
    ticker: "DFF",
    name: "Digital Future Fund",
    description: "A diversified portfolio targeting key growth areas in the digital asset ecosystem, including Web3 and Metaverse.",
    marketPrice: "$123.45",
    asOfDate: "05/18/2025",
    icon: Briefcase,
    category: "sector",
    href: "/fund/dff"
  },
  {
    id: "aia",
    ticker: "AIA",
    name: "AI Agents Fund",
    description: "Investment in projects at the intersection of Artificial Intelligence and blockchain technology.",
    marketPrice: "$88.90",
    asOfDate: "05/18/2025",
    icon: Cpu,
    category: "sector",
    href: "/fund/aia"
  },
];

export default function FundOverviewPage() {
  const singleCoinFunds = fundsData.filter(fund => fund.category === 'single-coin');
  const sectorFunds = fundsData.filter(fund => fund.category === 'sector');

  return (
    <div className="space-y-12">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">Investment Products</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Explore our curated selection of crypto index funds designed for diverse investment strategies.
        </p>
      </header>

      <Tabs defaultValue="single-coin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="single-coin" className="text-lg py-3">Single Coin Funds</TabsTrigger>
          <TabsTrigger value="sector-funds" className="text-lg py-3">Sector Funds</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single-coin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {singleCoinFunds.map((fund) => (
              <Card key={fund.id} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <fund.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{fund.ticker}</CardTitle>
                  <CardDescription className="text-sm font-semibold">{fund.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground text-sm mb-4 flex-grow min-h-[60px]">{fund.description}</p>
                  <div className="mt-auto">
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground">Market Price</p>
                      <p className="text-xl font-bold text-primary">{fund.marketPrice}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={fund.href}>View Details</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">As of {fund.asOfDate}</p>
                    <p className="text-xs text-muted-foreground/70 text-center mt-1 italic">Detailed fund page coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sector-funds">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sectorFunds.map((fund) => (
              <Card key={fund.id} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col">
                <CardHeader className="items-center text-center">
                   <div className="p-3 bg-primary/10 rounded-full mb-3">
                    <fund.icon className="h-10 w-10 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">{fund.ticker}</CardTitle>
                  <CardDescription className="text-sm font-semibold">{fund.name}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between">
                  <p className="text-muted-foreground text-sm mb-4 flex-grow min-h-[60px]">{fund.description}</p>
                   <div className="mt-auto">
                    <div className="mb-4">
                      <p className="text-xs text-muted-foreground">Market Price</p>
                      <p className="text-xl font-bold text-primary">{fund.marketPrice}</p>
                    </div>
                    <Button asChild className="w-full">
                      <Link href={fund.href}>View Details</Link>
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-2">As of {fund.asOfDate}</p>
                     <p className="text-xs text-muted-foreground/70 text-center mt-1 italic">Detailed fund page coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
