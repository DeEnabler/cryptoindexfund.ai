
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Gift, ArrowLeft } from "lucide-react";

export default function AirdropPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto py-12">
      <header className="text-center">
        <Gift className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          CryptoIndexFund Native Token Airdrop
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Get ready for the official CryptoIndexFund token airdrop! More details coming very soon.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Airdrop Details Coming Soon!</CardTitle>
          <CardDescription>
            We're working hard to finalize the specifics of our exciting token airdrop.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            Information about eligibility criteria, claim process, tokenomics, and important dates will be announced here.
            Stay tuned and make sure to follow our official channels for the latest updates.
          </p>
          <p className="text-muted-foreground">
            The countdown timer at the bottom of the page indicates when more information or the claim process will begin.
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
