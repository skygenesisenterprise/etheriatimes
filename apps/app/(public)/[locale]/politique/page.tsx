import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "Assemblée : le projet de loi sur le pouvoir d'achat adopté en première lecture",
    time: "Il y a 5 min",
    href: "/article/debat-pouvoir-achat",
  },
  {
    id: "2",
    title: "Remaniement : le nouveau gouvernement dévoilé en fin de journée",
    time: "Il y a 14 min",
    href: "/article/remaniement",
  },
  {
    id: "3",
    title: "Sondage : la confiance dans les institutions progresse",
    time: "Il y a 27 min",
    href: "/article/sondage-confiance",
  },
  {
    id: "4",
    title: "Sénat : la loi immigration examinée en séance",
    time: "Il y a 41 min",
    href: "/article/immigration-senat",
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

async function getPolitiqueArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Politique",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
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
    title: "Le Premier ministre annonce un remaniement",
    category: "Gouvernement",
    image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/remaniement",
  },
  {
    title: "Municipales 2026 : les premiers résultats",
    category: "Élections",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/municipales-resultats",
  },
  {
    title: "Débat à l'assemblée : le pouvoir d'achat",
    category: "Parlement",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=250&fit=crop",
    date: "Il y a 8 heures",
    href: "/article/debat-pouvoir-achat",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Réforme des retraites : retour en arrière", date: "Il y a 4 heures", href: "/article/retraites" },
  { title: "Nouveau parti politique : meeting inaugural", date: "Il y a 6 heures", href: "/article/nouveau-parti" },
  { title: "Réforme fiscale : les propositions", date: "Hier", href: "/article/fiscale" },
  { title: "Union européenne : sommet à Bruxelles", date: "Hier", href: "/article/sommet-ue" },
  { title: "Interview : le chef de l'opposition", date: "Il y a 2 jours", href: "/article/interview-opposition" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Marie Dupont", title: "Éditorial : pourquoi cette réforme est nécessaire", href: "/article/editorial-energie" },
  { author: "Jean-Pierre Martin", title: "Tribune : l'éducation, pilier de notre avenir", href: "/article/tribune-education" },
  { author: "Sophie Bernard", title: "Chronique : la transformation de la vie publique", href: "/article/chronique-vie-publique" },
];

const mockGouvernementArticles: HomeArticle[] = [
  {
    title: "Le Premier ministre annonce un remaniement",
    excerpt: "Suite aux dernières évolutions politiques, un nouveau gouvernement est attendu dans les prochaines heures.",
    category: "Gouvernement",
    image: "https://images.unsplash.com/photo-1575936123452-b67c3203c357?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/remaniement",
  },
  {
    title: "Interview exclusive : le ministre de l'Économie",
    category: "Gouvernement",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/interview-ministre",
  },
  {
    title: "Conseil des ministres : les dossiers de la rentrée",
    category: "Gouvernement",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/conseil-ministres",
  },
  {
    title: "Le plan de soutien aux entreprises dévoilé",
    category: "Gouvernement",
    date: "Il y a 2 jours",
    href: "/article/plan-soutien-entreprises",
  },
  {
    title: "Matières premières : l'exécutif veut sécuriser les approvisionnements",
    category: "Gouvernement",
    date: "Il y a 2 jours",
    href: "/article/approvisionnements",
  },
];

const mockParlementArticles: HomeArticle[] = [
  {
    title: "Débat à l'assemblée : le pouvoir d'achat",
    excerpt: "Les députés ont débattu des mesures pour améliorer le pouvoir d'achat des ménages.",
    category: "Parlement",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=250&fit=crop",
    date: "Il y a 8 heures",
    href: "/article/debat-pouvoir-achat",
  },
  {
    title: "Loi immigration : le texte adopté au Sénat",
    category: "Parlement",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/immigration-senat",
  },
  {
    title: "Budget 2027 : la commission des finances se réunit",
    category: "Parlement",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/budget-2027",
  },
  {
    title: "Commission d'enquête : les auditions se poursuivent",
    category: "Parlement",
    date: "Il y a 2 jours",
    href: "/article/commission-enquete",
  },
  {
    title: "Le Parlement examine la réforme des retraites complémentaires",
    category: "Parlement",
    date: "Il y a 2 jours",
    href: "/article/retraites-complementaires",
  },
];

const mockElectionsArticles: HomeArticle[] = [
  {
    title: "Municipales 2026 : les premiers résultats tombent",
    excerpt: "Les bureaux de vote ont fermé leurs portes à 20h. Découvrez les premières tendances.",
    category: "Élections",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/municipales-resultats",
  },
  {
    title: "Présidentielle 2027 : les candidats se positionnent",
    category: "Élections",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/presidentielle-2027",
  },
  {
    title: "Coalition : accord trouvé pour les régionales",
    category: "Élections",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/coalition-regionales",
  },
  {
    title: "Participation : un taux en hausse dans les grandes villes",
    category: "Élections",
    date: "Il y a 2 jours",
    href: "/article/participation-hausse",
  },
  {
    title: "Les enjeux du scrutin dans les territoires d'outre-mer",
    category: "Élections",
    date: "Il y a 2 jours",
    href: "/article/enjeux-outre-mer",
  },
];

const mockPartisArticles: HomeArticle[] = [
  {
    title: "Nouveau parti politique : meeting inaugural",
    excerpt: "La formation lance sa campagne avec un grand rassemblement réunissant des milliers de sympathisants.",
    category: "Partis politiques",
    image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/nouveau-parti",
  },
  {
    title: "Le chef de l'opposition dévoile son programme",
    category: "Partis politiques",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/programme-opposition",
  },
  {
    title: "Congrès : les militants appelés à trancher",
    category: "Partis politiques",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/congres-parti",
  },
  {
    title: "Finances des partis : la transparence en débat",
    category: "Partis politiques",
    date: "Il y a 2 jours",
    href: "/article/financement-partis",
  },
  {
    title: "Les mouvements citoyens bousculent les appareils",
    category: "Partis politiques",
    date: "Il y a 2 jours",
    href: "/article/mouvements-citoyens",
  },
];

const mockOpinionPolitiqueArticles: HomeArticle[] = [
  {
    title: "Sondage : confiance des citoyens en hausse",
    excerpt: "Selon un nouveau sondage, la confiance envers les institutions progresse nettement.",
    category: "Opinion",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/sondage-confiance",
  },
  {
    title: "Éditorial : pourquoi cette réforme est nécessaire",
    category: "Opinion",
    image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/editorial-energie",
  },
  {
    title: "Tribune : l'éducation, pilier de notre avenir",
    category: "Opinion",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/tribune-education",
  },
  {
    title: "Chronique : la transformation de la vie publique",
    category: "Opinion",
    date: "Il y a 2 jours",
    href: "/article/chronique-vie-publique",
  },
  {
    title: "Décryptage : ce que révèle le dernier baromètre",
    category: "Opinion",
    date: "Il y a 2 jours",
    href: "/article/barometre",
  },
];

const mockInstitutionsArticles: HomeArticle[] = [
  {
    title: "Réforme des institutions : les pistes sur la table",
    excerpt: "L'exécutif consulte les forces politiques sur une refonte du fonctionnement des institutions.",
    category: "Institutions",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/reforme-institutions",
  },
  {
    title: "Conseil constitutionnel : une décision très attendue",
    category: "Institutions",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/conseil-constitutionnel",
  },
  {
    title: "Collectivités : la décentralisation relancée",
    category: "Institutions",
    date: "Hier",
    href: "/article/decentralisation",
  },
  {
    title: "Justice : les chantiers de la rentrée",
    category: "Institutions",
    date: "Il y a 2 jours",
    href: "/article/justice-chantiers",
  },
];

const mockDebatsArticles: HomeArticle[] = [
  {
    title: "Pouvoir d'achat : les mesures qui font débat",
    excerpt: "Baisses de taxes ou chèques ciblés, les options s'affrontent dans l'hémicycle.",
    category: "Débats",
    image: "https://images.unsplash.com/photo-1555848962-6e79363ec58f?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/debat-pouvoir-achat",
  },
  {
    title: "Laïcité : un texte sensible examiné",
    category: "Débats",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/debat-laicite",
  },
  {
    title: "Santé : la réforme du système de soins",
    category: "Débats",
    date: "Hier",
    href: "/article/sante-reformes",
  },
  {
    title: "École : la question des programmes",
    category: "Débats",
    date: "Il y a 2 jours",
    href: "/article/ecole-programmes",
  },
];

const mockDecryptagesArticles: HomeArticle[] = [
  {
    title: "Décryptage : la recomposition du paysage politique",
    excerpt: "Trois blocs, des alliances inédites : comprendre les nouvelles lignes de force.",
    category: "Décryptages",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/recomposition-politique",
  },
  {
    title: "Analyse : ce que pèse réellement l'abstention",
    category: "Décryptages",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/abstention-analyse",
  },
  {
    title: "Cartographie : les bastions qui basculent",
    category: "Décryptages",
    date: "Hier",
    href: "/article/cartographie-bastions",
  },
  {
    title: "Les mots du débat : décrypter la novlangue politique",
    category: "Décryptages",
    date: "Il y a 2 jours",
    href: "/article/mots-du-debat",
  },
];

const mockEuropePolitiqueArticles: HomeArticle[] = [
  {
    title: "Sommet européen à Bruxelles : les sujets chauds",
    excerpt: "Énergie, défense, élargissement : les Vingt-Sept tentent de trouver des compromis.",
    category: "Europe politique",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/sommet-ue",
  },
  {
    title: "Parlement européen : le nouveau rapport sur le climat",
    category: "Europe politique",
    image: "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/parlement-climat",
  },
  {
    title: "Élargissement : les négociations avec les Balkans",
    category: "Europe politique",
    date: "Il y a 2 jours",
    href: "/article/elargissement-balkans",
  },
  {
    title: "La présidence tournante de l'UE dévoile ses priorités",
    category: "Europe politique",
    date: "Il y a 2 jours",
    href: "/article/presidence-ue",
  },
];

const mockPresidentielleArticles: HomeArticle[] = [
  {
    title: "Présidentielle 2027 : les candidats se positionnent",
    excerpt: "À deux ans de l'échéance, les prétendants commencent leur campagne.",
    category: "Présidentielle 2027",
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/presidentielle-2027",
  },
  {
    title: "Les primaires : mode d'emploi et calendrier",
    category: "Présidentielle 2027",
    image: "https://images.unsplash.com/photo-1494172961521-33799ddd43a5?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/primaires-calendrier",
  },
  {
    title: "Financement des campagnes : les règles rappelées",
    category: "Présidentielle 2027",
    date: "Il y a 2 jours",
    href: "/article/financement-campagnes",
  },
  {
    title: "Sondages : qui sont les favoris à ce stade ?",
    category: "Présidentielle 2027",
    date: "Il y a 2 jours",
    href: "/article/sondages-favoris",
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

export default async function PolitiquePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getPolitiqueArticles(locale);

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

  const gouvernementArticles = mergeWithMock(
    homepageData?.sections?.gouvernement?.map(articleToCardProps),
    mockGouvernementArticles
  );
  const parlementArticles = mergeWithMock(
    homepageData?.sections?.parlement?.map(articleToCardProps),
    mockParlementArticles
  );
  const electionsArticles = mergeWithMock(
    homepageData?.sections?.elections?.map(articleToCardProps),
    mockElectionsArticles
  );
  const partisArticles = mergeWithMock(
    homepageData?.sections?.["partis-politiques"]?.map(articleToCardProps),
    mockPartisArticles
  );
  const opinionPolitiqueArticles = mergeWithMock(
    homepageData?.sections?.opinion?.map(articleToCardProps),
    mockOpinionPolitiqueArticles
  );
  const institutionsArticles = mergeWithMock(
    homepageData?.sections?.institutions?.map(articleToCardProps),
    mockInstitutionsArticles
  );
  const debatsArticles = mergeWithMock(
    homepageData?.sections?.debats?.map(articleToCardProps),
    mockDebatsArticles
  );
  const decryptagesArticles = mergeWithMock(
    homepageData?.sections?.decryptages?.map(articleToCardProps),
    mockDecryptagesArticles
  );
  const europePolitiqueArticles = mergeWithMock(
    homepageData?.sections?.["europe-politique"]?.map(articleToCardProps),
    mockEuropePolitiqueArticles
  );
  const presidentielleArticles = mergeWithMock(
    homepageData?.sections?.["presidentielle-2027"]?.map(articleToCardProps),
    mockPresidentielleArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité politique du jour
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
              <SectionBlock title="Gouvernement" href="/politique" articles={gouvernementArticles} locale={locale} />
              <SectionBlock title="Parlement" href="/politique" articles={parlementArticles} locale={locale} />
              <SectionBlock title="Élections" href="/politique" articles={electionsArticles} locale={locale} />
              <SectionBlock title="Partis politiques" href="/politique" articles={partisArticles} locale={locale} />
              <SectionBlock title="Opinion" href="/politique" articles={opinionPolitiqueArticles} locale={locale} />
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
                  La vie politique, décryptée chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur la vie politique, chaque matin.
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
                    ["Décryptages", "/decryptages"],
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
                <h2 className="mt-1 font-serif text-3xl font-bold">La politique en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Institutions" href="/politique" articles={institutionsArticles} locale={locale} />
              <SectionBlock title="Débats" href="/politique" articles={debatsArticles} locale={locale} />
              <SectionBlock title="Décryptages" href="/politique" articles={decryptagesArticles} locale={locale} />
              <SectionBlock title="Europe politique" href="/politique" articles={europePolitiqueArticles} locale={locale} />
              <SectionBlock title="Présidentielle 2027" href="/politique" articles={presidentielleArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              La politique, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : enquêtes, décryptages et analyses de la vie politique, disponible dès 7 h.
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
