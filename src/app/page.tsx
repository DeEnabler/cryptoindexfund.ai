
"use client";

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import AnimatedGradientText from "@/components/feature/AnimatedGradientText";

export default function HomePage() {
  const [parallaxOffset, setParallaxOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setParallaxOffset(window.pageYOffset * 0.4);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call on mount to set initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative text-center py-16 md:py-24 rounded-xl overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 shadow-xl">
        <div
          className="animated-grid-container"
          aria-hidden="true"
          style={{
            transform: `translateY(${parallaxOffset}px)`,
            willChange: 'transform'
          }}
        >
          {/* SVG Grid from previous implementation - retained */}
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 1, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.4', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 126 L0 126 L126 0 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.4', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 2, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.5', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 3, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'bottom center', '--final-opacity': '0.3', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 126 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 4, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 1 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 2 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 3 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 4 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'scaleY 2s 0s forwards', transformOrigin: 'top center', '--final-opacity': '0.2', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M126 0 L126 126 L0 0 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
          <div className="animated-grid-svg-item" style={{ gridRowStart: 5, gridColumnStart: 5 }}><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg><svg viewBox="0 0 126 126" className="animated" style={{ animation: 'undefined undefined undefined forwards', opacity: 0, position: 'absolute' } as React.CSSProperties}><path d="M0 0 L126 0 L0 126 Z" fill="hsl(var(--primary))"></path></svg></div>
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            <span className="block">Secure Wealth, Built to Last</span>
            <AnimatedGradientText text="Store of Value" className="block text-primary-foreground" highlightColor="hsl(285, 75%, 70%)" />
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground">
            CryptoIndexFund offers a decentralized crypto fund, bringing transparency and security to your investments. Join the financial revolution.
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <Button asChild size="lg">
              <Link href="/fund-overview">
                Explore Funds <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Investment Products Link Section */}
      <section className="py-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-primary">Explore our products</h2>
          <p className="mt-2 text-lg text-muted-foreground max-w-2xl mx-auto">
            CryptoIndexFund funds aim to capture future-forward investment opportunities and represent potential growth areas in our constantly evolving world.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="outline">
              <Link href="/fund-overview">
                View All Investment Products <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
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
              Join CryptoIndexFund today and experience the future of decentralized fund management.
            </CardDescription>
            <Button asChild size="lg">
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
