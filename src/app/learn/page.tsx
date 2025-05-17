
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArticleSummarizer } from "@/components/feature/ArticleSummarizer";
import { BookOpen, Lightbulb, Brain, HelpCircle } from "lucide-react";

const faqData = [
  {
    question: "What is cryptoindexfund.ai?",
    answer: "cryptoindexfund.ai is a decentralized crypto fund platform that allows users to invest in various cryptocurrency strategies with transparency and security. Our operations are managed by smart contracts on the blockchain.",
  },
  {
    question: "How does decentralization benefit me as an investor?",
    answer: "Decentralization means there's no single point of control or failure. Your assets are managed by immutable smart contracts, not a central entity. This increases security, transparency, and reduces counterparty risk.",
  },
  {
    question: "What is DeFi?",
    answer: "DeFi (Decentralized Finance) is an emerging financial technology based on secure distributed ledgers similar to those used by cryptocurrencies. It aims to provide traditional financial services (like lending, borrowing, trading) in a permissionless and transparent manner.",
  },
  {
    question: "How do I get started with cryptoindexfund.ai?",
    answer: "Getting started is simple: 1. Connect your Web3 wallet (e.g., MetaMask). 2. Browse available funds and their strategies. 3. Deposit your chosen cryptocurrency into the fund's smart contract. 4. Monitor your investment performance through your dashboard.",
  },
  {
    question: "What are the risks involved?",
    answer: "All investments carry risk, and cryptocurrency investments can be particularly volatile. Risks include smart contract vulnerabilities (though audited), market volatility, and regulatory changes. We encourage you to do your own research (DYOR) and invest only what you can afford to lose.",
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-16">
      <header className="text-center">
        <BookOpen className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary">Expand Your Knowledge</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          Understand DeFi, blockchain, and how cryptoindexfund.ai is pioneering transparent investments.
        </p>
      </header>

      {/* AI Article Summarizer Section */}
      <section>
         <ArticleSummarizer />
      </section>

      {/* FAQ Section */}
      <section>
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
            <HelpCircle className="h-8 w-8 mr-3 text-primary" />
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((faq, index) => (
              <AccordionItem value={`item-${index + 1}`} key={index} className="border-b-border/70">
                <AccordionTrigger className="text-lg hover:no-underline py-4 text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground pb-4 pt-1">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Further Learning Resources Placeholder */}
      <section className="text-center py-8">
         <h2 className="text-3xl font-bold mb-8 flex items-center justify-center">
            <Lightbulb className="h-8 w-8 mr-3 text-primary" />
            Further Learning
          </h2>
        <p className="text-muted-foreground">
          Stay tuned for more in-depth articles, guides, and tutorials on DeFi and investment strategies.
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="p-6 border border-dashed border-border rounded-lg text-left">
                <h3 className="text-xl font-semibold text-primary mb-2">Understanding Smart Contracts</h3>
                <p className="text-sm text-muted-foreground">An upcoming guide on how smart contracts power cryptoindexfund.ai and ensure trustless operations.</p>
            </div>
            <div className="p-6 border border-dashed border-border rounded-lg text-left">
                <h3 className="text-xl font-semibold text-primary mb-2">Navigating Crypto Volatility</h3>
                <p className="text-sm text-muted-foreground">Learn strategies for managing risk in the dynamic cryptocurrency market. Coming soon.</p>
            </div>
        </div>
      </section>
    </div>
  );
}
