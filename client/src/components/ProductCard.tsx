import { Link } from "wouter";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isNew?: boolean;
}

export default function ProductCard({ id, name, price, image, category, isNew }: ProductCardProps) {
  return (
    <Link href={`/product/${id}`} data-testid={`link-product-${id}`}>
      <motion.div
        className="group cursor-pointer"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-muted mb-4">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            data-testid={`img-product-${id}`}
          />
          {isNew && (
            <Badge className="absolute top-3 left-3" data-testid={`badge-new-${id}`}>
              New
            </Badge>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur hover-elevate"
            onClick={(e) => {
              e.preventDefault();
              console.log('Added to wishlist:', id);
            }}
            data-testid={`button-wishlist-${id}`}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-1">
          <p className="text-xs text-muted-foreground uppercase tracking-wide" data-testid={`text-category-${id}`}>
            {category}
          </p>
          <h3 className="font-medium leading-tight group-hover:text-primary transition-colors" data-testid={`text-name-${id}`}>
            {name}
          </h3>
          <p className="font-semibold" data-testid={`text-price-${id}`}>
            ₹{price.toLocaleString('en-IN')}
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
