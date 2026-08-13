import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "CAC 40 : la Bourse de Paris franchit les 8 000 points",
    time: "Il y a 5 min",
    href: "/article/bourse-8000",
  },
  {
    id: "2",
    title: "BCE : les taux maintenus, le marché salue la décision",
    time: "Il y a 13 min",
    href: "/article/bce-taux",
  },
  {
    id: "3",
    title: "Inflation : le taux chute à 2,1 % en mars",
    time: "Il y a 27 min",
    href: "/article/inflation-2-1",
  },
  {
    id: "4",
    title: "Emploi : le chômage recule à 6,8 %",
    time: "Il y a 41 min",
    href: "/article/emploi-chomage",
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

async function getEconomieArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Économie",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
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
  title: "La Bourse de Paris dépasse les 8 000 points pour la première fois",
  excerpt:
    "Les marchés actions européens enregistrent des gains significatifs suite aux décisions de la BCE. Décryptage d'une séance historique.",
  category: "Marchés",
  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/bourse-8000",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "Inflation : le taux chute à 2,1 % en mars",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/inflation-2-1",
  },
  {
    title: "Emploi : le chômage recule à 6,8 %",
    category: "Économie réelle",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/emploi-chomage",
  },
  {
    title: "La BCE maintient ses taux directeurs",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/bce-taux",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "CAC 40 : un nouveau record historique", date: "Il y a 1 heure", href: "/article/cac40-record" },
  { title: "Immobilier : les signes d'une reprise", date: "Il y a 3 heures", href: "/article/immobilier-reprise" },
  { title: "Consommation : les dépenses progressent", date: "Hier", href: "/article/consommation-q1" },
  { title: "L'euro se renforce face au dollar", date: "Hier", href: "/article/euro-dollar" },
  { title: "Ventes au détail : des chiffres meilleurs que prévu", date: "Il y a 2 jours", href: "/article/ventes-detail" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Julien Arnaud", title: "Éditorial : la fin de l'inflation, vraiment ?", href: "/article/editorial-inflation" },
  { author: "Camille Dupuis", title: "Tribune : réindustrialiser sans se ruiner", href: "/article/tribune-reindustrialisation" },
  { author: "Marc Lefebvre", title: "Chronique : la finance verte à l'épreuve", href: "/article/chronique-finance-verte" },
];

const mockMarchesArticles: HomeArticle[] = [
  {
    title: "La Bourse de Paris dépasse les 8 000 points",
    excerpt: "Les marchés actions européens enregistrent des gains significatifs suite aux décisions de la BCE.",
    category: "Marchés",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/bourse-8000",
  },
  {
    title: "Wall Street : les indices au plus haut",
    category: "Marchés",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/wall-street-haut",
  },
  {
    title: "L'euro se renforce face au dollar",
    category: "Marchés",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/euro-dollar",
  },
  {
    title: "Matières premières : le pétrole recule",
    category: "Marchés",
    date: "Hier",
    href: "/article/petrole-recule",
  },
  {
    title: "Obligations : les rendements se détendent",
    category: "Marchés",
    date: "Il y a 2 jours",
    href: "/article/obligations-rendements",
  },
];

const mockEntreprisesArticles: HomeArticle[] = [
  {
    title: "Un géant de la tech annonce 2 000 embauches en France",
    excerpt: "Un investissement majeur qui confirme l'attractivité de la France pour les entreprises technologiques.",
    category: "Entreprises",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/tech-emploi",
  },
  {
    title: "Un plan de soutien aux PME annoncé",
    category: "Entreprises",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/pme-soutien",
  },
  {
    title: "Les start-ups françaises lèvent des fonds record",
    category: "Entreprises",
    image: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/startups-levees",
  },
  {
    title: "Industrie : les carnets de commandes se remplissent",
    category: "Entreprises",
    date: "Hier",
    href: "/article/industrie-commandes",
  },
  {
    title: "Retail : la grande distribution se réinvente",
    category: "Entreprises",
    date: "Il y a 2 jours",
    href: "/article/retail-reinvention",
  },
];

const mockFinanceArticles: HomeArticle[] = [
  {
    title: "Inflation : le taux chute à 2,1 % en mars",
    excerpt: "Bonne nouvelle pour les ménages qui voient leur pouvoir d'achat s'améliorer.",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/inflation-2-1",
  },
  {
    title: "La BCE maintient ses taux directeurs",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/bce-taux",
  },
  {
    title: "Banques : des résultats au-dessus des attentes",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/banques-resultats",
  },
  {
    title: "Épargne : le Livret A fait le plein",
    category: "Finance",
    date: "Hier",
    href: "/article/livret-a",
  },
  {
    title: "Cryptomonnaies : un cadre européen se met en place",
    category: "Finance",
    date: "Il y a 2 jours",
    href: "/article/crypto-cadre",
  },
];

const mockEconomieReelleArticles: HomeArticle[] = [
  {
    title: "Emploi : le chômage recule à 6,8 %",
    excerpt: "Le marché de l'emploi continue de s'améliorer avec la création de 45 000 emplois.",
    category: "Économie réelle",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/emploi-chomage",
  },
  {
    title: "Croissance : les prévisions revues à la hausse",
    category: "Économie réelle",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/croissance-2026",
  },
  {
    title: "Pouvoir d'achat : les salaires suivent l'inflation",
    category: "Économie réelle",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/salaires-inflation",
  },
  {
    title: "Investissement : les entreprises confiantes",
    category: "Économie réelle",
    date: "Il y a 2 jours",
    href: "/article/investissement-entreprises",
  },
  {
    title: "Secteur public : les finances sous contrôle",
    category: "Économie réelle",
    date: "Il y a 2 jours",
    href: "/article/finances-publiques",
  },
];

const mockInternationalArticles: HomeArticle[] = [
  {
    title: "Commerce : les négociations reprennent avec la Chine",
    excerpt: "Les discussions commerciales reprennent pour un accord bilatéral ambitieux.",
    category: "International",
    image: "https://images.unsplash.com/photo-1434626881859-194d67b2b86f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/chine-negociations",
  },
  {
    title: "FMI : la croissance mondiale ralentit",
    category: "International",
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/fmi-croissance",
  },
  {
    title: "Échanges transatlantiques : un nouvel élan",
    category: "International",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/us-eu-trade",
  },
  {
    title: "Chaînes d'approvisionnement : la reconfiguration",
    category: "International",
    date: "Il y a 2 jours",
    href: "/article/supply-chain",
  },
  {
    title: "Émergents : les marchés qui résistent",
    category: "International",
    date: "Il y a 2 jours",
    href: "/article/marches-emergents",
  },
];

const mockBanquesArticles: HomeArticle[] = [
  {
    title: "Banques : des résultats au-dessus des attentes",
    excerpt: "Les grandes banques françaises publient des résultats trimestriels solides.",
    category: "Banques",
    image: "https://images.unsplash.com/photo-1565514158740-064f34bd6cfd?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/banques-resultats",
  },
  {
    title: "Crédit immobilier : les taux se stabilisent",
    category: "Banques",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/credit-immobilier",
  },
  {
    title: "Banque en ligne : la concurrence s'intensifie",
    category: "Banques",
    date: "Il y a 2 jours",
    href: "/article/banque-en-ligne",
  },
  {
    title: "Épargne réglementée : les rendements en question",
    category: "Banques",
    date: "Il y a 2 jours",
    href: "/article/epargne-reglementee",
  },
];

const mockImmobilierArticles: HomeArticle[] = [
  {
    title: "Immobilier : les signes d'une reprise",
    excerpt: "Les prix se stabilisent et les volumes de transactions repartent à la hausse.",
    category: "Immobilier",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/immobilier-reprise",
  },
  {
    title: "Logement neuf : les mises en chantier redémarrent",
    category: "Immobilier",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/logement-neuf",
  },
  {
    title: "Bureaux : le marché s'adapte au télétravail",
    category: "Immobilier",
    date: "Hier",
    href: "/article/bureaux-teletravail",
  },
  {
    title: "Investissement locatif : le retour en grâce",
    category: "Immobilier",
    date: "Il y a 2 jours",
    href: "/article/investissement-locatif",
  },
];

const mockConsommationArticles: HomeArticle[] = [
  {
    title: "Consommation : les dépenses progressent",
    excerpt: "Les ménages retrouvent le chemin des magasins après des mois d'attentisme.",
    category: "Consommation",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/consommation-q1",
  },
  {
    title: "Ventes au détail : des chiffres meilleurs que prévu",
    category: "Consommation",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/ventes-detail",
  },
  {
    title: "E-commerce : la croissance se poursuit",
    category: "Consommation",
    date: "Hier",
    href: "/article/ecommerce-croissance",
  },
  {
    title: "Marques : le made in France séduit",
    category: "Consommation",
    date: "Il y a 2 jours",
    href: "/article/made-in-france",
  },
];

const mockEnergieArticles: HomeArticle[] = [
  {
    title: "Énergie : les prix du gaz se replient",
    excerpt: "Une accalmie sur les marchés qui soulage ménages et entreprises.",
    category: "Énergie",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/gaz-repli",
  },
  {
    title: "Électricité : la facture se stabilise",
    category: "Énergie",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/electricite-facture",
  },
  {
    title: "Renouvelables : les investissements décollent",
    category: "Énergie",
    date: "Il y a 2 jours",
    href: "/article/renouvelables-investissements",
  },
  {
    title: "Nucléaire : le calendrier de relance confirmé",
    category: "Énergie",
    date: "Il y a 2 jours",
    href: "/article/nucleaire-relance",
  },
];

const mockTechArticles: HomeArticle[] = [
  {
    title: "Tech : un géant investit massivement en France",
    excerpt: "Un investissement majeur qui confirme l'attractivité de la France pour les entreprises technologiques.",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/tech-emploi",
  },
  {
    title: "Intelligence artificielle : la course aux talents",
    category: "Tech",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/ia-talents",
  },
  {
    title: "Semi-conducteurs : l'Europe veut sa part",
    category: "Tech",
    date: "Hier",
    href: "/article/semi-conducteurs-europe",
  },
  {
    title: "Licornes françaises : la nouvelle vague",
    category: "Tech",
    date: "Il y a 2 jours",
    href: "/article/licornes-francaises",
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

export default async function EconomiePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getEconomieArticles(locale);

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

  const marchesArticles = mergeWithMock(
    homepageData?.sections?.marches?.map(articleToCardProps),
    mockMarchesArticles
  );
  const entreprisesArticles = mergeWithMock(
    homepageData?.sections?.entreprises?.map(articleToCardProps),
    mockEntreprisesArticles
  );
  const financeArticles = mergeWithMock(
    homepageData?.sections?.finance?.map(articleToCardProps),
    mockFinanceArticles
  );
  const economieReelleArticles = mergeWithMock(
    homepageData?.sections?.["economie-reelle"]?.map(articleToCardProps),
    mockEconomieReelleArticles
  );
  const internationalArticles = mergeWithMock(
    homepageData?.sections?.international?.map(articleToCardProps),
    mockInternationalArticles
  );
  const banquesArticles = mergeWithMock(
    homepageData?.sections?.banques?.map(articleToCardProps),
    mockBanquesArticles
  );
  const immobilierArticles = mergeWithMock(
    homepageData?.sections?.immobilier?.map(articleToCardProps),
    mockImmobilierArticles
  );
  const consommationArticles = mergeWithMock(
    homepageData?.sections?.consommation?.map(articleToCardProps),
    mockConsommationArticles
  );
  const energieArticles = mergeWithMock(
    homepageData?.sections?.energie?.map(articleToCardProps),
    mockEnergieArticles
  );
  const techArticles = mergeWithMock(
    homepageData?.sections?.tech?.map(articleToCardProps),
    mockTechArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité économique du jour
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
              <SectionBlock title="Marchés" href="/economie" articles={marchesArticles} locale={locale} />
              <SectionBlock title="Entreprises" href="/economie" articles={entreprisesArticles} locale={locale} />
              <SectionBlock title="Finance" href="/economie" articles={financeArticles} locale={locale} />
              <SectionBlock title="Économie réelle" href="/economie" articles={economieReelleArticles} locale={locale} />
              <SectionBlock title="International" href="/economie" articles={internationalArticles} locale={locale} />
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
                  L&apos;économie, décryptée chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur les marchés et l&apos;économie, chaque matin.
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
                <h2 className="mt-1 font-serif text-3xl font-bold">L&apos;économie en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Banques" href="/economie" articles={banquesArticles} locale={locale} />
              <SectionBlock title="Immobilier" href="/economie" articles={immobilierArticles} locale={locale} />
              <SectionBlock title="Consommation" href="/economie" articles={consommationArticles} locale={locale} />
              <SectionBlock title="Énergie" href="/economie" articles={energieArticles} locale={locale} />
              <SectionBlock title="Tech" href="/economie" articles={techArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              L&apos;économie, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : enquêtes, décryptages et analyses économiques, disponible dès 7 h.
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
