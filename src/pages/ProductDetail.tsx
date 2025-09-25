import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useProduct } from "@/hooks/useProducts";
import { ArrowLeft, MessageCircle, Phone, Star, Truck, Shield, RotateCcw } from "lucide-react";

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { product, loading, error } = useProduct(slug || "");

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = `Bonjour, je suis intéressé par le maillot de sport ${product.name} à ${product.price}€.`;
    const whatsappUrl = `https://wa.me/+237697995579?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTelegramOrder = () => {
    if (!product) return;
    const message = `Bonjour, je suis intéressé par le maillot de sport ${product.name} à ${product.price}€.`;
    const telegramUrl = `https://t.me/jerseyjolthub?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded w-3/4"></div>
                <div className="h-4 bg-muted rounded w-1/2"></div>
                <div className="h-6 bg-muted rounded w-1/4"></div>
                <div className="h-20 bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Produit non trouvé</h1>
            <Link to="/">
              <Button>Retour à l'accueil</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-foreground transition-sprint">
            Accueil
          </Link>
          <span>/</span>
          <span>{product.sport}</span>
          <span>/</span>
          <span className="text-foreground">{product.name}</span>
        </div>

        {/* Back Button */}
        <Link to="/" className="inline-flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-sprint mb-6">
          <ArrowLeft className="w-4 h-4" />
          <span>Retour à la collection</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-muted">
              {product.images?.[0] ? (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <span>Image à venir</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              {product.is_featured && (
                <Badge className="gradient-accent border-0 text-white mb-2">
                  ⭐ Tendance
                </Badge>
              )}
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              {product.team && (
                <p className="text-lg text-muted-foreground">{product.team}</p>
              )}
            </div>

            {/* Price */}
            <div className="flex items-center space-x-4">
              <span className="text-4xl font-bold text-primary">
                {product.price}€
              </span>
              <Badge variant="secondary" className="text-sm">
                En stock ({product.stock_quantity})
              </Badge>
            </div>

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.sport && (
                <div>
                  <span className="text-sm text-muted-foreground">Sport</span>
                  <p className="font-medium">{product.sport}</p>
                </div>
              )}
              {product.size && (
                <div>
                  <span className="text-sm text-muted-foreground">Taille</span>
                  <p className="font-medium">{product.size}</p>
                </div>
              )}
              {product.material && (
                <div>
                  <span className="text-sm text-muted-foreground">Matière</span>
                  <p className="font-medium">{product.material}</p>
                </div>
              )}
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="font-semibold mb-2">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            {/* Order Buttons */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  onClick={handleWhatsAppOrder}
                  className="bg-sport-green hover:bg-sport-green/90 transition-sprint hover:scale-105"
                  size="lg"
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Commander via WhatsApp
                </Button>
                <Button
                  onClick={handleTelegramOrder}
                  variant="outline"
                  className="transition-sprint hover:scale-105"
                  size="lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Commander via Telegram
                </Button>
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Commande directe sans formulaire - Livraison rapide
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Truck className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">Livraison rapide</span>
              </div>
              <div className="text-center">
                <Shield className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">Authentique</span>
              </div>
              <div className="text-center">
                <RotateCcw className="w-6 h-6 mx-auto mb-2 text-primary" />
                <span className="text-sm">Échange possible</span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}