import { Link } from "wouter";
import { Instagram, Facebook, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">Nivara Luxe</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ethical lab-grown diamond jewelry. Timeless elegance meets sustainable luxury.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/collections" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-collections">
                  All Collections
                </Link>
              </li>
              <li>
                <Link href="/collections?category=rings" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-rings">
                  Rings
                </Link>
              </li>
              <li>
                <Link href="/collections?category=earrings" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-earrings">
                  Earrings
                </Link>
              </li>
              <li>
                <Link href="/collections?category=necklaces" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-necklaces">
                  Necklaces
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-contact">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Subscribe for updates and exclusive offers
            </p>
            <div className="flex gap-2">
              <Input type="email" placeholder="Your email" className="text-sm" data-testid="input-footer-newsletter" />
              <Button size="sm" data-testid="button-footer-subscribe">Subscribe</Button>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-footer-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-footer-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-footer-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 Nivara Luxe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
