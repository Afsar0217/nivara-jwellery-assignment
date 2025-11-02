import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useCart } from "@/contexts/CartContext";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import { calculateProductPrice } from "@/lib/priceCalculator";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function FavoritesPage() {
  const { getFavoriteProducts, removeFromFavorites, getTotalFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { data: priceConfig } = usePriceConfig();
  
  const favoriteProducts = getFavoriteProducts();
  const totalFavorites = getTotalFavorites();

  if (totalFavorites === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container px-4 md:px-8">
          <div className="max-w-md mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-muted mb-6">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h1 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Your Favorites
            </h1>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              You haven't added any items to your favorites yet. Start exploring our collections and save your favorite pieces!
            </p>
            <Link href="/collections">
              <Button size="lg" className="w-full sm:w-auto">
                Browse Collections
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4 md:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">
            Your Favorites
          </h1>
          <p className="text-sm text-muted-foreground">
            {totalFavorites} {totalFavorites === 1 ? 'item' : 'items'} saved
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favoriteProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group">
                <ProductCard
                  id={product.id}
                  name={product.name}
                  basePrice={product.basePrice}
                  image={product.image}
                  category={product.category}
                  isNew={product.isNew}
                />
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      removeFromFavorites(product.id);
                    }}
                  >
                    Remove
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1"
                    onClick={(e) => {
                      e.preventDefault();
                      addToCart(product.id);
                    }}
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

