# Maillots de Sport - E-commerce Platform

Site e-commerce moderne spécialisé dans la vente de maillots de sport (football, basketball, rugby). Interface client fluide avec redirection directe WhatsApp/Telegram et interface admin sécurisée.

## Project info

**URL**: https://lovable.dev/projects/546f037f-726d-4c43-91d5-92726e29032c

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/546f037f-726d-4c43-91d5-92726e29032c) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/546f037f-726d-4c43-91d5-92726e29032c) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

## Backend Integration Options

### Option 1: Supabase (Recommandé) 🚀

**Lovable a une intégration native avec Supabase** - la solution recommandée pour ce projet.

**Avantages:**
- Intégration native directe avec Lovable
- Authentification email/password prête à l'emploi
- Base de données PostgreSQL
- Stockage de fichiers
- Functions edge pour logique backend
- Configuration simplifiée

**Activation:**
1. Cliquer sur le bouton vert "Supabase" en haut à droite de l'interface Lovable
2. Suivre les instructions pour connecter votre projet

**Fonctionnalités disponibles:**
- ✅ Authentification admin sécurisée
- ✅ Stockage des produits (maillots)
- ✅ Upload d'images
- ✅ Gestion des catégories
- ✅ APIs backend
- ✅ Logs et analytics

[Documentation Supabase](https://docs.lovable.dev/integrations/supabase/)

### Option 2: Firebase (Alternative)

Si vous préférez utiliser Firebase, voici les étapes d'intégration:

#### Installation
```bash
npm install firebase
```

#### Configuration Firebase

1. **Créer un projet Firebase:**
   - Aller sur [Firebase Console](https://console.firebase.google.com/)
   - Créer un nouveau projet
   - Activer Firestore Database
   - Activer Authentication
   - Activer Storage

2. **Configuration du projet:**
   Créer `src/lib/firebase.ts`:
   ```typescript
   import { initializeApp } from 'firebase/app';
   import { getFirestore } from 'firebase/firestore';
   import { getAuth } from 'firebase/auth';
   import { getStorage } from 'firebase/storage';

   const firebaseConfig = {
     apiKey: "your-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789",
     appId: "your-app-id"
   };

   const app = initializeApp(firebaseConfig);
   export const db = getFirestore(app);
   export const auth = getAuth(app);
   export const storage = getStorage(app);
   ```

3. **Structure Firestore recommandée:**
   ```
   products/
   ├── {productId}/
   │   ├── name: string
   │   ├── description: string
   │   ├── price: number
   │   ├── images: string[]
   │   ├── sport: string
   │   ├── team: string
   │   ├── category: string
   │   └── createdAt: timestamp

   categories/
   ├── {categoryId}/
   │   ├── name: string
   │   ├── sport: string
   │   └── displayOrder: number
   ```

4. **Hooks Firebase utiles:**
   ```typescript
   // src/hooks/useFirebaseProducts.ts
   import { useState, useEffect } from 'react';
   import { collection, getDocs, query, where } from 'firebase/firestore';
   import { db } from '@/lib/firebase';

   export const useFirebaseProducts = (filters = {}) => {
     const [products, setProducts] = useState([]);
     const [loading, setLoading] = useState(true);

     useEffect(() => {
       const fetchProducts = async () => {
         let q = collection(db, 'products');
         
         if (filters.sport) {
           q = query(q, where('sport', '==', filters.sport));
         }
         
         const snapshot = await getDocs(q);
         const productsData = snapshot.docs.map(doc => ({
           id: doc.id,
           ...doc.data()
         }));
         
         setProducts(productsData);
         setLoading(false);
       };

       fetchProducts();
     }, [filters]);

     return { products, loading };
   };
   ```

5. **Authentification admin:**
   ```typescript
   // src/hooks/useFirebaseAuth.ts
   import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
   import { auth } from '@/lib/firebase';

   export const useFirebaseAuth = () => {
     const login = async (email: string, password: string) => {
       return await signInWithEmailAndPassword(auth, email, password);
     };

     const logout = async () => {
       return await signOut(auth);
     };

     return { login, logout };
   };
   ```

#### Règles de sécurité Firestore
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Products - lecture publique, écriture admin seulement
    match /products/{productId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
    
    // Categories - lecture publique, écriture admin seulement
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null && request.auth.token.admin == true;
    }
  }
}
```

#### Règles Storage
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /products/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Comparaison des options

| Fonctionnalité | Supabase | Firebase |
|---|---|---|
| Intégration Lovable | ✅ Native | ❌ Manuelle |
| Configuration | ✅ Simplifiée | ⚠️ Plus complexe |
| Base de données | PostgreSQL | NoSQL |
| Authentification | ✅ Prête | ⚠️ Configuration requise |
| Coût démarrage | ✅ Gratuit généreux | ✅ Gratuit |
| Documentation | ✅ Intégrée | ❌ Externe |

**Recommandation:** Utilisez Supabase pour une intégration simplifiée avec Lovable.
