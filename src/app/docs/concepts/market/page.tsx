"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function MarketConceptPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Market Concepts</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Understanding the market dynamics within CryptoIndexFund.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Market Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This page will detail the market concepts relevant to CryptoIndexFund.
            Content coming soon... This includes explanations of how different crypto assets
            are valued, market volatility, liquidity, and how these factors influence fund performance
            and rebalancing strategies.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
