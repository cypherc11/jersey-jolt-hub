import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FilterOptions, SortOption } from "@/types";
import { Search, Filter, X } from "lucide-react";

interface ProductFiltersProps {
  filters: FilterOptions;
  sort: SortOption;
  onFiltersChange: (filters: FilterOptions) => void;
  onSortChange: (sort: SortOption) => void;
  onClearFilters: () => void;
}

const sports = [
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "rugby", label: "Rugby" },
  { value: "tennis", label: "Tennis" },
];

const teams = [
  { value: "psg", label: "Paris Saint-Germain" },
  { value: "lakers", label: "Los Angeles Lakers" },
  { value: "france", label: "Équipe de France" },
];

export function ProductFilters({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  onClearFilters
}: ProductFiltersProps) {
  const [searchValue, setSearchValue] = useState(filters.search || "");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFiltersChange({ ...filters, search: searchValue });
  };

  const hasActiveFilters = filters.sport || filters.team || filters.search || filters.priceRange;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Filter className="w-5 h-5" />
          Filtres et Recherche
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher un maillot, équipe..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button type="submit" className="transition-sprint hover:scale-105">
            Rechercher
          </Button>
        </form>

        {/* Filters Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Sport Filter */}
          <div className="space-y-2">
            <Label htmlFor="sport">Sport</Label>
            <Select
              value={filters.sport || ""}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, sport: value || undefined })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Tous les sports" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Tous les sports</SelectItem>
                {sports.map((sport) => (
                  <SelectItem key={sport.value} value={sport.value}>
                    {sport.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Team Filter */}
          <div className="space-y-2">
            <Label htmlFor="team">Équipe</Label>
            <Select
              value={filters.team || ""}
              onValueChange={(value) => 
                onFiltersChange({ ...filters, team: value || undefined })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les équipes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Toutes les équipes</SelectItem>
                {teams.map((team) => (
                  <SelectItem key={team.value} value={team.value}>
                    {team.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Sort */}
          <div className="space-y-2">
            <Label htmlFor="sort">Trier par</Label>
            <Select
              value={sort}
              onValueChange={(value) => onSortChange(value as SortOption)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Plus récents</SelectItem>
                <SelectItem value="name">Nom A-Z</SelectItem>
                <SelectItem value="price-asc">Prix croissant</SelectItem>
                <SelectItem value="price-desc">Prix décroissant</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Clear Filters */}
          <div className="space-y-2">
            <Label>&nbsp;</Label>
            {hasActiveFilters && (
              <Button
                variant="outline"
                onClick={onClearFilters}
                className="w-full transition-sprint hover:scale-105"
              >
                <X className="w-4 h-4 mr-2" />
                Effacer
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}