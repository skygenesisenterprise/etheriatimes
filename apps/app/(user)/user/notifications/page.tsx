"use client";

import { useState } from "react";
import { Bell, Check, Trash2, Clock, FileText, Bookmark, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  type: "article" | "bookmark" | "system" | "account";
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "article",
    title: "Nouvel article disponible",
    description: "Un nouvel article dans votre catégorie préférée",
    time: "2026-03-26T10:30:00",
    read: false,
  },
  {
    id: "2",
    type: "bookmark",
    title: "Article ajouté aux favoris",
    description: "Un article que vous avez lu a été ajouté aux favoris",
    time: "2026-03-25T14:20:00",
    read: false,
  },
  {
    id: "3",
    type: "system",
    title: "Fin de votre essai gratuit",
    description: "Votre essai gratuit prend fin dans 3 jours",
    time: "2026-03-25T09:00:00",
    read: true,
  },
  {
    id: "4",
    type: "article",
    title: "Newsletter publiée",
    description: "La dernière newsletter est disponible",
    time: "2026-03-24T08:00:00",
    read: true,
  },
  {
    id: "5",
    type: "account",
    title: "Mise à jour du profil",
    description: "Votre profil a été mis à jour avec succès",
    time: "2026-03-23T15:30:00",
    read: true,
  },
  {
    id: "6",
    type: "article",
    title: "Article recommandé",
    description: "Nous avons trouvé un article qui pourrait vous interesser",
    time: "2026-03-22T11:00:00",
    read: true,
  },
];

const typeConfig = {
  article: { icon: FileText, color: "text-blue-500", bg: "bg-blue-500/10" },
  bookmark: { icon: Bookmark, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  system: { icon: Bell, color: "text-purple-500", bg: "bg-purple-500/10" },
  account: { icon: User, color: "text-green-500", bg: "bg-green-500/10" },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications = notifications.filter((n) => (filter === "unread" ? !n.read : true));

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffHours < 1) return "À l'instant";
    if (diffHours < 24) return `Il y a ${diffHours}h`;
    if (diffDays === 1) return "Hier";
    if (diffDays < 7) return `Il y a ${diffDays} jours`;
    return date.toLocaleDateString("fr-FR", { day: "numeric", month: "short" });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm text-muted-foreground">
            {unreadCount > 0
              ? `${unreadCount} notification${unreadCount !== 1 ? "s" : ""} non lue${unreadCount !== 1 ? "s" : ""}`
              : "Aucune notification non lue"}
          </p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              <Check className="mr-2 h-4 w-4" />
              Tout marquer comme lu
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="outline" size="sm" onClick={clearAll}>
              <Trash2 className="mr-2 h-4 w-4" />
              Tout effacer
            </Button>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("all")}
        >
          Toutes
        </Button>
        <Button
          variant={filter === "unread" ? "default" : "outline"}
          size="sm"
          onClick={() => setFilter("unread")}
        >
          Non lues
          {unreadCount > 0 && (
            <Badge variant="secondary" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </Button>
      </div>

      {filteredNotifications.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-lg font-medium text-foreground">Aucune notification</p>
          <p className="text-sm text-muted-foreground mt-1">
            {filter === "unread"
              ? "Vous avez lu toutes vos notifications"
              : "Vous n'avez pas encore de notifications"}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filteredNotifications.map((notification) => {
            const config = typeConfig[notification.type];
            const Icon = config.icon;

            return (
              <div
                key={notification.id}
                className={`flex items-start gap-4 rounded-lg border p-4 transition-colors ${
                  notification.read ? "border-border bg-card" : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className={`rounded-full p-2 ${config.bg}`}>
                  <Icon className={`h-4 w-4 ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-foreground">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatTime(notification.time)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {!notification.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => markAsRead(notification.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => deleteNotification(notification.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
