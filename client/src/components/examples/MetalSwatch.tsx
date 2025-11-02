import { useState } from 'react';
import MetalSwatch from '../MetalSwatch';

export default function MetalSwatchExample() {
  const [selected, setSelected] = useState('White Gold');
  const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'];

  return (
    <div className="p-8">
      <div className="flex gap-4 flex-wrap">
        {metals.map((metal) => (
          <MetalSwatch
            key={metal}
            metal={metal}
            active={selected === metal}
            onClick={() => setSelected(metal)}
          />
        ))}
      </div>
      <p className="mt-4 text-sm text-muted-foreground">Selected: {selected}</p>
    </div>
  );
}
