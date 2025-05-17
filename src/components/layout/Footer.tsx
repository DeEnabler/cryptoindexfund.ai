
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col items-center justify-between md:flex-row">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="flex items-center space-x-2">
              <Image src="/android-chrome-512x512.png" alt="CryptoIndexFund Site Logo" width={32} height={32} className="h-8 w-auto" />
              <span className="font-semibold text-xl text-primary">CryptoIndexFund</span>
            </Link>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {currentYear} CryptoIndexFund. All rights reserved. <br />
            Investments involve risk. Please consult a financial advisor.
          </div>

          <div className="flex space-x-4">
            <Link href="#" aria-label="Github" className="text-muted-foreground hover:text-primary transition-colors">
              <Github className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-6 w-6" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-6 w-6" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
