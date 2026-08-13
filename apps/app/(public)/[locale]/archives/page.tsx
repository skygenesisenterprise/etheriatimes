import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { ArticleCard } from "@/components/media/article-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Calendar, Filter, ChevronLeft, ChevronRight, Archive } from "lucide-react";

interface PageProps {
  params: Promise<{ locale?: string }>;
}

const mockArchivedArticles = [
  {
    title: "Climat : accord historique signé à la COP32",
    excerpt:
      "Les 195 pays participants se sont mis d'accord sur de nouveaux objectifs de réduction...",
    category: "Environnement",
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=400&h=250&fit=crop",
    date: "15 Mars 2026",
    href: "/article/cop32-accord",
  },
  {
    title: "Économie : la France dépasse les attentes au T4 2025",
    excerpt: "La croissance économique française a atteint 2.4% au quatrième trimestre...",
    category: "Économie",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    date: "12 Mars 2026",
    href: "/article/economie-t4-2025",
  },
  {
    title: "Tech : lancement officiel du processeur quantique européen",
    excerpt: "Une avancée majeure pour l'indépendance technologique du continent...",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    date: "8 Mars 2026",
    href: "/article/processeur-quantique",
  },
  {
    title: "Sport : finale de la Ligue des Champions 2026",
    excerpt: "Le PSG affrontera Manchester City dans une finale attendue...",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
    date: "5 Mars 2026",
    href: "/article/ldc-finale-2026",
  },
  {
    title: "Culture : festival de Cannes 2026 - Palme d'or",
    excerpt: "Le jury a récompensé le film français 'Lumière' de Claire Moreau...",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop",
    date: "28 Février 2026",
    href: "/article/cannes-2026",
  },
  {
    title: "Politique : discours sur l'état de l'Union",
    excerpt: "Le président a présenté les grandes orientations pour 2026...",
    category: "Politique",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "25 Février 2026",
    href: "/article/discours-etat-union",
  },
];

const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const categories = [
  "Tous",
  "Politique",
  "Économie",
  "International",
  "Culture",
  "Sport",
  "Société",
  "Environnement",
  "Informatique",
];

export default async function ArchivesPage({ params }: PageProps) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-linear-to-b from-primary/10 to-background py-12">
          <div className="mx-auto max-w-7xl px-4">
            <div className="text-center mb-8">
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                Archives
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Explorez l&apos;histoire du journalisme avec nos archives complètes. Recherchez et
                parcourez tous nos articles passés.
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 max-w-3xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Rechercher dans les archives..."
                  className="pl-10 w-full"
                />
              </div>
              <Button className="gap-2">
                <Search className="h-4 w-4" />
                Rechercher
              </Button>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="mx-auto max-w-7xl px-4">
            <div className="flex flex-col lg:flex-row gap-8">
              <aside className="lg:w-64 shrink-0">
                <div className="bg-card border border-border rounded-lg p-4 sticky top-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">Filtres</h3>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Année</h4>
                    <div className="space-y-1">
                      {[2026, 2025, 2024].map((year) => (
                        <label key={year} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            defaultChecked={year === 2026}
                          />
                          <span className="text-sm text-foreground/80">{year}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Mois</h4>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {months.map((month) => (
                        <label key={month} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          />
                          <span className="text-sm text-foreground/80">{month}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">Catégorie</h4>
                    <div className="space-y-1">
                      {categories.map((cat) => (
                        <label key={cat} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                            defaultChecked={cat === "Tous"}
                          />
                          <span className="text-sm text-foreground/80">{cat}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              <div className="flex-1">
                <div className="flex items-center justify-between mb-6">
                  <p className="text-sm text-muted-foreground">
                    Affichage de <span className="font-medium">1-6</span> sur{" "}
                    <span className="font-medium">1,247</span> articles
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">Trier par:</span>
                    <select className="text-sm border border-border rounded-md px-2 py-1 bg-background">
                      <option>Date (récent)</option>
                      <option>Date (ancien)</option>
                      <option>Popularité</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockArchivedArticles.map((article, index) => (
                    <ArticleCard key={index} {...article} variant="vertical" />
                  ))}
                </div>

                <div className="flex items-center justify-center gap-2 mt-8">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9">
                    1
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9">
                    2
                  </Button>
                  <Button variant="outline" size="sm" className="h-9 w-9">
                    3
                  </Button>
                  <span className="px-2 text-muted-foreground">...</span>
                  <Button variant="outline" size="sm" className="h-9 w-9">
                    208
                  </Button>
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-4xl px-4 text-center">
            <Archive className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Rechercher dans les archives ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Utilisez notre moteur de recherche avancé pour trouver des articles spécifiques par
              mot-clé, date ou catégorie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="outline" className="gap-2">
                <Calendar className="h-4 w-4" />
                Rechercher par date
              </Button>
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filtres avancés
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
