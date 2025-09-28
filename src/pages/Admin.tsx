import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingBag, TrendingUp, Users, Package } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useFirebaseAuth } from '@/hooks/useFirebaseAuth';
import { toast } from "sonner";
import { Product } from "@/types";


export default function Admin() {
  const { logout } = useFirebaseAuth();
  

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/">
              <h1 className="text-2xl font-bold text-gradient">
                Jersey Jolt Hub - Admin
              </h1>
            </a>

            <div className="flex items-center space-x-4">
              <Badge variant="secondary">Admin connecté</Badge>
              <Link to="/">
                <Button
                  variant="outline"
                  onClick={logout}
                  className="transition-sprint"
                >

                  Déconnexion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-sport">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Produits Total</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          {/*configurer des statistique dynamique*/}
          <Card className="shadow-sport">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Commandes Aujourd'hui</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
                <ShoppingBag className="w-8 h-8 text-sport-green" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sport">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  {/*configurer les visite avec google analytique */}
                  <p className="text-sm text-muted-foreground">Visiteurs</p>
                  <p className="text-2xl font-bold">145</p>
                </div>
                <Users className="w-8 h-8 text-sport-blue" />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sport">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">CA du Jour</p>
                  <p className="text-2xl font-bold">1,234Fcfa</p>
                </div>
                <TrendingUp className="w-8 h-8 text-sport-red" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions non configurer pour le moment */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Gestion des Produits</CardTitle>
              <CardDescription>
                Ajouter, modifier ou supprimer des maillots
              </CardDescription>
            </CardHeader>
            {/*importer depuis product-form.tsx */}
            <CardContent className="space-y-3">
              <Link to={'/admin/produit/add'}>
                <Button className="w-full gradient-primary">
                  Ajouter un Produit
                </Button>
              </Link>

              {/* <ProductForm onSave={} onCancel={}/> */}



              {/* liste de tous les articles poster */}
              <Button variant="outline" className="w-full">
                Voir Tous les Produits
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Catégories</CardTitle>
              <CardDescription>
                Gérer les sports et catégories
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/*gestion des differente categories... compliquer sa... */}
              <Button className="w-full gradient-secondary">
                Gérer les Catégories
              </Button>
              <Button variant="outline" className="w-full">
                Ajouter une Catégorie
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Commandes</CardTitle>
              <CardDescription>
                Suivi des commandes WhatsApp/Telegram
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {/*dashbord de l'historique des commande... appel a la base de donne pour lister les dernieres commande selon les dates */}
              <Button className="w-full gradient-accent">
                Voir les Commandes
              </Button>
              {/* statistique via google analytique */}
              <Button variant="outline" className="w-full">
                Statistiques
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity recperer les donnees les plus recent dans google analytique*/}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Activité Récente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Nouvelle commande - Maillot PSG</p>
                  <p className="text-sm text-muted-foreground">Il y a 2 minutes</p>
                </div>
                <Badge variant="secondary">WhatsApp</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <div>
                  <p className="font-medium">Produit consulté - Maillot Lakers</p>
                  <p className="text-sm text-muted-foreground">Il y a 5 minutes</p>
                </div>
                <Badge variant="outline">Vue</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Nouvelle commande - Maillot France Rugby</p>
                  <p className="text-sm text-muted-foreground">Il y a 10 minutes</p>
                </div>
                <Badge variant="secondary">Telegram</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}