import { Leaf, Heart, Globe } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const features = [
  {
    icon: Leaf,
    title: "Planet",
    description: "Zero-emission production with 100% renewable energy",
    stat: "10,000+",
    statLabel: "Ethical Carats",
  },
  {
    icon: Heart,
    title: "Compassion",
    description: "Conflict-free and traceable supply chain",
    stat: "100%",
    statLabel: "Certified Ethical",
  },
  {
    icon: Globe,
    title: "Purpose",
    description: "Supporting communities and sustainable practices",
    stat: "95%",
    statLabel: "Carbon Neutral",
  },
];

export default function SustainabilityModule() {
  const [isVisible, setIsVisible] = useState(false);
  const moduleRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          countersRef.current.forEach((counter, index) => {
            if (counter) {
              const target = features[index].stat;
              const isPercentage = target.includes('%');
              const numericValue = parseInt(target.replace(/[^0-9]/g, ''));
              
              gsap.to(counter, {
                innerText: numericValue,
                duration: 2,
                snap: { innerText: 1 },
                onUpdate: function() {
                  const current = Math.floor(this.targets()[0].innerText);
                  counter.innerText = isPercentage ? `${current}%` : `${current.toLocaleString('en-IN')}+`;
                }
              });
            }
          });
        }
      },
      { threshold: 0.3 }
    );

    if (moduleRef.current) {
      observer.observe(moduleRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={moduleRef} className="py-16 md:py-24">
      <div className="container px-4 md:px-8">
        <h2 className="font-serif text-3xl md:text-5xl font-bold text-center mb-4">
          Ethical is Beautiful
        </h2>
        <p className="text-center text-muted-foreground max-w-2xl mx-auto mb-12">
          Every piece tells a story of sustainability, compassion, and purpose.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="text-center space-y-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-bold">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
                <div>
                  <div 
                    className="text-4xl font-bold text-primary font-serif"
                    data-testid={`text-stat-${feature.title.toLowerCase()}`}
                  >
                    <span ref={(el) => (countersRef.current[index] = el)}>0</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    {feature.statLabel}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
