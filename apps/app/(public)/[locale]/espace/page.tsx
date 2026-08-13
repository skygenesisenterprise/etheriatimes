import Link from "next/link";
import Image from "next/image";
import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { SectionTitle } from "@/components/media/section-title";

const liveNewsItems = [
  {
    id: "1",
    title: "Artemis III : la NASA annonce la date du retour sur la Lune",
    time: "Il y a 5 min",
    href: "/article/artemis-iii-date",
  },
  {
    id: "2",
    title: "James Webb : une exoplanète habitable découverte",
    time: "Il y a 16 min",
    href: "/article/exoplanete-habitable",
  },
  {
    id: "3",
    title: "SpaceX Starship : vol orbital réussi",
    time: "Il y a 29 min",
    href: "/article/starship-orbital",
  },
  {
    id: "4",
    title: "Mars : de l'eau liquide confirmée sous la surface",
    time: "Il y a 42 min",
    href: "/article/mars-eau",
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

async function getEspaceArticles(_locale: string): Promise<HomepageData | null> {
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
      : "Espace",
    image:
      article.imageUrl ||
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop",
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
  title: "Artemis III : la NASA annonce la date du retour sur la Lune",
  excerpt:
    "La mission habitée devrait poser ses pieds lunaires d'ici 18 mois, avec un équipage historique.",
  category: "Exploration",
  image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=1200&h=675&fit=crop",
  date: "Il y a 1 heure",
  href: "/article/artemis-iii-date",
};

const mockTopArticles: HomeArticle[] = [
  {
    title: "James Webb : une exoplanète habitable découverte",
    category: "Astronomie",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/exoplanete-habitable",
  },
  {
    title: "SpaceX Starship : vol orbital réussi",
    category: "Exploration",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/starship-orbital",
  },
  {
    title: "Mars : de l'eau liquide confirmée sous la surface",
    category: "Planètes",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/mars-eau",
  },
];

const mockMostReadArticles: HomeHeadline[] = [
  { title: "Éclipse solaire : où l'observer", date: "Dans 3 jours", href: "/article/eclipse" },
  { title: "Vols habités : le calendrier 2026", date: "Il y a 3 heures", href: "/article/calendrier-2026" },
  { title: "Pluie d'étoiles filantes ce week-end", date: "Hier", href: "/article/perseides" },
  { title: "Mission spatiale : les explorateurs atteignent l'ISS", date: "Il y a 1 heure", href: "/article/mission-spatiale-iss" },
  { title: "Télescope : découverte d'exoplanètes habitables", date: "Il y a 5 heures", href: "/article/telescope-exoplanetes" },
];

const mockOpinionArticles: OpinionArticle[] = [
  { author: "Éric Fontaine", title: "Éditorial : le retour sur la Lune, et après ?", href: "/article/editorial-lune" },
  { author: "Maya Delcourt", title: "Tribune : l'Europe doit rester dans la course", href: "/article/tribune-europe-spatiale" },
  { author: "Simon Robert", title: "Chronique : chercher la vie ailleurs", href: "/article/chronique-vie-ailleurs" },
];

const mockExplorationArticles: HomeArticle[] = [
  {
    title: "Artemis III : la NASA annonce la date du retour sur la Lune",
    excerpt: "La mission habitée devrait poser ses pieds lunaires d'ici 18 mois, avec un équipage historique.",
    category: "Exploration",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/artemis-iii-date",
  },
  {
    title: "SpaceX Starship : vol orbital réussi",
    category: "Exploration",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=250&fit=crop",
    date: "Il y a 4 heures",
    href: "/article/starship-orbital",
  },
  {
    title: "Station spatiale chinoise : record de durée",
    category: "Exploration",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/tiangong-record",
  },
  {
    title: "Ariane 6 : premiers lancements opérationnels",
    category: "Exploration",
    date: "Il y a 2 jours",
    href: "/article/ariane-6",
  },
  {
    title: "Mission spatiale : les explorateurs atteignent l'ISS",
    category: "Exploration",
    date: "Il y a 1 heure",
    href: "/article/mission-spatiale-iss",
  },
];

const mockSondesArticles: HomeArticle[] = [
  {
    title: "ESA : nouvelle mission vers les astéroïdes",
    excerpt: "Un voyage de six ans vers une cible riche en ressources.",
    category: "Sondes",
    image: "https://images.unsplash.com/photo-1454789548928-9efd52dc4031?w=400&h=250&fit=crop",
    date: "Il y a 6 heures",
    href: "/article/esa-asteroides",
  },
  {
    title: "Satellites : nouveaux capteurs pour observer la Terre",
    category: "Sondes",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/satellites-observation",
  },
  {
    title: "Jupiter : la sonde entame sa manœuvre d'insertion",
    category: "Sondes",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/jupiter-sonde",
  },
  {
    title: "Le retour d'échantillons martiens se précise",
    category: "Sondes",
    date: "Il y a 2 jours",
    href: "/article/echantillons-mars",
  },
  {
    title: "Voyager : 50 ans aux confins du système solaire",
    category: "Sondes",
    date: "Il y a 2 jours",
    href: "/article/voyager-50-ans",
  },
];

const mockAstronomieArticles: HomeArticle[] = [
  {
    title: "James Webb : une exoplanète habitable découverte",
    excerpt: "Le télescope spatial révèle des signes encourageants dans un système à 40 années-lumière.",
    category: "Astronomie",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=250&fit=crop",
    date: "Il y a 2 heures",
    href: "/article/exoplanete-habitable",
  },
  {
    title: "Pluie d'étoiles filantes : spectacle ce week-end",
    category: "Astronomie",
    image: "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/perseides",
  },
  {
    title: "Télescope spatial : découverte d'exoplanètes habitables",
    category: "Astronomie",
    image: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/telescope-exoplanetes",
  },
  {
    title: "Trous noirs : une nouvelle image historique",
    category: "Astronomie",
    date: "Hier",
    href: "/article/trous-noirs-image",
  },
  {
    title: "Galaxies : la cartographie de l'Univers s'étend",
    category: "Astronomie",
    date: "Il y a 2 jours",
    href: "/article/galaxies-cartographie",
  },
];

const mockPlanetesArticles: HomeArticle[] = [
  {
    title: "Mars : de l'eau liquide confirmée sous la surface",
    excerpt: "Des scientifiques révèlent une découverte majeure pour la recherche de vie.",
    category: "Planètes",
    image: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?w=400&h=250&fit=crop",
    date: "Il y a 5 heures",
    href: "/article/mars-eau",
  },
  {
    title: "Mars : les premières images de la base lunaire",
    category: "Planètes",
    image: "https://images.unsplash.com/photo-1614728853913-1e2242eb54b8?w=400&h=250&fit=crop",
    date: "Il y a 3 heures",
    href: "/article/mars-base-lunaire",
  },
  {
    title: "Lune : des images révèlent de nouveaux cratères",
    category: "Planètes",
    image: "https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/lune-crateres",
  },
  {
    title: "Vénus : la quête des signes de vie",
    category: "Planètes",
    date: "Hier",
    href: "/article/venus-vie",
  },
  {
    title: "Exoplanètes : le catalogue s'enrichit",
    category: "Planètes",
    date: "Il y a 2 jours",
    href: "/article/exoplanetes-catalogue",
  },
];

const mockSciencesArticles: HomeArticle[] = [
  {
    title: "Science : les avancées de la recherche spatiale",
    excerpt: "Des expériences en microgravité ouvrent de nouvelles perspectives.",
    category: "Science",
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/science-spatiale",
  },
  {
    title: "Physique : une avancée sur la matière noire",
    category: "Science",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/matiere-noire",
  },
  {
    title: "Biologie : cultiver des plantes dans l'espace",
    category: "Science",
    date: "Il y a 2 jours",
    href: "/article/plantes-espace",
  },
  {
    title: "Médecine spatiale : préparer les longs voyages",
    category: "Science",
    date: "Il y a 2 jours",
    href: "/article/medecine-spatiale",
  },
];

const mockLanceursArticles: HomeArticle[] = [
  {
    title: "Ariane 6 : premiers lancements opérationnels",
    excerpt: "Le lanceur européen entame sa carrière commerciale avec succès.",
    category: "Lanceurs",
    image: "https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?w=400&h=250&fit=crop",
    date: "Il y a 2 jours",
    href: "/article/ariane-6",
  },
  {
    title: "SpaceX : cadence de lancement record",
    category: "Lanceurs",
    image: "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/spacex-cadence",
  },
  {
    title: "Micro-lanceurs : la nouvelle course européenne",
    category: "Lanceurs",
    date: "Hier",
    href: "/article/micro-lanceurs",
  },
  {
    title: "Carburants verts : le défi des lanceurs propres",
    category: "Lanceurs",
    date: "Il y a 2 jours",
    href: "/article/lanceurs-verts",
  },
];

const mockStationsArticles: HomeArticle[] = [
  {
    title: "ISS : les explorateurs atteignent la station",
    excerpt: "Une équipe internationale rejoint la Station Spatiale Internationale pour une mission de 6 mois.",
    category: "Stations",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop",
    date: "Il y a 1 heure",
    href: "/article/mission-spatiale-iss",
  },
  {
    title: "Station spatiale chinoise : record de durée",
    category: "Stations",
    image: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=400&h=250&fit=crop",
    date: "Hier",
    href: "/article/tiangong-record",
  },
  {
    title: "Stations privées : l'après-ISS se dessine",
    category: "Stations",
    date: "Il y a 2 jours",
    href: "/article/stations-privees",
  },
  {
    title: "Tourisme spatial : les premiers séjours en orbite",
    category: "Stations",
    date: "Il y a 2 jours",
    href: "/article/tourisme-spatial",
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

export default async function EspacePage({ params }: { params: Promise<{ locale?: string }> }) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  const homepageData = await getEspaceArticles(locale);

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

  const explorationArticles = mergeWithMock(
    homepageData?.sections?.exploration?.map(articleToCardProps),
    mockExplorationArticles
  );
  const sondesArticles = mergeWithMock(
    homepageData?.sections?.sondes?.map(articleToCardProps),
    mockSondesArticles
  );
  const astronomieArticles = mergeWithMock(
    homepageData?.sections?.astronomie?.map(articleToCardProps),
    mockAstronomieArticles
  );
  const planetesArticles = mergeWithMock(
    homepageData?.sections?.planetes?.map(articleToCardProps),
    mockPlanetesArticles
  );
  const sciencesArticles = mergeWithMock(
    homepageData?.sections?.science?.map(articleToCardProps),
    mockSciencesArticles
  );
  const lanceursArticles = mergeWithMock(
    homepageData?.sections?.lanceurs?.map(articleToCardProps),
    mockLanceursArticles
  );
  const stationsArticles = mergeWithMock(
    homepageData?.sections?.stations?.map(articleToCardProps),
    mockStationsArticles
  );

  return (
    <div className="min-h-screen flex flex-col bg-background select-none">
      <Header />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-7xl px-4 py-8 lg:px-6 lg:py-10">
            <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">
                L&apos;actualité de l&apos;espace
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
              <SectionBlock title="Exploration" href="/espace" articles={explorationArticles} locale={locale} />
              <SectionBlock title="Sondes" href="/espace" articles={sondesArticles} locale={locale} />
              <SectionBlock title="Astronomie" href="/espace" articles={astronomieArticles} locale={locale} />
              <SectionBlock title="Planètes" href="/espace" articles={planetesArticles} locale={locale} />
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
                  L&apos;espace, décrypté chaque matin.
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Une sélection claire et utile de la rédaction sur l&apos;exploration et l&apos;astronomie, chaque matin.
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
                    ["Cartes du ciel", "/cartes"],
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
                <h2 className="mt-1 font-serif text-3xl font-bold">L&apos;espace en continu</h2>
              </div>
              <span className="hidden text-sm text-muted-foreground md:block">Toutes les rubriques</span>
            </div>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
              <SectionBlock title="Science" href="/espace" articles={sciencesArticles} locale={locale} />
              <SectionBlock title="Lanceurs" href="/espace" articles={lanceursArticles} locale={locale} />
              <SectionBlock title="Stations" href="/espace" articles={stationsArticles} locale={locale} />
            </div>
          </div>
        </section>

        <section className="bg-foreground text-background">
          <div className="mx-auto max-w-3xl px-4 py-14 text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground/70">La newsletter du matin</p>
            <h2 className="mt-3 font-serif text-3xl font-bold md:text-4xl">
              L&apos;espace, chaque matin
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-background/70 md:text-base">
              Recevez la sélection de la rédaction : découvertes, missions et analyses de l&apos;actualité spatiale, disponible dès 7 h.
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
