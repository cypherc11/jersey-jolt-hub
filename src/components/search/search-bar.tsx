import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useFirebaseProducts } from "@/hooks/useFirebaseProducts";
import { Link } from "react-router-dom";
import { Product } from "@/types";

interface SearchBarProps {
  onSearch?: (query: string) => void;
  className?: string;
}

export function SearchBar({ onSearch, className }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);
  
  const { products, loading } = useFirebaseProducts(
    debouncedQuery ? { search: debouncedQuery } : undefined,
    'newest'
  );

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (value: string) => {
    setQuery(value);
    setIsOpen(value.length > 0);
    onSearch?.(value);
  };

  const handleClear = () => {
    setQuery("");
    setDebouncedQuery("");
    setIsOpen(false);
    onSearch?.("");
  };

  const handleProductClick = () => {
    setIsOpen(false);
    setQuery("");
    setDebouncedQuery("");
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Rechercher maillots, équipes..."
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          className="pl-10 pr-10"
          onFocus={() => setIsOpen(query.length > 0)}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && (
        <Card className="absolute top-full mt-2 w-full max-h-96 overflow-y-auto z-50 bg-background/95 backdrop-blur-md border-border/50">
          {loading ? (
            <div className="p-4 text-center text-muted-foreground">
              Recherche en cours...
            </div>
          ) : products.length > 0 ? (
            <div className="p-2">
              {products.slice(0, 5).map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.slug}`}
                  onClick={handleProductClick}
                  className="block"
                >
                  <div className="flex items-center space-x-3 p-3 rounded-lg hover:bg-accent transition-colors">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{product.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {product.price.toFixed(2)}Fcfa
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
              {products.length > 5 && (
                <div className="p-3 text-center text-sm text-muted-foreground border-t">
                  et {products.length - 5} autres résultats...
                </div>
              )}
            </div>
          ) : debouncedQuery ? (
            <div className="p-4 text-center text-muted-foreground">
              Aucun résultat trouvé pour "{debouncedQuery}"
            </div>
          ) : null}
        </Card>
      )}
    </div>
  );
}