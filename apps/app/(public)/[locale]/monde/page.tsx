import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "Sommet climat : les négociations entrent dans leur dernière ligne droite",
    time: "Il y a 5 min",
    href: "/article/sommet-climat",
  },
  {
    id: "2",
    title: "Ukraine : nouveaux pourparlers annoncés pour la semaine prochaine",
    time: "Il y a 18 min",
    href: "/article/ukraine-pourparlers",
  },
  {
    id: "3",
    title: "Élections américaines : la participation atteint un niveau record",
    time: "Il y a 32 min",
    href: "/article/usa-participation",
  },
  {
    id: "4",
    title: "Mer de Chine : la communauté internationale appelle au dialogue",
    time: "Il y a 45 min",
    href: "/article/mer-chine-dialogue",
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

async function getMondeArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Monde",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1521295121783-8a321d551ad2?w=400&h=250&fit=crop",
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
  title: "Sommet international sur le climat : les grandes décisions",
  excerpt:
    "Les leaders mondiaux se réunissent pour adopter de nouvelles mesures environnementales contraignantes. Décryptage des enjeux et des positions de chaque délégation.",
  category: "Diplomatie",
  image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/sommet-climat",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "Élections en Allemagne : résultats définitifs",
    category: "Europe",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/allemagne-elections",
  },
  {
    title: "Tensions en mer de Chine méridionale",
    category: "Asie",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/mer-chine-tensions",
  },
  {
    title: "Accord de paix historique au Moyen-Orient",
    category: "Moyen-Orient",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/peace-deal-middle-east",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Guerre en Ukraine : derniers développements", date: "En direct", href: "/article/ukraine-direct" },
  { title: "Élections américaines 2026 : les primaires", date: "Il y a 3 heures", href: "/article/usa-elections" },
  { title: "Sommet de l'OTAN : nouvelles stratégies de défense", date: "Il y a 6 heures", href: "/article/otan-sommet" },
  { title: "Crise humanitaire en Afrique de l'Est", date: "Il y a 8 heures", href: "/article/afrique-secheresse" },
  { title: "Forum économique mondial à Davos", date: "Hier", href: "/article/davos-forum" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Claire Moreau", title: "Éditorial : le retour de la diplomatie multilatérale", href: "/article/editorial-diplomatie" },
  { author: "Karim Benali", title: "Tribune : l'Europe face à ses responsabilités", href: "/article/tribune-europe" },
  { author: "Elena Petrova", title: "Chronique : la Chine et l'ordre mondial", href: "/article/chronique-chine" },
];

const mockEuropeArticles: HomeArticle[] = [
  {
    title: "Élections en Allemagne : le paysage politique se redessine",
    excerpt: "Après des élections historiques, les négociations pour former une coalition s'annoncent longues.",
    category: "Europe",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/allemagne-elections",
  },
  {
    title: "Sommet de l'OTAN : renforcement de la présence à l'est",
    category: "Europe",
    image: "https://images.unsplash.com/photo-1541873676-a18131494184?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/otan-sommet",
  },
  {
    title: "Crise énergétique en Europe de l'Est",
    category: "Europe",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/energie-europe",
  },
  {
    title: "Réforme migratoire : Bruxelles trouve un compromis",
    category: "Europe",
    date: "Hier",
    href: "/article/europe-migration",
  },
  {
    title: "Crise du logement en Grande-Bretagne",
    category: "Europe",
    date: "Il y a 2 jours",
    href: "/article/uk-housing",
  },
];

const mockAmericasArticles: HomeArticle[] = [
  {
    title: "Élections américaines 2026 : les primaires s'accélèrent",
    excerpt: "Les candidats multiplient les déplacements dans les États clés avant le premier scrutin.",
    category: "Amériques",
    image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/usa-primaires",
  },
  {
    title: "Négociations commerciales entre Washington et Bruxelles",
    category: "Amériques",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/us-eu-trade",
  },
  {
    title: "Crise politique au Brésil : le Congrès sous tension",
    category: "Amériques",
    image: "https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/bresil-crise",
  },
  {
    title: "Canada : le gouvernement présente son budget",
    category: "Amériques",
    date: "Il y a 2 jours",
    href: "/article/canada-budget",
  },
  {
    title: "Migration : le corridor centraméricain sous pression",
    category: "Amériques",
    date: "Il y a 2 jours",
    href: "/article/migration-centrale",
  },
];

const mockAsieArticles: HomeArticle[] = [
  {
    title: "Tensions en mer de Chine méridionale",
    excerpt: "Des incidents maritimes ravivent les craintes d'un conflit régional entre grandes puissances.",
    category: "Asie",
    image: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/mer-chine-tensions",
  },
  {
    title: "Économie chinoise : croissance en repli au deuxième trimestre",
    category: "Asie",
    image: "https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/chine-croissance",
  },
  {
    title: "Inde : élections générales, enjeux et perspectives",
    category: "Asie",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/inde-elections",
  },
  {
    title: "Corée du Nord : nouveaux tirs de missiles",
    category: "Asie",
    date: "Hier",
    href: "/article/coree-nord-missiles",
  },
  {
    title: "Japon : le gouvernement relance le nucléaire",
    category: "Asie",
    date: "Il y a 2 jours",
    href: "/article/japon-nucleaire",
  },
];

const mockAfriqueArticles: HomeArticle[] = [
  {
    title: "Crise humanitaire en Afrique de l'Est",
    excerpt: "Des millions de personnes ont besoin d'une aide urgente face à la sécheresse persistante.",
    category: "Afrique",
    image: "https://images.unsplash.com/photo-1489493887464-892be6d1daae?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/afrique-secheresse",
  },
  {
    title: "Sommet de l'Union africaine : les priorités économiques",
    category: "Afrique",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/union-africaine",
  },
  {
    title: "Sahel : la coopération régionale se renforce",
    category: "Afrique",
    image: "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/sahel-cooperation",
  },
  {
    title: "Afrique du Sud : transition énergétique en débat",
    category: "Afrique",
    date: "Il y a 2 jours",
    href: "/article/afrique-sud-energie",
  },
  {
    title: "Élections au Nigeria : un scrutin sous haute tension",
    category: "Afrique",
    date: "Il y a 2 jours",
    href: "/article/nigeria-elections",
  },
];

const mockMoyenOrientArticles: HomeArticle[] = [
  {
    title: "Accord de paix historique au Moyen-Orient",
    excerpt: "Un traité pourrait être signé après des décennies de conflit, sous l'égide des Nations unies.",
    category: "Moyen-Orient",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/peace-deal-middle-east",
  },
  {
    title: "Iran : les négociations sur le nucléaire reprennent",
    category: "Moyen-Orient",
    image: "https://images.unsplash.com/photo-1496318447583-f524534e9ce1?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/iran-nucleaire",
  },
  {
    title: "Golfe : les monarchies investissent dans la transition",
    category: "Moyen-Orient",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/golfe-transition",
  },
  {
    title: "Reconstruction : les grands chantiers de la région",
    category: "Moyen-Orient",
    date: "Il y a 2 jours",
    href: "/article/reconstruction-region",
  },
  {
    title: "Yémen : une trêve fragile mais durable",
    category: "Moyen-Orient",
    date: "Il y a 2 jours",
    href: "/article/yemen-treve",
  },
];

const mockDiplomatieArticles: HomeArticle[] = [
  {
    title: "Le retour de la diplomatie multilatérale",
    excerpt: "Après des années de repli, les grandes puissances renouent avec les enceintes internationales.",
    category: "Diplomatie",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/diplomatie-multilaterale",
  },
  {
    title: "Forum économique mondial à Davos",
    category: "Diplomatie",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/davos-forum",
  },
  {
    title: "G20 : un consensus fragile sur le climat",
    category: "Diplomatie",
    date: "Hier",
    href: "/article/g20-climat",
  },
  {
    title: "L'ONU célèbre ses 81 ans dans un monde fracturé",
    category: "Diplomatie",
    date: "Il y a 2 jours",
    href: "/article/onu-81-ans",
  },
];

const mockDefenseArticles: HomeArticle[] = [
  {
    title: "Sommet de l'OTAN : les alliés renforcent leur défense",
    excerpt: "Un renforcement de la présence militaire à l'est a été décidé lors du sommet.",
    category: "Défense",
    image: "https://images.unsplash.com/photo-1541873676-a18131494184?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/otan-sommet",
  },
  {
    title: "Course aux armements : les budgets en hausse",
    category: "Défense",
    image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/armements-budgets",
  },
  {
    title: "Cyberguerre : les infrastructures sous menace",
    category: "Défense",
    date: "Hier",
    href: "/article/cyberguerre",
  },
  {
    title: "Désarmement : les pourparlers au point mort",
    category: "Défense",
    date: "Il y a 2 jours",
    href: "/article/desarmement",
  },
];

const mockClimatArticles: HomeArticle[] = [
  {
    title: "Sommet climat : vers des mesures contraignantes",
    excerpt: "Les délégations progressent vers un accord ambitieux sur la réduction des émissions.",
    category: "Climat",
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/sommet-climat",
  },
  {
    title: "Les pays du Sud réclament plus de financements",
    category: "Climat",
    image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/climat-financements",
  },
  {
    title: "Sécheresses : des records battus sur tous les continents",
    category: "Climat",
    date: "Hier",
    href: "/article/secheresses-records",
  },
  {
    title: "Océans : l'acidification inquiète les scientifiques",
    category: "Climat",
    date: "Il y a 2 jours",
    href: "/article/oceans-acidification",
  },
];

const mockEconomieMondialeArticles: HomeArticle[] = [
  {
    title: "La croissance mondiale ralentit au deuxième trimestre",
    excerpt: "Le FMI révise ses prévisions à la baisse dans un contexte d'incertitudes géopolitiques.",
    category: "Économie mondiale",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/croissance-mondiale",
  },
  {
    title: "Inflation : les banques centrales coordonnent leur réponse",
    category: "Économie mondiale",
    image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/inflation-mondiale",
  },
  {
    title: "Chaînes d'approvisionnement : vers une reconfiguration",
    category: "Économie mondiale",
    date: "Hier",
    href: "/article/supply-chain",
  },
  {
    title: "Le dollar sous pression face à l'euro",
    category: "Économie mondiale",
    date: "Il y a 2 jours",
    href: "/article/dollar-euro",
  },
];

const mockOrganisationsArticles: HomeArticle[] = [
  {
    title: "ONU : l'appel à la trêve dans les zones de conflit",
    excerpt: "Le secrétaire général exhorte les belligérants à respecter le droit international humanitaire.",
    category: "Organisations internationales",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/onu-treve",
  },
  {
    title: "OMS : un plan mondial contre les pandémies",
    category: "Organisations internationales",
    image: "https://images.unsplash.com/photo-1584036561566-baf8f5f1b144?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/oms-pandemies",
  },
  {
    title: "OMC : les négociations commerciales reprennent",
    category: "Organisations internationales",
    date: "Hier",
    href: "/article/omc-negociations",
  },
  {
    title: "UNESCO : nouveaux sites classés au patrimoine",
    category: "Organisations internationales",
    date: "Il y a 2 jours",
    href: "/article/unesco-patrimoine",
  },
];

const mockMigrationsArticles: HomeArticle[] = [
  {
    title: "Réforme migratoire : l'Europe cherche un équilibre",
    excerpt: "Les Vingt-Sept tentent de concilier solidarité et maîtrise des frontières extérieures.",
    category: "Migrations",
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/europe-migration",
  },
  {
    title: "Corridor centraméricain : une crise qui s'aggrave",
    category: "Migrations",
    image: "https://images.unsplash.com/photo-1500835556837-99ac94a94552?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/migration-centrale",
  },
  {
    title: "Réfugiés climatiques : un statut en débat",
    category: "Migrations",
    date: "Il y a 2 jours",
    href: "/article/refugies-climat",
  },
  {
    title: "Diasporas : le rôle croissant des transferts de fonds",
    category: "Migrations",
    date: "Il y a 2 jours",
    href: "/article/diasporas-fonds",
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

export default async function MondePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getMondeArticles(locale);

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

  const europeArticles = mergeWithMock(
    homepageData?.sections?.europe?.map(articleToCardProps),
    mockEuropeArticles
  );
  const americasArticles = mergeWithMock(
    homepageData?.sections?.ameriques?.map(articleToCardProps),
    mockAmericasArticles
  );
  const asieArticles = mergeWithMock(
    homepageData?.sections?.asie?.map(articleToCardProps),
    mockAsieArticles
  );
  const afriqueArticles = mergeWithMock(
    homepageData?.sections?.afrique?.map(articleToCardProps),
    mockAfriqueArticles
  );
  const moyenOrientArticles = mergeWithMock(
    homepageData?.sections?.["moyen-orient"]?.map(articleToCardProps),
    mockMoyenOrientArticles
  );
  const diplomatieArticles = mergeWithMock(
    homepageData?.sections?.diplomatie?.map(articleToCardProps),
    mockDiplomatieArticles
  );
  const defenseArticles = mergeWithMock(
    homepageData?.sections?.defense?.map(articleToCardProps),
    mockDefenseArticles
  );
  const climatArticles = mergeWithMock(
    homepageData?.sections?.climat?.map(articleToCardProps),
    mockClimatArticles
  );
  const economieMondialeArticles = mergeWithMock(
    homepageData?.sections?.["economie-mondiale"]?.map(articleToCardProps),
    mockEconomieMondialeArticles
  );
  const organisationsArticles = mergeWithMock(
    homepageData?.sections?.["organisations-internationales"]?.map(articleToCardProps),
    mockOrganisationsArticles
  );
  const migrationsArticles = mergeWithMock(
    homepageData?.sections?.migrations?.map(articleToCardProps),
    mockMigrationsArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité internationale du jour
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
              <SectionBlock title="Europe" href="/monde" articles={europeArticles} locale={locale} />
              <SectionBlock title="Amériques" href="/monde" articles={americasArticles} locale={locale} />
              <SectionBlock title="Asie" href="/monde" articles={asieArticles} locale={locale} />
              <SectionBlock title="Afrique" href="/monde" articles={afriqueArticles} locale={locale} />
              <SectionBlock title="Moyen-Orient" href="/monde" articles={moyenOrientArticles} locale={locale} />
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
                  L&apos;international, décrypté chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur la scène internationale, chaque matin.
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
                    ["Cartes", "/cartes"],
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
                <h2 className="mt-1 font-serif text-3xl font-bold">Le monde en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Diplomatie" href="/monde" articles={diplomatieArticles} locale={locale} />
              <SectionBlock title="Défense" href="/monde" articles={defenseArticles} locale={locale} />
              <SectionBlock title="Climat" href="/environnement" articles={climatArticles} locale={locale} />
              <SectionBlock title="Économie mondiale" href="/economie" articles={economieMondialeArticles} locale={locale} />
              <SectionBlock title="Organisations internationales" href="/monde" articles={organisationsArticles} locale={locale} />
              <SectionBlock title="Migrations" href="/monde" articles={migrationsArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              Le monde, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : enquêtes, décryptages et analyses de la scène internationale, disponible dès 7 h.
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
