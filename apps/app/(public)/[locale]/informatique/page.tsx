import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "Apple M4 Ultra : une puce révolutionnaire pour les professionnels",
    time: "Il y a 5 min",
    href: "/article/apple-m4-ultra",
  },
  {
    id: "2",
    title: "NVIDIA RTX 5090 : les premiers tests sont là",
    time: "Il y a 14 min",
    href: "/article/rtx-5090",
  },
  {
    id: "3",
    title: "Cyberattaque massive ciblant les entreprises françaises",
    time: "Il y a 27 min",
    href: "/article/cyberattaque-france",
  },
  {
    id: "4",
    title: "React 20 : les nouveautés annoncées",
    time: "Il y a 41 min",
    href: "/article/react-20",
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

async function getInformatiqueArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Informatique",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",
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
  title: "Apple M4 Ultra : une puce révolutionnaire pour les professionnels",
  excerpt:
    "La nouvelle génération de silicium Apple repousse les limites de la performance sur Mac.",
  category: "Hardware",
  image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/apple-m4-ultra",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "NVIDIA RTX 5090 : les premiers tests sont là",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/rtx-5090",
  },
  {
    title: "React 20 : les nouveautés annoncées",
    category: "Développement",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/react-20",
  },
  {
    title: "Cyberattaque massive ciblant les entreprises",
    category: "Cybersécurité",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/cyberattaque-france",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Comparatifs CPU/GPU du moment", date: "Mis à jour", href: "/article/comparatifs" },
  { title: "Tutoriels développement", date: "En cours", href: "/article/tutoriels" },
  { title: "IA : les nouvelles avancées qui changent tout", date: "Il y a 1 heure", href: "/article/ia-avancees-2026" },
  { title: "Cybersécurité : les menaces qui ciblent les entreprises", date: "Il y a 3 heures", href: "/article/cybersecurite-menaces" },
  { title: "Cloud computing : vers une nouvelle ère", date: "Il y a 6 heures", href: "/article/cloud-nouvelle-ere" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "David Nguyen", title: "Éditorial : l'IA, alliée ou menace ?", href: "/article/editorial-ia" },
  { author: "Élise Martin", title: "Tribune : l'open source, bien commun", href: "/article/tribune-open-source" },
  { author: "Hugo Lefebvre", title: "Chronique : le cloud souverain en question", href: "/article/chronique-cloud" },
];

const mockHardwareArticles: HomeArticle[] = [
  {
    title: "Apple M4 Ultra : une puce révolutionnaire",
    excerpt: "La nouvelle génération de silicium Apple repousse les limites de la performance sur Mac.",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/apple-m4-ultra",
  },
  {
    title: "NVIDIA RTX 5090 : les premiers tests sont là",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/rtx-5090",
  },
  {
    title: "AMD annonce ses processeurs Ryzen de nouvelle génération",
    category: "Hardware",
    image: "https://images.unsplash.com/photo-1555617981-dac3880eac6e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/amd-ryzen-9000",
  },
  {
    title: "PC portables : les nouveautés de la rentrée",
    category: "Hardware",
    date: "Hier",
    href: "/article/pc-portables",
  },
  {
    title: "Stockage : l'essor des disques NVMe grand public",
    category: "Hardware",
    date: "Il y a 2 jours",
    href: "/article/disques-nvme",
  },
];

const mockDeveloppementArticles: HomeArticle[] = [
  {
    title: "React 20 : les nouveautés annoncées",
    excerpt: "Le framework JavaScript évolue avec des performances améliorées.",
    category: "Développement",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/react-20",
  },
  {
    title: "GitHub Copilot : intégration native dans VS Code",
    category: "Développement",
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/github-copilot",
  },
  {
    title: "Programmation : les langages les plus demandés",
    category: "Développement",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/langages-programmation",
  },
  {
    title: "Low-code : la démocratisation du développement",
    category: "Développement",
    date: "Il y a 2 jours",
    href: "/article/low-code",
  },
  {
    title: "WebAssembly : vers des applications plus rapides",
    category: "Développement",
    date: "Il y a 2 jours",
    href: "/article/webassembly",
  },
];

const mockCybersecuriteArticles: HomeArticle[] = [
  {
    title: "Cyberattaque massive ciblant les entreprises françaises",
    excerpt: "Des milliers de systèmes ont été compromis par un groupe de hackers.",
    category: "Cybersécurité",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/cyberattaque-france",
  },
  {
    title: "Une faille zero-day découverte dans un logiciel populaire",
    category: "Cybersécurité",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/zero-day",
  },
  {
    title: "Cybersécurité : les menaces qui ciblent les entreprises",
    category: "Cybersécurité",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/cybersecurite-menaces",
  },
  {
    title: "Ransomwares : la réponse des autorités s'organise",
    category: "Cybersécurité",
    date: "Hier",
    href: "/article/ransomwares-autorites",
  },
  {
    title: "Mots de passe : la fin du traditionnel se profile",
    category: "Cybersécurité",
    date: "Il y a 2 jours",
    href: "/article/passkeys",
  },
];

const mockCloudArticles: HomeArticle[] = [
  {
    title: "AWS re:Invent 2026 : les annonces majeures",
    excerpt: "Amazon présente ses dernières innovations cloud.",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/aws-reinvent",
  },
  {
    title: "Cloud computing : vers une nouvelle ère",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/cloud-nouvelle-ere",
  },
  {
    title: "Cloud souverain : les ambitions européennes",
    category: "Cloud",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/cloud-souverain",
  },
  {
    title: "FinOps : maîtriser ses coûts cloud",
    category: "Cloud",
    date: "Il y a 2 jours",
    href: "/article/finops",
  },
  {
    title: "Edge computing : traiter les données au plus près",
    category: "Cloud",
    date: "Il y a 2 jours",
    href: "/article/edge-computing",
  },
];

const mockBasesArticles: HomeArticle[] = [
  {
    title: "PostgreSQL 18 : nouvelles fonctionnalités",
    excerpt: "La base de données open source se dote d'outils avancés.",
    category: "Base de données",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/postgresql-18",
  },
  {
    title: "SQL vs NoSQL : comment choisir",
    category: "Base de données",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/sql-nosql",
  },
  {
    title: "Le data engineering, un métier en tension",
    category: "Base de données",
    date: "Il y a 2 jours",
    href: "/article/data-engineering",
  },
  {
    title: "Temps réel : les bases de données nouvelle génération",
    category: "Base de données",
    date: "Il y a 2 jours",
    href: "/article/bases-temps-reel",
  },
];

const mockIaArticles: HomeArticle[] = [
  {
    title: "Intelligence artificielle : les nouvelles avancées qui changent tout",
    excerpt: "L'IA transforme tous les secteurs de l'économie à une vitesse inégalée.",
    category: "IA",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/ia-avancees-2026",
  },
  {
    title: "Modèles open source : la course s'intensifie",
    category: "IA",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/ia-open-source",
  },
  {
    title: "IA générative : les usages en entreprise",
    category: "IA",
    date: "Hier",
    href: "/article/ia-generative-entreprise",
  },
  {
    title: "Régulation : l'IA Act entre en application",
    category: "IA",
    date: "Il y a 2 jours",
    href: "/article/ia-act",
  },
];

const mockMobiliteArticles: HomeArticle[] = [
  {
    title: "Smartphones : les flagships de la rentrée",
    excerpt: "Les constructeurs rivalisent d'innovations sur le segment haut de gamme.",
    category: "Mobilité",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/smartphones-flagships",
  },
  {
    title: "Objets connectés : le marché se structure",
    category: "Mobilité",
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/objets-connectes",
  },
  {
    title: "Applications : les tendances de 2026",
    category: "Mobilité",
    date: "Il y a 2 jours",
    href: "/article/applications-tendances",
  },
  {
    title: "Tablettes : le renouveau du segment",
    category: "Mobilité",
    date: "Il y a 2 jours",
    href: "/article/tablettes-renouveau",
  },
];

const mockLogicielsArticles: HomeArticle[] = [
  {
    title: "Logiciels : les mises à jour majeures du mois",
    excerpt: "Systèmes, suites bureautiques : les nouveautés à connaître.",
    category: "Logiciels",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/logiciels-maj",
  },
  {
    title: "Open source : les projets qui montent",
    category: "Logiciels",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/open-source-projets",
  },
  {
    title: "Productivité : les outils qui changent le travail",
    category: "Logiciels",
    date: "Il y a 2 jours",
    href: "/article/productivite-outils",
  },
  {
    title: "Sécurité des applications : le devsecops s'impose",
    category: "Logiciels",
    date: "Il y a 2 jours",
    href: "/article/devsecops",
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

export default async function InformatiquePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getInformatiqueArticles(locale);

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

  const hardwareArticles = mergeWithMock(
    homepageData?.sections?.hardware?.map(articleToCardProps),
    mockHardwareArticles
  );
  const developpementArticles = mergeWithMock(
    homepageData?.sections?.developpement?.map(articleToCardProps),
    mockDeveloppementArticles
  );
  const cybersecuriteArticles = mergeWithMock(
    homepageData?.sections?.cybersecurite?.map(articleToCardProps),
    mockCybersecuriteArticles
  );
  const cloudArticles = mergeWithMock(
    homepageData?.sections?.cloud?.map(articleToCardProps),
    mockCloudArticles
  );
  const basesArticles = mergeWithMock(
    homepageData?.sections?.["base-de-donnees"]?.map(articleToCardProps),
    mockBasesArticles
  );
  const iaArticles = mergeWithMock(
    homepageData?.sections?.ia?.map(articleToCardProps),
    mockIaArticles
  );
  const mobiliteArticles = mergeWithMock(
    homepageData?.sections?.mobilite?.map(articleToCardProps),
    mockMobiliteArticles
  );
  const logicielsArticles = mergeWithMock(
    homepageData?.sections?.logiciels?.map(articleToCardProps),
    mockLogicielsArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité tech du jour
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
              <SectionBlock title="Hardware" href="/informatique" articles={hardwareArticles} locale={locale} />
              <SectionBlock title="Développement" href="/informatique" articles={developpementArticles} locale={locale} />
              <SectionBlock title="Cybersécurité" href="/informatique" articles={cybersecuriteArticles} locale={locale} />
              <SectionBlock title="Cloud" href="/informatique" articles={cloudArticles} locale={locale} />
              <SectionBlock title="Base de données" href="/informatique" articles={basesArticles} locale={locale} />
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
                  La tech, décryptée chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur le hardware, le code et le cloud, chaque matin.
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
                    ["Tutoriels", "/tutoriels"],
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
                <h2 className="mt-1 font-serif text-3xl font-bold">La tech en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="IA" href="/informatique" articles={iaArticles} locale={locale} />
              <SectionBlock title="Mobilité" href="/informatique" articles={mobiliteArticles} locale={locale} />
              <SectionBlock title="Logiciels" href="/informatique" articles={logicielsArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              La tech, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : tests, décryptages et analyses de l&apos;actualité technologique, disponible dès 7 h.
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
