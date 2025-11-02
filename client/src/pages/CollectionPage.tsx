import { useState, useMemo, useEffect } from "react";
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
import { SlidersHorizontal, X, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/data/products";
import { usePriceConfig } from "@/hooks/usePriceConfig";
import { calculateProductPrice } from "@/lib/priceCalculator";

export default function CollectionPage() {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([10000, 500000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedMetals, setSelectedMetals] = useState<string[]>([]);
  const [selectedShapes, setSelectedShapes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("featured");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch price config for dynamic pricing
  const { data: priceConfig } = usePriceConfig();

  const categories = ['Rings', 'Earrings', 'Necklaces', 'Bracelets'];
  const metals = ['White Gold', 'Yellow Gold', 'Rose Gold', 'Platinum'];
  const shapes = ['Round', 'Oval', 'Princess', 'Emerald', 'Pear', 'Cushion', 'Marquise'];

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleMetalToggle = (metal: string) => {
    setSelectedMetals(prev =>
      prev.includes(metal)
        ? prev.filter(m => m !== metal)
        : [...prev, metal]
    );
  };

  const handleShapeToggle = (shape: string) => {
    setSelectedShapes(prev =>
      prev.includes(shape)
        ? prev.filter(s => s !== shape)
        : [...prev, shape]
    );
  };

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedMetals([]);
    setSelectedShapes([]);
    setPriceRange([10000, 500000]);
    setSearchQuery("");
  };

  const hasActiveFilters = selectedCategories.length > 0 || 
    selectedMetals.length > 0 || 
    selectedShapes.length > 0 || 
    priceRange[0] !== 10000 || 
    priceRange[1] !== 500000 ||
    searchQuery !== "";

  const filteredProducts = useMemo(() => {
    // Calculate prices for all products with current price config
    const productsWithPrices = products.map(product => ({
      ...product,
      calculatedPrice: calculateProductPrice(product.basePrice, priceConfig)
    }));

    let filtered = productsWithPrices.filter(product => {
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const matchesPrice = product.calculatedPrice >= priceRange[0] && product.calculatedPrice <= priceRange[1];
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesMetal = selectedMetals.length === 0 || product.metals.some(m => selectedMetals.includes(m));
      const matchesShape = selectedShapes.length === 0 || (product.shapes && product.shapes.some(s => selectedShapes.includes(s)));
      
      return matchesCategory && matchesPrice && matchesSearch && matchesMetal && matchesShape;
    });

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.calculatedPrice - b.calculatedPrice);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.calculatedPrice - a.calculatedPrice);
        break;
      case 'newest':
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
        break;
      default: // featured
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1;
          if (!a.isNew && b.isNew) return 1;
          return 0;
        });
    }

    return filtered;
  }, [selectedCategories, selectedMetals, selectedShapes, priceRange, searchQuery, sortBy, priceConfig]);

  // Close mobile filters on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && filtersOpen) {
        setFiltersOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [filtersOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="border-b bg-card sticky top-0 z-40 backdrop-blur-sm bg-background/95">
        <div className="container px-4 md:px-6 py-4">
          <h1 className="font-serif text-3xl md:text-4xl font-bold mb-2">Our Collections</h1>
          <p className="text-sm text-muted-foreground max-w-2xl">
            Discover {filteredProducts.length} exquisite pieces of ethical luxury
          </p>
        </div>
      </div>

      {/* Main Content - Flex Layout */}
      <div className="container px-4 md:px-6 py-4">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-start">
          {/* Mobile Filter Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setFiltersOpen(!filtersOpen)}
              className="w-full"
              data-testid="button-mobile-filters"
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters {hasActiveFilters && `(${[selectedCategories.length, selectedMetals.length, selectedShapes.length].reduce((a, b) => a + b, 0)})`}
            </Button>
          </div>

          {/* Fixed Sidebar - Filters */}
          <AnimatePresence>
            {(filtersOpen || window.innerWidth >= 1024) && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`lg:sticky lg:top-20 lg:self-start lg:h-[calc(100vh-6rem)] lg:overflow-y-auto lg:w-64 ${
                  filtersOpen 
                    ? 'fixed inset-0 z-50 bg-background p-6 overflow-y-auto lg:relative lg:p-0 lg:z-auto' 
                    : 'hidden lg:block'
                }`}
              >
                <div className="bg-card border rounded-lg p-4 space-y-5 shadow-sm">
                  {filtersOpen && (
                    <div className="flex items-center justify-between lg:hidden mb-4 pb-4 border-b">
                      <h2 className="font-serif text-xl font-bold">Filters</h2>
                      <Button variant="ghost" size="icon" onClick={() => setFiltersOpen(false)}>
                        <X className="h-5 w-5" />
                      </Button>
                    </div>
                  )}

                  <div className="hidden lg:block">
                    <h2 className="font-serif text-xl font-bold mb-4">Filters</h2>
                  </div>

                  {/* Search */}
                  <div>
                    <Label className="mb-2 block font-semibold text-xs">Search Jewelry</Label>
                    <div className="relative">
                      <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                      <Input
                        placeholder="Search jewelry..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-7 h-9 text-sm"
                        data-testid="input-search"
                      />
                    </div>
                  </div>

                  {/* Price Range */}
                  <div>
                    <div className="flex justify-between mb-2">
                      <Label className="font-semibold text-xs">Price Range</Label>
                      <span className="text-xs text-muted-foreground">
                        ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                      </span>
                    </div>
                    <Slider
                      min={10000}
                      max={500000}
                      step={10000}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-1"
                      data-testid="slider-price"
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <Label className="mb-2 block font-semibold text-xs">Category</Label>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={`category-${category}`}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryToggle(category)}
                            data-testid={`checkbox-category-${category.toLowerCase()}`}
                            className="h-4 w-4"
                          />
                          <label 
                            htmlFor={`category-${category}`} 
                            className="text-xs cursor-pointer flex-1 hover:text-primary transition-colors"
                          >
                            {category}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Metal */}
                  <div>
                    <Label className="mb-2 block font-semibold text-xs">Metal</Label>
                    <div className="space-y-2">
                      {metals.map(metal => (
                        <div key={metal} className="flex items-center space-x-2">
                          <Checkbox
                            id={`metal-${metal}`}
                            checked={selectedMetals.includes(metal)}
                            onCheckedChange={() => handleMetalToggle(metal)}
                            data-testid={`checkbox-metal-${metal.toLowerCase().replace(' ', '-')}`}
                            className="h-4 w-4"
                          />
                          <label 
                            htmlFor={`metal-${metal}`} 
                            className="text-xs cursor-pointer flex-1 hover:text-primary transition-colors"
                          >
                            {metal}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Shape */}
                  <div>
                    <Label className="mb-2 block font-semibold text-xs">Shape</Label>
                    <div className="space-y-2">
                      {shapes.map(shape => (
                        <div key={shape} className="flex items-center space-x-2">
                          <Checkbox
                            id={`shape-${shape}`}
                            checked={selectedShapes.includes(shape)}
                            onCheckedChange={() => handleShapeToggle(shape)}
                            data-testid={`checkbox-shape-${shape.toLowerCase()}`}
                            className="h-4 w-4"
                          />
                          <label 
                            htmlFor={`shape-${shape}`} 
                            className="text-xs cursor-pointer flex-1 hover:text-primary transition-colors"
                          >
                            {shape}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Clear All Filters */}
                  {hasActiveFilters && (
                    <div className="pt-3 border-t">
                      <Button
                        variant="outline"
                        onClick={clearAllFilters}
                        className="w-full h-8 text-xs"
                        data-testid="button-clear-all-filters"
                      >
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Scrollable Product Grid Section */}
          <div className="flex-1 min-w-0">
            {/* Product Count and Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
              <p className="text-xs text-muted-foreground" data-testid="text-result-count">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </p>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-40 h-9 text-sm" data-testid="select-sort">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Product Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-muted-foreground mb-2">No products found matching your criteria.</p>
                {hasActiveFilters && (
                  <Button
                    variant="outline"
                    className="mt-3 h-8 text-xs"
                    onClick={clearAllFilters}
                    data-testid="button-clear-filters"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
