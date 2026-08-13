import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

interface PageProps {
  params: Promise<{ locale?: string }>;
}

const plans = [
  {
    name: "Essentiel",
    price: "4,99",
    period: "mois",
    description: "Pour rester informé au quotidien",
    features: [
      "Accès illimité aux articles",
      "Newsletter quotidienne",
      "Accès mobile",
      "Sans publicité",
    ],
    highlighted: false,
  },
  {
    name: "Premium",
    price: "9,99",
    period: "mois",
    description: "Pour une expérience complète",
    features: [
      "Tout d'Essentiel",
      "Accès premium aux analyses",
      "Podcasts exclusifs",
      "Suppression des publicités",
      "Support prioritaire",
    ],
    highlighted: true,
  },
  {
    name: "Annuel",
    price: "79,99",
    period: "an",
    description: "Pour les fidèles lecteurs",
    features: [
      "Tout de Premium",
      "Économie de 33%",
      "Accès anticipé aux articles",
      "Contenu exclusif",
      "Invitation aux événements",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    question: "Comment puis-je m'abonner ?",
    answer:
      "Vous pouvez vous abonner en cliquant sur le bouton corresponding au plan de votre choix et en suivant les étapes de paiement sécurisé.",
  },
  {
    question: "Puis-je annuler à tout moment ?",
    answer:
      "Oui, vous pouvez annuler votre abonnement à tout moment depuis votre espace membre. Vous aurez accès à votre abonnement jusqu'à la fin de la période payée.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons les cartes bancaires (Visa, Mastercard, American Express), PayPal et les virements bancaires pour les abonnements annuels.",
  },
  {
    question: "L'abonnement est-il partagé entre plusieurs appareils ?",
    answer:
      "Oui, votre abonnement vous permet d'accéder au contenu sur tous vos appareils : ordinateur, tablette et mobile.",
  },
  {
    question: "Y a-t-il une période d'essai gratuite ?",
    answer:
      "Nous proposons une période d'essai gratuite de 7 jours pour le plan Premium. Vous pouvez annuler à tout moment pendant cette période sans frais.",
  },
  {
    question: "Comment fonctionne la facturation ?",
    answer:
      "La facturation est mensuelle ou annuelle selon le plan choisi. Elle est automatiquement renouvelée sauf si vous annulez avant la fin de la période.",
  },
];

export default async function AbonnementPage({ params }: PageProps) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="mx-auto max-w-7xl px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
              Soutenez le journalisme indépendant
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Abonnez-vous à The Etheria Times pour accéder à des contenus exclusifs, des analyses
              approfondies et soutenir un journalisme libre et indépendant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-6 ${
                  plan.highlighted
                    ? "bg-primary text-primary-foreground scale-105 shadow-lg"
                    : "bg-card border border-border"
                }`}
              >
                {plan.highlighted && (
                  <div className="bg-primary-foreground text-primary text-xs font-semibold px-3 py-1 rounded-full inline-block mb-4">
                    Le plus populaire
                  </div>
                )}
                <h3
                  className={`text-xl font-bold mb-2 ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}
                >
                  {plan.name}
                </h3>
                <div className="mb-4">
                  <span
                    className={`text-4xl font-bold ${plan.highlighted ? "text-primary-foreground" : "text-foreground"}`}
                  >
                    {plan.price}€
                  </span>
                  <span
                    className={`${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                  >
                    {" "}
                    / {plan.period}
                  </span>
                </div>
                <p
                  className={`text-sm mb-6 ${plan.highlighted ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                >
                  {plan.description}
                </p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <Check
                        className={`h-4 w-4 ${plan.highlighted ? "text-primary-foreground" : "text-primary"}`}
                      />
                      <span
                        className={`text-sm ${plan.highlighted ? "text-primary-foreground" : ""}`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${
                    plan.highlighted
                      ? "bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                      : ""
                  }`}
                  variant={plan.highlighted ? "secondary" : "default"}
                >
                  S&apos;abonner
                </Button>
              </div>
            ))}
          </div>

          <section className="mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground text-center mb-8">
              Questions fréquentes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card border border-border rounded-lg p-6">
                  <h3 className="font-semibold text-foreground mb-2">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-muted rounded-lg p-8 text-center">
            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
              Vous hésitez encore ?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Profitez de notre période d&apos;essai gratuite de 7 jours pour découvrir tous les
              avantages de l&apos;abonnement Premium, sans engagement.
            </p>
            <Button size="lg">Commencer mon essai gratuit</Button>
          </section>
        </section>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
