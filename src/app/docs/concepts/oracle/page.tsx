"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function OracleConceptPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Oracle Concepts</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Learn about the price oracles used by CryptoIndexFund.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Oracle Integration</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This page will explain how oracles provide reliable and tamper-resistant pricing data
            to the CryptoIndexFund platform. This data is crucial for fund valuation, rebalancing,
            and other critical operations. We will discuss the types of oracles used and their
            security considerations.
            Content coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
