import { ProductCard } from "./product-card";
import { Product } from "@/types";
import {useProducts} from "@/hooks/useProducts"

import psgJersey from '@/assets/jersey-psg.jpg';
import lakersJersey from '@/assets/jersey-lakers.jpg';
import franceRugbyJersey from '@/assets/jersey-france-rugby.jpg';


interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

// Mock data - en attente de l'intégration Supabase
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Maillot PSG Domicile 2024',
    slug: 'maillot-psg-domicile-2024',
    description: 'Maillot officiel du Paris Saint-Germain pour la saison 2024. Design iconique avec les couleurs traditionnelles bleu et rouge. Matière respirante et confortable.',
    short_description: 'Maillot PSG domicile, taille M, polyester',
    price: 90.99,
    images: [psgJersey],
    team: 'Paris Saint-Germain',
    sport: 'Football',
    size: 'M',
    material: 'Polyester',
    is_featured: true,
    is_active: true,
    stock_quantity: 50,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: 'Maillot Lakers Away 2024',
    slug: 'maillot-lakers-away-2024',
    description: 'Maillot visiteur des Los Angeles Lakers. Couleur blanche avec détails violets et dorés. Coupe moderne et matière technique.',
    short_description: 'Maillot Lakers visiteur, taille L, mesh technique',
    price: 95.99,
    images: [lakersJersey],
    team: 'Los Angeles Lakers',
    sport: 'Basketball',
    size: 'L',
    material: 'Mesh technique',
    is_featured: true,
    is_active: true,
    stock_quantity: 30,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Maillot France Rugby 2024',
    slug: 'maillot-france-rugby-2024',
    description: 'Maillot officiel de l\'équipe de France de rugby. Bleu marine avec le coq français. Résistant et adapté au rugby.',
    short_description: 'Maillot France rugby, taille XL, coton renforcé',
    price: 79.99,
    images: [franceRugbyJersey],
    team: 'Équipe de France',
    sport: 'Rugby',
    size: 'XL',
    material: 'Coton renforcé',
    is_featured: false,
    is_active: true,
    stock_quantity: 25,
    created_at: '2024-01-01T00:00:00Z',
    updated_at: '2024-01-01T00:00:00Z'
  }
];

export function ProductGrid(loading : ProductGridProps) {
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

  if (mockProducts.length === 0) {
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
      {mockProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}