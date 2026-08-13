import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bookmark, Clock, FileText, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-serif font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-1">Bienvenue sur votre espace lecteur</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles lus</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">Ce mois-ci</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Favoris</CardTitle>
            <Bookmark className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Articles sauvegardés</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Temps de lecture</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2h 15min</div>
            <p className="text-xs text-muted-foreground">Cette semaine</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Abonnement</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Premium</div>
            <p className="text-xs text-muted-foreground">Renouvellement le 15/04</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Articles récents</CardTitle>
            <CardDescription>Les derniers articles que vous avez consultés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "L'économie mondiale face aux nouvelles technologies",
                  category: "Économie",
                  date: "Il y a 2h",
                  readTime: "5 min",
                },
                {
                  title: "Les enjeux environnementaux de 2025",
                  category: "Environnement",
                  date: "Il y a 5h",
                  readTime: "8 min",
                },
                {
                  title: "Interview: Le directeur de The Etheria Times parle",
                  category: "Interview",
                  date: "Hier",
                  readTime: "12 min",
                },
              ].map((article, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0"
                >
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">{article.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {article.category} · {article.readTime} de lecture
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{article.date}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Dans vos favoris</CardTitle>
            <CardDescription>Articles que vous avez sauvegardés</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Analyse: La crise énergétique en Europe", added: "Il y a 2 jours" },
                {
                  title: "Dossier: L'intelligence artificielle éthique",
                  added: "Il y a 1 semaine",
                },
                { title: "Reportage: Au cœur des négociations", added: "Il y a 2 semaines" },
              ].map((article, i) => (
                <div key={i} className="flex flex-col gap-1 border-b pb-3 last:border-0 last:pb-0">
                  <span className="text-sm font-medium">{article.title}</span>
                  <span className="text-xs text-muted-foreground">Ajouté {article.added}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
