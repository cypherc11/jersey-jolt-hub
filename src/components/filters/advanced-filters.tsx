import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { FilterOptions, SortOption } from "@/types";
import { X, Filter, SlidersHorizontal } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface AdvancedFiltersProps {
  filters: FilterOptions;
  sort: SortOption;
  onFiltersChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
  className?: string;
}

const sports = ["Football", "Basketball", "Rugby", "Tennis"];
const teams = ["PSG", "Manchester United", "Real Madrid", "Barcelona", "Lakers", "Warriors", "Bulls", "France", "England", "All Blacks"];
const categories = ["Domicile", "Extérieur", "Third Kit", "Rétro"];

export function AdvancedFilters({ 
  filters, 
  sort, 
  onFiltersChange, 
  onSortChange, 
  onClearFilters,
  className 
}: AdvancedFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(filters.priceRange || [0, 300]);
  const [isOpen, setIsOpen] = useState(false);

  // Update price filter with debouncing
  useEffect(() => {
    const timer = setTimeout(() => {
      onFiltersChange({ ...filters, priceRange });
    }, 300);

    return () => clearTimeout(timer);
  }, [priceRange]);

  const updateFilter = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value === "all" ? undefined : value };
    onFiltersChange(newFilters);
  };

  const hasActiveFilters = Boolean(
    filters.category || 
    filters.sport || 
    filters.team || 
    filters.priceRange || 
    filters.search
  );

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.category && filters.category !== "all") count++;
    if (filters.sport && filters.sport !== "all") count++;
    if (filters.team && filters.team !== "all") count++;
    if (filters.priceRange) count++;
    if (filters.search) count++;
    return count;
  };

  return (
    <div className={className}>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="flex items-center space-x-2">
                <SlidersHorizontal className="w-4 h-4" />
                <span>Filtres</span>
                {getActiveFiltersCount() > 0 && (
                  <Badge variant="secondary" className="ml-1">
                    {getActiveFiltersCount()}
                  </Badge>
                )}
              </Button>
            </CollapsibleTrigger>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Effacer les filtres
              </Button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Trier par:</span>
            <Select value={sort} onValueChange={(value) => onSortChange(value as SortOption)}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récent</SelectItem>
                <SelectItem value="name">Nom A-Z</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <CollapsibleContent>
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Sport Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sport</label>
                  <Select 
                    value={filters.sport || "all"} 
                    onValueChange={(value) => updateFilter('sport', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Tous les sports" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tous les sports</SelectItem>
                      {sports.map((sport) => (
                        <SelectItem key={sport} value={sport.toLowerCase()}>
                          {sport}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Team Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Équipe</label>
                  <Select 
                    value={filters.team || "all"} 
                    onValueChange={(value) => updateFilter('team', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les équipes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les équipes</SelectItem>
                      {teams.map((team) => (
                        <SelectItem key={team} value={team}>
                          {team}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Category Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Catégorie</label>
                  <Select 
                    value={filters.category || "all"} 
                    onValueChange={(value) => updateFilter('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Toutes les catégories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Toutes les catégories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category.toLowerCase()}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Prix: {priceRange[0]}Fcfa - {priceRange[1]}Fcfa
                  </label>
                  <div className="px-2">
                    <Slider
                      value={priceRange}
                      onValueChange={(value) => setPriceRange([value[0], value[1]])}
                      max={200}
                      min={0}
                      step={5}
                      className="w-full"
                    />
                  </div>
                </div>
              </div>

              {/* Active Filters Display */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-sm text-muted-foreground">Filtres actifs:</span>
                    {filters.sport && filters.sport !== "all" && (
                      <Badge variant="secondary" className="capitalize">
                        Sport: {filters.sport}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => updateFilter('sport', undefined)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    )}
                    {filters.team && filters.team !== "all" && (
                      <Badge variant="secondary">
                        Équipe: {filters.team}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => updateFilter('team', undefined)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    )}
                    {filters.category && filters.category !== "all" && (
                      <Badge variant="secondary" className="capitalize">
                        Catégorie: {filters.category}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => updateFilter('category', undefined)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    )}
                    {filters.priceRange && (
                      <Badge variant="secondary">
                        Prix: {filters.priceRange[0]}Fcfa-{filters.priceRange[1]}Fcfa
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-auto p-0 ml-1"
                          onClick={() => updateFilter('priceRange', undefined)}
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </Badge>
                    )}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}