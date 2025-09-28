// Importation des hooks React et des fonctions Firestore nécessaires
import { useState, useEffect } from 'react';
import { collection, getDocs, query, where, orderBy, limit, startAfter, doc, setDoc, updateDoc, documentId } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Product, FilterOptions, SortOption } from '@/types';
import { FirebaseError } from 'firebase/app';

// Hook personnalisé pour récupérer une liste de produits avec filtres, tri et pagination page d'acceuil
export function useFirebaseProducts(filters?: FilterOptions, sort?: SortOption, pageSize = 12) {
  // États pour gérer les produits, le chargement, les erreurs, la pagination
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [lastDoc, setLastDoc] = useState<any>(null); // Document Firestore pour la pagination

  // Fonction pour récupérer les produits depuis Firestore
  const fetchProducts = async (reset = false) => {
    try {
      setLoading(true); // Démarre le chargement

      // Création de la requête de base sur la collection "products"
      let q = query(collection(db, 'product'));

      // Application des filtres si présents
      if (filters?.category && filters.category !== 'all') {
        q = query(q, where('sport', '==', filters.category));
      }
      if (filters?.team && filters.team !== 'all') {
        q = query(q, where('team', '==', filters.team));
      }
      if (filters?.search) {
        // Recherche par mots-clés dans le champ "searchTags"
        q = query(q, where('searchTags', 'array-contains-any', filters.search.toLowerCase().split(' ')));
      }

      // Application du tri selon l’option choisie
      if (sort === 'price-asc') {
        q = query(q, orderBy('price', 'asc'));
      } else if (sort === 'price-desc') {
        q = query(q, orderBy('price', 'desc'));
      } else {
        // Tri par date de création par défaut
        q = query(q, orderBy('created_at', 'desc'));
      }

      // Ajout de la pagination si ce n’est pas un reset
      if (!reset && lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      // Limite le nombre de résultats retournés
      q = query(q, limit(pageSize));

      // Exécution de la requête
      const querySnapshot = await getDocs(q);

      // Transformation des documents Firestore en objets Product
      const newProducts = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Product));

      // Mise à jour de l’état selon le mode (reset ou ajout)
      if (reset) {
        setProducts(newProducts);
      } else {
        setProducts(prev => [...prev, ...newProducts]);
      }

      // Mise à jour du dernier document pour la pagination
      setLastDoc(querySnapshot.docs[querySnapshot.docs.length - 1]);

      // Détermine s’il reste des produits à charger
      setHasMore(querySnapshot.docs.length === pageSize);
      console.log()
    } catch (err) {
      // Gestion des erreurs
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
      console.log("erreur")
    } finally {
      // Fin du chargement
      setLoading(false);
    }
  };

  // Effet déclenché à chaque changement de filtre ou tri
  useEffect(() => {
    setProducts([]); // Réinitialise les produits
    setLastDoc(null); // Réinitialise la pagination
    fetchProducts(true); // Recharge les produits
  }, [filters, sort]);

  // Retourne les données et la fonction pour charger plus de produits
  return { products, loading, error, hasMore, loadMore: () => fetchProducts(false) };
}

// Hook personnalisé pour récupérer un produit unique via son slug, page de detaille
export function useFirebaseProduct(slug: string) {
  // États pour gérer le produit, le chargement et les erreurs
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Effet déclenché à chaque changement de slug
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true); // Démarre le chargement

        // Requête Firestore pour trouver le produit correspondant au slug
        const q = query(collection(db, 'product'), where('slug', '==', slug));
        const querySnapshot = await getDocs(q);

        // Si le produit est trouvé, on le stocke
        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0];
          setProduct({ id: doc.id, ...doc.data() } as Product);
        } else {
          // Aucun produit trouvé
          setProduct(null);
          console.log("aucun produit trouver")
        }
      } catch (err) {
        // Gestion des erreurs
        setError(err instanceof Error ? err.message : 'Produit non trouvé');
      } finally {
        // Fin du chargement
        setLoading(false);
      }
    };

    // Exécute la requête si un slug est fourni
    if (slug) {
      fetchProduct();
    }
  }, [slug]);

  // Retourne le produit et les états associés
  return { product, loading, error };
}

//hook de base pour ajouter un produit a la base de donnee, a integrer dans le formulaire d'ajout
export const addFirebaseProduct = async (collectionName: string, documentID: string, data: any) => {
  try {
    const documentRref = doc(db, collectionName, documentID);

    await setDoc(documentRref, data)
    return { data: true }

  } catch (error) {
    const firebaseError = error as FirebaseError
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message
      }
    }
  }
}

//hook de base pour mettre a jour un produit
export const UpdateFirebaseProduct = async (documentID: string, data: any) => {
  try {
    const documentRref = doc(db, "produit", documentID);

    await updateDoc(documentRref, data)
    return { data: true }

  } catch (error) {
    const firebaseError = error as FirebaseError
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message
      }
    }
  }
}

//hook de base pour recuperation des donnes lors de la mise a jour, a inclure dans un bouton modifier dans 'tous les produits'... nons terminer
export const FirebaseProduct = async (documentID: string, data: any) => {
  const [product, setProduct] = useState()
  const [loading, setLoading] = useState('false')
  try {
    //const documentRef = doc(db, 'product', documentID)
    setLoading('true')
    const q = query(collection(db, 'product'), where("documentID", "==", documentID))
    const prod = await getDocs(q)

    const doc = prod.docs[0];
    //setProduct({ id: doc.id, ...doc.data() } as Product);
    return { q: true }

  } catch (error) {
    const firebaseError = error as FirebaseError
    return {
      error: {
        code: firebaseError.code,
        message: firebaseError.message
      }
    }
  }

}