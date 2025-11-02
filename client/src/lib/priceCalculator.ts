import type { PriceConfig } from "@shared/schema";

const DEFAULT_BASE_PRICE = 50000;

/**
 * Calculate product price based on price config and product base price
 * Formula: productBasePrice * (globalBasePrice / defaultBasePrice) + metalPremium
 * When global basePrice changes, all product prices scale proportionally
 */
export function calculateProductPrice(
  productBasePrice: number, // Product's base price value
  priceConfig: PriceConfig | null | undefined,
  metal?: 'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum'
): number {
  // If no price config, return product base price (fallback)
  if (!priceConfig) {
    return productBasePrice;
  }

  // Calculate price multiplier: ratio of current global basePrice to default
  // Example: if global basePrice is 60000 (default was 50000), multiplier = 1.2
  // So all products are 20% more expensive
  const priceMultiplier = priceConfig.basePrice / DEFAULT_BASE_PRICE;
  const calculatedBasePrice = productBasePrice * priceMultiplier;

  // Add metal premium if metal is specified
  let metalPremium = 0;
  if (metal) {
    const metalKey = metal.toLowerCase().replace(' ', '-') as keyof typeof priceConfig.metalPremiums;
    metalPremium = priceConfig.metalPremiums[metalKey] || 0;
  }

  return Math.round(calculatedBasePrice + metalPremium);
}

/**
 * Calculate custom price using PriceCalculator component logic
 */
export function calculateCustomPrice(
  priceConfig: PriceConfig | null | undefined,
  carat: number,
  metal: 'white-gold' | 'yellow-gold' | 'rose-gold' | 'platinum',
  engraving: boolean,
  giftBox: boolean
): number {
  if (!priceConfig) {
    // Fallback to default values
    return 50000 + (carat * 45000);
  }

  const total = priceConfig.basePrice 
    + (carat * priceConfig.caratMultiplier)
    + priceConfig.metalPremiums[metal]
    + (engraving ? priceConfig.customizationFees.engraving : 0)
    + (giftBox ? priceConfig.customizationFees.giftBox : 0);
  
  return Math.round(total / 10) * 10;
}

