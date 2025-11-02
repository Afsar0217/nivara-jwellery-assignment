import { Link } from "wouter";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8">
        <button
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        <Link href="/" className="flex items-center" data-testid="link-home">
          <h1 className="font-serif text-2xl font-bold tracking-tight">Nivara Luxe</h1>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/collections" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-collections">
            Collections
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-about">
            About
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-primary transition-colors" data-testid="link-contact">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" data-testid="button-search">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" data-testid="button-wishlist">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative" data-testid="button-cart">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold text-primary-foreground flex items-center justify-center">
              2
            </span>
          </Button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <nav className="flex flex-col p-4 gap-2">
            <Link href="/collections" className="py-2 text-sm font-medium" data-testid="link-mobile-collections">
              Collections
            </Link>
            <Link href="/about" className="py-2 text-sm font-medium" data-testid="link-mobile-about">
              About
            </Link>
            <Link href="/contact" className="py-2 text-sm font-medium" data-testid="link-mobile-contact">
              Contact
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
