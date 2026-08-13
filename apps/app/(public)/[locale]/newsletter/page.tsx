import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  Newspaper,
  BarChart3,
  AlertCircle,
  Landmark,
  TrendingUp,
  Trophy,
  Mail,
} from "lucide-react";

interface PageProps {
  params: Promise<{ locale?: string }>;
}

const newsletterTypes = [
  {
    name: "L'essentiel",
    description: "Un résumé quotidien des actualités importantes",
    frequency: "Chaque matin à 7h",
    icon: Newspaper,
  },
  {
    name: "L'hebdomadaire",
    description: "Les 10 articles à ne pas manquer",
    frequency: "Chaque dimanche matin",
    icon: BarChart3,
  },
  {
    name: "Breaking News",
    description: "Alertes pour les actualités urgentes",
    frequency: "En temps réel",
    icon: AlertCircle,
  },
  {
    name: "Politique",
    description: "Toute l'actualité politique française et internationale",
    frequency: "Du lundi au vendredi",
    icon: Landmark,
  },
  {
    name: "Économie",
    description: "Analyses et actualités économiques",
    frequency: "Mardi et vendredi",
    icon: TrendingUp,
  },
  {
    name: "Sport",
    description: "Résultats, transferts et analyses sportives",
    frequency: "Après chaque événement majeur",
    icon: Trophy,
  },
];

const benefits = [
  "Accès rapide à l'actualité sans avoir à naviguer sur le site",
  "Sélection éditoriale des articles les plus pertinents",
  "Contenu exclusif réservé aux abonnés de la newsletter",
  "Possibilité de vous désabonner à tout moment",
  "Protection de vos données personnelles",
];

export default async function NewsletterPage({ params }: PageProps) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Restez informé avec nos newsletters
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Recevez l'actualité directement dans votre boîte mail. Choisissez les newsletters qui
              vous intéressent et recevez uniquement ce qui vous passionne.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                S&apos;inscrire à la newsletter
              </h2>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                    Adresse email
                  </label>
                  <Input type="email" id="email" placeholder="votre@email.com" className="w-full" />
                </div>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                    Prénom (optionnel)
                  </label>
                  <Input type="text" id="name" placeholder="Votre prénom" className="w-full" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Newsletters souhaitées
                  </label>
                  <div className="space-y-3">
                    {newsletterTypes.map((newsletter) => (
                      <label
                        key={newsletter.name}
                        className="flex items-start gap-3 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                          defaultChecked={newsletter.name === "L'essentiel"}
                        />
                        <div>
                          <span className="font-medium text-foreground">{newsletter.name}</span>
                          <span className="text-sm text-muted-foreground ml-2">
                            ({newsletter.frequency})
                          </span>
                          <p className="text-sm text-muted-foreground">{newsletter.description}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4 rounded border-border text-primary focus:ring-primary"
                    required
                  />
                  <span className="text-sm text-muted-foreground">
                    J&apos;accepte de recevoir des newsletters de The Etheria Times. Je peux me
                    désinscrire à tout moment.
                  </span>
                </div>
                <Button type="submit" className="w-full">
                  S&apos;inscrire
                </Button>
              </form>
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                Pourquoi s&apos;abonner ?
              </h2>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 p-6 bg-muted rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Plus de 50 000 lecteurs</h3>
                    <p className="text-sm text-muted-foreground">Nous ont déjà rejoint</p>
                  </div>
                </div>
                <blockquote className="text-sm text-foreground/80 italic border-l-2 border-primary pl-4">
                  &quot;La newsletter de l&apos;essentiel me permet de rester informé sans passer
                  des heures à consulter les réseaux sociaux.&quot;
                  <footer className="mt-2 text-xs text-muted-foreground not-italic">
                    — Marie L., Paris
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
              Nos newsletters disponibles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsletterTypes.map((newsletter) => {
                const IconComponent = newsletter.icon;
                return (
                  <div
                    key={newsletter.name}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{newsletter.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{newsletter.description}</p>
                    <p className="text-xs text-primary font-medium">{newsletter.frequency}</p>
                  </div>
                );
              })}
            </div>
          </section>

          <section className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
            <h2 className="font-serif text-2xl font-bold mb-4">Déjà abonné ?</h2>
            <p className="text-primary-foreground/80 mb-6 max-w-xl mx-auto">
              Modifiez vos préférences ou gérez vos abonnements directement depuis votre espace
              membre.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg">
                Modifier mes préférences
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Se désinscrire
              </Button>
            </div>
          </section>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
