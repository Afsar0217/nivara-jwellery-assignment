import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import whiteGoldRing from '@assets/generated_images/White_gold_solitaire_ring_be4bc106.png';
import roseGoldRing from '@assets/generated_images/Rose_gold_oval_halo_ring_7c55c6f4.png';
import earrings from '@assets/generated_images/Yellow_gold_stud_earrings_d2d76b31.png';
import bracelet from '@assets/generated_images/Platinum_tennis_bracelet_039c5213.png';
import necklace from '@assets/generated_images/White_gold_pendant_necklace_7d88d8ea.png';

//todo: remove mock functionality
const mockProducts = [
  { id: '1', name: 'Classic Brilliant Solitaire', price: 125000, image: whiteGoldRing, category: 'Rings' },
  { id: '2', name: 'Oval Halo Engagement Ring', price: 185000, image: roseGoldRing, category: 'Rings' },
  { id: '3', name: 'Diamond Stud Earrings', price: 95000, image: earrings, category: 'Earrings' },
  { id: '4', name: 'Tennis Bracelet', price: 215000, image: bracelet, category: 'Bracelets' },
  { id: '5', name: 'Emerald Cut Pendant', price: 145000, image: necklace, category: 'Necklaces' },
  { id: '6', name: 'Princess Cut Solitaire', price: 165000, image: whiteGoldRing, category: 'Rings' },
  { id: '7', name: 'Cushion Cut Halo Ring', price: 195000, image: roseGoldRing, category: 'Rings' },
  { id: '8', name: 'Dangle Diamond Earrings', price: 135000, image: earrings, category: 'Earrings' },
];

export default function CollectionPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([10000, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ['Rings', 'Earrings', 'Necklaces', 'Bracelets'];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const filteredProducts = mockProducts.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesPrice && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="border-b bg-card">
        <div className="container px-4 md:px-8 py-8">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">Collections</h1>
          <p className="text-muted-foreground max-w-2xl">
            Explore our curated selection of ethically crafted lab-grown diamond jewelry
          </p>
        </div>
      </div>

      <div className="container px-4 md:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full"
              data-testid="button-mobile-filters"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <AnimatePresence>
            {(filtersOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`lg:w-64 space-y-6 ${filtersOpen ? 'fixed inset-0 z-50 bg-background p-6 lg:relative lg:p-0' : 'hidden lg:block'}`}
              >
                {filtersOpen && (
                  <div className="flex items-center justify-between lg:hidden mb-6">
                    <h2 className="font-serif text-2xl font-bold">Filters</h2>
                    <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                      <X className="h-5 w-5" />
                    </Button>
                  </div>
                )}

                <div>
                  <Label className="mb-3 block">Search</Label>
                  <Input
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-testid="input-search"
                  />
                </div>

                <div>
                  <Label className="mb-3 block">Category</Label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={() => handleCategoryToggle(category)}
                          data-testid={`checkbox-category-${category.toLowerCase()}`}
                        />
                        <label htmlFor={category} className="text-sm cursor-pointer">
                          {category}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-3">
                    <Label>Price Range</Label>
                    <span className="text-sm text-muted-foreground">
                      ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                    </span>
                  </div>
                  <Slider
                    min={10000}
                    max={500000}
                    step={10000}
                    value={priceRange}
                    onValueChange={setPriceRange}
                    className="mb-2"
                    data-testid="slider-price"
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-muted-foreground" data-testid="text-result-count">
                Showing {filteredProducts.length} products
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48" data-testid="select-sort">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([10000, 500000]);
                    setSearchQuery("");
                  }}
                  data-testid="button-clear-filters"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
