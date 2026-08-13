import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { LiveTicker } from "@/components/media/live-ticker";
import { ArticleCard } from "@/components/media/article-card";
import { SectionTitle } from "@/components/media/section-title";
import { articlesApi } from "@/lib/api/client";
import type { HomepageArticlesResponse, Article } from "@/lib/api/types";

const isDev = process.env.NODE_ENV !== "production";

const liveTickerItems = [
  {
    id: "1",
    title: "Le sommet international sur le climat s'ouvre aujourd'hui à Etheria City",
    time: "Il y a 5 min",
    href: "/article/sommet-climat",
  },
  {
    id: "2",
    title: "L'équipe nationale remporté une victoire historique en finale",
    time: "Il y a 12 min",
    href: "/article/victoire-finale",
  },
  {
    id: "3",
    title: "Nouvelle découverte archéologique dans les montagnes du Nord",
    time: "Il y a 25 min",
    href: "/article/decouverte-archeologique",
  },
  {
    id: "4",
    title: "Les marchés financiers en hausse après l'annonce de la banque centrale",
    time: "Il y a 38 min",
    href: "/article/marches-financiers",
  },
];

async function getHomepageArticles(locale: string) {
  if (isDev) {
    return null;
  }
  try {
    const response = (await articlesApi.getHomepage(locale)) as HomepageArticlesResponse;
    if (response.success && response.data) {
      return response.data;
    }
  } catch (error) {
    console.error("Failed to fetch homepage articles:", error);
  }
  return null;
}

function articleToCardProps(article: {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  categoryId?: string;
  viewCount?: number;
  readTime?: number;
  imageUrl?: string;
}) {
  return {
    title: article.title,
    excerpt: article.excerpt,
    category: article.categoryId
      ? article.categoryId.charAt(0).toUpperCase() + article.categoryId.slice(1).replace(/-/g, " ")
      : "Actualité",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: `/article/${article.slug}`,
  };
}

function mergeWithMock<T extends { title: string }>(
  realArticles: T[] | undefined,
  mockArticles: T[],
  maxCount?: number
): T[] {
  const targetCount = maxCount || mockArticles.length;

  if (!realArticles || realArticles.length === 0) {
    return mockArticles.slice(0, targetCount);
  }

  const realCount = Math.min(realArticles.length, targetCount);
  const mockNeeded = targetCount - realCount;

  return [...realArticles.slice(0, realCount), ...mockArticles.slice(0, mockNeeded)];
}

const mockFeaturedArticle = {
  title: "Réforme historique : le Parlement adopte la nouvelle loi sur la transition énergétique",
  excerpt: "Après des mois de débats, les diputados ont votado à une large majorité cette réforme.",
  category: "Politique",
  image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop",
  date: "Il y a 2 heures",
  href: "/article/reforme-energie",
};

const mockTopArticles: {
  title: string;
  category: string;
  image: string;
  date: string;
  href: string;
}[] = [
  {
    title: "« C'est un tournant majeur » : les réactions politiques",
    category: "Politique",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/reactions-politiques",
  },
  {
    title: "Économie : les entreprises locales s'adaptent",
    category: "Économie",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/entreprises-environnement",
  },
  {
    title: "Festival d'été : plus de 100 000 visiteurs attendus",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/festival-ete",
  },
];

const mockPoliticsArticles = [
  {
    title: "Municipales 2026 : les premiers résultats",
    excerpt: "Les bureaux de vote ont fermé leurs portes à 20h.",
    category: "Politique",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/municipales-resultats",
  },
  {
    title: "Le Premier ministre annonce un remaniement",
    category: "Politique",
    image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/remaniement",
  },
  {
    title: "Débat à l'assemblée : le pouvoir d'achat",
    category: "Politique",
    date: "Il y a 8 heures",
    href: "/article/debat-pouvoir-achat",
  },
  {
    title: "Sondage : confiance des citoyens en hausse",
    category: "Politique",
    date: "Hier",
    href: "/article/sondage-confiance",
  },
];

const mockInternationalArticles = [
  {
    title: "Tensions diplomatiques : sommet reporté",
    excerpt: "Les négociations ont été interrompues.",
    category: "International",
    image: "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/tensions-diplomatiques",
  },
  {
    title: "Crise humanitaire : l'ONU lance un appel",
    category: "International",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/crise-humanitaire",
  },
  {
    title: "Accord commercial historique signé",
    category: "International",
    date: "Il y a 7 heures",
    href: "/article/accord-commercial",
  },
];

const mockSportsArticles = [
  {
    title: "Football : le club local qualifié",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/football-coupe",
  },
  {
    title: "Tennis : la révélation nationale en quarts",
    category: "Sport",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/tennis-quarts",
  },
  {
    title: "JO 2028 : préparation intensive",
    category: "Sport",
    date: "Il y a 5 heures",
    href: "/article/jo-preparation",
  },
  {
    title: "Cyclisme : le champion défend son titre",
    category: "Sport",
    date: "Hier",
    href: "/article/cyclisme-tour",
  },
];

const mockCultureArticles = [
  {
    title: "Cinéma : le nouveau film primé",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/cinema-festival",
  },
  {
    title: "Exposition : chefs-d'œuvre de la Renaissance",
    category: "Culture",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/exposition-renaissance",
  },
  {
    title: "Littérature : le lauréat dévoile son roman",
    category: "Culture",
    date: "Hier",
    href: "/article/litterature-prix",
  },
];

const mockStudentArticles = [
  {
    title: "Rentrée universitaire : les défis de la vie campus en 2026",
    excerpt: "Logement, transport, budget : les étudiants font face à une nouvelle année.",
    category: "Étudiant",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/rentree-universitaire",
  },
  {
    title: "Bourses étudiantes : les nouvelles aides annoncées",
    category: "Étudiant",
    image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/bourses-etudiantes",
  },
  {
    title: "Orientation post-bac : les filières les plus demandées",
    category: "Étudiant",
    date: "Il y a 6 heures",
    href: "/article/orientation-bac",
  },
  {
    title: "Jobs étudiants : les secteurs qui recrutent",
    category: "Étudiant",
    date: "Hier",
    href: "/article/jobs-etudiants",
  },
];

const mockEspaceArticles = [
  {
    title: "Mission spatiale : les nouveaux explorateurs已达 l'ISS",
    excerpt:
      "Une équipe internationale célèbre atteint la Station Spatiale Internationale pour une mission de 6 mois.",
    category: "Espace",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/mission-spatiale-iss",
  },
  {
    title: "Mars : les premières images de la base lunaire",
    category: "Espace",
    image: "https://images.unsplash.com/photo-1614728853913-1e2242eb54b8?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/mars-base-lunaire",
  },
  {
    title: "Télescope spatial : découverte d'exoplanètes habitables",
    category: "Espace",
    date: "Il y a 5 heures",
    href: "/article/telescope-exoplanetes",
  },
  {
    title: "Satellites : nouveaux capteurs pour observer la Terre",
    category: "Espace",
    date: "Hier",
    href: "/article/satellites-observation",
  },
];

const mockGamingArticles = [
  {
    title: "Nouveau jeu flagship : la révolution du gaming en 2026",
    excerpt: "Les dernières innovations technologiques transforment l'expérience de jeu.",
    category: "Jeu Vidéo",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/jeux-flagship-2026",
  },
  {
    title: "E-sport : les tournois internationaux battent des records",
    category: "Jeu Vidéo",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/esport-records",
  },
  {
    title: "VR gaming : le matériel nouvelle génération arrive",
    category: "Jeu Vidéo",
    date: "Il y a 8 heures",
    href: "/article/vr-nouvelle-gen",
  },
  {
    title: "Indie games : les perles indépendantes à surveiller",
    category: "Jeu Vidéo",
    date: "Hier",
    href: "/article/indie-games",
  },
];

const mockInformaticaArticles = [
  {
    title: "Intelligence artificielle : les nouvelles avancées qui changent tout",
    excerpt: "L'IA transforme tous les secteurs de l'économie à une vitesse inégalée.",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/ia-avancees-2026",
  },
  {
    title: "Cybersécurité : les menaces qui ciblent les entreprises",
    category: "Informatique",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/cybersecurite-menaces",
  },
  {
    title: "Cloud computing : vers une nouvelle ère",
    category: "Informatique",
    date: "Il y a 6 heures",
    href: "/article/cloud-nouvelle-ere",
  },
  {
    title: "Programmation : les langages les plus demandés",
    category: "Informatique",
    date: "Hier",
    href: "/article/langages-programmation",
  },
];

const mockSocieteArticles = [
  {
    title: "Société : les nouvelles initiatives solidaires",
    excerpt: "Les associations locales mobilisées pour aider les plus démunis.",
    category: "Société",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/initiatives-solidaires",
  },
  {
    title: "Logement : le plan gouvernemental présenté",
    category: "Société",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/logement-plan",
  },
  {
    title: "Santé : les réformes du système de soins",
    category: "Société",
    date: "Il y a 5 heures",
    href: "/article/sante-reformes",
  },
  {
    title: "Éducation : bilan de la rentrée",
    category: "Société",
    date: "Hier",
    href: "/article/education-bilan",
  },
];

const mockEnvironnementArticles = [
  {
    title: "Climat : les objectifs de réduction atteints",
    excerpt: "Etheria respecte ses engagements climatiques pour 2026.",
    category: "Environnement",
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/climat-objectifs",
  },
  {
    title: "Biodiversité : nouvelles aires protégées",
    category: "Environnement",
    image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/biodiversite-protected",
  },
  {
    title: "Énergie renouvelable : record de production",
    category: "Environnement",
    date: "Il y a 6 heures",
    href: "/article/energie-record",
  },
  {
    title: "Recyclage : les nouvelles normes",
    category: "Environnement",
    date: "Hier",
    href: "/article/recyclage-normes",
  },
];

const opinionArticles = [
  {
    title: "Éditorial : Pourquoi cette réforme est nécessaire",
    author: "Marie Dupont",
    date: "Il y a 3 heures",
    href: "/article/editorial-energie",
  },
  {
    title: "Tribune : L'éducation, pilier de notre avenir",
    author: "Jean-Pierre Martin",
    date: "Il y a 8 heures",
    href: "/article/tribune-education",
  },
  {
    title: "Chronique : Transformation numérique",
    author: "Sophie Bernard",
    date: "Hier",
    href: "/article/chronique-numerique",
  },
];

const mockMostReadArticles = [
  {
    title: "Réforme historique : le Parlement adopte la loi",
    date: "Il y a 2 heures",
    href: "/article/reforme-energie",
  },
  {
    title: "Le Premier ministre annonce un remaniement",
    date: "Il y a 6 heures",
    href: "/article/remaniement",
  },
  {
    title: "Football : le club local qualifié",
    date: "Il y a 1 heure",
    href: "/article/football-coupe",
  },
  {
    title: "Tensions diplomatiques : sommet reporté",
    date: "Il y a 2 heures",
    href: "/article/tensions-diplomatiques",
  },
  {
    title: "Cinéma : le nouveau film primé",
    date: "Il y a 2 heures",
    href: "/article/cinema-festival",
  },
];

export default async function LocaleHomePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getHomepageArticles(locale);

  const featured = homepageData?.featured
    ? articleToCardProps(homepageData.featured)
    : mockFeaturedArticle;
  const top = mergeWithMock(homepageData?.topArticles?.map(articleToCardProps), mockTopArticles, 3);
  const mostRead = mergeWithMock(
    homepageData?.mostRead?.map((a) => ({
      title: a.title,
      date: "Il y a 1 heure",
      href: `/article/${a.slug}`,
    })),
    mockMostReadArticles,
    5
  );

  const politicsArticles = mergeWithMock(
    homepageData?.sections?.politique?.map(articleToCardProps),
    mockPoliticsArticles
  );
  const internationalArticles = mergeWithMock(
    homepageData?.sections?.international?.map(articleToCardProps),
    mockInternationalArticles
  );
  const sportsArticles = mergeWithMock(
    homepageData?.sections?.sport?.map(articleToCardProps),
    mockSportsArticles
  );
  const cultureArticles = mergeWithMock(
    homepageData?.sections?.culture?.map(articleToCardProps),
    mockCultureArticles
  );
  const studentArticles = mergeWithMock(
    homepageData?.sections?.etudiant?.map(articleToCardProps),
    mockStudentArticles
  );
  const gamingArticles = mergeWithMock(
    homepageData?.sections?.["jeu-video"]?.map(articleToCardProps),
    mockGamingArticles
  );
  const espaceArticles = mergeWithMock(
    homepageData?.sections?.espace?.map(articleToCardProps),
    mockEspaceArticles
  );
  const informaticaArticles = mergeWithMock(
    homepageData?.sections?.informatique?.map(articleToCardProps),
    mockInformaticaArticles
  );
  const societeArticles = mergeWithMock(
    homepageData?.sections?.societe?.map(articleToCardProps),
    mockSocieteArticles
  );
  const environnementArticles = mergeWithMock(
    homepageData?.sections?.environnement?.map(articleToCardProps),
    mockEnvironnementArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <LiveTicker items={liveTickerItems} />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ArticleCard {...featured} variant="featured" categoryColor="bg-primary" />
            </div>
            <div className="space-y-4">
              {top.map((article, i) => (
                <ArticleCard key={i} {...article} variant="horizontal" />
              ))}
            </div>
          </div>
        </section>
        <section className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-10">
              <div>
                <SectionTitle title="Politique" href="/politique" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...politicsArticles[0]} variant="vertical" />
                  <ArticleCard {...politicsArticles[1]} variant="vertical" />
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {politicsArticles.slice(2).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle title="International" href="/international" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...internationalArticles[0]} variant="vertical" />
                  <div className="space-y-4">
                    <ArticleCard {...internationalArticles[1]} variant="horizontal" />
                    <ArticleCard {...internationalArticles[2]} variant="compact" />
                  </div>
                </div>
              </div>
              <div>
                <SectionTitle title="Sport" href="/sport" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {sportsArticles.slice(0, 2).map((a, i) => (
                    <ArticleCard key={i} {...a} variant="vertical" />
                  ))}
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {sportsArticles.slice(2).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle title="Culture" href="/culture" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {cultureArticles.map((a, i) => (
                    <ArticleCard key={i} {...a} variant={i === 2 ? "compact" : "vertical"} />
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle title="Étudiant" href="/etudiant" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...studentArticles[0]} variant="vertical" />
                  <ArticleCard {...studentArticles[1]} variant="vertical" />
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {studentArticles.slice(2).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle title="Espace" href="/espace" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...espaceArticles[0]} variant="vertical" />
                  <ArticleCard {...espaceArticles[1]} variant="vertical" />
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {espaceArticles.slice(2).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle title="Jeu Vidéo" href="/jeu-video" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...gamingArticles[0]} variant="vertical" />
                  <div className="space-y-4">
                    <ArticleCard {...gamingArticles[1]} variant="horizontal" />
                    <ArticleCard {...gamingArticles[2]} variant="compact" />
                  </div>
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {gamingArticles.slice(3).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle title="Informatique" href="/informatique" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...informaticaArticles[0]} variant="vertical" />
                  <ArticleCard {...informaticaArticles[1]} variant="vertical" />
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {informaticaArticles.slice(2).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle title="Société" href="/societe" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...societeArticles[0]} variant="vertical" />
                  <ArticleCard {...societeArticles[1]} variant="vertical" />
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {societeArticles.slice(2).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle title="Environnement" href="/environnement" />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ArticleCard {...environnementArticles[0]} variant="vertical" />
                  <ArticleCard {...environnementArticles[1]} variant="vertical" />
                </div>
                <div className="mt-4 divide-y divide-border border-t border-border">
                  {environnementArticles.slice(2).map((a, i) => (
                    <div key={i} className="py-3">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-8">
              <div className="bg-muted p-4 rounded-sm">
                <SectionTitle title="Les plus lus" />
                <div className="space-y-0">
                  {mostRead.map((a, i) => (
                    <div key={i} className="flex gap-3 py-3 border-b border-border last:border-b-0">
                      <span className="font-serif text-2xl font-bold text-primary/30">{i + 1}</span>
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <SectionTitle title="Opinions" href="/opinions" />
                <div className="space-y-4">
                  {opinionArticles.map((a, i) => (
                    <div key={i} className="border-b border-border pb-4 last:border-b-0">
                      <ArticleCard {...a} variant="compact" />
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-primary text-primary-foreground p-6 rounded-sm">
                <h3 className="font-serif text-lg font-bold mb-2">Restez informé</h3>
                <p className="text-sm opacity-90 mb-4">
                  Recevez chaque matin l'essentiel dans votre boîte mail.
                </p>
                <form className="space-y-3">
                  <input
                    type="email"
                    placeholder="Votre adresse email"
                    className="w-full px-3 py-2 text-sm bg-background text-foreground rounded-sm placeholder:text-muted-foreground"
                  />
                  <button
                    type="submit"
                    className="w-full px-3 py-2 text-sm font-medium bg-background text-foreground rounded-sm hover:bg-background/90 transition-colors"
                  >
                    S'inscrire à la newsletter
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
