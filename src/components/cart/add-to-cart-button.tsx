import { useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useCart } from "@/hooks/useCart";
import { Product } from "@/types";

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export function AddToCartButton({ product, className }: AddToCartButtonProps) {
  const [selectedSize, setSelectedSize] = useState<string>("M");
  const { addToCart, removeFromCart } = useCart();
  const [loading, setLoading] = useState("");

  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    addToCart(product, selectedSize, 1);
    setSelectedSize("");
    setLoading("true")


  };

  const handleRemoveCard = () => {
    if (loading) {
      removeFromCart(product.id, selectedSize)
      setSelectedSize("M")
      setLoading("false")
    }
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Select value={selectedSize} onValueChange={setSelectedSize}>
        <SelectTrigger className="w-20">
          <SelectValue placeholder="Taille*" />
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
        {loading ? <Minus className="w-4 h-4 mr-1" /> : <Plus className="w-4 h-4 mr-1" />}
        Panier
      </Button>
    </div>
  );
}