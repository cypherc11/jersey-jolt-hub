import { useState, useEffect } from 'react';
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged, 
  User 
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';

export function useFirebaseAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        // Check if user is admin
        try {
          const userDoc = await getDoc(doc(db, 'admins', user.uid));
          setIsAdmin(userDoc.exists());
        } catch (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur de connexion' 
      };
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Erreur de déconnexion' 
      };
    }
  };

  return { user, isAdmin, loading, login, logout };
}