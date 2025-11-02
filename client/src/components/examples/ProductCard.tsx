import ProductCard from '../ProductCard';
import whiteGoldRing from '@assets/generated_images/White_gold_solitaire_ring_be4bc106.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 max-w-xs">
      <ProductCard
        id="1"
        name="Classic Round Brilliant Solitaire"
        price={125000}
        image={whiteGoldRing}
        category="Rings"
        isNew
      />
    </div>
  );
}
