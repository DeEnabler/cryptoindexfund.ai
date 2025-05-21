"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function WhatIsCryptoIndexFundPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">What is CryptoIndexFund?</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          An introduction to the CryptoIndexFund platform.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Core Mission</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            CryptoIndexFund aims to simplify cryptocurrency investment through transparent,
            decentralized index funds. We provide users with a secure and accessible way to
            gain exposure to various crypto market segments. Our platform is built on the
            principles of user empowerment, on-chain transparency, and robust security.
          </p>
          <h3 className="text-xl font-semibold mt-4 mb-2 text-primary/90">Key Features</h3>
          <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
            <li>Diversified fund options targeting various market sectors and asset classes.</li>
            <li>Transparent on-chain operations for all fund management activities.</li>
            <li>User-controlled assets via non-custodial wallets, ensuring you always own your keys.</li>
            <li>Community-driven insights and AI-powered research tools to inform your investment decisions.</li>
            <li>Competitive and clear fee structures.</li>
          </ul>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>Our Vision</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
           To be the leading platform for accessible and trustworthy decentralized crypto index investing,
           empowering users globally to confidently participate in the future of finance. We envision a
           world where sophisticated investment strategies are available to everyone in a transparent
           and secure manner.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
