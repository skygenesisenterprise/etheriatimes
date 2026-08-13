import Link from "next/link";

interface SectionTitleProps {
  title: string;
  href?: string;
  className?: string;
}

export function SectionTitle({ title, href, className = "" }: SectionTitleProps) {
  return (
    <div
      className={`flex items-center justify-between border-t-2 border-foreground border-b border-border py-3 mb-6 ${className}`}
    >
      <h2 className="font-serif text-xl font-bold tracking-tight text-foreground">{title}</h2>
      {href && (
        <Link
          href={href}
          className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors"
        >
          Voir plus
        </Link>
      )}
    </div>
  );
}
