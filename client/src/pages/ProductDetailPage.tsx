import { useState } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Thumbs, Zoom } from 'swiper/modules';
import { Button } from "@/components/ui/button";
import PriceCalculator from "@/components/PriceCalculator";
import MetalSwatch from "@/components/MetalSwatch";
import { Heart, ShoppingBag, Shield, Truck, RotateCcw } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import Confetti from 'react-confetti';
import { motion } from "framer-motion";
import 'swiper/css';
import 'swiper/css/thumbs';
import 'swiper/css/zoom';
import whiteGoldRing from '@assets/generated_images/White_gold_solitaire_ring_be4bc106.png';
import roseGoldRing from '@assets/generated_images/Rose_gold_oval_halo_ring_7c55c6f4.png';

export default function ProductDetailPage() {
  const [selectedMetal, setSelectedMetal] = useState('White Gold');
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'];
  const images = [whiteGoldRing, roseGoldRing, whiteGoldRing, roseGoldRing];

  const handleAddToCart = () => {
    setShowConfetti(true);
    toast({
      title: "Added to Cart! ✨",
      description: "Your item has been added to the cart.",
    });
    setTimeout(() => setShowConfetti(false), 3000);
    console.log('Added to cart');
  };

  return (
    <div className="min-h-screen py-8">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {typeof window !== 'undefined' && (
              <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                recycle={false}
                numberOfPieces={200}
              />
            )}
          </motion.div>
        </div>
      )}

      <div className="container px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-4">
            <Swiper
              modules={[Thumbs, Zoom]}
              zoom={true}
              className="rounded-lg overflow-hidden aspect-square bg-muted"
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img
                      src={image}
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                      data-testid={`img-product-${index}`}
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="grid grid-cols-4 gap-3">
              {images.slice(0, 4).map((image, index) => (
                <button
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border-2 border-border hover:border-primary transition-colors"
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                Engagement Rings
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Classic Brilliant Solitaire
              </h1>
              <p className="text-3xl font-bold text-primary font-serif">
                ₹125,000
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              A timeless classic featuring a brilliant-cut lab-grown diamond in a sophisticated 
              four-prong setting. Ethically sourced and certified, this ring represents the 
              perfect harmony of elegance and sustainability.
            </p>

            <div>
              <Label className="mb-3 block font-semibold">Select Metal</Label>
              <div className="flex gap-3 flex-wrap">
                {metals.map((metal) => (
                  <MetalSwatch
                    key={metal}
                    metal={metal}
                    active={selectedMetal === metal}
                    onClick={() => setSelectedMetal(metal)}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Selected: {selectedMetal}
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                size="lg"
                className="flex-1"
                onClick={handleAddToCart}
                data-testid="button-add-to-cart-main"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover-elevate"
                data-testid="button-add-to-wishlist"
              >
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4 py-6 border-y">
              <div className="text-center space-y-1">
                <Truck className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Free Shipping</p>
              </div>
              <div className="text-center space-y-1">
                <Shield className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">Certified</p>
              </div>
              <div className="text-center space-y-1">
                <RotateCcw className="h-6 w-6 mx-auto text-primary" />
                <p className="text-xs text-muted-foreground">30-Day Returns</p>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="description">
                <AccordionTrigger>Description</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    This stunning solitaire ring features a premium lab-grown diamond with 
                    exceptional clarity and brilliance. Each piece is handcrafted with precision 
                    and comes with a certificate of authenticity.
                  </p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="specifications">
                <AccordionTrigger>Specifications</AccordionTrigger>
                <AccordionContent>
                  <ul className="text-sm text-muted-foreground space-y-2">
                    <li>• Diamond: 1.00 ct, Round Brilliant Cut</li>
                    <li>• Color: D-E (Colorless)</li>
                    <li>• Clarity: VVS1-VVS2</li>
                    <li>• Cut: Excellent</li>
                    <li>• Setting: 4-Prong</li>
                    <li>• Band Width: 2mm</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="shipping">
                <AccordionTrigger>Shipping & Returns</AccordionTrigger>
                <AccordionContent>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Free shipping on all orders. 30-day return policy. All items are shipped 
                    insured with signature required for delivery.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="font-serif text-3xl font-bold mb-8">Customize This Ring</h2>
          <div className="max-w-2xl">
            <PriceCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
