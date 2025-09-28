import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { HeroSection } from "@/components/ui/hero-section";
import { ProductGrid } from "@/components/products/product-grid";
import { AdvancedFilters } from "@/components/filters/advanced-filters";
import { useFirebaseProducts } from "@/hooks/useFirebaseProducts";
import { FilterOptions, SortOption } from "@/types";
import { SEOHead } from "@/components/seo/seo-head";
import { useProducts } from "@/hooks/useProducts";
import { ProductFilters } from "@/components/filters/product-filters";

const Index = () => {
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sort, setSort] = useState<SortOption>("newest");
  //const { products, loading } = useFirebaseProducts(filters, sort);
  const { products, loading } = useProducts(filters, sort);

  const handleClearFilters = () => {
    setFilters({});
    setSort("newest");
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead 
        title="Maillots de Sport Authentiques"
        description="Découvrez notre collection de maillots de sport des plus grandes équipes. Football, Basketball, Rugby et plus encore."
      />
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

          <AdvancedFilters
            filters={filters}
            sort={sort}
            onFiltersChange={setFilters}
            onSortChange={setSort}
            onClearFilters={handleClearFilters}
            className="mb-8"
          />

          <ProductGrid products={products} loading={loading} />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
