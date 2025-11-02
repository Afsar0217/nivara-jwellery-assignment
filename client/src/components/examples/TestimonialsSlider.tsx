import TestimonialsSlider from '../TestimonialsSlider';
import woman from '@assets/generated_images/Customer_testimonial_woman_3c64e2bd.png';
import man from '@assets/generated_images/Customer_testimonial_man_b19953ba.png';

export default function TestimonialsSliderExample() {
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
  ];

  return <TestimonialsSlider testimonials={testimonials} />;
}
