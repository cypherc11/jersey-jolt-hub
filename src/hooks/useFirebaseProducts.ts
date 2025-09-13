import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, FilterOptions, SortOption } from '@/types';

export function useFirebaseProducts(filters?: FilterOptions, sort?: SortOption, pageSize = 12) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null);

  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true);
      let q = query(collection(db, 'products'));

      // Add filters
      if (filters?.category && filters.category !== 'all') {
        q = query(q, where('sport', '==', filters.category));
      }
      if (filters?.team && filters.team !== 'all') {
        q = query(q, where('team', '==', filters.team));
      }
      if (filters?.search) {
        // For simple search, we'll use array-contains for tags or name contains
        q = query(q, where('searchTags', 'array-contains-any', 
          filters.search.toLowerCase().split(' ')));
      }

      // Add sorting
      if (sort === 'price-asc') {
        q = query(q, orderBy('price', 'asc'));
      } else if (sort === 'price-desc') {
        q = query(q, orderBy('price', 'desc'));
      } else {
        q = query(q, orderBy('created_at', 'desc'));
      }

      // Add pagination
      if (!reset && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }
      q = query(q, limit(pageSize));

      const querySnapshot = await getDocs(q);
      const newProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));

      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);
      setHasMore(querySnapshot.docs.length === pageSize);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setProducts([]);
    setLastDoc(null);
    fetchProducts(true);
  }, [filters, sort]);

  return { products, loading, error, hasMore, loadMore: () => fetchProducts(false) };
}

export function useFirebaseProduct(slug: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const q = query(collection(db, 'products'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setProduct({ id: doc.id, ...doc.data() } as Product);
        } else {
          setProduct(null);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Produit non trouvé');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  return { product, loading, error };
}