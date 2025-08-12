import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { Link } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const handleWhatsAppOrder = () => {
    const message = `Bonjour, je suis intéressé par le maillot de sport ${product.name} à ${product.price}€.`;
    const whatsappUrl = `https://wa.me/33123456789?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTelegramOrder = () => {
    const message = `Bonjour, je suis intéressé par le maillot de sport ${product.name} à ${product.price}€.`;
    const telegramUrl = `https://t.me/jerseyjolthub?text=${encodeURIComponent(message)}`;
    window.open(telegramUrl, '_blank');
  };

  return (
    <Card className="group overflow-hidden transition-sprint hover:scale-105 hover:shadow-sport">
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.slug}`}>
          <div className="aspect-square bg-muted">
            {product.images?.[0] ? (
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-smooth group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                <span>Image à venir</span>
              </div>
            )}
          </div>
        </Link>
        
        {product.is_featured && (
          <Badge className="absolute top-2 right-2 gradient-accent border-0 text-white">
            Tendance
          </Badge>
        )}
      </div>

      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-semibold text-lg hover:text-primary transition-sprint">
              <Link to={`/product/${product.slug}`}>
                {product.name}
              </Link>
            </h3>
            {product.team && (
              <p className="text-sm text-muted-foreground">{product.team}</p>
            )}
            {product.short_description && (
              <p className="text-sm text-muted-foreground line-clamp-2">
                {product.short_description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {product.sport && (
                <Badge variant="secondary" className="text-xs">
                  {product.sport}
                </Badge>
              )}
              {product.size && (
                <Badge variant="outline" className="text-xs">
                  Taille {product.size}
                </Badge>
              )}
            </div>
            <span className="text-xl font-bold text-primary">
              {product.price}€
            </span>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button
              onClick={handleWhatsAppOrder}
              className="flex-1 bg-sport-green hover:bg-sport-green/90 transition-sprint"
              size="sm"
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              WhatsApp
            </Button>
            <Button
              onClick={handleTelegramOrder}
              variant="outline"
              className="flex-1 transition-sprint hover:scale-105"
              size="sm"
            >
              <Phone className="w-4 h-4 mr-1" />
              Telegram
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}