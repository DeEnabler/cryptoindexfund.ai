"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function SecurityPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Security Information</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Learn about the security measures implemented by CryptoIndexFund.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Our Security Approach</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            At CryptoIndexFund, security is paramount. This page will cover our smart contract
            audits, on-chain security protocols, risk mitigation strategies, and best practices
            for users to protect their assets.
            Content coming soon...
          </p>
          <p className="mt-4">
            For more detailed information on specific risks, please refer to our <Link href="/docs/resources/risks" className="text-primary hover:underline">Risks</Link> section.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
