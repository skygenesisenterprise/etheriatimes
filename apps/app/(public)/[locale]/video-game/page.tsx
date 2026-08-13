import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "GTA VI : Rockstar révèle la date de sortie",
    time: "Il y a 5 min",
    href: "/article/gta-vi-date",
  },
  {
    id: "2",
    title: "Nintendo Switch 2 : enfin officialisée",
    time: "Il y a 15 min",
    href: "/article/switch-2",
  },
  {
    id: "3",
    title: "Elden Ring Nightreign : date de sortie confirmée",
    time: "Il y a 29 min",
    href: "/article/elden-ring-nightreign",
  },
  {
    id: "4",
    title: "Esport : Team Vitality championne d'Europe",
    time: "Il y a 42 min",
    href: "/article/vitality-champion",
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

async function getVideoGameArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Jeu Vidéo",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop",
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
  title: "GTA VI : Rockstar révèle la date de sortie",
  excerpt:
    "Le jeu le plus attendu de la décennie sera disponible à la fin de l'année sur PS5 et Xbox Series.",
  category: "Console",
  image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/gta-vi-date",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "Elden Ring Nightreign : date de sortie confirmée",
    category: "PC",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/elden-ring-nightreign",
  },
  {
    title: "Nintendo Switch 2 : enfin officialisée",
    category: "Console",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/switch-2",
  },
  {
    title: "Esport : Team Vitality championne d'Europe",
    category: "Esport",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/vitality-champion",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Meilleurs jeux de l'année", date: "En cours", href: "/article/meilleurs-jeux-2026" },
  { title: "Guides et soluces", date: "Mis à jour", href: "/article/guides" },
  { title: "Sorties du mois", date: "Il y a 3 heures", href: "/article/sorties-mois" },
  { title: "Nouveau jeu flagship : la révolution du gaming en 2026", date: "Il y a 2 heures", href: "/article/jeux-flagship-2026" },
  { title: "E-sport : les tournois battent des records", date: "Il y a 5 heures", href: "/article/esport-records" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Lucas Moreau", title: "Éditorial : le jeu vidéo, culture à part entière", href: "/article/editorial-jv" },
  { author: "Chloé Bernard", title: "Tribune : pour un esport plus inclusif", href: "/article/tribune-esport" },
  { author: "Thomas Rivière", title: "Chronique : la nostalgie, moteur du rétrogaming", href: "/article/chronique-retro" },
];

const mockPcArticles: HomeArticle[] = [
  {
    title: "Elden Ring Nightreign : date de sortie confirmée",
    excerpt: "Le spin-off coop de FromSoftware débarque cet été.",
    category: "PC",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/elden-ring-nightreign",
  },
  {
    title: "Steam Deck OLED : Valve prépare une mise à jour",
    category: "PC",
    image: "https://images.unsplash.com/photo-1592840496694-26d035b52b48?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/steam-deck-oled",
  },
  {
    title: "The Witcher 4 : première bande-annonce",
    category: "PC",
    image: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/witcher-4-trailer",
  },
  {
    title: "Nouveau jeu flagship : la révolution du gaming en 2026",
    category: "PC",
    date: "Il y a 2 heures",
    href: "/article/jeux-flagship-2026",
  },
  {
    title: "Config PC : les builds du moment",
    category: "PC",
    date: "Il y a 2 jours",
    href: "/article/config-pc",
  },
];

const mockConsoleArticles: HomeArticle[] = [
  {
    title: "GTA VI : Rockstar révèle la date de sortie",
    excerpt: "Le jeu le plus attendu de la décennie sera disponible à la fin de l'année sur PS5 et Xbox Series.",
    category: "Console",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/gta-vi-date",
  },
  {
    title: "Nintendo Switch 2 : enfin officialisée",
    category: "Console",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/switch-2",
  },
  {
    title: "PlayStation Plus : les jeux du mois",
    category: "Console",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/ps-plus-mars",
  },
  {
    title: "Pokémon Legends Z-A : nouvelles informations",
    category: "Console",
    date: "Hier",
    href: "/article/pokemon-legends-za",
  },
  {
    title: "Xbox : le Game Pass élargit son catalogue",
    category: "Console",
    date: "Il y a 2 jours",
    href: "/article/game-pass-catalogue",
  },
];

const mockMobileArticles: HomeArticle[] = [
  {
    title: "Jeux mobiles : les hits de l'année",
    excerpt: "Le marché du jeu sur smartphone continue de croître à un rythme soutenu.",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/jeux-mobiles-hits",
  },
  {
    title: "Cloud gaming : jouer sans console",
    category: "Mobile",
    image: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/cloud-gaming",
  },
  {
    title: "Jeux indépendants : les pépites à découvrir",
    category: "Mobile",
    date: "Il y a 2 jours",
    href: "/article/indie-games",
  },
  {
    title: "Réalité augmentée : les expériences à suivre",
    category: "Mobile",
    date: "Il y a 2 jours",
    href: "/article/realite-augmentee",
  },
];

const mockEsportArticles: HomeArticle[] = [
  {
    title: "Esport : Team Vitality championne d'Europe",
    excerpt: "L'équipe française s'impose lors d'une finale spectaculaire.",
    category: "Esport",
    image: "https://images.unsplash.com/photo-1493711662062-fa541f7f3d24?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/vitality-champion",
  },
  {
    title: "E-sport : les tournois internationaux battent des records",
    category: "Esport",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/esport-records",
  },
  {
    title: "League of Legends : le championnat du monde",
    category: "Esport",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/lol-worlds",
  },
  {
    title: "Streaming : l'économie du sport électronique",
    category: "Esport",
    date: "Il y a 2 jours",
    href: "/article/esport-economie",
  },
  {
    title: "Les équipes françaises à la conquête des titres",
    category: "Esport",
    date: "Il y a 2 jours",
    href: "/article/esport-france",
  },
];

const mockRetroArticles: HomeArticle[] = [
  {
    title: "Retro gaming : le marché du collectionneur",
    excerpt: "Les jeux anciens continuent de prendre de la valeur.",
    category: "Retro",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/retro-collection",
  },
  {
    title: "Émulation : la préservation du patrimoine vidéoludique",
    category: "Retro",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/emulation-patrimoine",
  },
  {
    title: "Consoles cultes : retour sur les classiques",
    category: "Retro",
    date: "Hier",
    href: "/article/consoles-cultes",
  },
  {
    title: "Les remasters qui font mouche",
    category: "Retro",
    date: "Il y a 2 jours",
    href: "/article/remasters",
  },
];

const mockIndependantsArticles: HomeArticle[] = [
  {
    title: "Indie games : les perles indépendantes à surveiller",
    excerpt: "La scène indépendante ne cesse de surprendre par sa créativité.",
    category: "Indépendants",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/indie-games",
  },
  {
    title: "Game jams : la pépinière des talents",
    category: "Indépendants",
    image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/game-jams",
  },
  {
    title: "Financement participatif : les succès du trimestre",
    category: "Indépendants",
    date: "Il y a 2 jours",
    href: "/article/financement-jeux",
  },
  {
    title: "Portrait : les studios français qui s'exportent",
    category: "Indépendants",
    date: "Il y a 2 jours",
    href: "/article/studios-francais",
  },
];

const mockVrArticles: HomeArticle[] = [
  {
    title: "VR gaming : le matériel nouvelle génération arrive",
    excerpt: "Les casques plus légers et plus performants démocratisent la réalité virtuelle.",
    category: "VR",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?w=400&h=250&fit=crop",
    date: "Il y a 8 heures",
    href: "/article/vr-nouvelle-gen",
  },
  {
    title: "Jeux VR : les expériences incontournables",
    category: "VR",
    image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/jeux-vr",
  },
  {
    title: "Réalité mixte : le gaming sans frontières",
    category: "VR",
    date: "Il y a 2 jours",
    href: "/article/realite-mixte",
  },
  {
    title: "Sécurité et confort : les défis de la VR",
    category: "VR",
    date: "Il y a 2 jours",
    href: "/article/vr-confort",
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

export default async function VideoGamePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getVideoGameArticles(locale);

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

  const pcArticles = mergeWithMock(
    homepageData?.sections?.pc?.map(articleToCardProps),
    mockPcArticles
  );
  const consoleArticles = mergeWithMock(
    homepageData?.sections?.console?.map(articleToCardProps),
    mockConsoleArticles
  );
  const mobileArticles = mergeWithMock(
    homepageData?.sections?.mobile?.map(articleToCardProps),
    mockMobileArticles
  );
  const esportArticles = mergeWithMock(
    homepageData?.sections?.esport?.map(articleToCardProps),
    mockEsportArticles
  );
  const retroArticles = mergeWithMock(
    homepageData?.sections?.retro?.map(articleToCardProps),
    mockRetroArticles
  );
  const independantsArticles = mergeWithMock(
    homepageData?.sections?.independants?.map(articleToCardProps),
    mockIndependantsArticles
  );
  const vrArticles = mergeWithMock(
    homepageData?.sections?.vr?.map(articleToCardProps),
    mockVrArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité gaming du jour
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
              <SectionBlock title="PC" href="/video-game" articles={pcArticles} locale={locale} />
              <SectionBlock title="Console" href="/video-game" articles={consoleArticles} locale={locale} />
              <SectionBlock title="Mobile" href="/video-game" articles={mobileArticles} locale={locale} />
              <SectionBlock title="Esport" href="/video-game" articles={esportArticles} locale={locale} />
              <SectionBlock title="Retro" href="/video-game" articles={retroArticles} locale={locale} />
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
                  Le gaming, décrypté chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur les sorties et l&apos;esport, chaque matin.
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
                    ["Guides", "/guides"],
                    ["Tests", "/tests"],
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
                <h2 className="mt-1 font-serif text-3xl font-bold">Le gaming en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Indépendants" href="/video-game" articles={independantsArticles} locale={locale} />
              <SectionBlock title="VR" href="/video-game" articles={vrArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              Le gaming, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : sorties, tests et analyses de l&apos;actualité vidéoludique, disponible dès 7 h.
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
