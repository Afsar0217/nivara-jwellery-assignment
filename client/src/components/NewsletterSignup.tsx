import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Successfully subscribed!",
      description: "Thank you for joining our newsletter.",
    });

    setEmail("");
    setLoading(false);
    console.log('Newsletter signup:', email);
  };

  return (
    <div className="bg-primary text-primary-foreground py-16 md:py-20">
      <div className="container px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-foreground/10 mb-6">
            <Mail className="h-8 w-8" />
          </div>
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
            Stay Connected
          </h2>
          <p className="text-primary-foreground/90 mb-8 text-lg">
            Subscribe to receive exclusive offers, new collection launches, and sustainability updates.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-primary-foreground text-foreground flex-1"
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={loading}
              className="sm:w-auto"
              data-testid="button-newsletter-submit"
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
