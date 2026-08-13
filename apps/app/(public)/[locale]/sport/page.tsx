import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "Ligue 1 : le PSG sacré champion pour la 15e fois",
    time: "Il y a 5 min",
    href: "/article/psg-champion",
  },
  {
    id: "2",
    title: "Roland-Garros : Nadal en finale pour la 15e fois",
    time: "Il y a 14 min",
    href: "/article/nadal-finale",
  },
  {
    id: "3",
    title: "Tour de France : victoire d'étape pour un Français",
    time: "Il y a 28 min",
    href: "/article/tour-france",
  },
  {
    id: "4",
    title: "NBA Finals : les Lakers mènent 2-1",
    time: "Il y a 43 min",
    href: "/article/nba-finals",
  },
];

interface HomeArticle {
  title: string;
  excerpt?: string;
  category?: string;
  image?: string;
  date: string;
  href: string;
  author?: string;
}

interface HomeHeadline {
  title: string;
  date: string;
  href: string;
}

interface OpinionArticle {
  author: string;
  title: string;
  href: string;
}

interface HomepageArticlePayload {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  categoryId?: string;
  viewCount?: number;
  readTime?: number;
  imageUrl?: string;
}

interface HomepageData {
  featured?: HomepageArticlePayload;
  topArticles?: HomepageArticlePayload[];
  mostRead?: Array<{ title: string; slug: string }>;
  sections?: Record<string, HomepageArticlePayload[]>;
}

async function getSportArticles(_locale: string): Promise<HomepageData | null> {
  // The public article endpoint is not part of the current API client. Keep
  // the editorial fallback data until that endpoint is exposed again.
  return null;
}

function articleToCardProps(article: HomepageArticlePayload): HomeArticle {
  return {
    title: article.title,
    excerpt: article.excerpt,
    category: article.categoryId
      ? article.categoryId.charAt(0).toUpperCase() + article.categoryId.slice(1).replace(/-/g, " ")
      : "Sport",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=250&fit=crop",
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

const mockFeaturedArticle: HomeArticle = {
  title: "Ligue 1 : le PSG champion pour la 15e fois",
  excerpt:
    "Les Parisiens décrochent un nouveau titre historique après une saison maîtrisée de bout en bout.",
  category: "Football",
  image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/psg-champion",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "Roland-Garros : Nadal en finale pour la 15e fois",
    category: "Tennis",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/nadal-finale",
  },
  {
    title: "NBA Finals : les Lakers mènent 2-1",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/nba-finals",
  },
  {
    title: "Tour de France : victoire d'étape pour un Français",
    category: "Cyclisme",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/tour-france",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Mercato : les infos du jour", date: "En direct", href: "/article/mercato-direct" },
  { title: "Résultats et classements", date: "Mis à jour", href: "/article/resultats" },
  { title: "Football : le club local qualifié", date: "Il y a 1 heure", href: "/article/football-coupe" },
  { title: "Tennis : la révélation nationale en quarts", date: "Il y a 3 heures", href: "/article/tennis-quarts" },
  { title: "Interview : serial buteur de Ligue 1", date: "Hier", href: "/article/interview-kylian" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Bruno Mercier", title: "Éditorial : le football français au sommet", href: "/article/editorial-football" },
  { author: "Yasmine Kaci", title: "Tribune : le sport féminin mérite mieux", href: "/article/tribune-sport-feminin" },
  { author: "Loïc Perrin", title: "Chronique : le cyclisme, école de patience", href: "/article/chronique-cyclisme" },
];

const mockFootballArticles: HomeArticle[] = [
  {
    title: "Ligue 1 : le PSG champion pour la 15e fois",
    excerpt: "Les Parisiens décrochent un nouveau titre historique après une saison maîtrisée de bout en bout.",
    category: "Football",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/psg-champion",
  },
  {
    title: "Transferts : les grandes manœuvres estivales",
    category: "Football",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/transferts-ete",
  },
  {
    title: "Euro 2026 : les groupes dévoilés",
    category: "Football",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/euro-groupes",
  },
  {
    title: "Football : le club local qualifié",
    category: "Football",
    date: "Il y a 1 heure",
    href: "/article/football-coupe",
  },
  {
    title: "Victoire historique de l'équipe nationale en finale",
    category: "Football",
    date: "Il y a 3 heures",
    href: "/article/victoire-finale",
  },
];

const mockTennisArticles: HomeArticle[] = [
  {
    title: "Roland-Garros : Nadal en finale pour la 15e fois",
    excerpt: "Le roi de la terre battue domine son adversaire en trois sets.",
    category: "Tennis",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/nadal-finale",
  },
  {
    title: "Tennis : la révélation nationale en quarts",
    category: "Tennis",
    image: "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/tennis-quarts",
  },
  {
    title: "Wimbledon : les têtes de série tombent",
    category: "Tennis",
    image: "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/wimbledon-series",
  },
  {
    title: "Le circuit féminin en plein renouveau",
    category: "Tennis",
    date: "Hier",
    href: "/article/tennis-feminin",
  },
  {
    title: "Classement ATP : la bataille pour la place de numéro 1",
    category: "Tennis",
    date: "Il y a 2 jours",
    href: "/article/classement-atp",
  },
];

const mockBasketballArticles: HomeArticle[] = [
  {
    title: "NBA Finals : les Lakers mènent 2-1",
    excerpt: "Une série palpitante entre deux franchises emblématiques.",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/nba-finals",
  },
  {
    title: "Betclic Élite : la saison régulière se conclut",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/betclic-elite",
  },
  {
    title: "Équipe de France : la préparation olympique",
    category: "Basketball",
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/france-basket-prep",
  },
  {
    title: "Draft NBA : les pépites à suivre",
    category: "Basketball",
    date: "Il y a 2 jours",
    href: "/article/draft-nba",
  },
  {
    title: "Euroleague : le Final Four se dessine",
    category: "Basketball",
    date: "Il y a 2 jours",
    href: "/article/euroleague-final-four",
  },
];

const mockRugbyArticles: HomeArticle[] = [
  {
    title: "Coupe du monde de rugby : la France favorite",
    excerpt: "Les Bleus retrouvent le Mondial avec de grandes ambitions.",
    category: "Rugby",
    image: "https://images.unsplash.com/photo-1580081734807-c51e63c401fe?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/rugby-mondial",
  },
  {
    title: "Top 14 : le choc au sommet",
    category: "Rugby",
    image: "https://images.unsplash.com/photo-1580081734807-c51e63c401fe?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/top14-choc",
  },
  {
    title: "Tournoi des Six Nations : le bilan",
    category: "Rugby",
    image: "https://images.unsplash.com/photo-1580081734807-c51e63c401fe?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/six-nations-bilan",
  },
  {
    title: "XV de France : la liste dévoilée",
    category: "Rugby",
    date: "Il y a 2 jours",
    href: "/article/xv-france-liste",
  },
  {
    title: "Rugby féminin : l'essor se confirme",
    category: "Rugby",
    date: "Il y a 2 jours",
    href: "/article/rugby-feminin",
  },
];

const mockCyclismeArticles: HomeArticle[] = [
  {
    title: "Tour de France : victoire d'étape pour un Français",
    excerpt: "Une performance remarquable sur les routes alpestres.",
    category: "Cyclisme",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/tour-france",
  },
  {
    title: "Cyclisme : le champion défend son titre",
    category: "Cyclisme",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/cyclisme-tour",
  },
  {
    title: "Classiques : les favoris du printemps",
    category: "Cyclisme",
    image: "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/classiques-printemps",
  },
  {
    title: "VTT : les championnats nationaux approchent",
    category: "Cyclisme",
    date: "Il y a 2 jours",
    href: "/article/vtt-championnats",
  },
  {
    title: "Féminines : le peloton s'internationalise",
    category: "Cyclisme",
    date: "Il y a 2 jours",
    href: "/article/peloton-feminin",
  },
];

const mockMecaniqueArticles: HomeArticle[] = [
  {
    title: "F1 : pole position surprise à Monaco",
    excerpt: "Un pilote outsider part en tête de la grille sur le Rocher.",
    category: "Sport mécanique",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/f1-monaco",
  },
  {
    title: "MotoGP : un championnat indécis",
    category: "Sport mécanique",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/motogp-indecis",
  },
  {
    title: "Endurance : les 24 Heures du Mans se préparent",
    category: "Sport mécanique",
    image: "https://images.unsplash.com/photo-1541443131876-44b03de101c5?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/24h-mans",
  },
  {
    title: "Rallye : une saison sous tension",
    category: "Sport mécanique",
    date: "Il y a 2 jours",
    href: "/article/rallye-saison",
  },
];

const mockJeuxOlympiquesArticles: HomeArticle[] = [
  {
    title: "JO 2026 : les sites de Milano-Cortina prêts",
    excerpt: "Les dernières installations livrées à quelques mois des Jeux.",
    category: "Multi-sports",
    image: "https://images.unsplash.com/photo-1569517282132-25d22f4573e6?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/jo-2026",
  },
  {
    title: "Athlétisme : les minima olympiques se précisent",
    category: "Multi-sports",
    image: "https://images.unsplash.com/photo-1538805060514-97d9cc17730c?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/athletisme-minima",
  },
  {
    title: "Natation : la génération dorée française",
    category: "Multi-sports",
    image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/natation-generation",
  },
  {
    title: "Handball : les Bleus visent l'or",
    category: "Multi-sports",
    date: "Il y a 2 jours",
    href: "/article/handball-or",
  },
];

const mockResultatsArticles: HomeArticle[] = [
  {
    title: "Résultats et classements de la semaine",
    excerpt: "Tous les scores et classements des championnats majeurs, en un coup d'œil.",
    category: "Résultats",
    image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&h=250&fit=crop",
    date: "Mis à jour",
    href: "/article/resultats",
  },
  {
    title: "Ligue 1 : le classement à la trêve",
    category: "Résultats",
    image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/ligue1-classement",
  },
  {
    title: "Les stats qui font la saison",
    category: "Résultats",
    date: "Hier",
    href: "/article/stats-saison",
  },
  {
    title: "Agenda : les rendez-vous à ne pas manquer",
    category: "Résultats",
    date: "Il y a 2 jours",
    href: "/article/agenda-sport",
  },
];

const mockEportArticles: HomeArticle[] = [
  {
    title: "E-sport : les tournois internationaux battent des records",
    excerpt: "Les compétitions de jeux vidéo attirent des audiences comparables aux sports traditionnels.",
    category: "E-sport",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/esport-records",
  },
  {
    title: "League of Legends : le championnat du monde",
    category: "E-sport",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/lol-worlds",
  },
  {
    title: "Les équipes françaises à la conquête des titres",
    category: "E-sport",
    date: "Hier",
    href: "/article/esport-france",
  },
  {
    title: "Streaming : l'économie du sport électronique",
    category: "E-sport",
    date: "Il y a 2 jours",
    href: "/article/esport-economie",
  },
];

function localizedHref(locale: Locale, href: string) {
  if (href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return href.startsWith(`/${locale}/`) ? href : `/${locale}${href}`;
}

interface LocalizedArticleProps {
  article: HomeArticle;
  locale: Locale;
}

function LeadArticle({ article, locale, large = false }: LocalizedArticleProps & { large?: boolean }) {
  const href = localizedHref(locale, article.href);

  return (
    <article>
      {article.image && (
        <Link href={href} className="group block mb-4">
          <div className={`relative overflow-hidden bg-muted ${large ? "aspect-video" : "aspect-16/10"}`}>
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes={large ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 768px) 33vw, 100vw"}
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </Link>
      )}
      {article.category && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
          {article.category}
        </span>
      )}
      <h2
        className={`font-serif font-bold leading-tight text-foreground mt-2 ${
          large ? "text-3xl md:text-[40px]" : "text-xl md:text-2xl"
        }`}
      >
        <Link href={href} className="hover:text-primary transition-colors">
          {article.title}
        </Link>
      </h2>
      {article.excerpt && (
        <p className={`text-muted-foreground mt-3 line-clamp-3 ${large ? "text-base" : "text-sm"}`}>
          {article.excerpt}
        </p>
      )}
      <p className="text-xs text-muted-foreground mt-3">{article.date}</p>
    </article>
  );
}

function StoryCard({ article, locale }: LocalizedArticleProps) {
  const href = localizedHref(locale, article.href);

  return (
    <article className="group border-t border-border pt-3">
      {article.image && (
        <Link href={href} className="block overflow-hidden bg-muted mb-3">
          <div className="relative aspect-16/10">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
            />
          </div>
        </Link>
      )}
      {article.category && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
          {article.category}
        </span>
      )}
      <h3 className="font-serif text-lg font-bold leading-snug text-foreground mt-1">
        <Link href={href} className="hover:text-primary transition-colors">
          {article.title}
        </Link>
      </h3>
      <p className="text-xs text-muted-foreground mt-2">{article.date}</p>
    </article>
  );
}

function HeadlineItem({ article, locale }: LocalizedArticleProps) {
  return (
    <article className="py-3 border-b border-border last:border-b-0">
      {article.category && (
        <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
          {article.category}
        </span>
      )}
      <h3 className="font-serif text-base font-bold leading-snug text-foreground mt-1">
        <Link href={localizedHref(locale, article.href)} className="hover:text-primary transition-colors">
          {article.title}
        </Link>
      </h3>
      <p className="text-xs text-muted-foreground mt-1">{article.date}</p>
    </article>
  );
}

function SectionBlock({
  title,
  href,
  articles,
  locale,
}: {
  title: string;
  href: string;
  articles: HomeArticle[];
  locale: Locale;
}) {
  if (articles.length === 0) {
    return null;
  }

  const [lead, ...rest] = articles;
  const visualStories = rest.slice(0, 2);
  const headlines = rest.slice(2, 5);

  return (
    <section>
      <SectionTitle title={title} href={localizedHref(locale, href)} />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-7 md:border-r md:border-border md:pr-8">
          <LeadArticle article={lead} locale={locale} />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-5">
          {visualStories.map((article, index) => (
            <div key={index} className={index > 0 ? "sm:border-l sm:border-border sm:pl-6" : ""}>
              <StoryCard article={article} locale={locale} />
            </div>
          ))}
        </div>
      </div>
      {headlines.length > 0 && (
        <div className="mt-6 grid grid-cols-1 border-t border-border sm:grid-cols-3 sm:divide-x sm:divide-border">
          {headlines.map((article, index) => (
            <div key={index} className="sm:px-6 first:pl-0 last:pr-0">
              <HeadlineItem article={article} locale={locale} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default async function SportPage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getSportArticles(locale);

  const featured = homepageData?.featured
    ? articleToCardProps(homepageData.featured)
    : mockFeaturedArticle;
  const top = mergeWithMock(homepageData?.topArticles?.map(articleToCardProps), mockTopArticles, 3);
  const mostRead: HomeHeadline[] = mergeWithMock(
    homepageData?.mostRead?.map((a: { title: string; slug: string }) => ({
      title: a.title,
      date: "Il y a 1 heure",
      href: `/article/${a.slug}`,
    })),
    mockMostReadArticles,
    5
  );

  const footballArticles = mergeWithMock(
    homepageData?.sections?.football?.map(articleToCardProps),
    mockFootballArticles
  );
  const tennisArticles = mergeWithMock(
    homepageData?.sections?.tennis?.map(articleToCardProps),
    mockTennisArticles
  );
  const basketballArticles = mergeWithMock(
    homepageData?.sections?.basketball?.map(articleToCardProps),
    mockBasketballArticles
  );
  const rugbyArticles = mergeWithMock(
    homepageData?.sections?.rugby?.map(articleToCardProps),
    mockRugbyArticles
  );
  const cyclismeArticles = mergeWithMock(
    homepageData?.sections?.cyclisme?.map(articleToCardProps),
    mockCyclismeArticles
  );
  const mecaniqueArticles = mergeWithMock(
    homepageData?.sections?.["sport-mecanique"]?.map(articleToCardProps),
    mockMecaniqueArticles
  );
  const jeuxOlympiquesArticles = mergeWithMock(
    homepageData?.sections?.["multi-sports"]?.map(articleToCardProps),
    mockJeuxOlympiquesArticles
  );
  const resultatsArticles = mergeWithMock(
    homepageData?.sections?.resultats?.map(articleToCardProps),
    mockResultatsArticles
  );
  const eportArticles = mergeWithMock(
    homepageData?.sections?.["e-sport"]?.map(articleToCardProps),
    mockEportArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité sportive du jour
              </h2>
              <Link
                href={localizedHref(locale, "/archives")}
                className="hidden text-[11px] font-bold uppercase tracking-wide text-muted-foreground hover:text-primary sm:block"
              >
                Toute l&apos;actualité
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-12 lg:gap-x-10">
              <div className="lg:col-span-8 lg:border-r lg:border-border lg:pr-10">
                <div className="grid grid-cols-1 gap-7 md:grid-cols-5 md:gap-8">
                  <div className="border-b border-border pb-7 md:col-span-3 md:border-b-0 md:border-r md:pb-0 md:pr-8">
                    <LeadArticle article={featured} locale={locale} large />
                  </div>
                  <div className="md:col-span-2">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-1">
                      {top.slice(0, 2).map((article, index) => (
                        <div
                          key={index}
                          className={index > 0 ? "sm:border-l sm:border-border sm:pl-6 md:border-l-0 md:border-t md:pl-0 md:pt-6" : ""}
                        >
                          <StoryCard article={article} locale={locale} />
                        </div>
                      ))}
                    </div>
                    {top[2] && (
                      <div className="mt-6 border-t border-border">
                        <HeadlineItem article={top[2]} locale={locale} />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <aside className="lg:col-span-4">
                <SectionTitle title="À suivre" />
                <ol>
                  {mostRead.map((article, index) => (
                    <li key={index} className="flex gap-4 border-b border-border py-4 last:border-b-0">
                      <span className="font-serif text-3xl font-bold leading-none text-primary/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <Link
                          href={localizedHref(locale, article.href)}
                          className="font-serif text-base font-bold leading-snug text-foreground hover:text-primary transition-colors"
                        >
                          {article.title}
                        </Link>
                        <p className="mt-1 text-xs text-muted-foreground">{article.date}</p>
                      </div>
                    </li>
                  ))}
                </ol>

                <div className="mt-8 border-t-2 border-foreground pt-3">
                  <h2 className="font-serif text-xl font-bold">En direct</h2>
                  <div className="mt-2">
                    {liveNewsItems.slice(0, 3).map((item) => (
                      <Link
                        key={item.id}
                        href={localizedHref(locale, item.href)}
                        className="group flex gap-3 border-b border-border py-3 last:border-b-0"
                      >
                        <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span className="text-sm leading-snug text-foreground group-hover:text-primary transition-colors">
                          {item.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
          <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-12 lg:gap-x-10">
            <div className="space-y-12 lg:col-span-8">
              <SectionBlock title="Football" href="/sport" articles={footballArticles} locale={locale} />
              <SectionBlock title="Tennis" href="/sport" articles={tennisArticles} locale={locale} />
              <SectionBlock title="Basketball" href="/sport" articles={basketballArticles} locale={locale} />
              <SectionBlock title="Rugby" href="/sport" articles={rugbyArticles} locale={locale} />
              <SectionBlock title="Cyclisme" href="/sport" articles={cyclismeArticles} locale={locale} />
            </div>

            <aside className="lg:col-span-4 lg:border-l lg:border-border lg:pl-10">
              <SectionTitle title="Idées et tribunes" href={localizedHref(locale, "/opinions")} />
              <div>
                {mockOpinionArticles.map((article) => (
                  <article key={article.href} className="border-b border-border py-4 first:pt-0 last:border-b-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {article.author}
                    </p>
                    <h3 className="mt-1 font-serif text-lg font-bold leading-snug">
                      <Link
                        href={localizedHref(locale, article.href)}
                        className="hover:text-primary transition-colors"
                      >
                        {article.title}
                      </Link>
                    </h3>
                  </article>
                ))}
              </div>

              <div className="mt-10 bg-muted p-6">
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">Newsletter</p>
                <h2 className="mt-2 font-serif text-2xl font-bold leading-tight">
                  Le sport, décrypté chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur les compétitions, chaque matin.
                </p>
                <Link
                  href={localizedHref(locale, "/newsletter")}
                  className="mt-5 inline-flex bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-wide text-background hover:bg-primary transition-colors"
                >
                  Découvrir les newsletters
                </Link>
              </div>

              <div className="mt-10">
                <SectionTitle title="À explorer" />
                <div className="grid grid-cols-2 gap-x-5 gap-y-3 text-sm font-semibold">
                  {[
                    ["Archives", "/archives"],
                    ["Résultats", "/resultats"],
                    ["Classements", "/classements"],
                    ["Podcasts", "/podcasts"],
                    ["Vidéos", "/videos"],
                    ["Services", "/services"],
                  ].map(([label, href]) => (
                    <Link
                      key={href}
                      href={localizedHref(locale, href)}
                      className="border-b border-border pb-2 hover:text-primary transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto max-w-7xl px-4 py-10 lg:px-6 lg:py-12">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-primary">La rédaction</p>
                <h2 className="mt-1 font-serif text-3xl font-bold">Le sport en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Sport mécanique" href="/sport" articles={mecaniqueArticles} locale={locale} />
              <SectionBlock title="Multi-sports" href="/sport" articles={jeuxOlympiquesArticles} locale={locale} />
              <SectionBlock title="Résultats" href="/sport" articles={resultatsArticles} locale={locale} />
              <SectionBlock title="E-sport" href="/sport" articles={eportArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              Le sport, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : résultats, décryptages et analyses des compétitions, disponible dès 7 h.
            </p>
            <form className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
              <input
                type="email"
                required
                placeholder="Votre adresse email"
                className="min-w-0 flex-1 bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              <button
                type="submit"
                className="bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 transition-opacity"
              >
                S&apos;inscrire
              </button>
            </form>
          </div>
        </section>
      </main>

      <Footer locale={locale} />
    </div>
  );
}
