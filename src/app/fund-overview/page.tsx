
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
        <h1 className="text-4xl font-bold tracking-tight text-primary">Explore our products</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-3xl mx-auto">
          CryptoIndexFund funds aim to capture future-forward investment opportunities and represent potential growth areas in our constantly evolving world.
        </p>
      </header>

      <Tabs defaultValue="single-coin" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-8 max-w-xl mx-auto">
          <TabsTrigger value="single-coin" className="text-xl py-4 data-[state=active]:shadow-lg">Single Coin Funds</TabsTrigger>
          <TabsTrigger value="sector-funds" className="text-xl py-4 data-[state=active]:shadow-lg">Sector Funds</TabsTrigger>
        </TabsList>
        
        <TabsContent value="single-coin">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {singleCoinFunds.map((fund) => (
              <Card key={fund.id} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-md mt-1">
                      <fund.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-foreground">{fund.ticker}</h2>
                      <h4 className="text-md font-semibold text-muted-foreground">{fund.name}</h4>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between pt-0">
                  <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[60px]">{fund.description}</p>
                  <div className="space-y-4 mt-auto">
                    <div>
                      <p className="text-xs text-muted-foreground/80">Market Price</p>
                      <h4 className="text-2xl font-bold text-primary">{fund.marketPrice}</h4>
                    </div>
                    <div className="flex items-center justify-between">
                      <Button asChild className="w-auto">
                        <Link href={fund.href}>View Details</Link>
                      </Button>
                       <p className="text-xs text-muted-foreground/80">As of {fund.asOfDate}</p>
                    </div>
                    <p className="text-xs text-muted-foreground/70 text-center mt-1 italic">Detailed fund page coming soon!</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sector-funds">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Sector funds often look better in a 2-col layout on larger screens */}
            {sectorFunds.map((fund) => (
             <Card key={fund.id} className="shadow-lg hover:shadow-primary/20 transition-shadow duration-300 flex flex-col bg-card/80 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex items-start space-x-4">
                    <div className="p-2 bg-primary/10 rounded-md mt-1">
                      <fund.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-3xl font-bold text-foreground">{fund.ticker}</h2>
                      <h4 className="text-md font-semibold text-muted-foreground">{fund.name}</h4>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-between pt-0">
                  <p className="text-sm text-muted-foreground mb-4 flex-grow min-h-[60px]">{fund.description}</p>
                  <div className="space-y-4 mt-auto">
                    <div>
                      <p className="text-xs text-muted-foreground/80">Market Price</p>
                      <h4 className="text-2xl font-bold text-primary">{fund.marketPrice}</h4>
                    </div>
                     <div className="flex items-center justify-between">
                      <Button asChild className="w-auto">
                        <Link href={fund.href}>View Details</Link>
                      </Button>
                       <p className="text-xs text-muted-foreground/80">As of {fund.asOfDate}</p>
                    </div>
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

    