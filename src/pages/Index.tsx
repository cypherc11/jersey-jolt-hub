import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/ui/hero-section";
import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/filters/product-filters";
import { useProducts } from "@/hooks/useProducts";
import { FilterOptions, SortOption } from "@/types";

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOption>("newest");
  const { products, loading } = useProducts(filters, sort);

  const handleClearFilters = () => {
    setFilters({});
    setSort("newest");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        
        <section className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">Notre Collection</h2>
            <p className="text-muted-foreground text-lg">
              Découvrez nos maillots de sport authentiques des plus grandes équipes
            </p>
          </div>

          <ProductFilters
            filters={filters}
            sort={sort}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            onClearFilters={handleClearFilters}
          />

          <ProductGrid products={products} loading={loading} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
