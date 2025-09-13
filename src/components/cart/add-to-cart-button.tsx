import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const { addToCart } = useCart();

  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    if (!selectedSize) {
      return;
    }
    addToCart(product, selectedSize, 1);
    setSelectedSize("");
  };

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Select value={selectedSize} onValueChange={setSelectedSize}>
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Taille" />
        </SelectTrigger>
        <SelectContent>
          {sizes.map((size) => (
            <SelectItem key={size} value={size}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      <Button 
        onClick={handleAddToCart}
        disabled={!selectedSize}
        size="sm"
        className="transition-sprint hover:scale-105"
      >
        <Plus className="w-4 h-4 mr-1" />
        Panier
      </Button>
    </div>
  );
}