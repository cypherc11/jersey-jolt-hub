import { useState, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import { toast } from '@/hooks/use-toast';

const CART_KEY = 'jersey-cart';

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(CART_KEY);
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const addToCart = (product: Product, size: string, quantity = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(
        item => item.product.id === product.id && item.size === size
      );

      if (existingItem) {
        toast({
          title: "Quantité mise à jour",
          description: `${product.name} (${size}) - Quantité: ${existingItem.quantity + quantity}`,
        });
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        toast({
          title: "Produit ajouté au panier",
          description: `${product.name} (${size}) - Quantité: ${quantity}`,
        });
        return [...prev, { product, size, quantity }];
      }
    });
  };

  const removeFromCart = (productId: string, size: string) => {
    setCartItems(prev => {
      const item = prev.find(item => item.product.id === productId && item.size === size);
      if (item) {
        toast({
          title: "Produit retiré du panier",
          description: `${item.product.name} (${size})`,
        });
      }
      return prev.filter(item => !(item.product.id === productId && item.size === size));
    });
  };

  const updateQuantity = (productId: string, size: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size);
      return;
    }

    setCartItems(prev =>
      prev.map(item =>
        item.product.id === productId && item.size === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Panier vidé",
      description: "Tous les produits ont été retirés du panier",
    });
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const generateWhatsAppMessage = () => {
    const items = cartItems.map(item => 
      `${item.product.name} (${item.size}) - ${item.quantity}x`
    ).join('\n');
    
    const total = getTotalPrice();
    
    return `Bonjour, je commande :\n\n${items}\n\nTotal: ${total.toFixed(2)}Fcfa`;
  };

  const generateTelegramMessage = () => {
    return generateWhatsAppMessage();
  };

  return {
    cartItems,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
    generateWhatsAppMessage,
    generateTelegramMessage
  };
}