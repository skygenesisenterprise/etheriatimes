"use client";

import { useState } from "react";
import { Check, CreditCard, Calendar, Zap, Crown, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
}

const plans: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    price: "4,99",
    period: "/mois",
    description: "Accès aux articles en illimité",
    features: [
      "Articles en illimité",
      "Accès sur tous vos appareils",
      "Lecture hors ligne",
      "Support par email",
    ],
    highlighted: false,
  },
  {
    id: "premium",
    name: "Premium",
    price: "9,99",
    period: "/mois",
    description: "L'expérience complète",
    features: [
      "Tout dans Essentiel",
      "Archives complètes depuis 2015",
      "Newsletters quotidiennes",
      "Contenu exclusif",
      "Priorité support",
      "Aucun publicité",
    ],
    highlighted: true,
  },
];

const currentSubscription = {
  plan: "Premium",
  price: "9,99 €",
  nextBilling: "15/04/2026",
  paymentMethod: "Visa •••• 4242",
  status: "active",
};

export default function SubscriptionPage() {
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (planId: string) => {
    setLoading(planId);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(null);
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Abonnement</h1>
        <p className="text-sm text-muted-foreground">
          Gérez votre abonnement et vos informations de facturation
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-foreground">Plan actuel</h2>
              <Badge variant="default" className="gap-1">
                <Crown className="h-3 w-3" />
                {currentSubscription.plan}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {currentSubscription.price} · Prochaine facturation le{" "}
              {currentSubscription.nextBilling}
            </p>
          </div>
          <Button variant="outline">Modifier le plan</Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Méthode de paiement</h3>
        <div className="flex items-center gap-4">
          <div className="rounded-lg border border-border p-3">
            <CreditCard className="h-6 w-6 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-foreground">{currentSubscription.paymentMethod}</p>
            <p className="text-sm text-muted-foreground">Expire 12/2027</p>
          </div>
          <Button variant="outline" size="sm">
            Modifier
          </Button>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Historique des facturations</h3>
        <div className="space-y-3">
          {[
            { date: "15/03/2026", amount: "9,99 €", status: "Payé" },
            { date: "15/02/2026", amount: "9,99 €", status: "Payé" },
            { date: "15/01/2026", amount: "9,99 €", status: "Payé" },
          ].map((invoice, i) => (
            <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
              <div className="flex items-center gap-3">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{invoice.date}</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-foreground">{invoice.amount}</span>
                <Badge variant="secondary" className="text-xs">
                  {invoice.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Changer de plan</h3>
        <div className="grid gap-6 md:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-lg border p-6 ${
                plan.highlighted ? "border-primary bg-primary/5" : "border-border bg-card"
              }`}
            >
              {plan.highlighted && (
                <Badge className="absolute -top-3 left-4 gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  Populaire
                </Badge>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xl font-bold text-foreground">{plan.name}</h4>
                  <p className="text-sm text-muted-foreground mt-1">{plan.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">
                    {plan.price}
                    <span className="text-sm font-normal text-muted-foreground">{plan.period}</span>
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                    <Check className="h-4 w-4 text-primary shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                className="w-full mt-4"
                variant={plan.highlighted ? "default" : "outline"}
                disabled={loading !== null}
                onClick={() => handleSubscribe(plan.id)}
              >
                {loading === plan.id ? (
                  <Zap className="h-4 w-4 animate-spin" />
                ) : currentSubscription.plan === plan.name ? (
                  "Plan actuel"
                ) : (
                  `Choisir ${plan.name}`
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
