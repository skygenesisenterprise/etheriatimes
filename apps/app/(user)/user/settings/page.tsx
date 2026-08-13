"use client";

import { useState } from "react";
import { User, Lock, Bell, Shield, Trash2, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function SettingsPage() {
  const [form, setForm] = useState({
    firstName: "Jean",
    lastName: "Dupont",
    email: "jean.dupont@email.com",
    phone: "+33 6 12 34 56 78",
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    newsletter: true,
    recommendations: true,
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSaving(false);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Paramètres</h1>
        <p className="text-sm text-muted-foreground">
          Gérez vos informations personnelles et vos préférences
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-2">
          <User className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Informations du profil</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">Prénom</Label>
            <Input
              id="firstName"
              value={form.firstName}
              onChange={(e) => setForm({ ...form, firstName: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Nom</Label>
            <Input
              id="lastName"
              value={form.lastName}
              onChange={(e) => setForm({ ...form, lastName: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Adresse e-mail</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Téléphone</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
        </div>

        <Button onClick={handleSave} disabled={saving}>
          {saving ? (
            <Save className="h-4 w-4 animate-spin mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Enregistrer
        </Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Mot de passe</h2>
        </div>

        <div className="space-y-4 max-w-sm">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Mot de passe actuel</Label>
            <Input id="currentPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">Nouveau mot de passe</Label>
            <Input id="newPassword" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirmer le mot de passe</Label>
            <Input id="confirmPassword" type="password" />
          </div>
        </div>

        <Button variant="outline">Changer le mot de passe</Button>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Notifications par e-mail</Label>
              <p className="text-sm text-muted-foreground">Recevoir les notifications par e-mail</p>
            </div>
            <Switch
              checked={notifications.email}
              onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Notifications push</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir les notifications sur votre appareil
              </p>
            </div>
            <Switch
              checked={notifications.push}
              onCheckedChange={(checked) => setNotifications({ ...notifications, push: checked })}
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Newsletter</Label>
              <p className="text-sm text-muted-foreground">Recevoir la newsletter hebdomadaire</p>
            </div>
            <Switch
              checked={notifications.newsletter}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, newsletter: checked })
              }
            />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Recommandations</Label>
              <p className="text-sm text-muted-foreground">
                Recevoir des recommandations personnalisées
              </p>
            </div>
            <Switch
              checked={notifications.recommendations}
              onCheckedChange={(checked) =>
                setNotifications({ ...notifications, recommendations: checked })
              }
            />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 space-y-6">
        <div className="flex items-center gap-2">
          <Shield className="h-5 w-5 text-muted-foreground" />
          <h2 className="text-lg font-semibold text-foreground">Confidentialité</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Profil public</Label>
              <p className="text-sm text-muted-foreground">
                Permettre aux autres de voir votre profil
              </p>
            </div>
            <Switch defaultChecked />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-base">Activité de lecture</Label>
              <p className="text-sm text-muted-foreground">Partager votre activité de lecture</p>
            </div>
            <Switch />
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-destructive/50 bg-destructive/5 p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Trash2 className="h-5 w-5 text-destructive" />
          <h2 className="text-lg font-semibold text-destructive">Zone danger</h2>
        </div>

        <p className="text-sm text-muted-foreground">
          La suppression de votre compte est irréversible. Toutes vos données seront perdues.
        </p>

        <Button variant="destructive">Supprimer mon compte</Button>
      </div>
    </div>
  );
}
