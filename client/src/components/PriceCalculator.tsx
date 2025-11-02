import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles } from "lucide-react";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import { calculateCustomPrice } from "@/lib/priceCalculator";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import Confetti from 'react-confetti';

interface PriceCalculatorProps {
  productId?: string;
  onAddToCart?: () => void;
}

export default function PriceCalculator({ productId, onAddToCart }: PriceCalculatorProps) {
  const [carat, setCarat] = useState(1.0);
  const [metal, setMetal] = useState<"white-gold" | "yellow-gold" | "rose-gold" | "platinum">("white-gold");
  const [engraving, setEngraving] = useState(false);
  const [giftBox, setGiftBox] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Fetch price config from API
  const { data: priceConfig, isLoading } = usePriceConfig();
  const { addToCart } = useCart();
  const { toast } = useToast();

  const calculateTotal = () => {
    return calculateCustomPrice(priceConfig, carat, metal, engraving, giftBox);
  };

  const handleAddToCart = () => {
    if (!productId) {
      toast({
        title: "Error",
        description: "Product ID is missing.",
        variant: "destructive",
      });
      return;
    }

    const customPrice = calculateTotal();
    
    // Convert metal format from "white-gold" to "White Gold"
    const metalFormatted = metal.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ') as 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum';

    addToCart(productId, metalFormatted, customPrice);
    
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);

    // Call the optional callback if provided
    if (onAddToCart) {
      onAddToCart();
    }
  };

  // Fallback values for display when loading
  const engravingFee = priceConfig?.customizationFees.engraving || 3000;
  const giftBoxFee = priceConfig?.customizationFees.giftBox || 2500;

  return (
    <>
      {showConfetti && typeof window !== 'undefined' && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={200}
          />
        </div>
      )}
      <div className="bg-card border border-card-border rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h3 className="font-serif text-xl font-bold">Customize Your Ring</h3>
        </div>

      <div className="space-y-4">
        <div>
          <div className="flex justify-between mb-2">
            <Label htmlFor="carat-slider">Carat Weight</Label>
            <span className="text-sm font-semibold" data-testid="text-carat-value">
              {carat.toFixed(2)} ct
            </span>
          </div>
          <Slider
            id="carat-slider"
            min={0.25}
            max={3.0}
            step={0.01}
            value={[carat]}
            onValueChange={([value]) => setCarat(value)}
            data-testid="slider-carat"
          />
        </div>

        <div>
          <Label htmlFor="metal-select">Metal Type</Label>
          <Select value={metal} onValueChange={setMetal}>
            <SelectTrigger id="metal-select" data-testid="select-metal">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="white-gold">18K White Gold</SelectItem>
              <SelectItem value="yellow-gold">18K Yellow Gold</SelectItem>
              <SelectItem value="rose-gold">18K Rose Gold</SelectItem>
              <SelectItem value="platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-3 pt-2">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="engraving"
              checked={engraving}
              onCheckedChange={(checked) => setEngraving(checked as boolean)}
              data-testid="checkbox-engraving"
            />
            <label htmlFor="engraving" className="text-sm cursor-pointer">
              Custom Engraving (+₹{engravingFee.toLocaleString('en-IN')})
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gift-box"
              checked={giftBox}
              onCheckedChange={(checked) => setGiftBox(checked as boolean)}
              data-testid="checkbox-gift-box"
            />
            <label htmlFor="gift-box" className="text-sm cursor-pointer">
              Premium Gift Box (+₹{giftBoxFee.toLocaleString('en-IN')})
            </label>
          </div>
        </div>
      </div>

      <div className="border-t pt-4">
        {isLoading ? (
          <div className="text-center py-4 text-muted-foreground">
            Loading pricing...
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Estimated Total</span>
              <span className="text-2xl font-bold text-primary font-serif" data-testid="text-total-price">
                ₹{calculateTotal().toLocaleString('en-IN')}
              </span>
            </div>
            <Button 
              className="w-full" 
              size="lg" 
              data-testid="button-add-to-cart"
              onClick={handleAddToCart}
              disabled={!productId}
            >
              Add to Cart
            </Button>
          </>
        )}
      </div>
      </div>
    </>
  );
}
