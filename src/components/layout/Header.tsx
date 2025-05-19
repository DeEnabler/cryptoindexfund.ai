
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Home, Briefcase, Lightbulb, Rocket, LogOut, UserCircle } from "lucide-react";
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext"; // Updated import
import Image from "next/image";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fund-overview", label: "Investment Products", icon: Briefcase },
  { href: "/learn", label: "Research", icon: Lightbulb },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { user, login, logout, isAuthenticated, isLoading, connectors } = useAuth(); // Updated to useAuth

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      // For simplicity, try the first connector.
      // A real app would present a modal to choose a connector if multiple exist.
      if (connectors.length > 0) {
        login(connectors[0]); // Pass the connector instance
      } else {
        login(); // Will show alert from AuthContext if no connectors
      }
    }
  };

  const renderAuthButtonContent = () => {
    if (!isMounted || isLoading) {
      return <div className="flex items-center space-x-2"><div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div><span>Loading...</span></div>;
    }
    if (isAuthenticated && user?.address) {
      const shortAddress = `${user.address.substring(0, 6)}...${user.address.substring(user.address.length - 4)}`;
      return (
        <>
          <UserCircle className="h-5 w-5" />
          <span>{shortAddress}</span>
          <LogOut className="h-5 w-5 ml-1 opacity-70 hover:opacity-100 cursor-pointer" title="Logout" onClick={(e) => { e.stopPropagation(); logout(); }} />
        </>
      );
    }
    return (
      <>
        <Rocket className="h-5 w-5" />
        <span>Launch App</span>
      </>
    );
  };

   const renderMobileAuthButtonContent = () => {
    if (!isMounted || isLoading) {
      return <div className="flex items-center space-x-2"><div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div><span>Loading...</span></div>;
    }
    if (isAuthenticated && user?.address) {
      const shortAddress = `${user.address.substring(0, 6)}...${user.address.substring(user.address.length - 4)}`;
      return (
        <>
          <UserCircle className="h-5 w-5" />
          <span>{shortAddress} (Logout)</span>
        </>
      );
    }
    return (
      <>
        <Rocket className="h-5 w-5" />
        <span>Launch App</span>
      </>
    );
  };


  if (!isMounted) {
    // Simplified skeleton for brevity during complex changes
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/android-chrome-192x192.png" alt="CryptoIndexFund Logo" width={32} height={32} className="h-8 w-auto" priority={true}/>
            <span className="font-bold text-2xl text-primary">CryptoIndexFund</span>
          </Link>
          <div className="h-8 w-24 animate-pulse rounded-md bg-muted md:hidden"></div>
          <div className="hidden md:flex space-x-4 items-center">
            {[1,2,3].map(i => <div key={i} className="h-8 w-28 animate-pulse rounded-md bg-muted"></div>)}
            <div className="h-10 w-32 animate-pulse rounded-md bg-muted"></div>
          </div>
        </div>
      </header>
    );
  }


  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <Link href="/" className="flex items-center space-x-2" onClick={() => setIsMobileMenuOpen(false)}>
          <Image src="/android-chrome-192x192.png" alt="CryptoIndexFund Logo" width={32} height={32} className="h-8 w-auto" priority={true} />
          <span className="font-bold text-2xl text-primary">CryptoIndexFund</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Button
              key={item.label}
              asChild
              variant="ghost"
              size="default"
              className={cn(
                "px-3 py-2 text-sm font-medium",
                pathname === item.href
                  ? "bg-accent text-accent-foreground [&:hover]:bg-accent/90"
                  : "text-foreground/80 hover:bg-accent/80 hover:text-accent-foreground"
              )}
            >
              <Link href={item.href}>
                 <item.icon className="inline h-4 w-4 mr-1.5 mb-0.5" />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleAuthAction}
            disabled={isLoading && !isAuthenticated && connectors.length === 0} // Disable if loading or no connectors
            variant="default"
            size="default"
            className="hidden md:flex items-center space-x-2 px-4 py-2 group"
          >
            {renderAuthButtonContent()}
          </Button>

          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs bg-background p-6 pt-12">
              <Link href="/" className="flex items-center space-x-2 mb-8" onClick={() => setIsMobileMenuOpen(false)}>
                <Image src="/android-chrome-192x192.png" alt="CryptoIndexFund Logo" width={32} height={32} className="h-8 w-auto" />
                <span className="font-bold text-2xl text-primary">CryptoIndexFund</span>
              </Link>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Button
                    key={`mobile-${item.label}`}
                    asChild
                    variant="ghost"
                    size="lg"
                    className={cn(
                      "flex items-center justify-start space-x-3 px-3 py-3 text-lg font-medium",
                      pathname === item.href
                      ? "bg-accent text-accent-foreground [&:hover]:bg-accent/90"
                      : "text-foreground/80 hover:bg-accent/80 hover:text-accent-foreground"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.label}</span>
                    </Link>
                  </Button>
                ))}
                 <Button
                    onClick={() => {
                        handleAuthAction();
                        setIsMobileMenuOpen(false);
                    }}
                    disabled={isLoading && !isAuthenticated && connectors.length === 0}
                    variant="default"
                    size="lg"
                    className="w-full flex items-center justify-center space-x-2 py-6 text-lg mt-4"
                  >
                   {renderMobileAuthButtonContent()}
                 </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
