import { motion } from "framer-motion";

interface MetalSwatchProps {
  metal: string;
  active: boolean;
  onClick: () => void;
}

const metalColors = {
  "White Gold": "linear-gradient(135deg, #E8E8E8 0%, #F5F5F5 100%)",
  "Yellow Gold": "linear-gradient(135deg, #FFD700 0%, #FFC700 100%)",
  "Rose Gold": "linear-gradient(135deg, #E0BFB8 0%, #F4D4CC 100%)",
  "Platinum": "linear-gradient(135deg, #D0D0D0 0%, #E5E5E5 100%)",
};

export default function MetalSwatch({ metal, active, onClick }: MetalSwatchProps) {
  return (
    <motion.button
      className={`relative h-12 w-12 rounded-full border-2 transition-all ${
        active ? "border-primary ring-2 ring-primary ring-offset-2 scale-110" : "border-border hover-elevate"
      }`}
      onClick={onClick}
      whileHover={{ scale: active ? 1.1 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      data-testid={`button-swatch-${metal.toLowerCase().replace(' ', '-')}`}
      aria-pressed={active}
      role="radio"
    >
      <div
        className="absolute inset-1 rounded-full"
        style={{ background: metalColors[metal as keyof typeof metalColors] }}
      />
    </motion.button>
  );
}
