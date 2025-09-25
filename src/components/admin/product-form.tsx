import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/hooks/use-toast";
import { Upload, X, Plus, Save, User } from "lucide-react";
import { Product } from "@/types";

interface ProductFormProps {
  product?: Product | null;
  onSave?: (product: Partial<Product>) => Promise<void>;
  onCancel?: () => void;
  loading?: boolean;
}

const sports = ["football", "basketball", "rugby", "tennis"];
const categories = ["domicile", "extérieur", "third kit", "rétro"];

export default function ProductForm({ product, onSave, onCancel, loading }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    description: product?.description || "",
    short_description: product?.short_description || "",
    price: product?.price || 0,
    sport: product?.sport || "",
    team: product?.team || "",
    category_id: product?.category_id || "",
    material: product?.material || "Polyester",
    is_featured: product?.is_featured || false,
    is_active: product?.is_active || true,
    stock_quantity: product?.stock_quantity || 0,
    images: product?.images || []
  });

  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  //upload d'un image
  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;

    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleImageUpload(e.dataTransfer.files);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  // destruction d'un image uploader
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  //verification des champs obligatoire
  const validateForm = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Erreur de validation",
        description: "Le nom du produit est requis",
        variant: "destructive"
      });
      return false;
    }

    if (formData.price <= 0) {
      toast({
        title: "Erreur de validation",
        description: "Le prix doit être supérieur à 0",
        variant: "destructive"
      });
      return false;
    }

    if (formData.images.length === 0) {
      toast({
        title: "Erreur de validation",
        description: "Au moins une image est requise",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  //soumiton si formulaire correct
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const slug = formData.name.toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();

      const productData = {
        ...formData,
        slug,
        created_at: product?.created_at || new Date().toISOString(),
        updated_at: new Date().toISOString(),
        searchTags: [
          formData.name.toLowerCase(),
          formData.team?.toLowerCase(),
          formData.sport?.toLowerCase(),
          ...formData.name.toLowerCase().split(' ')
        ].filter(Boolean)
      };

      await onSave(productData);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de sauvegarder le produit",
        variant: "destructive"
      });
    }
  };

  return (

    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="w-8 h-8">
        <Link to="/Admin">
          <Button variant="ghost" size="sm" className=" w-8 h-8 gradient-primary rounded-lg flex items-center justify-center space-x-8">
            <User className="w-4 h-4" />
          </Button>
        </Link>
      </div>


      <Card>
        <CardHeader>
          <CardTitle>{product ? 'Modifier' : 'Ajouter'} un produit</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Basic Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nom du produit *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Ex: Maillot PSG Domicile 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Prix (€) *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                value={formData.price}
                onChange={(e) => handleInputChange('price', parseFloat(e.target.value) || 0)}
                required
              />
            </div>
          </div>

          {/* Descriptions */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="short_description">Description courte</Label>
              <Input
                id="short_description"
                value={formData.short_description}
                onChange={(e) => handleInputChange('short_description', e.target.value)}
                placeholder="Description courte pour les cartes produit"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description complète</Label>
              <Textarea
                id="description"
                rows={4}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Description détaillée du produit..."
              />
            </div>
          </div>

          {/* Categories */}
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Sport</Label>
              <Select
                value={formData.sport}
                onValueChange={(value) => handleInputChange('sport', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un sport" />
                </SelectTrigger>
                <SelectContent>
                  {sports.map((sport) => (
                    <SelectItem key={sport} value={sport}>
                      {sport.charAt(0).toUpperCase() + sport.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="team">Équipe</Label>
              <Input
                id="team"
                value={formData.team}
                onChange={(e) => handleInputChange('team', e.target.value)}
                placeholder="Ex: PSG, Manchester United"
              />
            </div>

            <div className="space-y-2">
              <Label>Catégorie</Label>
              <Select
                value={formData.category_id}
                onValueChange={(value) => handleInputChange('category_id', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="material">Matériau</Label>
              <Input
                id="material"
                value={formData.material}
                onChange={(e) => handleInputChange('material', e.target.value)}
                placeholder="Ex: 100% Polyester"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={formData.stock_quantity}
                onChange={(e) => handleInputChange('stock_quantity', parseInt(e.target.value) || 0)}
              />
            </div>
          </div>

          {/* Images Upload */}
          <div className="space-y-4">
            <Label>Images du produit *</Label>

            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragOver
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/25 hover:border-primary/50'
                }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium mb-2">
                Glissez-déposez vos images ici
              </p>
              <p className="text-sm text-muted-foreground mb-4">
                ou cliquez pour sélectionner des fichiers
              </p>
              <Button type="button" variant="outline">
                <Plus className="w-4 h-4 mr-2" />
                Choisir des images
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e.target.files)}
            />

            {/* Images Preview */}
            {formData.images.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                    {index === 0 && (
                      <Badge className="absolute bottom-2 left-2">
                        Image principale
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status Toggles */}
          <div className="flex flex-col space-y-4 p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="featured">Produit mis en avant</Label>
                <p className="text-sm text-muted-foreground">
                  Afficher ce produit dans la section vedette
                </p>
              </div>
              <Switch
                id="featured"
                checked={formData.is_featured}
                onCheckedChange={(checked) => handleInputChange('is_featured', checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="active">Produit actif</Label>
                <p className="text-sm text-muted-foreground">
                  Rendre ce produit visible sur le site
                </p>
              </div>
              <Switch
                id="active"
                checked={formData.is_active}
                onCheckedChange={(checked) => handleInputChange('is_active', checked)}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Link to={"/Admin"}>
              <Button type="button" variant="outline" onClick={onCancel}>
                Annuler
              </Button>
            </Link>

            <Button type="submit" disabled={loading}>
              {loading ? (
                "Sauvegarde..."
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {product ? 'Mettre à jour' : 'Créer le produit'}
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}