
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ExternalLink, FileText, SearchCode, GitCommitHorizontal } from "lucide-react";
import Link from "next/link";

const MOCK_ETHERSCAN_CONTRACT_URL = "https://etherscan.io/address/0x0000000000000000000000000000000000000000"; // Replace with actual if available
const MOCK_ETHERSCAN_TRANSACTIONS_URL = "https://etherscan.io/txs?a=0x0000000000000000000000000000000000000000"; // Replace with actual if available

export default function TransparencyPage() {
  return (
    <div className="space-y-12">
      <header className="text-center">
        <ShieldCheck className="h-16 w-16 mx-auto text-primary mb-4" />
        <h1 className="text-4xl font-bold tracking-tight text-primary">Unwavering Transparency</h1>
        <p className="text-lg text-muted-foreground mt-2 max-w-2xl mx-auto">
          At CryptoIndexFund, we believe in complete openness. Our operations are built on the blockchain,
          ensuring every action is verifiable and immutable.
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <FileText className="h-6 w-6 mr-2 text-primary" />
              Smart Contracts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Our core logic is encoded in smart contracts deployed on the Ethereum blockchain. These contracts
              autonomously manage fund operations, deposits, and withdrawals according to predefined rules.
              They are the bedrock of our trustless system.
            </p>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href={MOCK_ETHERSCAN_CONTRACT_URL} target="_blank" rel="noopener noreferrer">
                View Main Contract on Etherscan <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="shadow-lg hover:shadow-primary/20 transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <SearchCode className="h-6 w-6 mr-2 text-primary" />
              On-Chain Verification
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Every transaction, from investor deposits to fund rebalancing, is recorded on the public ledger.
              You can independently verify all activities, ensuring accountability and eliminating the need
              for blind trust.
            </p>
            <Button asChild variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href={MOCK_ETHERSCAN_TRANSACTIONS_URL} target="_blank" rel="noopener noreferrer">
                Explore Transactions on Etherscan <ExternalLink className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      <section>
        <Card className="shadow-xl bg-card/80 backdrop-blur">
          <CardHeader className="text-center">
            <GitCommitHorizontal className="h-12 w-12 mx-auto text-primary mb-3" />
            <CardTitle className="text-3xl">The Trustless Advantage</CardTitle>
            <CardDescription className="text-md text-muted-foreground max-w-xl mx-auto">
              Our commitment to transparency means:
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4 max-w-md mx-auto text-left">
              <li className="flex items-start">
                <ShieldCheck className="h-5 w-5 mr-3 mt-1 text-green-400 flex-shrink-0" />
                <span><strong>No Custodians:</strong> You retain control of your assets via your Web3 wallet. We never hold your private keys.</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-5 w-5 mr-3 mt-1 text-green-400 flex-shrink-0" />
                <span><strong>Immutable Logic:</strong> Smart contract rules cannot be altered secretly, ensuring fairness and predictability.</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-5 w-5 mr-3 mt-1 text-green-400 flex-shrink-0" />
                <span><strong>Auditable Trail:</strong> A permanent, public record of all fund activities for anyone to inspect.</span>
              </li>
              <li className="flex items-start">
                <ShieldCheck className="h-5 w-5 mr-3 mt-1 text-green-400 flex-shrink-0" />
                <span><strong>Reduced Counterparty Risk:</strong> Decentralization minimizes reliance on single entities.</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-8">
        <p className="text-muted-foreground italic">
          CryptoIndexFund is committed to pushing the boundaries of financial transparency.
          While we strive for utmost security, always do your own research (DYOR) before investing.
        </p>
      </section>
    </div>
  );
}
