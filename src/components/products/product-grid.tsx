import { useFirebaseProducts } from "@/hooks/useFirebaseProducts";
import { ProductCard } from "./product-card";
import { useProducts } from "@/hooks/useProducts";
import { Product } from "@/types";


interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

export function ProductGrid({products, loading} : ProductGridProps) {
  //const {products, loading, error, refetch} = useProducts()
  // const {products, loading, error, hasMore, loadMore} = useFirebaseProducts()

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="aspect-square bg-muted rounded-lg mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
              <div className="h-8 bg-muted rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">🏃‍♂️</div>
        <h3 className="text-xl font-semibold mb-2">Aucun maillot trouvé</h3>
        <p className="text-muted-foreground">
          Essayez de modifier vos filtres ou votre recherche
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>

  );
}