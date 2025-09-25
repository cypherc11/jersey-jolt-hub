import { useState, useEffect } from 'react';
import { Product, FilterOptions, SortOption } from '@/types';
import psgJersey from '@/assets/jersey-psg.jpg';
import lakersJersey from '@/assets/jersey-lakers.jpg';
import franceRugbyJersey from '@/assets/jersey-france-rugby.jpg';

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

export function useProducts(filters?: FilterOptions, sort?: SortOption) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // Simulation d'un appel API
        await new Promise(resolve => setTimeout(resolve, 500));
        
        let filteredProducts = [...mockProducts];

        // Appliquer les filtres
        if (filters) {
          if (filters.search) {
            const searchTerm = filters.search.toLowerCase();
            filteredProducts = filteredProducts.filter(product =>
              product.name.toLowerCase().includes(searchTerm) ||
              product.team?.toLowerCase().includes(searchTerm) ||
              product.sport?.toLowerCase().includes(searchTerm)
            );
          }

          if (filters.sport) {
            filteredProducts = filteredProducts.filter(product =>
              product.sport?.toLowerCase() === filters.sport?.toLowerCase()
            );
          }

          if (filters.team) {
            filteredProducts = filteredProducts.filter(product =>
              product.team?.toLowerCase().includes(filters.team?.toLowerCase() || '')
            );
          }

          if (filters.priceRange) {
            filteredProducts = filteredProducts.filter(product =>
              product.price >= filters.priceRange![0] && product.price <= filters.priceRange![1]
            );
          }
        }

        // Appliquer le tri
        if (sort) {
          switch (sort) {
            case 'price-asc':
              filteredProducts.sort((a, b) => a.price - b.price);
              break;
            case 'price-desc':
              filteredProducts.sort((a, b) => b.price - a.price);
              break;
            case 'name':
              filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
              break;
            case 'newest':
              filteredProducts.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
              break;
          }
        }

        setProducts(filteredProducts);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, sort]);

  return { products, loading, error, refetch: () => {} };
}

export function useProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 300));
        const foundProduct = mockProducts.find(p => p.slug === slug);
        if (foundProduct) {
          setProduct(foundProduct);
          setError(null);
        } else {
          setError('Produit non trouvé');
        }
      } catch (err) {
        setError('Erreur lors du chargement du produit');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  return { product, loading, error };
}