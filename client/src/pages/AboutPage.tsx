import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import founderImage from '@assets/generated_images/Founder_at_work_photo_183c50bd.png';
import sustainabilityIcon from '@assets/generated_images/Sustainability_planet_icon_10e86ae3.png';

export default function AboutPage() {
  const timeline = [
    { year: '2020', title: 'Founded on Ethical Principles', description: 'Started with a vision to make luxury jewelry sustainable and accessible.' },
    { year: '2021', title: 'First Collection Launch', description: 'Introduced our signature line of lab-grown diamond engagement rings.' },
    { year: '2022', title: 'Carbon Neutral Milestone', description: 'Achieved 95% carbon neutrality across our entire supply chain.' },
    { year: '2023', title: 'Global Expansion', description: 'Expanded to serve customers worldwide with our ethical jewelry.' },
    { year: '2024', title: '10,000+ Happy Customers', description: 'Reached a major milestone in making sustainable luxury mainstream.' },
  ];

  return (
    <div className="min-h-screen">
      <div className="border-b bg-card">
        <div className="container px-4 md:px-8 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="font-serif text-4xl md:text-6xl font-bold mb-6">
              Our Story
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We believe that luxury should never come at the cost of our planet or its people. 
              That's why we're committed to creating the most beautiful jewelry in the most ethical way possible.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
              Meet Our Founder
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Founded by jewelry designer and sustainability advocate Maria Chen, Nivara Luxe 
              was born from a simple question: "Can we create beautiful jewelry that doesn't 
              harm the planet?"
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              With over 15 years in the jewelry industry, Maria witnessed firsthand the 
              environmental and social costs of traditional diamond mining. Determined to 
              make a change, she pioneered the use of lab-grown diamonds to create pieces 
              that are identical in beauty and quality to mined stones, but with a fraction 
              of the environmental impact.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-lg mt-6">
              "Every piece we create is a step towards a more sustainable future for luxury jewelry."
              <footer className="text-sm text-muted-foreground mt-2">— Maria Chen, Founder</footer>
            </blockquote>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-[3/4] rounded-lg overflow-hidden"
          >
            <img
              src={founderImage}
              alt="Founder at work"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

        <div className="mb-24">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-center mb-12">
            Our Journey
          </h2>
          <div className="max-w-3xl mx-auto space-y-8">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 relative"
              >
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="font-bold text-primary">{item.year}</span>
                  </div>
                </div>
                <div className="flex-1 pb-8">
                  <h3 className="font-serif text-xl font-bold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">
                Our Commitment to Sustainability
              </h2>
              <ul className="space-y-4">
                <li className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Zero Waste Production</p>
                    <p className="text-sm text-muted-foreground">
                      Our lab-grown process produces minimal waste and uses 100% renewable energy
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Certified Ethical</p>
                    <p className="text-sm text-muted-foreground">
                      Every diamond is IGI certified and fully traceable
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Carbon Neutral</p>
                    <p className="text-sm text-muted-foreground">
                      95% carbon neutral with a goal to reach 100% by 2026
                    </p>
                  </div>
                </li>
                <li className="flex gap-3">
                  <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold">Fair Labor Practices</p>
                    <p className="text-sm text-muted-foreground">
                      All our partners adhere to strict fair labor standards
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={sustainabilityIcon}
                alt="Sustainability"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
