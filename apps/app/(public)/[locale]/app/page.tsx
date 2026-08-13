import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Download, Bell, Bookmark, Wifi, Zap, Lock, Globe, Check } from "lucide-react";

interface PageProps {
  params: Promise<{ locale?: string }>;
}

const features = [
  {
    icon: Bell,
    title: "Notifications en temps réel",
    description: "Recevez les alertes breaking news directement sur votre téléphone",
  },
  {
    icon: Bookmark,
    title: "Articles sauvegardés",
    description: "Enregistrez vos articles préférés pour les lire hors ligne",
  },
  {
    icon: Wifi,
    title: "Mode hors ligne",
    description: "Accédez à vos articles sauvegardés sans connexion internet",
  },
  {
    icon: Zap,
    title: "Ultra rapide",
    description: "Interface optimisée pour une expérience fluide sur mobile",
  },
  {
    icon: Lock,
    title: "Sécurisé",
    description: "Vos données personnelles sont protégées et chiffrées",
  },
  {
    icon: Globe,
    title: "Multilingue",
    description: "Disponible en français, anglais et espagnol",
  },
];

const stats = [
  { value: "100K+", label: "Téléchargements" },
  { value: "4.8", label: "Note moyenne" },
  { value: "50K+", label: "Utilisateurs actifs" },
  { value: "Daily", label: "Nouveaux contenus" },
];

const steps = [
  {
    number: "1",
    title: "Téléchargez l'application",
    description: "Disponible gratuitement sur l'App Store et Google Play",
  },
  {
    number: "2",
    title: "Créez votre compte",
    description: "Inscription rapide en 30 secondes avec email ou réseaux sociaux",
  },
  {
    number: "3",
    title: "Personnalisez votre feed",
    description: "Choisissez vos thématiques préférées pour un contenu sur mesure",
  },
  {
    number: "4",
    title: "Restez informé",
    description: "Recevez les actualités qui vous intéressent en temps réel",
  },
];

export default async function AppPage({ params }: PageProps) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-linear-to-b from-primary/10 to-background py-16 md:py-24">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <Badge variant="secondary" className="mb-4">
                  Application gratuite
                </Badge>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                  The Etheria Times dans votre poche
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl">
                  Téléchargez notre application mobile et accédez à toutes nos actualités, où que
                  vous soyez. Recevez des alertes, enregistrez des articles et restez informé où que vous soyez.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button size="lg" className="gap-2">
                    <Download className="h-5 w-5" />
                    App Store
                  </Button>
                  <Button size="lg" variant="outline" className="gap-2">
                    <Download className="h-5 w-5" />
                    Google Play
                  </Button>
                </div>
              </div>
              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <div className="w-64 h-125 bg-linear-to-br from-primary to-primary/60 rounded-[3rem] p-3 shadow-2xl">
                    <div className="w-full h-full bg-background rounded-[2.5rem] overflow-hidden">
                      <div className="h-12 bg-primary flex items-center justify-center">
                        <span className="text-primary-foreground font-serif font-bold">
                          Etheria Times
                        </span>
                      </div>
                      <div className="p-4 space-y-4">
                        <div className="h-24 bg-muted rounded-lg" />
                        <div className="h-16 bg-muted rounded-lg" />
                        <div className="h-20 bg-muted rounded-lg" />
                        <div className="flex gap-2">
                          <div className="h-16 flex-1 bg-muted rounded-lg" />
                          <div className="h-16 flex-1 bg-muted rounded-lg" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                    <Smartphone className="h-10 w-10 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card">
          <div className="mx-auto max-w-7xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-4">
              Fonctionnalités
            </h2>
            <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
              Découvrez tout ce que notre application peut faire pour vous
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature) => {
                const IconComponent = feature.icon;
                return (
                  <div
                    key={feature.title}
                    className="bg-card border border-border rounded-lg p-6 hover:border-primary/50 transition-colors"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 mb-4">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="mx-auto max-w-7xl px-4">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
              Comment commencer ?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-2xl font-bold mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                  {step.number !== "4" && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] border-t-2 border-dashed border-border" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-4xl px-4">
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 md:p-12 text-center">
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
                Prêt à rester informé ?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8 max-w-xl mx-auto">
                Rejoignez des milliers de lecteurs qui font confiance à The Etheria Times pour leur
                actualités quotidiennes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" className="gap-2">
                  <Download className="h-5 w-5" />
                  Télécharger sur iOS
                </Button>
                <Button size="lg" variant="secondary" className="gap-2">
                  <Download className="h-5 w-5" />
                  Télécharger sur Android
                </Button>
              </div>
              <div className="flex items-center justify-center gap-2 mt-8 text-sm text-primary-foreground/60">
                <Check className="h-4 w-4" />
                <span>Gratuit</span>
                <span>•</span>
                <Check className="h-4 w-4" />
                <span>Sans pub pour les abonnés</span>
                <span>•</span>
                <Check className="h-4 w-4" />
                <span>100% sécurisé</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
