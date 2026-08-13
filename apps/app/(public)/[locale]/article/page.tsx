import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { ArticleCard } from "@/components/media/article-card";
import { SectionTitle } from "@/components/media/section-title";

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image?: string;
  date: string;
  href: string;
}

const allArticles: Article[] = [
  {
    id: "1",
    title: "Réforme historique : le Parlement adopte la nouvelle loi sur la transition énergétique",
    excerpt:
      "Après des mois de débats, les diputés ont voted à une large majorité cette réforme qui promet de transformer le paysage énergétique du pays d'ici 2035.",
    category: "Politique",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=450&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/1",
  },
  {
    id: "2",
    title: "Victoire historique de l'équipe nationale en finale du championnat",
    excerpt: "Une performance exceptionnelle qui restera dans les annales du sport français...",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&h=450&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/2",
  },
  {
    id: "3",
    title: "Tensions diplomatiques : les négociations reprennent à Genève",
    excerpt: "Après plusieurs semaines de blocage, les discussions ont enfin repris...",
    category: "International",
    image: "https://images.unsplash.com/photo-1524522173746-f628baad3644?w=800&h=450&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/3",
  },
  {
    id: "4",
    title: "Innovation : une startup française révolutionne le secteur de l'énergie",
    excerpt: "Cette jeune pousse a développé une technologie de stockage révolutionnaire...",
    category: "Économie",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=450&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/4",
  },
  {
    id: "5",
    title: "Météo : vague de chaleur exceptionnelle attendue cette semaine",
    excerpt: "Les températures pourraient atteindre des records dans plusieurs régions...",
    category: "Société",
    image: "https://images.unsplash.com/photo-1504370805625-d32c54b16100?w=800&h=450&fit=crop",
    date: "Hier",
    href: "/article/5",
  },
  {
    id: "6",
    title: "Le festival de cinéma dévoile sa sélection officielle",
    excerpt: "Cette année, 24 films seront en compétition pour la prestigieuse récompense...",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop",
    date: "Hier",
    href: "/article/6",
  },
  {
    id: "7",
    title: "La nouvelle exposition au Musée d'Art Moderne fait sensation",
    excerpt: "Plus de 10 000 visiteurs ont déjà découvert cette rétrospective unique...",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=800&h=450&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/7",
  },
  {
    id: "8",
    title: "Interview exclusive avec le nouveau directeur de la Banque Centrale",
    excerpt: "Il nous livre sa vision pour les années à venir et les défis à relever...",
    category: "Économie",
    date: "Il y a 2 jours",
    href: "/article/8",
  },
];

export default function ArticleListPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-6">
          <h1 className="text-3xl font-serif font-bold mb-8">Tous les articles</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allArticles.map((article) => (
              <ArticleCard key={article.id} {...article} variant="vertical" />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
