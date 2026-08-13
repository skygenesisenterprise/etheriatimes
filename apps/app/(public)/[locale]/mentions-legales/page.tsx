import { Locale, isValidLocale, defaultLocale } from "@/lib/locale";
import { Header } from "@/components/media/header";
import { Footer } from "@/components/media/footer";

interface PageProps {
  params: Promise<{ locale?: string }>;
}

export default async function MentionsLegalesPage({ params }: PageProps) {
  const { locale: paramLocale } = await params;
  const locale: Locale = paramLocale && isValidLocale(paramLocale) ? paramLocale : defaultLocale;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <article className="mx-auto max-w-4xl px-4 py-12">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-8">Mentions Légales</h1>

          <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
            <p className="text-sm text-muted-foreground">Dernière mise à jour : Mars 2026</p>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                1. Informations sur l&apos;éditeur
              </h2>
              <p>
                <strong>Nom de la société :</strong> The Etheria Times
                <br />
                <strong>Forme juridique :</strong> SAS au capital de 10 000 €<br />
                <strong>Siège social :</strong> 123 Avenue de la Liberté, 75008 Paris, France
                <br />
                <strong>Téléphone :</strong> +33 1 23 45 67 89
                <br />
                <strong>Email :</strong> contact@etheriatimes.com
                <br />
                <strong>SIRET :</strong> 123 456 789 00012
                <br />
                <strong>TVA intracommunautaire :</strong> FR12345678901
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                2. Directeur de la publication
              </h2>
              <p>
                Le directeur de la publication est M. Jean Dupont, Président de The Etheria Times.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">3. Hébergement</h2>
              <p>
                Le site The Etheria Times est hébergé par :<br />
                <strong>Nom de l&apos;hébergeur :</strong> Sky Genesis Enterprise
                <br />
                <strong>Adresse :</strong> 456 Rue du Cloud, 75010 Paris, France
                <br />
                <strong>Site web :</strong> https://skygenesisenterprise.com
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                4. Propriété intellectuelle
              </h2>
              <p>
                L&apos;ensemble du contenu présent sur le site The Etheria Times (textes, articles,
                photos, vidéos, graphismes, logos, icônes, sons, logiciels) est protégé par le droit
                d&apos;auteur et le droit de propriété intellectuelle.
              </p>
              <p className="mt-2">
                Toute reproduction, représentation, modification, publication, adaptation de tout ou
                partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
                interdite sans l&apos;autorisation écrite préalable de The Etheria Times.
              </p>
              <p className="mt-2">
                Toute exploitation non autorisée du site ou de l&apos;un quelconque des éléments
                qu&apos;il contient sera considérée comme constitutive d&apos;une contrefaçon et
                poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de
                Propriété Intellectuelle.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                5. Crédits photos et médias
              </h2>
              <p>
                Les photos et médias utilisés sur le site sont soit la propriété de The Etheria
                Times, soit utilisés sous licence avec l&apos;accord des ayants droit. Les crédits
                photos sont indiqués sur chaque article lorsque applicable.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                6. Liens hypertextes
              </h2>
              <p>
                Le site The Etheria Times peut contenir des liens hypertextes vers d&apos;autres
                sites internet. Ces liens sont fournis uniquement pour la commodité de
                l&apos;utilisateur. The Etheria Times n&apos;exerce aucun contrôle sur ces sites et
                décline toute responsabilité quant à leur contenu.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                7. Protection des données personnelles
              </h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                Informatique et Libertés, vous disposez d&apos;un droit d&apos;accès, de
                rectification, de suppression et d&apos;opposition aux données vous concernant.
              </p>
              <p className="mt-2">
                Pour exercer ces droits, vous pouvez nous contacter à l&apos;adresse :
                privacy@etheriatimes.com
              </p>
              <p className="mt-2">
                Pour plus d&apos;informations, consultez notre Politique de confidentialité et notre
                politique relative aux cookies.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                8. Cookies et traceurs
              </h2>
              <p>
                Le site utilise des cookies et autres traceurs. Pour plus d&apos;informations sur
                l&apos;utilisation des cookies, consultez notre politique relative aux cookies
                accessible à l&apos;adresse :{" "}
                <a href="/cookies" className="text-primary hover:underline">
                  /cookies
                </a>
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                9. Limitation de responsabilité
              </h2>
              <p>
                Les informations contenues sur ce site sont aussi précises que possible et le site
                est périodiquement mis à jour, mais peut toutefois contenir des inexactitudes, des
                omissions ou des lacunes.
              </p>
              <p className="mt-2">
                The Etheria Times ne saurait être tenu responsable des dommages directs ou indirects
                résultant de l&apos;utilisation du site ou de l&apos;impossibilité d&apos;y accéder.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">
                10. Droit applicable
              </h2>
              <p>
                Les présentes mentions légales sont régies par le droit français. En cas de litige,
                les tribunaux français seront seuls compétents.
              </p>
            </section>

            <section>
              <h2 className="font-serif text-2xl font-bold text-foreground mb-4">11. Contact</h2>
              <p>
                Pour toute question concernant ces mentions légales, vous pouvez nous contacter :
                <br />
                <strong>Email :</strong> contact@etheriatimes.com
                <br />
                <strong>Téléphone :</strong> +33 1 23 45 67 89
                <br />
                <strong>Adresse :</strong> 123 Avenue de la Liberté, 75008 Paris, France
              </p>
            </section>
          </div>
        </article>
      </main>
      <Footer locale={locale} />
    </div>
  );
}
