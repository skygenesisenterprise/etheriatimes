"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MoreHorizontal, Clock, Bookmark, Eye, Trash2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  readTime: number;
  image: string;
}

const mockBookmarks: Article[] = [
  {
    id: "1",
    title: "Analyse: La crise énergétique en Europe",
    excerpt: "Les experts analysent les causes et les conséquences de la crise actuelle...",
    category: "Énergie",
    publishedAt: "2026-03-20",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=400&h=250&fit=crop",
  },
  {
    id: "2",
    title: "Dossier: L'intelligence artificielle éthique",
    excerpt: "Une plongée au cœur des débats sur l'éthique de l'IA...",
    category: "Technologie",
    publishedAt: "2026-03-15",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
  },
  {
    id: "3",
    title: "Reportage: Au cœur des négociations",
    excerpt: "Notre reporter était présent lors des négociations cruciales...",
    category: "Politique",
    publishedAt: "2026-03-10",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1524522173746-f628baad3644?w=400&h=250&fit=crop",
  },
  {
    id: "4",
    title: "Interview exclusive: Le PDG de TechCorp",
    excerpt: "Il nous livre sa vision de l'avenir de la tech...",
    category: "Interview",
    publishedAt: "2026-03-05",
    readTime: 10,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
  },
  {
    id: "5",
    title: "Économie: Les marchés boursiers en 2025",
    excerpt: "Analyse complète de l'évolution des marchés cette année...",
    category: "Économie",
    publishedAt: "2026-02-28",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
  },
  {
    id: "6",
    title: "Environnement: Les océans en danger",
    excerpt: "État des lieux de la pollution marine et des solutions...",
    category: "Environnement",
    publishedAt: "2026-02-20",
    readTime: 9,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
  },
];

export default function BookmarksPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Article[]>(mockBookmarks);

  const filteredBookmarks = bookmarks.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((a) => a.id !== id));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Favoris</h1>
          <p className="text-sm text-muted-foreground">
            {bookmarks.length} article{bookmarks.length !== 1 ? "s" : ""} sauvegardé
            {bookmarks.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher dans vos favoris..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 max-w-md"
        />
      </div>

      {filteredBookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bookmark className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-foreground">Aucun favori</p>
          <p className="text-sm text-muted-foreground mt-1">
            Les articles que vous ajoutez aux favoris apparaîtront ici
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBookmarks.map((article) => (
            <div
              key={article.id}
              className="group relative overflow-hidden rounded-lg border border-border bg-card transition-colors hover:border-primary/50"
            >
              <div className="relative h-40 w-full overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <Badge className="absolute left-3 top-3" variant="secondary">
                  {article.category}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="line-clamp-2 font-semibold leading-tight text-foreground">
                  {article.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{article.excerpt}</p>
                <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {article.readTime} min
                    </span>
                    <span>{formatDate(article.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeBookmark(article.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Lire la suite
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => removeBookmark(article.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Retirer des favoris
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
