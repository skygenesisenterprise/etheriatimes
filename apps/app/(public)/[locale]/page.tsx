import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "Le sommet international sur le climat s'ouvre aujourd'hui à Etheria City",
    time: "Il y a 5 min",
    href: "/article/sommet-climat",
  },
  {
    id: "2",
    title: "L'équipe nationale remporte une victoire historique en finale",
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

async function getHomepageArticles(_locale: string): Promise<HomepageData | null> {
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

const mockFeaturedArticle: HomeArticle = {
  title: "Réforme historique : le Parlement adopte la nouvelle loi sur la transition énergétique",
  excerpt:
    "Après des mois de débats, les députés ont voté à une large majorité cette réforme. Décryptage des mesures clés et des réactions de l'opposition.",
  category: "Politique",
  image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop",
  date: "Il y a 2 heures",
  href: "/article/reforme-energie",
};

const mockTopArticles: HomeArticle[] = [
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

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Réforme historique : le Parlement adopte la loi", date: "Il y a 2 heures", href: "/article/reforme-energie" },
  { title: "Le Premier ministre annonce un remaniement", date: "Il y a 6 heures", href: "/article/remaniement" },
  { title: "Football : le club local qualifié", date: "Il y a 1 heure", href: "/article/football-coupe" },
  { title: "Tensions diplomatiques : sommet reporté", date: "Il y a 2 heures", href: "/article/tensions-diplomatiques" },
  { title: "Cinéma : le nouveau film primé", date: "Il y a 2 heures", href: "/article/cinema-festival" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Marie Dupont", title: "Éditorial : pourquoi cette réforme est nécessaire", href: "/article/editorial-energie" },
  { author: "Jean-Pierre Martin", title: "Tribune : l'éducation, pilier de notre avenir", href: "/article/tribune-education" },
  { author: "Sophie Bernard", title: "Chronique : la transformation numérique", href: "/article/chronique-numerique" },
];

const mockPoliticsArticles: HomeArticle[] = [
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
  {
    title: "Le Parlement examine la réforme des retraites complémentaires",
    category: "Politique",
    date: "Hier",
    href: "/article/retraites-complementaires",
  },
];

const mockInternationalArticles: HomeArticle[] = [
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
  {
    title: "Élections législatives : participation record",
    category: "International",
    date: "Hier",
    href: "/article/legislatives-participation",
  },
];

const mockEconomyArticles: HomeArticle[] = [
  {
    title: "La banque centrale maintient ses taux, les marchés saluent",
    excerpt: "Une décision attendue qui rassure les investisseurs.",
    category: "Économie",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/taux-banque-centrale",
  },
  {
    title: "Inflation : le retour sous la barre des 2 %",
    category: "Économie",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/inflation-2-pourcent",
  },
  {
    title: "L'emploi se porte mieux que prévu au deuxième trimestre",
    category: "Économie",
    date: "Il y a 5 heures",
    href: "/article/emploi-trimestre",
  },
  {
    title: "Le pouvoir d'achat au cœur des négociations salariales",
    category: "Économie",
    date: "Hier",
    href: "/article/pouvoir-achat-negociations",
  },
];

const mockSportsArticles: HomeArticle[] = [
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

const mockCultureArticles: HomeArticle[] = [
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
  {
    title: "Musique : la saison des festivals s'achève en apothéose",
    category: "Culture",
    date: "Hier",
    href: "/article/festivals-apotheose",
  },
];

const mockSocieteArticles: HomeArticle[] = [
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

const mockEnvironnementArticles: HomeArticle[] = [
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

const mockEspaceArticles: HomeArticle[] = [
  {
    title: "Mission spatiale : les nouveaux explorateurs atteignent l'ISS",
    excerpt: "Une équipe internationale atteint la Station Spatiale Internationale pour une mission de 6 mois.",
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

const mockGamingArticles: HomeArticle[] = [
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

const mockInformaticaArticles: HomeArticle[] = [
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

const mockStudentArticles: HomeArticle[] = [
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

export default async function LocaleHomePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getHomepageArticles(locale);

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

  const politicsArticles = mergeWithMock(
    homepageData?.sections?.politique?.map(articleToCardProps),
    mockPoliticsArticles
  );
  const internationalArticles = mergeWithMock(
    homepageData?.sections?.international?.map(articleToCardProps),
    mockInternationalArticles
  );
  const economyArticles = mergeWithMock(
    homepageData?.sections?.economie?.map(articleToCardProps),
    mockEconomyArticles
  );
  const societeArticles = mergeWithMock(
    homepageData?.sections?.societe?.map(articleToCardProps),
    mockSocieteArticles
  );
  const sportsArticles = mergeWithMock(
    homepageData?.sections?.sport?.map(articleToCardProps),
    mockSportsArticles
  );
  const cultureArticles = mergeWithMock(
    homepageData?.sections?.culture?.map(articleToCardProps),
    mockCultureArticles
  );
  const environnementArticles = mergeWithMock(
    homepageData?.sections?.environnement?.map(articleToCardProps),
    mockEnvironnementArticles
  );
  const espaceArticles = mergeWithMock(
    homepageData?.sections?.espace?.map(articleToCardProps),
    mockEspaceArticles
  );
  const informaticaArticles = mergeWithMock(
    homepageData?.sections?.informatique?.map(articleToCardProps),
    mockInformaticaArticles
  );
  const gamingArticles = mergeWithMock(
    homepageData?.sections?.["jeu-video"]?.map(articleToCardProps),
    mockGamingArticles
  );
  const studentArticles = mergeWithMock(
    homepageData?.sections?.etudiant?.map(articleToCardProps),
    mockStudentArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                Actualités et info du jour
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
              <SectionBlock title="International" href="/monde" articles={internationalArticles} locale={locale} />
              <SectionBlock title="Politique" href="/politique" articles={politicsArticles} locale={locale} />
              <SectionBlock title="Société" href="/societe" articles={societeArticles} locale={locale} />
              <SectionBlock title="Économie" href="/economie" articles={economyArticles} locale={locale} />
              <SectionBlock title="Environnement" href="/environnement" articles={environnementArticles} locale={locale} />
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
                  Le meilleur de l&apos;actualité, dans votre boîte mail.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction, chaque matin.
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
                    ["Dossiers", "/dossiers"],
                    ["Vidéos", "/videos"],
                    ["Podcasts", "/podcasts"],
                    ["Jeux", "/jeux"],
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
                <h2 className="mt-1 font-serif text-3xl font-bold">Nos autres univers</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Sport" href="/sport" articles={sportsArticles} locale={locale} />
              <SectionBlock title="Culture" href="/culture" articles={cultureArticles} locale={locale} />
              <SectionBlock title="Étudiant" href="/etudiant" articles={studentArticles} locale={locale} />
              <SectionBlock title="Espace" href="/espace" articles={espaceArticles} locale={locale} />
              <SectionBlock title="Informatique" href="/informatique" articles={informaticaArticles} locale={locale} />
              <SectionBlock title="Jeu vidéo" href="/video-game" articles={gamingArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              L&apos;essentiel, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : enquêtes, décryptages et analyses, disponible dès 7 h.
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
