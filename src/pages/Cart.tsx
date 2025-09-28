import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { Minus, Plus, Trash2, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
    getTotalPrice,
    generateWhatsAppMessage,
    generateTelegramMessage
  } = useCart();

  const [orderType, setOrderType] = useState<'whatsapp' | 'telegram'>('whatsapp');

  const total = getTotalPrice();

  const handleOrder = () => {
    const message = orderType === 'whatsapp'
      ? generateWhatsAppMessage()
      : generateTelegramMessage();

    const encodedMessage = encodeURIComponent(message);

    if (orderType === 'whatsapp') {
      window.open(`https://wa.me/+237697995579?text=${encodedMessage}`, '_blank');
    } else {
      window.open(`https://t.me/jerseyjolthub?text=${encodedMessage}`, '_blank');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Helmet>
          <title>Panier - Jersey Jolt Hub</title>
          <meta name="description" content="Votre panier de maillots de sport est vide. Découvrez notre collection de maillots authentiques." />
        </Helmet>

        <Header />
        <main className="container mx-auto px-4 py-12">
          <div className="text-center py-24">
            <div className="text-6xl mb-6">🛒</div>
            <h1 className="text-3xl font-bold mb-4">Votre panier est vide</h1>
            <p className="text-muted-foreground mb-8">
              Découvrez notre collection de maillots de sport authentiques
            </p>
            <Link to="/">
              <Button size="lg" className="transition-sprint hover:scale-105">
                Continuer les achats
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Panier  - Jersey Jolt Hub</title>
        <meta name="description" content={`Votre panier contient ${cartItems.length} maillots de sport pour un total de ${total.toFixed(2)}Fcfa`} />
      </Helmet>

      <Header />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">Mon Panier</h1>
            <Button
              variant="outline"
              onClick={clearCart}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Vider le panier
            </Button>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={`${item.product.id}-${item.size}`} className="transition-sprint hover:shadow-elegant">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-2">{item.product.name}</h3>
                        <div className="flex items-center space-x-2 mb-3">
                          <Badge variant="secondary">Taille: {item.size}</Badge>
                          {item.product.team && (
                            <Badge variant="outline">{item.product.team}</Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>

                          <div className="text-right">
                            <p className="font-bold text-lg">
                              {(item.product.price * item.quantity).toFixed(2)}Fcfa
                            </p>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-destructive hover:text-destructive p-0 h-auto"
                              onClick={() => removeFromCart(item.product.id, item.size)}
                            >
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Résumé de la commande</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Sous-total</span>
                      <span>{total.toFixed(2)}Fcfa</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Livraison</span>
                      <span>À discuter</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>{total.toFixed(2)}Fcfa</span>
                  </div>

                  <div className="space-y-3 mt-6">
                    <div className="flex space-x-2">
                      <Button
                        variant={orderType === 'whatsapp' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setOrderType('whatsapp')}
                        className="flex-1"
                      >
                        WhatsApp
                      </Button>
                      <Button
                        variant={orderType === 'telegram' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setOrderType('telegram')}
                        className="flex-1"
                      >
                        Telegram
                      </Button>
                    </div>

                    <Button
                      onClick={handleOrder}
                      size="lg"
                      className="w-full transition-sprint hover:scale-105"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Commander via {orderType === 'whatsapp' ? 'WhatsApp' : 'Telegram'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <Link to="/">
              <Button size="lg" className="transition-sprint hover:scale-105">
                Continuer les achats
              </Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;