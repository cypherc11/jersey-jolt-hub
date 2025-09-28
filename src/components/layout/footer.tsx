import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-card border-t mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-primary rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl text-gradient">Jersey Jolt Hub</span>
            </div>
            <p className="text-muted-foreground">
              Votre destination #1 pour les maillots de sport authentiques. 
              Football, Basketball, Rugby et plus encore.
            </p>
            <div className="flex space-x-3">
              <Button size="sm" className="bg-sport-green hover:bg-sport-green/90">
                <MessageCircle className="w-4 h-4 mr-1" />
                WhatsApp
              </Button>
              <Button size="sm" variant="outline">
                <Phone className="w-4 h-4 mr-1" />
                Telegram
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigation</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link to="/" className="hover:text-foreground transition-sprint">Accueil</Link></li>
              <li><Link to="/category/football" className="hover:text-foreground transition-sprint">Football</Link></li>
              <li><Link to="/category/basketball" className="hover:text-foreground transition-sprint">Basketball</Link></li>
              <li><Link to="/category/rugby" className="hover:text-foreground transition-sprint">Rugby</Link></li>
              <li><Link to="/category/tennis" className="hover:text-foreground transition-sprint">Tennis</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-sprint">Guide des tailles</a></li>
              <li><a href="#" className="hover:text-foreground transition-sprint">Livraison</a></li>
              <li><a href="#" className="hover:text-foreground transition-sprint">Retours</a></li>
              <li><a href="#" className="hover:text-foreground transition-sprint">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-sprint">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <div className="space-y-3 text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+237 697 995 579</span>
              </div>
              <div className="flex items-center space-x-2">
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Support</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>contact@jerseyjolt.fr</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Douala, Cameroun</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2025 Jersey Jolt Hub. Tous droits réservés.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:text-foreground transition-sprint">Mentions légales</a>
            <a href="#" className="hover:text-foreground transition-sprint">Confidentialité</a>
            <a href="#" className="hover:text-foreground transition-sprint">CGV</a>
          </div>
        </div>
      </div>
    </footer>
  );
}