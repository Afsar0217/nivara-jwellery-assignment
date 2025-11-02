import whiteGoldRing from '@assets/generated_images/White_gold_solitaire_ring_be4bc106.png';
import roseGoldRing from '@assets/generated_images/Rose_gold_oval_halo_ring_7c55c6f4.png';
import earrings from '@assets/generated_images/Yellow_gold_stud_earrings_d2d76b31.png';
import bracelet from '@assets/generated_images/Platinum_tennis_bracelet_039c5213.png';
import necklace from '@assets/generated_images/White_gold_pendant_necklace_7d88d8ea.png';

export interface ProductImages {
  'White Gold': string;
  'Yellow Gold': string;
  'Rose Gold': string;
  'Platinum': string;
}

export interface Product {
  id: string;
  name: string;
  basePrice: number; // Base price multiplier for dynamic pricing
  price?: number; // Legacy: kept for backward compatibility (calculated from basePrice)
  image: string; // Default image for card view
  images: ProductImages; // Metal variant images
  category: 'Rings' | 'Earrings' | 'Necklaces' | 'Bracelets';
  metals: Array<'White Gold' | 'Yellow Gold' | 'Rose Gold' | 'Platinum'>; // Available metals
  shapes?: Array<'Round' | 'Oval' | 'Princess' | 'Emerald' | 'Pear' | 'Cushion' | 'Marquise'>; // Diamond shapes
  isNew?: boolean;
  description?: string;
}

// Helper to create metal variant images - reusing available images logically
function createMetalImages(
  whiteGoldImg: string,
  yellowGoldImg: string,
  roseGoldImg: string,
  platinumImg: string
): ProductImages {
  return {
    'White Gold': whiteGoldImg,
    'Yellow Gold': yellowGoldImg,
    'Rose Gold': roseGoldImg,
    'Platinum': platinumImg,
  };
}

export const products: Product[] = [
  // Rings
  {
    id: '1',
    name: 'Classic Brilliant Solitaire',
    basePrice: 125000, // Base price for this product
    image: whiteGoldRing,
    images: createMetalImages(whiteGoldRing, whiteGoldRing, roseGoldRing, whiteGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    isNew: true,
    description: 'A timeless classic featuring a brilliant-cut lab-grown diamond in a sophisticated four-prong setting.',
  },
  {
    id: '2',
    name: 'Oval Halo Engagement Ring',
    basePrice: 185000,
    image: roseGoldRing,
    images: createMetalImages(roseGoldRing, roseGoldRing, roseGoldRing, roseGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Oval'],
    description: 'Elegant oval diamond surrounded by a halo of smaller diamonds for maximum brilliance.',
  },
  {
    id: '6',
    name: 'Princess Cut Solitaire',
    basePrice: 165000,
    image: whiteGoldRing,
    images: createMetalImages(whiteGoldRing, whiteGoldRing, roseGoldRing, whiteGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Princess'],
    description: 'Modern princess cut diamond in a classic solitaire setting.',
  },
  {
    id: '7',
    name: 'Cushion Cut Halo Ring',
    basePrice: 195000,
    image: roseGoldRing,
    images: createMetalImages(roseGoldRing, roseGoldRing, roseGoldRing, roseGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Cushion'],
    description: 'Romantic cushion cut diamond with a delicate halo setting.',
  },
  {
    id: '9',
    name: 'Emerald Cut Solitaire',
    basePrice: 175000,
    image: whiteGoldRing,
    images: createMetalImages(whiteGoldRing, whiteGoldRing, roseGoldRing, whiteGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Emerald'],
    isNew: true,
    description: 'Sophisticated emerald cut diamond in an elegant four-prong setting.',
  },
  {
    id: '10',
    name: 'Round Halo Diamond Ring',
    basePrice: 205000,
    image: roseGoldRing,
    images: createMetalImages(roseGoldRing, roseGoldRing, roseGoldRing, roseGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    description: 'Brilliant round diamond with a stunning halo of smaller diamonds.',
  },
  {
    id: '11',
    name: 'Three-Stone Ring',
    basePrice: 245000,
    image: whiteGoldRing,
    images: createMetalImages(whiteGoldRing, whiteGoldRing, roseGoldRing, whiteGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round', 'Pear'],
    description: 'Symbolic three-stone design representing past, present, and future.',
  },
  {
    id: '12',
    name: 'Vintage Art Deco Ring',
    basePrice: 225000,
    image: roseGoldRing,
    images: createMetalImages(roseGoldRing, roseGoldRing, roseGoldRing, roseGoldRing),
    category: 'Rings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Emerald', 'Marquise'],
    description: 'Art deco inspired design with geometric patterns and vintage elegance.',
  },
  // Earrings
  {
    id: '3',
    name: 'Diamond Stud Earrings',
    basePrice: 95000,
    image: earrings,
    images: createMetalImages(earrings, earrings, earrings, earrings),
    category: 'Earrings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    isNew: true,
    description: 'Classic diamond stud earrings in timeless round brilliant cut.',
  },
  {
    id: '8',
    name: 'Dangle Diamond Earrings',
    basePrice: 135000,
    image: earrings,
    images: createMetalImages(earrings, earrings, earrings, earrings),
    category: 'Earrings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Pear', 'Oval'],
    description: 'Elegant dangle earrings featuring cascading diamonds.',
  },
  {
    id: '13',
    name: 'Hoop Diamond Earrings',
    basePrice: 165000,
    image: earrings,
    images: createMetalImages(earrings, earrings, earrings, earrings),
    category: 'Earrings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    description: 'Modern hoop design with diamond accents for everyday elegance.',
  },
  {
    id: '14',
    name: 'Chandelier Diamond Earrings',
    basePrice: 185000,
    image: earrings,
    images: createMetalImages(earrings, earrings, earrings, earrings),
    category: 'Earrings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round', 'Pear'],
    isNew: true,
    description: 'Luxurious chandelier style with multiple diamond drops.',
  },
  {
    id: '15',
    name: 'Pear Drop Earrings',
    basePrice: 155000,
    image: earrings,
    images: createMetalImages(earrings, earrings, earrings, earrings),
    category: 'Earrings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Pear'],
    description: 'Sophisticated pear-shaped diamond drop earrings.',
  },
  {
    id: '16',
    name: 'Cluster Diamond Earrings',
    basePrice: 145000,
    image: earrings,
    images: createMetalImages(earrings, earrings, earrings, earrings),
    category: 'Earrings',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    description: 'Beautiful cluster design with multiple brilliant diamonds.',
  },
  // Necklaces
  {
    id: '5',
    name: 'Emerald Cut Pendant',
    basePrice: 145000,
    image: necklace,
    images: createMetalImages(necklace, necklace, necklace, necklace),
    category: 'Necklaces',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Emerald'],
    description: 'Stunning emerald cut diamond in an elegant pendant setting.',
  },
  {
    id: '17',
    name: 'Solitaire Pendant Necklace',
    basePrice: 135000,
    image: necklace,
    images: createMetalImages(necklace, necklace, necklace, necklace),
    category: 'Necklaces',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    description: 'Classic solitaire diamond pendant on a delicate chain.',
  },
  {
    id: '18',
    name: 'Halo Pendant Necklace',
    basePrice: 175000,
    image: necklace,
    images: createMetalImages(necklace, necklace, necklace, necklace),
    category: 'Necklaces',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round', 'Oval'],
    isNew: true,
    description: 'Brilliant center diamond surrounded by a halo of smaller diamonds.',
  },
  {
    id: '19',
    name: 'Tennis Diamond Necklace',
    basePrice: 285000,
    image: necklace,
    images: createMetalImages(necklace, necklace, necklace, necklace),
    category: 'Necklaces',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    description: 'Luxurious tennis necklace with continuous diamond line.',
  },
  {
    id: '20',
    name: 'Vintage Locket Pendant',
    basePrice: 165000,
    image: necklace,
    images: createMetalImages(necklace, necklace, necklace, necklace),
    category: 'Necklaces',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round', 'Emerald'],
    description: 'Heirloom-quality locket pendant with diamond accents.',
  },
  // Bracelets
  {
    id: '4',
    name: 'Tennis Bracelet',
    basePrice: 215000,
    image: bracelet,
    images: createMetalImages(bracelet, bracelet, bracelet, bracelet),
    category: 'Bracelets',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    description: 'Classic tennis bracelet with continuous diamond line.',
  },
  {
    id: '21',
    name: 'Chain Diamond Bracelet',
    basePrice: 195000,
    image: bracelet,
    images: createMetalImages(bracelet, bracelet, bracelet, bracelet),
    category: 'Bracelets',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round'],
    description: 'Elegant chain bracelet with diamond-studded links.',
  },
  {
    id: '22',
    name: 'Bangle Diamond Bracelet',
    basePrice: 235000,
    image: bracelet,
    images: createMetalImages(bracelet, bracelet, bracelet, bracelet),
    category: 'Bracelets',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Round', 'Princess'],
    isNew: true,
    description: 'Stunning bangle bracelet with channel-set diamonds.',
  },
  {
    id: '23',
    name: 'Cuff Diamond Bracelet',
    basePrice: 265000,
    image: bracelet,
    images: createMetalImages(bracelet, bracelet, bracelet, bracelet),
    category: 'Bracelets',
    metals: ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'],
    shapes: ['Emerald', 'Marquise'],
    description: 'Bold cuff bracelet with geometric diamond patterns.',
  },
];

// Helper function to get product by ID
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

