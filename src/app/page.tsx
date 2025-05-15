
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight, Lock, BarChartBig, Users, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 shadow-xl">
        <div
          className="absolute inset-0 opacity-[0.15]" // Increased opacity for pattern visibility
          style={{
            backgroundImage: `
              linear-gradient(45deg, hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(-45deg, hsl(var(--primary)) 1px, transparent 1px),
              radial-gradient(circle at 25% 25%, hsl(var(--accent)) 0.8px, transparent 1.2px),
              radial-gradient(circle at 75% 75%, hsl(var(--accent)) 0.8px, transparent 1.2px)
            `,
            backgroundSize: `
              40px 40px,
              40px 40px,
              50px 50px,
              50px 50px
            `,
          }}
          aria-hidden="true"
        />
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block">Invest in the Future,</span>
            <span className="block text-primary">Trustlessly.</span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            TrustVest offers a decentralized crypto fund, bringing transparency and security to your investments. Join the financial revolution.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/fund-overview">
                Explore Funds <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground">
              <Link href="/learn">
                Learn More
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Why TrustVest?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lock className="h-10 w-10 text-primary" />}
            title="Decentralized & Secure"
            description="Built on blockchain technology, ensuring your assets are managed transparently and securely without intermediaries."
            data-ai-hint="security lock"
          />
          <FeatureCard
            icon={<BarChartBig className="h-10 w-10 text-primary" />}
            title="Transparent Operations"
            description="All fund activities are verifiable on-chain. Track every transaction and holding with unprecedented clarity."
            data-ai-hint="data chart"
          />
          <FeatureCard
            icon={<Users className="h-10 w-10 text-primary" />}
            title="User-Friendly Platform"
            description="Easily connect your wallet, deposit, withdraw, and monitor your investments through our intuitive interface."
            data-ai-hint="people collaboration"
          />
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Getting Started is Easy</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <StepCard
            step="1"
            title="Connect Your Wallet"
            description="Securely connect your preferred Web3 wallet like MetaMask."
            icon={<Zap className="h-8 w-8 mx-auto mb-4 text-primary" />}
          />
          <StepCard
            step="2"
            title="Deposit Funds"
            description="Choose a fund and deposit your crypto assets with a few clicks."
            icon={<ArrowRight className="h-8 w-8 mx-auto mb-4 text-primary transform rotate-90 md:rotate-0" />}
          />
           <StepCard
            step="3"
            title="Track Your Growth"
            description="Monitor your investment performance in real-time through your dashboard."
            icon={<TrendingUp className="h-8 w-8 mx-auto mb-4 text-primary" />}
          />
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 text-center">
        <Card className="max-w-3xl mx-auto shadow-xl bg-card/80 backdrop-blur">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Ready to Invest with Confidence?</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg mb-8 text-muted-foreground">
              Join TrustVest today and experience the future of decentralized fund management.
            </CardDescription>
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/fund-overview">
                View Our Funds <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  "data-ai-hint": string;
}

function FeatureCard({ icon, title, description, "data-ai-hint": dataAiHint }: FeatureCardProps) {
  return (
    <Card className="text-center shadow-lg hover:shadow-primary/20 transition-shadow duration-300">
      <CardHeader className="items-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          {icon}
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}


interface StepCardProps {
  step: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

function StepCard({ step, title, description, icon }: StepCardProps) {
  return (
    <div className="p-6 rounded-lg">
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold text-xl">
          {step}
        </div>
      </div>
      {icon}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}
