import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import { calculateProductPrice } from "@/lib/priceCalculator";
import { getProductById, type Product } from "@/data/products";

export interface CartItem {
  productId: string;
  quantity: number;
  metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum';
}

interface CartContextType {
  items: CartItem[];
  addToCart: (productId: string, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => void;
  removeFromCart: (productId: string, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => void;
  updateQuantity: (productId: string, quantity: number, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartItemsWithDetails: () => Array<{
    product: Product;
    quantity: number;
    metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum';
    price: number;
  }>;
  getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const { toast } = useToast();
  const { data: priceConfig } = usePriceConfig();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (productId: string, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => {
    setItems(prev => {
      const existingItem = prev.find(item => item.productId === productId && item.metal === metal);
      
      if (existingItem) {
        // Increment quantity if item already exists
        return prev.map(item =>
          item.productId === productId && item.metal === metal
            ? { ...item, quantity: Math.min(item.quantity + 1, 10) }
            : item
        );
      } else {
        // Add new item
        const newItem: CartItem = { productId, quantity: 1, metal };
        toast({
          title: "Added to Cart! ✨",
          description: "Your item has been added to the cart.",
        });
        return [...prev, newItem];
      }
    });
  };

  const removeFromCart = (productId: string, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => {
    setItems(prev => prev.filter(item => !(item.productId === productId && item.metal === metal)));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const updateQuantity = (productId: string, quantity: number, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => {
    if (quantity <= 0) {
      removeFromCart(productId, metal);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.productId === productId && item.metal === metal
          ? { ...item, quantity: Math.min(Math.max(1, quantity), 10) }
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalItems = () => {
    return items.reduce((sum, item) => sum + item.quantity, 0);
  };

  const getCartItemsWithDetails = () => {
    return items.map(item => {
      const product = getProductById(item.productId);
      if (!product) return null;
      
      const price = calculateProductPrice(product.basePrice, priceConfig, item.metal);
      return {
        product,
        quantity: item.quantity,
        metal: item.metal,
        price,
      };
    }).filter(Boolean) as Array<{
      product: Product;
      quantity: number;
      metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum';
      price: number;
    }>;
  };

  const getTotalPrice = () => {
    return getCartItemsWithDetails().reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getCartItemsWithDetails,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

