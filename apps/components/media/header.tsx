"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogIn, LogOut, Menu, Search, Settings, User, UserPlus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useLocale } from "@/context/locale-context";
import { getDomainUrl } from "@/lib/domains";

interface NavigationItem {
  label: string;
  href: string;
}

const navigationItems: NavigationItem[] = [
  { label: "À la une", href: "/" },
  { label: "Monde", href: "/monde" },
  { label: "Politique", href: "/politique" },
  { label: "Société", href: "/societe" },
  { label: "Économie", href: "/economie" },
  { label: "Environnement", href: "/environnement" },
  { label: "Culture", href: "/culture" },
  { label: "Sport", href: "/sport" },
  { label: "Espace", href: "/espace" },
  { label: "Informatique", href: "/informatique" },
  { label: "Jeu Vidéo", href: "/video-game" },
];

function getLocaleHref(locale: string, href: string) {
  if (href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return href.startsWith(`/${locale}/`) ? href : `/${locale}${href}`;
}

export function Header() {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const { user, isAuthenticated, isLoading, logout } = useAuth();
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");

  const getSsoHref = (path: string) => getDomainUrl("sso", path);

  // Determine whether a navigation item is the current page. The pathname
  // includes the locale prefix (e.g. `/fr/monde`), so we compare against the
  // localized href and treat any deeper route as part of the same section.
  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === `/${locale}` || pathname === "/";
    }
    return pathname === `/${locale}${href}` || pathname.startsWith(`/${locale}${href}/`);
  };

  React.useEffect(() => {
    if (searchOpen) {
      searchInputRef.current?.focus();
    }
  }, [searchOpen]);

  React.useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenus = () => {
    setMenuOpen(false);
    setSearchOpen(false);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    closeMenus();
    setSearchQuery("");
    router.push(`${getLocaleHref(locale, "/search")}?q=${encodeURIComponent(query)}`);
  };

  const handleLogout = async () => {
    await logout();
    closeMenus();
    router.push(getLocaleHref(locale, "/"));
  };

  return (
    <header className="public-site-header relative z-50 border-t-2 border-foreground bg-background select-none">
      {/* Masthead */}
      <div className="border-b border-foreground">
        <div className="relative mx-auto flex h-20.5 max-w-7xl items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-1 sm:gap-2">
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-expanded={menuOpen}
              aria-controls="public-navigation"
              className="inline-flex h-10 items-center gap-2 px-2 text-foreground transition-colors hover:text-primary"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="hidden text-xs font-bold uppercase tracking-wide sm:inline">Menu</span>
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              aria-expanded={searchOpen}
              aria-controls="public-search"
              className="inline-flex h-10 w-10 items-center justify-center text-foreground transition-colors hover:text-primary"
            >
              <Search className="h-4.75 w-4.75" />
              <span className="sr-only">Rechercher</span>
            </button>
          </div>

          <Link
            href={getLocaleHref(locale, "/")}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <span className="block whitespace-nowrap font-serif text-[27px] font-bold tracking-[-0.045em] text-foreground sm:text-4xl md:text-[44px]">
              The Etheria Times
            </span>
            <span className="mt-1 hidden text-[9px] uppercase tracking-[0.34em] text-muted-foreground md:block">
              Le journal d&apos;actualité en continu
            </span>
          </Link>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  disabled={isLoading}
                  className="h-10 rounded-none px-2 text-foreground hover:text-primary sm:px-3"
                >
                  {isLoading ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  ) : (
                    <User className="h-4.5 w-4.5 sm:mr-2" />
                  )}
                  <span className="hidden text-xs font-bold sm:inline">
                    {isAuthenticated ? "Mon compte" : "Se connecter"}
                  </span>
                  <span className="sr-only sm:hidden">Mon compte</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {isLoading ? (
                  <div className="px-2 py-4 text-center text-sm text-muted-foreground">Chargement...</div>
                ) : isAuthenticated && user ? (
                  <>
                    <div className="border-b px-2 py-1.5">
                      <p className="truncate text-sm font-medium">{user.name || user.email}</p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/user" className="flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Mon compte
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/user/settings" className="flex items-center">
                        <Settings className="mr-2 h-4 w-4" />
                        Paramètres
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Déconnexion
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href={getSsoHref("/login")} className="flex items-center">
                        <LogIn className="mr-2 h-4 w-4" />
                        Connexion
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href={getSsoHref("/register")} className="flex items-center">
                        <UserPlus className="mr-2 h-4 w-4" />
                        Créer un compte
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={getLocaleHref(locale, "/abonnement")}>
              <Button className="h-10 rounded-none bg-primary px-4 text-sm font-bold text-primary-foreground hover:bg-primary/90">
                <span className="hidden sm:inline">S&apos;abonner</span>
                <span className="sm:hidden">S&apos;abonner</span>
              </Button>
            </Link>
          </div>
        </div>

        {searchOpen && (
          <div id="public-search" className="border-t border-border bg-muted">
            <div className="mx-auto max-w-7xl px-4 py-3 lg:px-6">
              <form onSubmit={handleSearch} className="flex items-center gap-3">
                <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                <input
                  ref={searchInputRef}
                  type="search"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Rechercher dans Etheria Times"
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                />
                <button type="submit" className="text-xs font-bold uppercase tracking-wide text-primary">
                  Rechercher
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="text-xs font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground"
                >
                  Fermer
                </button>
              </form>
            </div>
          </div>
        )}
        {/* Desktop section navigation */}
        <nav id="public-navigation" className="hidden border-t border-border lg:block" aria-label="Navigation principale">
        <div className="mx-auto max-w-7xl overflow-x-auto px-4 scrollbar-hide lg:px-6">
          <ul className="flex min-w-max items-center justify-center">
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={getLocaleHref(locale, item.href)}
                  className={`block border-b-2 px-4 py-3 text-[13px] font-semibold tracking-wide transition-colors ${
                    isActive(item.href)
                      ? "border-primary text-primary"
                      : "border-transparent text-foreground hover:border-foreground hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}

          </ul>
        </div>
        </nav>
      </div>

      {/* Mobile section navigation */}
      {menuOpen && (
        <div className="absolute inset-x-0 top-full max-h-[calc(100vh-82px)] overflow-y-auto border-b border-foreground bg-background shadow-xl lg:hidden">
          <nav aria-label="Navigation mobile">
            <div className="border-b border-border px-4 py-4">
              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Les rubriques</p>
            </div>
            <ul className="grid grid-cols-1 px-4 py-2 sm:grid-cols-2">
              {navigationItems.map((item) => (
                <li key={item.href} className="border-b border-border">
                  <Link
                    href={getLocaleHref(locale, item.href)}
                    onClick={() => setMenuOpen(false)}
                    className={`block py-4 text-sm font-semibold transition-colors hover:text-primary ${
                      isActive(item.href) ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="border-b border-border">
                <Link
                  href={getLocaleHref(locale, "/archives")}
                  onClick={() => setMenuOpen(false)}
                  className="block py-4 text-sm font-semibold text-foreground transition-colors hover:text-primary"
                >
                  Archives et services
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
