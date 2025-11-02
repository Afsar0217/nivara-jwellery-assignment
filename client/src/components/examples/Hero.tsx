import Hero from '../Hero';
import heroImage from '@assets/generated_images/Hero_hands_with_diamond_rings_35adbdf4.png';

export default function HeroExample() {
  return (
    <Hero
      image={heroImage}
      title="Ethical Luxury Redefined"
      subtitle="Discover lab-grown diamond jewelry that's beautiful for you and the planet"
      primaryCTA="Explore Collections"
      secondaryCTA="Build Your Ring"
      onPrimaryClick={() => console.log('Primary CTA clicked')}
      onSecondaryClick={() => console.log('Secondary CTA clicked')}
    />
  );
}
