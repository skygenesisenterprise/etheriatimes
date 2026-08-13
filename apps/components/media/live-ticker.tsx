"use client";

import Link from "next/link";
import { Circle } from "lucide-react";

interface LiveTickerItem {
  id: string;
  title: string;
  time: string;
  href: string;
  isBreaking?: boolean;
}

interface LiveTickerProps {
  items: LiveTickerItem[];
  locale?: string;
}

function getLocalizedHref(href: string, locale?: string) {
  if (!locale || href.startsWith("http") || href.startsWith("#")) {
    return href;
  }

  if (href === "/") {
    return `/${locale}`;
  }

  return href.startsWith(`/${locale}/`) ? href : `/${locale}${href}`;
}

export function LiveTicker({ items, locale }: LiveTickerProps) {
  return (
    <section className="border-b border-border bg-muted" aria-label="Actualité en continu">
      <div className="mx-auto max-w-[1280px] px-4 lg:px-6">
        <div className="flex min-h-11 items-stretch gap-4 overflow-hidden">
          <div className="flex shrink-0 items-center gap-2 border-r border-border pr-4">
            <Circle className="h-2 w-2 fill-primary text-primary animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
              En continu
            </span>
          </div>
          <div className="flex min-w-0 flex-1 items-center overflow-x-auto scrollbar-hide">
            <div className="flex min-w-max items-center divide-x divide-border">
              {items.slice(0, 5).map((item) => (
                <Link
                  key={item.id}
                  href={getLocalizedHref(item.href, locale)}
                  className="group flex max-w-[360px] items-center gap-3 px-4 first:pl-0"
                >
                  <time className="shrink-0 text-[11px] font-semibold text-muted-foreground">
                    {item.time}
                  </time>
                  <span className="line-clamp-1 text-[13px] text-foreground group-hover:text-primary transition-colors">
                    {item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
