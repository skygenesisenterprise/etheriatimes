"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MoreHorizontal, Clock, Eye, Trash2 } from "lucide-react";

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
  readAt: string;
}

const mockHistory: Article[] = [
  {
    id: "1",
    title: "L'économie mondiale face aux nouvelles technologies",
    excerpt: "Les avancées technologiques transforment radicalement le paysage économique...",
    category: "Économie",
    publishedAt: "2026-03-25",
    readTime: 5,
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    readAt: "2026-03-26T10:30:00",
  },
  {
    id: "2",
    title: "Les enjeux environnementaux de 2025",
    excerpt: "Les leaders mondiaux se réunissent pour discuter des mesures urgentes...",
    category: "Environnement",
    publishedAt: "2026-03-24",
    readTime: 8,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
    readAt: "2026-03-25T14:20:00",
  },
  {
    id: "3",
    title: "Interview: Le directeur de The Etheria Times parle",
    excerpt: "Nous avons discuté avec le directeur sur la direction du journal...",
    category: "Interview",
    publishedAt: "2026-03-23",
    readTime: 12,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=250&fit=crop",
    readAt: "2026-03-24T09:15:00",
  },
  {
    id: "4",
    title: "La crise énergétique: solutions pour demain",
    excerpt: "Les experts proposent de nouvelles approches pour la transition énergétique...",
    category: "Énergie",
    publishedAt: "2026-03-22",
    readTime: 6,
    image: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=400&h=250&fit=crop",
    readAt: "2026-03-23T16:45:00",
  },
  {
    id: "5",
    title: "Le marché du travail en mutation",
    excerpt: "Les tendances actuelles montrent une évolution significative...",
    category: "Société",
    publishedAt: "2026-03-21",
    readTime: 7,
    image: "https://images.unsplash.com/photo-1524522173746-f628baad3644?w=400&h=250&fit=crop",
    readAt: "2026-03-22T11:00:00",
  },
  {
    id: "6",
    title: "Culture: le festival de printemps",
    excerpt: "Cette année, le festival promet des émotions fortes...",
    category: "Culture",
    publishedAt: "2026-03-20",
    readTime: 4,
    image: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=400&h=250&fit=crop",
    readAt: "2026-03-21T08:30:00",
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [history, setHistory] = useState<Article[]>(mockHistory);

  const filteredHistory = history.filter((article) =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const removeFromHistory = (id: string) => {
    setHistory((prev) => prev.filter((a) => a.id !== id));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const formatReadAt = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Historique</h1>
          <p className="text-sm text-muted-foreground">
            {history.length} article{history.length !== 1 ? "s" : ""} consultés
          </p>
        </div>
        {history.length > 0 && (
          <Button variant="outline" size="sm" onClick={clearHistory}>
            <Trash2 className="mr-2 h-4 w-4" />
            Tout effacer
          </Button>
        )}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Rechercher dans l'historique..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 max-w-md"
        />
      </div>

      {filteredHistory.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Clock className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-foreground">Aucun historique</p>
          <p className="text-sm text-muted-foreground mt-1">
            Les articles que vous consultez apparaissent ici
          </p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHistory.map((article) => (
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
                    <span>{formatReadAt(article.readAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => removeFromHistory(article.id)}
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
                        <DropdownMenuItem onClick={() => removeFromHistory(article.id)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Retirer de l'historique
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
