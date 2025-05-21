
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function DocsPage() {
  return (
    <div className="space-y-8">
      <header className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary">
          CryptoIndexFund Documentation
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Welcome to the official documentation. Find guides and references here.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            This is a placeholder for the main documentation page. You can start adding your content here.
            Consider sections like:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-1">
            <li>Introduction to CryptoIndexFund</li>
            <li>How to Connect Your Wallet</li>
            <li>Understanding Our Funds</li>
            <li>Deposits and Withdrawals</li>
            <li>Security Information</li>
            <li>FAQ</li>
          </ul>
          <p className="mt-4">
            You can create more pages within the <code>/docs</code> directory, for example,{" "}
            <code>/docs/getting-started</code> by creating new files/folders.
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <Link href="/" className="text-primary hover:underline">
          Back to Homepage
        </Link>
      </div>
    </div>
  );
}
