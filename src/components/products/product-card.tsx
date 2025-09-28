import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types";
import { Link } from "react-router-dom";
import { MessageCircle, Phone } from "lucide-react";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import {useProduct} from "@/hooks/useProducts";
import { useParams } from "react-router-dom";
import psgJersey from '@/assets/jersey-psg.jpg';
import lakersJersey from '@/assets/jersey-lakers.jpg';
import franceRugbyJersey from '@/assets/jersey-france-rugby.jpg';


interface ProductCardProps {
  product: Product;
}





//   const mockProducts: Product[] = [
//   {
//     id: '1',
//     name: 'Maillot PSG Domicile 2024',
//     slug: 'maillot-psg-domicile-2024',
//     description: 'Maillot officiel du Paris Saint-Germain pour la saison 2024. Design iconique avec les couleurs traditionnelles bleu et rouge. Matière respirante et confortable.',
//     short_description: 'Maillot PSG domicile, taille M, polyester',
//     price: 90.99,
//     images: [psgJersey],
//     team: 'Paris Saint-Germain',
//     sport: 'Football',
//     size: 'M',
//     material: 'Polyester',
//     is_featured: true,
//     is_active: true,
//     stock_quantity: 50,
//     created_at: '2024-01-01T00:00:00Z',
//     updated_at: '2024-01-01T00:00:00Z'
//   },
//   {
//     id: '2',
//     name: 'Maillot Lakers Away 2024',
//     slug: 'maillot-lakers-away-2024',
//     description: 'Maillot visiteur des Los Angeles Lakers. Couleur blanche avec détails violets et dorés. Coupe moderne et matière technique.',
//     short_description: 'Maillot Lakers visiteur, taille L, mesh technique',
//     price: 95.99,
//     images: [lakersJersey],
//     team: 'Los Angeles Lakers',
//     sport: 'Basketball',
//     size: 'L',
//     material: 'Mesh technique',
//     is_featured: true,
//     is_active: true,
//     stock_quantity: 30,
//     created_at: '2024-01-01T00:00:00Z',
//     updated_at: '2024-01-01T00:00:00Z'
//   },
//   {
//     id: '3',
//     name: 'Maillot France Rugby 2024',
//     slug: 'maillot-france-rugby-2024',
//     description: 'Maillot officiel de l\'équipe de France de rugby. Bleu marine avec le coq français. Résistant et adapté au rugby.',
//     short_description: 'Maillot France rugby, taille XL, coton renforcé',
//     price: 79.99,
//     images: [franceRugbyJersey],
//     team: 'Équipe de France',
//     sport: 'Rugby',
//     size: 'XL',
//     material: 'Coton renforcé',
//     is_featured: false,
//     is_active: true,
//     stock_quantity: 25,
//     created_at: '2024-01-01T00:00:00Z',
//     updated_at: '2024-01-01T00:00:00Z'
//   }
// ];


export function ProductCard({ product }: ProductCardProps) {

  

  const handleWhatsAppOrder = () => {
    const message = `Bonjour, je suis intéressé par le maillot de sport ${product.name} à ${product.price}Fcfa.`;
    const whatsappUrl = `https://wa.me/+237697995579?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleTelegramOrder = () => {
    const message = `Bonjour, je suis intéressé par le maillot de sport ${product.name} à ${product.price}Fcfa.`;
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
              {product.price}Fcfa
            </span>
          </div>

          <AddToCartButton product={product} className="mb-2" />
          
          <div className="flex space-x-2">
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