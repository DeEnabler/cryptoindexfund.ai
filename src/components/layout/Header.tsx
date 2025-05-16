
"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Home, Briefcase, Lightbulb, Rocket, LogOut, UserCircle } from "lucide-react"; // Removed Wallet icon as it's covered by UserCircle/Rocket
import { usePathname } from 'next/navigation';
import { cn } from "@/lib/utils";
import { useReownAuth } from "@/contexts/ReownAuthContext"; // Updated import

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/fund-overview", label: "Investment Products", icon: Briefcase },
  { href: "/learn", label: "Research", icon: Lightbulb },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const { user, login, logout, isAuthenticated, isLoading } = useReownAuth(); // Updated hook

  useEffect(() => {
    setIsMounted(true);
  }, []);


  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
    } else {
      login();
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
    return (
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <span className="font-bold text-2xl text-primary">TrustVest</span>
          </Link>
          <div className="h-8 w-24 animate-pulse rounded-md bg-muted md:hidden"></div>
          <div className="hidden md:flex space-x-4 items-center">
            {navItems.map((item) => (
               <div key={item.href} className="h-6 w-28 animate-pulse rounded-md bg-muted"></div>
            ))}
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
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          <span className="font-bold text-2xl text-primary">TrustVest</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "px-3 py-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                pathname === item.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
              )}
            >
               <item.icon className="inline h-4 w-4 mr-1.5 mb-0.5" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-2">
          <Button
            onClick={handleAuthAction}
            disabled={isLoading && !isAuthenticated} 
            className="hidden md:flex items-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-150 ease-in-out group"
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
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8 text-primary">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                  </svg>
                <span className="font-bold text-2xl text-primary">TrustVest</span>
              </Link>
              <nav className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center space-x-3 px-3 py-3 rounded-md text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                      pathname === item.href ? "bg-accent text-accent-foreground" : "text-foreground/80"
                    )}
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                ))}
                 <Button
                    onClick={() => {
                        handleAuthAction();
                        setIsMobileMenuOpen(false);
                    }}
                    disabled={isLoading && !isAuthenticated}
                    className="w-full flex items-center justify-center space-x-2 bg-primary hover:bg-primary/90 text-primary-foreground py-6 text-lg mt-4"
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
