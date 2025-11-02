import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";

export default function CartPage() {
  const { getCartItemsWithDetails, updateQuantity, removeFromCart, getTotalPrice } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const items = getCartItemsWithDetails();
  const subtotal = getTotalPrice();

  const updateItemQuantity = (productId: string, delta: number, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => {
    const item = items.find(item => item.product.id === productId && item.metal === metal);
    if (item) {
      updateQuantity(productId, item.quantity + delta, metal);
    }
  };

  const removeItem = (productId: string, metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum') => {
    removeFromCart(productId, metal);
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'SAVE10') {
      setDiscount(0.10);
    } else {
      setDiscount(0);
    }
  };

  const discountAmount = subtotal * discount;
  const total = subtotal - discountAmount;

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-8">Add some beautiful pieces to get started</p>
          <Link href="/collections">
            <Button size="lg" data-testid="button-continue-shopping">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container px-4 md:px-8">
        <h1 className="font-serif text-4xl md:text-5xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={`${item.product.id}-${item.metal || 'default'}`} className="bg-card border rounded-lg p-4 md:p-6">
                <div className="flex gap-4 md:gap-6">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      data-testid={`img-cart-item-${item.product.id}`}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between gap-4 mb-2">
                      <div>
                        <h3 className="font-semibold text-lg mb-1" data-testid={`text-item-name-${item.product.id}`}>
                          {item.product.name}
                        </h3>
                        {item.metal && (
                          <p className="text-sm text-muted-foreground">
                            Metal: {item.metal}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeItem(item.product.id, item.metal)}
                        className="flex-shrink-0"
                        data-testid={`button-remove-${item.product.id}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center gap-2 border rounded-lg">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateItemQuantity(item.product.id, -1, item.metal)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8"
                          data-testid={`button-decrease-${item.product.id}`}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.product.id}`}>
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateItemQuantity(item.product.id, 1, item.metal)}
                          disabled={item.quantity >= 10}
                          className="h-8 w-8"
                          data-testid={`button-increase-${item.product.id}`}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>

                      <p className="font-semibold text-lg" data-testid={`text-item-price-${item.product.id}`}>
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-card border rounded-lg p-6 sticky top-24 space-y-6">
              <h2 className="font-serif text-2xl font-bold">Order Summary</h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-primary">
                    <span>Discount (10%)</span>
                    <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Free</span>
                </div>
                <div className="border-t pt-3 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary" data-testid="text-cart-total">₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="promo">Promo Code</Label>
                <div className="flex gap-2">
                  <Input
                    id="promo"
                    placeholder="Enter code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    data-testid="input-promo-code"
                  />
                  <Button onClick={applyPromo} variant="outline" data-testid="button-apply-promo">
                    Apply
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">Try: SAVE10</p>
              </div>

              <Button className="w-full" size="lg" data-testid="button-checkout">
                Proceed to Checkout
              </Button>

              <Link href="/collections">
                <Button variant="outline" className="w-full" data-testid="button-continue-shopping-cart">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) {
  return <label htmlFor={htmlFor} className="text-sm font-medium">{children}</label>;
}
