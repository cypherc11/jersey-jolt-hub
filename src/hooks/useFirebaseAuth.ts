// Importation des hooks React et des fonctions Firebase nécessaires
import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, // Fonction pour connecter un utilisateur avec email/mot de passe
  signOut,                    // Fonction pour déconnecter l'utilisateur
  onAuthStateChanged,        // Écouteur de changement d'état d'authentification
  User                       // Type représentant un utilisateur Firebase
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore'; // Fonctions Firestore pour accéder aux documents
import { auth, db } from '@/lib/firebase';        // Instances configurées de Firebase Auth et Firestore

// Hook personnalisé pour gérer l'authentification Firebase
export function useFirebaseAuth() {
  // État local pour stocker l'utilisateur connecté
  const [user, setUser] = useState<User | null>(null);

  // État pour savoir si l'utilisateur est administrateur
  const [isAdmin, setIsAdmin] = useState(false);

  // État pour indiquer si les données sont en cours de chargement
  const [loading, setLoading] = useState(true);

  // Effet déclenché au montage du composant pour écouter les changements d'authentification
  useEffect(() => {
    // Abonnement à l'état d'authentification
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user); // Met à jour l'utilisateur connecté

      if (user) {
        // Si un utilisateur est connecté, on vérifie s'il est admin
        try {
          const userDoc = await getDoc(doc(db, 'admins', user.uid)); // Cherche le document dans la collection "admins"
          setIsAdmin(userDoc.exists()); // Si le document existe, l'utilisateur est admin
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false); // En cas d'erreur, on considère qu'il n'est pas admin
        }
      } else {
        // Aucun utilisateur connecté, donc pas admin
        setIsAdmin(false);
      }

      setLoading(false); // Fin du chargement
    });

    // Nettoyage de l'abonnement à la sortie du composant
    return unsubscribe;
  }, []);

  // Fonction pour connecter un utilisateur avec email et mot de passe
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password); // Tentative de connexion
      return { success: true }; // Succès
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur de connexion' // Message d'erreur
      };
    }
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = async () => {
    try {
      await signOut(auth); // Déconnexion
      return { success: true }; // Succès
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur de déconnexion' // Message d'erreur
      };
    }
  };

  // Retourne les données et les fonctions utiles pour l'authentification
  return { user, isAdmin, loading, login, logout };
}
