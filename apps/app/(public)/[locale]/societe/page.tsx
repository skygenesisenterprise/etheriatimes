import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "Retraites : le Conseil constitutionnel rend sa décision dans l'après-midi",
    time: "Il y a 5 min",
    href: "/article/reforme-retraites",
  },
  {
    id: "2",
    title: "Emploi : les chiffres du chômage publiés, baisse inattendue",
    time: "Il y a 16 min",
    href: "/article/chomage-chiffres",
  },
  {
    id: "3",
    title: "Éducation : la réforme des programmes présentée",
    time: "Il y a 29 min",
    href: "/article/reforme-programmes",
  },
  {
    id: "4",
    title: "Santé mentale : lancement d'une campagne nationale",
    time: "Il y a 43 min",
    href: "/article/sante-mentale",
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

async function getSocieteArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Société",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=250&fit=crop",
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
  title: "Réforme des retraites : le Conseil constitutionnel se prononce",
  excerpt:
    "Les Sages doivent décider de la conformité de la dernière version du texte avec la Constitution. Décryptage des enjeux et des scénarios possibles.",
  category: "Société",
  image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/reforme-retraites",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "Logement : nouvelle aide pour les locataires",
    category: "Logement",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/aide-logement",
  },
  {
    title: "Université : record d'inscriptions cette année",
    category: "Éducation",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/universite-inscriptions",
  },
  {
    title: "Chômage : les chiffres du mois publiés",
    category: "Emploi",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/chomage-chiffres",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Réforme des retraites : le Conseil se prononce", date: "Il y a 1 heure", href: "/article/reforme-retraites" },
  { title: "Salaire minimum : vers une nouvelle hausse", date: "Hier", href: "/article/smic-hausse" },
  { title: "Procès historique : le verdict est tombé", date: "Il y a 6 heures", href: "/article/proces-verdict" },
  { title: "Santé mentale : campagne de prévention", date: "Hier", href: "/article/sante-mentale" },
  { title: "Handicap : accessibilité des transports", date: "Il y a 2 jours", href: "/article/handicap-transports" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Nadia Cherif", title: "Éditorial : le logement, urgence nationale", href: "/article/editorial-logement" },
  { author: "Paul Aubert", title: "Tribune : l'école de la confiance à reconstruire", href: "/article/tribune-ecole" },
  { author: "Léa Rousseau", title: "Chronique : soigner la santé mentale des jeunes", href: "/article/chronique-sante-mentale" },
];

const mockEducationArticles: HomeArticle[] = [
  {
    title: "Université : record d'inscriptions cette année",
    excerpt: "Les établissements français attirent toujours plus d'étudiants, une dynamique qui interroge sur les moyens.",
    category: "Éducation",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/universite-inscriptions",
  },
  {
    title: "La réforme des programmes présentée",
    category: "Éducation",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/reforme-programmes",
  },
  {
    title: "Rentrée scolaire : le casse-tête du recrutement",
    category: "Éducation",
    image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/recrutement-enseignants",
  },
  {
    title: "Bourses étudiantes : les nouvelles aides annoncées",
    category: "Éducation",
    date: "Il y a 2 jours",
    href: "/article/bourses-etudiantes",
  },
  {
    title: "Orientation post-bac : les filières les plus demandées",
    category: "Éducation",
    date: "Il y a 2 jours",
    href: "/article/orientation-bac",
  },
];

const mockEmploiArticles: HomeArticle[] = [
  {
    title: "Chômage : les chiffres du mois publiés",
    excerpt: "Une baisse inattendue encourageante pour le marché de l'emploi, portée par les services.",
    category: "Emploi",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/chomage-chiffres",
  },
  {
    title: "Salaire minimum : vers une nouvelle hausse",
    category: "Emploi",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/smic-hausse",
  },
  {
    title: "Les métiers qui recrutent en 2026",
    category: "Emploi",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/metiers-recrutent",
  },
  {
    title: "Télétravail : les nouvelles règles en vigueur",
    category: "Emploi",
    date: "Il y a 2 jours",
    href: "/article/teletravail-regles",
  },
  {
    title: "Reconversion : le boom des formations courtes",
    category: "Emploi",
    date: "Il y a 2 jours",
    href: "/article/reconversion-formations",
  },
];

const mockJusticeArticles: HomeArticle[] = [
  {
    title: "Procès historique : le verdict est tombé",
    excerpt: "Une décision de justice qui fait date dans la jurisprudence française.",
    category: "Justice",
    image: "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/proces-verdict",
  },
  {
    title: "Réforme de la justice : les mesures détaillées",
    category: "Justice",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/reforme-justice",
  },
  {
    title: "Prud'hommes : la charge de travail explose",
    category: "Justice",
    image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/prudhommes",
  },
  {
    title: "Violences intrafamiliales : des moyens renforcés",
    category: "Justice",
    date: "Il y a 2 jours",
    href: "/article/violences-intrafamiliales",
  },
  {
    title: "Détention : les conditions de vie en question",
    category: "Justice",
    date: "Il y a 2 jours",
    href: "/article/conditions-detention",
  },
];

const mockSanteArticles: HomeArticle[] = [
  {
    title: "Santé mentale : campagne nationale de prévention",
    excerpt: "Les pouvoirs publics veulent déstigmatiser les troubles psychologiques.",
    category: "Santé",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/sante-mentale",
  },
  {
    title: "Hôpital : le plan de recrutement dévoilé",
    category: "Santé",
    image: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/hopital-recrutement",
  },
  {
    title: "Déserts médicaux : les nouvelles mesures",
    category: "Santé",
    image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/deserts-medicaux",
  },
  {
    title: "Prévention : le dépistage généralisé en débat",
    category: "Santé",
    date: "Il y a 2 jours",
    href: "/article/depistage-generalise",
  },
  {
    title: "Jeunes : l'addiction aux écrans inquiète",
    category: "Santé",
    date: "Il y a 2 jours",
    href: "/article/addiction-ecrans",
  },
];

const mockVieQuotidienneArticles: HomeArticle[] = [
  {
    title: "Pouvoir d'achat : les ménages sous pression",
    excerpt: "Entre inflation et hausse des tarifs, le quotidien des familles se complique.",
    category: "Vie quotidienne",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/pouvoir-achat-menages",
  },
  {
    title: "Transports : la gratuité expérimentée dans de nouvelles villes",
    category: "Vie quotidienne",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/transports-gratuite",
  },
  {
    title: "Alimentation : l'essor des circuits courts",
    category: "Vie quotidienne",
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/circuits-courts",
  },
  {
    title: "Consommation : le retour des achats de proximité",
    category: "Vie quotidienne",
    date: "Il y a 2 jours",
    href: "/article/achats-proximite",
  },
  {
    title: "Services publics : les délais qui s'allongent",
    category: "Vie quotidienne",
    date: "Il y a 2 jours",
    href: "/article/services-publics",
  },
];

const mockLogementArticles: HomeArticle[] = [
  {
    title: "Logement : nouvelle aide pour les locataires",
    excerpt: "Le gouvernement annonce un dispositif pour faciliter l'accès au parc privé.",
    category: "Logement",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/aide-logement",
  },
  {
    title: "Logement : le plan gouvernemental présenté",
    category: "Logement",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/logement-plan",
  },
  {
    title: "Encadrement des loyers : le bilan contesté",
    category: "Logement",
    date: "Hier",
    href: "/article/loyers-encadrement",
  },
  {
    title: "Construction : le retour du logement social",
    category: "Logement",
    date: "Il y a 2 jours",
    href: "/article/logement-social",
  },
];

const mockFamilleArticles: HomeArticle[] = [
  {
    title: "Enfants : nouvelle politique familiale",
    excerpt: "Des mesures pour soutenir les familles nombreuses et la petite enfance.",
    category: "Famille",
    image: "https://images.unsplash.com/photo-1476703993599-0035a21b17a9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/famille-politique",
  },
  {
    title: "Congé parental : la réforme se précise",
    category: "Famille",
    image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/conge-parental",
  },
  {
    title: "Modes de garde : les places manquent toujours",
    category: "Famille",
    date: "Il y a 2 jours",
    href: "/article/modes-garde",
  },
  {
    title: "Aînés : l'isolement au cœur des préoccupations",
    category: "Famille",
    date: "Il y a 2 jours",
    href: "/article/isolement-aines",
  },
];

const mockInclusionArticles: HomeArticle[] = [
  {
    title: "Handicap : accessibilité des transports",
    excerpt: "Un plan d'investissement pour améliorer la situation dans les grandes agglomérations.",
    category: "Handicap et inclusion",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/handicap-transports",
  },
  {
    title: "École inclusive : les accompagnants en renfort",
    category: "Handicap et inclusion",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/ecole-inclusive",
  },
  {
    title: "Emploi des personnes handicapées : objectifs relevés",
    category: "Handicap et inclusion",
    date: "Hier",
    href: "/article/emploi-handicap",
  },
  {
    title: "Accessibilité numérique : les sites sommés de se mettre à niveau",
    category: "Handicap et inclusion",
    date: "Il y a 2 jours",
    href: "/article/accessibilite-numerique",
  },
];

const mockSolidariteArticles: HomeArticle[] = [
  {
    title: "Solidarité : les nouvelles initiatives locales",
    excerpt: "Les associations locales se mobilisent pour aider les plus démunis.",
    category: "Solidarité",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/initiatives-solidaires",
  },
  {
    title: "Banques alimentaires : la demande explose",
    category: "Solidarité",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/banques-alimentaires",
  },
  {
    title: "Bénévolat : la nouvelle génération s'engage",
    category: "Solidarité",
    date: "Hier",
    href: "/article/benevolat-jeunes",
  },
  {
    title: "Grande précarité : l'urgence d'un plan d'ensemble",
    category: "Solidarité",
    date: "Il y a 2 jours",
    href: "/article/grande-precarite",
  },
];

const mockDebatsSocieteArticles: HomeArticle[] = [
  {
    title: "Fin de vie : le débat relancé à l'Assemblée",
    excerpt: "Les parlementaires examinent un texte très attendu par les associations.",
    category: "Débats de société",
    image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/fin-de-vie",
  },
  {
    title: "Laïcité et école : un équilibre à trouver",
    category: "Débats de société",
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/laicite-ecole",
  },
  {
    title: "Numérique : protéger les mineurs en ligne",
    category: "Débats de société",
    date: "Il y a 2 jours",
    href: "/article/mineurs-numerique",
  },
  {
    title: "Bioéthique : les nouvelles frontières du soin",
    category: "Débats de société",
    date: "Il y a 2 jours",
    href: "/article/bioethique",
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

export default async function SocietePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getSocieteArticles(locale);

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

  const educationArticles = mergeWithMock(
    homepageData?.sections?.education?.map(articleToCardProps),
    mockEducationArticles
  );
  const emploiArticles = mergeWithMock(
    homepageData?.sections?.emploi?.map(articleToCardProps),
    mockEmploiArticles
  );
  const justiceArticles = mergeWithMock(
    homepageData?.sections?.justice?.map(articleToCardProps),
    mockJusticeArticles
  );
  const santeArticles = mergeWithMock(
    homepageData?.sections?.sante?.map(articleToCardProps),
    mockSanteArticles
  );
  const vieQuotidienneArticles = mergeWithMock(
    homepageData?.sections?.["vie-quotidienne"]?.map(articleToCardProps),
    mockVieQuotidienneArticles
  );
  const logementArticles = mergeWithMock(
    homepageData?.sections?.logement?.map(articleToCardProps),
    mockLogementArticles
  );
  const familleArticles = mergeWithMock(
    homepageData?.sections?.famille?.map(articleToCardProps),
    mockFamilleArticles
  );
  const inclusionArticles = mergeWithMock(
    homepageData?.sections?.["handicap-inclusion"]?.map(articleToCardProps),
    mockInclusionArticles
  );
  const solidariteArticles = mergeWithMock(
    homepageData?.sections?.solidarite?.map(articleToCardProps),
    mockSolidariteArticles
  );
  const debatsSocieteArticles = mergeWithMock(
    homepageData?.sections?.["debats-societe"]?.map(articleToCardProps),
    mockDebatsSocieteArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité de la société
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
              <SectionBlock title="Éducation" href="/societe" articles={educationArticles} locale={locale} />
              <SectionBlock title="Emploi" href="/societe" articles={emploiArticles} locale={locale} />
              <SectionBlock title="Justice" href="/societe" articles={justiceArticles} locale={locale} />
              <SectionBlock title="Santé" href="/societe" articles={santeArticles} locale={locale} />
              <SectionBlock title="Vie quotidienne" href="/societe" articles={vieQuotidienneArticles} locale={locale} />
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
                  La société, décryptée chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur la vie quotidienne, chaque matin.
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
                    ["Podcasts", "/podcasts"],
                    ["Vidéos", "/videos"],
                    ["Témoignages", "/temoignages"],
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
                <h2 className="mt-1 font-serif text-3xl font-bold">La société en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Logement" href="/societe" articles={logementArticles} locale={locale} />
              <SectionBlock title="Famille" href="/societe" articles={familleArticles} locale={locale} />
              <SectionBlock title="Handicap et inclusion" href="/societe" articles={inclusionArticles} locale={locale} />
              <SectionBlock title="Solidarité" href="/societe" articles={solidariteArticles} locale={locale} />
              <SectionBlock title="Débats de société" href="/societe" articles={debatsSocieteArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              La société, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : enquêtes, décryptages et analyses de la vie quotidienne, disponible dès 7 h.
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
