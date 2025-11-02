import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import { calculateProductPrice } from "@/lib/priceCalculator";
import { useFavorites } from "@/contexts/FavoritesContext";

interface ProductCardProps {
  id: string;
  name: string;
  basePrice: number; // Base price for dynamic calculation
  image: string;
  category: string;
  isNew?: boolean;
}

export default function ProductCard({ id, name, basePrice, image, category, isNew }: ProductCardProps) {
  const { data: priceConfig } = usePriceConfig();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  // Calculate dynamic price based on price config
  const price = calculateProductPrice(basePrice, priceConfig);
  const favorited = isFavorite(id);
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(id);
  };
  return (
    <Link href={`/product/${id}`} data-testid={`link-product-${id}`}>
      <motion.div
        className="group cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-3">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-product-${id}`}
          />
          {isNew && (
            <Badge className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5" data-testid={`badge-new-${id}`}>
              New
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-7 w-7 bg-background/80 backdrop-blur hover-elevate"
            onClick={handleFavoriteClick}
            data-testid={`button-favorite-${id}`}
          >
            <Heart 
              className={`h-3.5 w-3.5 transition-colors ${
                favorited ? 'fill-primary text-primary' : ''
              }`} 
            />
          </Button>
        </div>
        <div className="space-y-0.5">
          <p className="text-[10px] text-muted-foreground uppercase tracking-wide" data-testid={`text-category-${id}`}>
            {category}
          </p>
          <h3 className="text-sm font-medium leading-tight line-clamp-2 group-hover:text-primary transition-colors" data-testid={`text-name-${id}`}>
            {name}
          </h3>
          <p className="text-sm font-semibold" data-testid={`text-price-${id}`}>
            ₹{price.toLocaleString('en-IN')}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
