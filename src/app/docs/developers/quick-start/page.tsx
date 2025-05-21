
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function QuickStartPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Developer Quick Start</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Get started with building on or integrating with CryptoIndexFund.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Setting Up Your Environment</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This guide will walk you through the initial setup for developers, including
            prerequisites, API key generation (if applicable), and connecting to testnets.
            Content coming soon...
          </p>
        </CardContent>
      </Card>
       <Card>
        <CardHeader>
          <CardTitle>First Integration Steps</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            Learn how to make your first API call or interact with our smart contracts.
            Code examples will be provided for common use cases.
            Content coming soon...
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
