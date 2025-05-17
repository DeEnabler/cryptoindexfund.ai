
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowRight, Zap, DollarSign, Layers, Cpu, Briefcase } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import AnimatedGradientText from "@/components/feature/AnimatedGradientText";

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
    href: "/fund/btc-fund"
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
    href: "/fund/eth-fund"
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
    href: "/fund/sol-fund"
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
    href: "/fund/dff-fund"
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
    href: "/fund/aia-fund"
  },
];


export default function HomePage() {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset * 0.4);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const singleCoinFunds = fundsData.filter(fund => fund.category === 'single-coin');
  const sectorFunds = fundsData.filter(fund => fund.category === 'sector');

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 shadow-xl">
        <div
          className="animated-grid-container"
          aria-hidden="true"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform'
          }}
        >
          {/* SVG Grid from previous implementation - retained */}
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.4', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 126 L0 126 L126 0 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.4', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.5', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block">Invest in the Future,</span>
            <AnimatedGradientText text="Trustlessly." className="block text-primary-foreground" />
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            CryptoIndexFund offers a decentralized crypto fund, bringing transparency and security to your investments. Join the financial revolution.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/fund-overview">
                Explore Funds <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Products Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Explore our products</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            CryptoIndexFund funds aim to capture future-forward investment opportunities and represent potential growth areas in our constantly evolving world.
          </p>
        </div>

        <Tabs defaultValue="single-coin" className="w-full max-w-4xl mx-auto">
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
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{fund.description}</p>
                    <div className="mt-auto">
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground">Market Price</p>
                        <p className="text-xl font-bold text-primary">{fund.marketPrice}</p>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={fund.href}>View Details</Link>
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">As of {fund.asOfDate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sector-funds">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8"> {/* Adjusted for typically fewer sector funds */}
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
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{fund.description}</p>
                     <div className="mt-auto">
                      <div className="mb-4">
                        <p className="text-xs text-muted-foreground">Market Price</p>
                        <p className="text-xl font-bold text-primary">{fund.marketPrice}</p>
                      </div>
                      <Button asChild className="w-full">
                        <Link href={fund.href}>View Details</Link>
                      </Button>
                      <p className="text-xs text-muted-foreground text-center mt-2">As of {fund.asOfDate}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center">
        <Card className="max-w-3xl mx-auto shadow-xl bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Ready to Invest with Confidence?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg mb-8 text-muted-foreground">
              Join CryptoIndexFund today and experience the future of decentralized fund management.
            </CardDescription>
            <Button asChild size="lg">
              <Link href="/fund-overview">
                View Our Funds <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

