import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

export function CartButton() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  return (
    <Link to="/panier">
      <Button variant="ghost" size="sm" className="relative transition-sprint hover:scale-105">
        <ShoppingBag className="w-4 h-4" />
        {totalItems > 0 && (
          <Badge 
            variant="destructive" 
            className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
          >
            {totalItems}
          </Badge>
        )}
      </Button>
    </Link>
  );
}