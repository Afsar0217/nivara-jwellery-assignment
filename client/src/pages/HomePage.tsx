import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import SustainabilityModule from "@/components/SustainabilityModule";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useLocation } from "wouter";
import heroImage from '@assets/generated_images/Hero_hands_with_diamond_rings_35adbdf4.png';
import whiteGoldRing from '@assets/generated_images/White_gold_solitaire_ring_be4bc106.png';
import roseGoldRing from '@assets/generated_images/Rose_gold_oval_halo_ring_7c55c6f4.png';
import earrings from '@assets/generated_images/Yellow_gold_stud_earrings_d2d76b31.png';
import bracelet from '@assets/generated_images/Platinum_tennis_bracelet_039c5213.png';
import necklace from '@assets/generated_images/White_gold_pendant_necklace_7d88d8ea.png';
import woman from '@assets/generated_images/Customer_testimonial_woman_3c64e2bd.png';
import man from '@assets/generated_images/Customer_testimonial_man_b19953ba.png';

export default function HomePage() {
  const [, setLocation] = useLocation();

  const featuredProducts = [
    { id: '1', name: 'Classic Brilliant Solitaire', price: 125000, image: whiteGoldRing, category: 'Rings', isNew: true },
    { id: '2', name: 'Oval Halo Engagement Ring', price: 185000, image: roseGoldRing, category: 'Rings' },
    { id: '3', name: 'Diamond Stud Earrings', price: 95000, image: earrings, category: 'Earrings', isNew: true },
    { id: '4', name: 'Tennis Bracelet', price: 215000, image: bracelet, category: 'Bracelets' },
    { id: '5', name: 'Emerald Cut Pendant', price: 145000, image: necklace, category: 'Necklaces' },
    { id: '6', name: 'Princess Cut Solitaire', price: 165000, image: whiteGoldRing, category: 'Rings' },
  ];

  const testimonials = [
    {
      name: 'Sarah Anderson',
      quote: 'The quality is exceptional. My engagement ring is more beautiful than I ever imagined, and knowing it\'s ethically sourced makes it even more special.',
      rating: 5,
      image: woman,
    },
    {
      name: 'Michael Chen',
      quote: 'Outstanding craftsmanship and customer service. The customization process was seamless, and the final piece exceeded all expectations.',
      rating: 5,
      image: man,
    },
    {
      name: 'Emily Rodriguez',
      quote: 'I love supporting a brand that prioritizes sustainability. The diamond earrings are stunning and I wear them every day.',
      rating: 5,
      image: woman,
    },
    {
      name: 'David Martinez',
      quote: 'Incredible value for lab-grown diamonds. The brilliance and fire are indistinguishable from mined diamonds, but at a fraction of the cost.',
      rating: 5,
      image: man,
    },
  ];

  return (
    <div>
      <Hero
        image={heroImage}
        title="Ethical Luxury Redefined"
        subtitle="Discover lab-grown diamond jewelry that's beautiful for you and the planet"
        primaryCTA="Explore Collections"
        secondaryCTA="Build Your Ring"
        onPrimaryClick={() => setLocation('/collections')}
        onSecondaryClick={() => setLocation('/product/custom-ring')}
      />

      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-8">
          <ProductCarousel products={featuredProducts} title="Featured Collection" />
        </div>
      </section>

      <SustainabilityModule />

      <TestimonialsSlider testimonials={testimonials} />

      <NewsletterSignup />
    </div>
  );
}
