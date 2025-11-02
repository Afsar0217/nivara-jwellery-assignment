import ProductCarousel from '../ProductCarousel';
import whiteGoldRing from '@assets/generated_images/White_gold_solitaire_ring_be4bc106.png';
import roseGoldRing from '@assets/generated_images/Rose_gold_oval_halo_ring_7c55c6f4.png';
import earrings from '@assets/generated_images/Yellow_gold_stud_earrings_d2d76b31.png';
import bracelet from '@assets/generated_images/Platinum_tennis_bracelet_039c5213.png';
import necklace from '@assets/generated_images/White_gold_pendant_necklace_7d88d8ea.png';

export default function ProductCarouselExample() {
  const products = [
    { id: '1', name: 'Classic Brilliant Solitaire', price: 125000, image: whiteGoldRing, category: 'Rings', isNew: true },
    { id: '2', name: 'Oval Halo Engagement Ring', price: 185000, image: roseGoldRing, category: 'Rings' },
    { id: '3', name: 'Diamond Stud Earrings', price: 95000, image: earrings, category: 'Earrings', isNew: true },
    { id: '4', name: 'Tennis Bracelet', price: 215000, image: bracelet, category: 'Bracelets' },
    { id: '5', name: 'Emerald Cut Pendant', price: 145000, image: necklace, category: 'Necklaces' },
  ];

  return (
    <div className="p-8">
      <ProductCarousel products={products} title="Featured Collection" />
    </div>
  );
}
