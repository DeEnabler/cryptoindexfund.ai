"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const faqItems = [
  {
    id: "what-is",
    question: "What is CryptoIndexFund?",
    answer: "CryptoIndexFund is a decentralized platform offering curated cryptocurrency index funds, allowing users to easily invest in diversified crypto portfolios. Our goal is to make crypto investing simpler, more transparent, and accessible."
  },
  {
    id: "how-to-start",
    question: "How do I get started with CryptoIndexFund?",
    answer: "To get started, you'll need a Web3 compatible wallet (like MetaMask). Connect your wallet to our platform, browse the available funds, choose one that aligns with your investment goals, and then deposit your chosen cryptocurrency into the fund's smart contract. You can monitor your investment performance through your dashboard."
  },
  {
    id: "are-funds-safe",
    question: "Are my funds safe?",
    answer: "Security is a top priority at CryptoIndexFund. Our smart contracts undergo rigorous audits by third-party security firms. Furthermore, CryptoIndexFund operates on a non-custodial basis, meaning you always retain control of your assets in your own wallet. However, it's important to remember that all investments, especially in the cryptocurrency space, carry inherent risks. We encourage you to do your own research (DYOR) and understand the risks involved before investing."
  },
  {
    id: "what-fees",
    question: "What fees are involved?",
    answer: "Fee structures can vary per fund and typically include a small management fee and potentially performance fees. All fees are transparently displayed on each fund's detail page and within our documentation. We aim to keep fees competitive and aligned with providing value and maintaining the platform."
  },
  {
    id: "supported-wallets",
    question: "Which wallets are supported?",
    answer: "CryptoIndexFund supports a variety of Web3 wallets through WalletConnect and direct browser extension integrations like MetaMask. Any WalletConnect-compatible mobile or desktop wallet should work, along with popular browser wallets."
  },
  {
    id: "what-are-index-funds",
    question: "What are crypto index funds?",
    answer: "Crypto index funds are investment vehicles that track a specific segment of the cryptocurrency market, similar to traditional stock market index funds. They hold a basket of different cryptocurrencies, offering investors instant diversification and exposure to a particular theme (e.g., DeFi tokens, Layer 1 protocols, AI-related crypto projects) with a single investment."
  }
];

export default function FaqPage() {
  return (
    <div className="space-y-6">
      <header className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-primary">Frequently Asked Questions (FAQ)</h1>
        <p className="mt-1 text-lg text-muted-foreground">
          Find answers to common questions about CryptoIndexFund.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Common Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item) => (
              <AccordionItem value={item.id} key={item.id}>
                <AccordionTrigger className="text-lg hover:no-underline text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-4 pt-1">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
