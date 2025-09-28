import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { toast } from "sonner";

export default function AdminLogin() {
  const { login } = useFirebaseAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  {/*  
    const handleLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(email, password)
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(user)
        setIsAuthenticated(true);
        toast.success("Authentification réussie");
      } catch (error) {
        setError("Identifiants incorrects");
        toast.error("Échec de la connexion");
      }
    };
  */}

  {/*
    const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await login(email, password);
      navigate("/admin/dashboard"); // 🔁 Redirection vers le dashboard
      // Rediriger vers le dashboard admin
    } catch (err) {
      setError('Échec de la connexion');
      toast('erreur de connnexion', err)
    }
  }; */}

  

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // ⏳ Démarre le loader

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Connexion réussie");
        navigate("/admin/dashboard"); //🔁 Redirection vers le dashboard
      } else {
        setError(result.error || "Échec de la connexion");
        toast.error("Identifiants incorrects");
        return
      }
    } catch (err) {
      console.log("Erreur inattendue");
      toast.error("Erreur de connexion");
    } finally {
      setLoading(false); // ✅ Stoppe le loader
    }
  };


  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="w-12 h-12 gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6 text-white" />
          </div>
          <CardTitle>Administration</CardTitle>
          <CardDescription>
            Accès réservé aux administrateurs
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="votre adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <Input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full gradient-primary" disabled={loading}>
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mx-auto" />
              ) : (
                <>
                  <User className="w-4 h-4 mr-2" />
                  Se connecter
                </>
              )}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Demo: cypherc11@gmail.com/123456789
          </p>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}