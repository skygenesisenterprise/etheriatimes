import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "COP31 : la France accueillera le prochain sommet climatique à Marseille",
    time: "Il y a 5 min",
    href: "/article/cop31-france",
  },
  {
    id: "2",
    title: "Climat : 2026 en passe de devenir l'année la plus chaude jamais enregistrée",
    time: "Il y a 16 min",
    href: "/article/record-chaleur",
  },
  {
    id: "3",
    title: "Énergie solaire : record de production en France",
    time: "Il y a 29 min",
    href: "/article/record-solaire",
  },
  {
    id: "4",
    title: "Océans : une aire marine protégée majeure créée dans le Pacifique",
    time: "Il y a 42 min",
    href: "/article/aire-marine",
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

async function getEnvironnementArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Environnement",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=400&h=250&fit=crop",
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
  title: "COP31 : la France accueillera le sommet climatique",
  excerpt:
    "Le pays s'engage à organiser la prochaine conférence mondiale sur le climat à Marseille. Décryptage des enjeux et du calendrier.",
  category: "Climat",
  image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/cop31-france",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "Réchauffement climatique : nouveaux records battus",
    category: "Climat",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/record-chaleur",
  },
  {
    title: "Océans : une aire marine protégée majeure créée",
    category: "Biodiversité",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/aire-marine",
  },
  {
    title: "Énergie solaire : record de production en France",
    category: "Énergie",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/record-solaire",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Réchauffement : nouveaux records battus", date: "Il y a 2 heures", href: "/article/record-chaleur" },
  { title: "Forêts : plantation record en France", date: "Hier", href: "/article/plantation-arbres" },
  { title: "Glaciers : un recul de 3 mètres", date: "Hier", href: "/article/glaciers-recul" },
  { title: "Qualité de l'air : les villes s'améliorent", date: "Il y a 6 heures", href: "/article/qualite-air" },
  { title: "Espèces menacées : le bilan du WWF", date: "Il y a 2 jours", href: "/article/wwf-bilan" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Aude Lambert", title: "Éditorial : le climat n'attend pas", href: "/article/editorial-climat" },
  { author: "Théo Garnier", title: "Tribune : pour une écologie du quotidien", href: "/article/tribune-ecologie" },
  { author: "Inès Morel", title: "Chronique : réparer la nature, un pari réaliste", href: "/article/chronique-nature" },
];

const mockClimatArticles: HomeArticle[] = [
  {
    title: "Réchauffement climatique : nouveaux records battus",
    excerpt: "2026 sera probablement l'année la plus chaude jamais enregistrée sur la planète.",
    category: "Climat",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/record-chaleur",
  },
  {
    title: "Montagne : les glaciers reculent de 3 mètres",
    category: "Climat",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/glaciers-recul",
  },
  {
    title: "Les objectifs de réduction atteints",
    category: "Climat",
    image: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/climat-objectifs",
  },
  {
    title: "Sécheresses : des records battus sur tous les continents",
    category: "Climat",
    date: "Il y a 2 jours",
    href: "/article/secheresses-records",
  },
  {
    title: "Adaptation : les villes face aux canicules",
    category: "Climat",
    date: "Il y a 2 jours",
    href: "/article/villes-canicules",
  },
];

const mockBiodiversiteArticles: HomeArticle[] = [
  {
    title: "Océans : une aire marine protégée majeure créée",
    excerpt: "Un sanctuaire de la taille de l'Espagne voit le jour dans le Pacifique.",
    category: "Biodiversité",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/aire-marine",
  },
  {
    title: "Forêts : plantation record en France",
    category: "Biodiversité",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/plantation-arbres",
  },
  {
    title: "Espèces menacées : bilan annuel du WWF",
    category: "Biodiversité",
    image: "https://images.unsplash.com/photo-1474511320723-9a56873571b7?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/wwf-bilan",
  },
  {
    title: "Nouvelles aires protégées sur le territoire",
    category: "Biodiversité",
    date: "Hier",
    href: "/article/biodiversite-protected",
  },
  {
    title: "Pollinisateurs : un plan national de sauvegarde",
    category: "Biodiversité",
    date: "Il y a 2 jours",
    href: "/article/pollinisateurs",
  },
];

const mockEnergieArticles: HomeArticle[] = [
  {
    title: "Énergie solaire : record de production en France",
    excerpt: "Les panneaux photovoltaïques couvrent désormais 20 % des besoins électriques du pays.",
    category: "Énergie",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/record-solaire",
  },
  {
    title: "Énergie renouvelable : record de production",
    category: "Énergie",
    image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/energie-record",
  },
  {
    title: "Éolien en mer : les nouveaux parcs entrent en service",
    category: "Énergie",
    image: "https://images.unsplash.com/photo-1548337138-e87d889cc369?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/eolien-mer",
  },
  {
    title: "Rénovation énergétique : le rythme s'accélère",
    category: "Énergie",
    date: "Hier",
    href: "/article/renovation-energetique",
  },
  {
    title: "Sobriété : les gestes qui changent la donne",
    category: "Énergie",
    date: "Il y a 2 jours",
    href: "/article/sobriete-energetique",
  },
];

const mockPollutionArticles: HomeArticle[] = [
  {
    title: "Qualité de l'air : les grandes villes s'améliorent",
    excerpt: "Les politiques anti-pollution portent leurs fruits dans les métropoles françaises.",
    category: "Pollution",
    image: "https://images.unsplash.com/photo-1570641973670-ca4f0f64d3dc?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/qualite-air",
  },
  {
    title: "Plastique : la chasse aux emballages jetables",
    category: "Pollution",
    image: "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/plastique-jetable",
  },
  {
    title: "Zones à faibles émissions : le bilan",
    category: "Pollution",
    image: "https://images.unsplash.com/photo-1494522358652-f30e61a60313?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/zfe-bilan",
  },
  {
    title: "Médicaments dans l'eau : une pollution émergente",
    category: "Pollution",
    date: "Il y a 2 jours",
    href: "/article/medicaments-eau",
  },
  {
    title: "Pesticides : la sortie progressive se confirme",
    category: "Pollution",
    date: "Il y a 2 jours",
    href: "/article/pesticides-sortie",
  },
];

const mockDeveloppementDurableArticles: HomeArticle[] = [
  {
    title: "Recyclage : le déploiement des nouvelles poubelles",
    excerpt: "La généralisation du tri sélectif s'accélère sur l'ensemble du territoire.",
    category: "Développement durable",
    image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/recyclage-poubelles",
  },
  {
    title: "Recyclage : les nouvelles normes",
    category: "Développement durable",
    image: "https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/recyclage-normes",
  },
  {
    title: "Économie circulaire : les entreprises s'y mettent",
    category: "Développement durable",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/economie-circulaire",
  },
  {
    title: "Mobilité douce : les pistes cyclables se multiplient",
    category: "Développement durable",
    date: "Il y a 2 jours",
    href: "/article/mobilite-douce",
  },
  {
    title: "Consommation responsable : le virage des labels",
    category: "Développement durable",
    date: "Il y a 2 jours",
    href: "/article/labels-responsables",
  },
];

const mockOceansArticles: HomeArticle[] = [
  {
    title: "Océans : une aire marine protégée majeure créée",
    excerpt: "Un sanctuaire de la taille de l'Espagne voit le jour dans le Pacifique.",
    category: "Océans",
    image: "https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/aire-marine",
  },
  {
    title: "Acidification : les scientifiques inquiets",
    category: "Océans",
    image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/oceans-acidification",
  },
  {
    title: "Pêche durable : les quotas révisés",
    category: "Océans",
    date: "Hier",
    href: "/article/peche-durable",
  },
  {
    title: "Coraux : les récifs sous surveillance",
    category: "Océans",
    date: "Il y a 2 jours",
    href: "/article/coraux-surveillance",
  },
];

const mockForetsArticles: HomeArticle[] = [
  {
    title: "Forêts : plantation record en France",
    excerpt: "Plus de 50 millions d'arbres plantés cette année dans l'Hexagone.",
    category: "Forêts",
    image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/plantation-arbres",
  },
  {
    title: "Incendies : les moyens de prévention renforcés",
    category: "Forêts",
    image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/incendies-prevention",
  },
  {
    title: "Bois construction : la filière en plein essor",
    category: "Forêts",
    date: "Il y a 2 jours",
    href: "/article/bois-construction",
  },
  {
    title: "Forêts anciennes : un patrimoine à préserver",
    category: "Forêts",
    date: "Il y a 2 jours",
    href: "/article/forets-anciennes",
  },
];

const mockMontagneArticles: HomeArticle[] = [
  {
    title: "Montagne : les glaciers reculent de 3 mètres",
    excerpt: "Le changement climatique transforme durablement les sommets alpins.",
    category: "Montagne",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/glaciers-recul",
  },
  {
    title: "Tourisme : les stations face à la neige rare",
    category: "Montagne",
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/stations-neige",
  },
  {
    title: "Faune alpine : le bouquetin fait son retour",
    category: "Montagne",
    date: "Il y a 2 jours",
    href: "/article/bouquetin-retour",
  },
  {
    title: "Permafrost : les risques sous surveillance",
    category: "Montagne",
    date: "Il y a 2 jours",
    href: "/article/permafrost-risques",
  },
];

const mockAgricultureArticles: HomeArticle[] = [
  {
    title: "Agriculture : la transition écologique s'accélère",
    excerpt: "Exploitations et coopératives adoptent de nouvelles pratiques plus respectueuses des sols.",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/agriculture-transition",
  },
  {
    title: "Bio : la demande continue de progresser",
    category: "Agriculture",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/bio-demande",
  },
  {
    title: "Eau : l'irrigation repensée face aux sécheresses",
    category: "Agriculture",
    date: "Il y a 2 jours",
    href: "/article/irrigation-secheresse",
  },
  {
    title: "Agroforesterie : un modèle qui séduit",
    category: "Agriculture",
    date: "Il y a 2 jours",
    href: "/article/agroforesterie",
  },
];

const mockVilleDurableArticles: HomeArticle[] = [
  {
    title: "Ville durable : les métropoles verdissent",
    excerpt: "Toits végétalisés, trames vertes : les grandes villes accélèrent leur transformation.",
    category: "Ville durable",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/villes-verdissent",
  },
  {
    title: "Mobilité : les transports en commun se décarbonent",
    category: "Ville durable",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/transports-decarbones",
  },
  {
    title: "Îlots de fraîcheur : le plan des villes",
    category: "Ville durable",
    date: "Il y a 2 jours",
    href: "/article/ilots-fraicheur",
  },
  {
    title: "Déchets : le pari du zéro enfouissement",
    category: "Ville durable",
    date: "Il y a 2 jours",
    href: "/article/zero-enfouissement",
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

export default async function EnvironnementPage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getEnvironnementArticles(locale);

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

  const climatArticles = mergeWithMock(
    homepageData?.sections?.climat?.map(articleToCardProps),
    mockClimatArticles
  );
  const biodiversiteArticles = mergeWithMock(
    homepageData?.sections?.biodiversite?.map(articleToCardProps),
    mockBiodiversiteArticles
  );
  const energieArticles = mergeWithMock(
    homepageData?.sections?.energie?.map(articleToCardProps),
    mockEnergieArticles
  );
  const pollutionArticles = mergeWithMock(
    homepageData?.sections?.pollution?.map(articleToCardProps),
    mockPollutionArticles
  );
  const developpementDurableArticles = mergeWithMock(
    homepageData?.sections?.["developpement-durable"]?.map(articleToCardProps),
    mockDeveloppementDurableArticles
  );
  const oceansArticles = mergeWithMock(
    homepageData?.sections?.oceans?.map(articleToCardProps),
    mockOceansArticles
  );
  const foretsArticles = mergeWithMock(
    homepageData?.sections?.forets?.map(articleToCardProps),
    mockForetsArticles
  );
  const montagneArticles = mergeWithMock(
    homepageData?.sections?.montagne?.map(articleToCardProps),
    mockMontagneArticles
  );
  const agricultureArticles = mergeWithMock(
    homepageData?.sections?.agriculture?.map(articleToCardProps),
    mockAgricultureArticles
  );
  const villeDurableArticles = mergeWithMock(
    homepageData?.sections?.["ville-durable"]?.map(articleToCardProps),
    mockVilleDurableArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité de l&apos;environnement
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
              <SectionBlock title="Climat" href="/environnement" articles={climatArticles} locale={locale} />
              <SectionBlock title="Biodiversité" href="/environnement" articles={biodiversiteArticles} locale={locale} />
              <SectionBlock title="Énergie" href="/environnement" articles={energieArticles} locale={locale} />
              <SectionBlock title="Pollution" href="/environnement" articles={pollutionArticles} locale={locale} />
              <SectionBlock title="Développement durable" href="/environnement" articles={developpementDurableArticles} locale={locale} />
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
                  L&apos;environnement, décrypté chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur le climat et la planète, chaque matin.
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
                <h2 className="mt-1 font-serif text-3xl font-bold">La planète en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Océans" href="/environnement" articles={oceansArticles} locale={locale} />
              <SectionBlock title="Forêts" href="/environnement" articles={foretsArticles} locale={locale} />
              <SectionBlock title="Montagne" href="/environnement" articles={montagneArticles} locale={locale} />
              <SectionBlock title="Agriculture" href="/environnement" articles={agricultureArticles} locale={locale} />
              <SectionBlock title="Ville durable" href="/environnement" articles={villeDurableArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              La planète, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : enquêtes, décryptages et analyses sur le climat et la biodiversité, disponible dès 7 h.
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
