
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift, ArrowLeft, Users, TrendingUp, CheckCircle } from "lucide-react";

export default function AirdropPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-12">
      <header className="text-center">
        <Gift className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          CryptoIndexFund Native Token Airdrop: Own the Future!
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Be part of a revolution in fund management. Our native token airdrop is your gateway to decentralized ownership and rewards.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Users className="mr-2 h-6 w-6 text-primary" />
            Decentralizing Ownership & Governance
          </CardTitle>
          <CardDescription>
            Our fund aims to fully decentralize the ownership and governance, putting power back into the hands of the community – you, the people.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            The CryptoIndexFund native token is more than just an asset; it's your stake in a community-driven financial ecosystem. We are revolutionizing the traditional fund model by distributing value back to those who make the fund valuable.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <TrendingUp className="mr-2 h-6 w-6 text-primary" />
            Earn Weekly Rewards
          </CardTitle>
          <CardDescription>
            Token holders will earn weekly fees distributed in USDC, directly to their wallet on their chain of choice.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            This innovative reward system ensures that as the fund grows and generates fees, you, our token holders, directly benefit. It's a transparent and direct way to share in the success of CryptoIndexFund.
          </p>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <CheckCircle className="mr-2 h-6 w-6 text-primary" />
            Eligibility & Airdrop Details
          </CardTitle>
          <CardDescription>
            How to become eligible for this exciting airdrop.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <p>
            To be eligible for the CryptoIndexFund native token airdrop, all you need to do is own LP (Liquidity Provider) tokens of the investment token of your choice within our platform.
          </p>
          <p className="font-semibold text-foreground">
            The more tokens you've invested (represented by your LP tokens), the bigger your airdrop allocation will be. This means greater initial ownership and subsequently, potentially bigger weekly rewards!
          </p>
          <p className="text-muted-foreground">
            Specific snapshot dates, claim processes, and further details on tokenomics will be announced soon. Stay tuned to our official channels and the countdown timer for the latest updates.
          </p>
          <p className="mt-4 text-lg font-bold text-primary">
            Don't miss out on this opportunity to own the future of decentralized fund management!
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-12">
        <Button variant="outline" asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Homepage
          </Link>
        </Button>
      </div>
    </div>
  );
}
