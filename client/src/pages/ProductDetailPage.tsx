import { useState, useEffect, useRef } from "react";
import { useRoute } from "wouter";
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
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
import { getProductById } from "@/data/products";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import { calculateProductPrice } from "@/lib/priceCalculator";
import { useCart } from "@/contexts/CartContext";
import { useFavorites } from "@/contexts/FavoritesContext";

export default function ProductDetailPage() {
  const [, params] = useRoute('/product/:id');
  const [selectedMetal, setSelectedMetal] = useState<'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum'>('White Gold');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);
  const { toast } = useToast();

  // Fetch price config for dynamic pricing
  const { data: priceConfig } = usePriceConfig();
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();

  const productId = params?.id || '1';
  const product = getProductById(productId);

  // Default to first product if not found
  const displayProduct = product || getProductById('1')!;

  // Calculate dynamic price based on price config and selected metal
  const calculatedPrice = calculateProductPrice(displayProduct.basePrice, priceConfig, selectedMetal);
  
  const favorited = isFavorite(productId);
  
  const handleAddToCartClick = () => {
    addToCart(productId, selectedMetal);
    setShowConfetti(true);
    toast({
      title: "Added to Cart! ✨",
      description: "Your item has been added to the cart.",
    });
    setTimeout(() => setShowConfetti(false), 3000);
  };
  
  const handleFavoriteClick = () => {
    toggleFavorite(productId);
  };

  // Use product's available metals, fallback to all if not specified
  const availableMetals = displayProduct.metals || ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'];
  
  // Reset metal selection when product changes or ensure it's valid
  useEffect(() => {
    if (!availableMetals.includes(selectedMetal as any)) {
      setSelectedMetal(availableMetals[0] as 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum');
    }
  }, [productId, availableMetals]);
  
  // Get images for the selected metal - primary image is the selected metal, then show other variants
  const currentMetalImage = displayProduct.images[selectedMetal];
  const otherMetals = availableMetals.filter(m => m !== selectedMetal);
  const images = [
    currentMetalImage, // Primary: selected metal
    otherMetals[0] ? displayProduct.images[otherMetals[0] as keyof typeof displayProduct.images] : currentMetalImage, // Additional view
    otherMetals[1] ? displayProduct.images[otherMetals[1] as keyof typeof displayProduct.images] : currentMetalImage, // Additional view
    otherMetals[2] ? displayProduct.images[otherMetals[2] as keyof typeof displayProduct.images] : currentMetalImage, // Additional view
  ];

  // Reset selected image index when metal changes
  useEffect(() => {
    setSelectedImageIndex(0);
    if (swiperRef.current) {
      swiperRef.current.slideTo(0);
    }
  }, [selectedMetal, productId]);

  // Handle thumbnail click
  const handleThumbnailClick = (index: number) => {
    setSelectedImageIndex(index);
    if (swiperRef.current) {
      swiperRef.current.slideTo(index);
    }
  };

  // Handle swiper slide change
  const handleSlideChange = (swiper: SwiperType) => {
    setSelectedImageIndex(swiper.activeIndex);
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
              key={selectedMetal} // Force re-render when metal changes
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={handleSlideChange}
              initialSlide={0}
            >
              {images.map((image, index) => (
                <SwiperSlide key={index}>
                  <div className="swiper-zoom-container">
                    <img
                      src={image}
                      alt={`${displayProduct.name} in ${selectedMetal} - view ${index + 1}`}
                      className="w-full h-full object-cover transition-opacity duration-300"
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
                  onClick={() => handleThumbnailClick(index)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                    selectedImageIndex === index
                      ? 'border-primary ring-2 ring-primary/20 scale-[1.02]'
                      : 'border-border hover:border-primary/50 hover:scale-[1.01]'
                  }`}
                  data-testid={`button-thumbnail-${index}`}
                >
                  <img
                    src={image}
                    alt={`${displayProduct.name} thumbnail ${index + 1}`}
                    className={`w-full h-full object-cover transition-opacity duration-200 ${
                      selectedImageIndex === index ? 'opacity-100' : 'opacity-70 hover:opacity-90'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-2">
                {displayProduct.category}
              </p>
              <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                {displayProduct.name}
              </h1>
              <p className="text-3xl font-bold text-primary font-serif">
                ₹{calculatedPrice.toLocaleString('en-IN')}
              </p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {displayProduct.description || 'Beautiful lab-grown diamond jewelry ethically sourced and certified. Each piece is handcrafted with precision and comes with a certificate of authenticity.'}
            </p>

            <div>
              <Label className="mb-3 block font-semibold">Select Metal</Label>
              <div className="flex gap-3 flex-wrap">
                {availableMetals.map((metal) => (
                  <MetalSwatch
                    key={metal}
                    metal={metal as 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum'}
                    active={selectedMetal === metal}
                    onClick={() => setSelectedMetal(metal as 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum')}
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
                onClick={handleAddToCartClick}
                data-testid="button-add-to-cart-main"
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="hover-elevate"
                onClick={handleFavoriteClick}
                data-testid="button-add-to-favorites"
              >
                <Heart className={`h-5 w-5 ${favorited ? 'fill-primary text-primary' : ''}`} />
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

        <div className="mt-16 flex flex-col items-center">
          <h2 className="font-serif text-3xl font-bold mb-8 text-center">Customize This Ring</h2>
          <div className="max-w-2xl w-full">
            <PriceCalculator 
              productId={productId}
              onAddToCart={handleAddToCartClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
