
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";

export default function DocsMainPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <header className="text-center py-8">
        <BookOpen className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary">
          CryptoIndexFund Documentation
        </h1>
        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Welcome to the official documentation. Find comprehensive guides, API references,
          and tutorials to help you get the most out of CryptoIndexFund.
        </p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Getting Started</CardTitle>
          <CardDescription>
            New to CryptoIndexFund? Start here to learn the basics.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            This documentation provides all the information you need to understand and interact
            with the CryptoIndexFund platform. Explore the sections in the sidebar to learn about:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2 text-muted-foreground">
            <li>Core concepts behind our decentralized funds.</li>
            <li>How to connect your wallet and start investing.</li>
            <li>Detailed information about each available fund.</li>
            <li>Technical details for developers looking to integrate.</li>
            <li>Security practices and risk disclosures.</li>
          </ul>
          <div className="pt-2">
            <Button asChild>
              <Link href="/docs/what-is">
                What is CryptoIndexFund? <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">For Developers</CardTitle>
          <CardDescription>
            Integrate with CryptoIndexFund or build on top of our platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Our developer resources provide guides and API references to help you leverage
            the CryptoIndexFund ecosystem.
          </p>
          <div className="pt-4">
            <Button variant="outline" asChild>
              <Link href="/docs/developers/quick-start">
                Developer Quick Start <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="text-center mt-12 py-8">
        <p className="text-muted-foreground">Can't find what you're looking for?</p>
        <Link href="/contact" className="text-primary hover:underline font-semibold">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
