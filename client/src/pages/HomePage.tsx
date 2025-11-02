import Hero from "@/components/Hero";
import ProductCarousel from "@/components/ProductCarousel";
import SustainabilityModule from "@/components/SustainabilityModule";
import TestimonialsSlider from "@/components/TestimonialsSlider";
import NewsletterSignup from "@/components/NewsletterSignup";
import { useLocation } from "wouter";
import heroImage from '@assets/generated_images/Hero_hands_with_diamond_rings_35adbdf4.png';
import woman from '@assets/generated_images/Customer_testimonial_woman_3c64e2bd.png';
import man from '@assets/generated_images/Customer_testimonial_man_b19953ba.png';
import { products } from "@/data/products";

export default function HomePage() {
  const [, setLocation] = useLocation();

  // Get featured products (new products first, then some popular ones)
  const featuredProducts = products
    .filter(p => p.isNew || ['1', '2', '3', '4', '5'].includes(p.id))
    .slice(0, 6);

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
