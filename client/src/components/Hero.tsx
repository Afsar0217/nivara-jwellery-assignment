import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  image: string;
  title: string;
  subtitle: string;
  primaryCTA: string;
  secondaryCTA?: string;
  onPrimaryClick: () => void;
  onSecondaryClick?: () => void;
}

export default function Hero({
  image,
  title,
  subtitle,
  primaryCTA,
  secondaryCTA,
  onPrimaryClick,
  onSecondaryClick,
}: HeroProps) {
  return (
    <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40 z-10" />
        <img
          src={image}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative z-20 container px-4 md:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-serif text-4xl md:text-6xl lg:text-8xl font-bold mb-6 tracking-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
            {subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              onClick={onPrimaryClick}
              className="text-base group bg-white/90 backdrop-blur text-foreground hover:bg-white border border-white/20"
              data-testid="button-hero-primary"
            >
              {primaryCTA}
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            {secondaryCTA && onSecondaryClick && (
              <Button
                size="lg"
                variant="outline"
                onClick={onSecondaryClick}
                className="text-base bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
                data-testid="button-hero-secondary"
              >
                {secondaryCTA}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
