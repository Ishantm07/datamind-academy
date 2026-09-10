import Link from "next/link";

const FOOTER_LINKS = {
  Learn: [
    { label: "SQL", href: "/subjects/sql" },
    { label: "Power BI", href: "/subjects/powerbi" },
    { label: "Python", href: "/subjects/python" },
    { label: "Machine Learning", href: "/subjects/ml" },
    { label: "Artificial Intelligence", href: "/subjects/ai" },
  ],
  Tracks: [
    { label: "Data Analyst", href: "/tracks/data-analyst" },
    { label: "Data Scientist", href: "/tracks/data-scientist" },
    { label: "AI Engineer", href: "/tracks/ai-engineer" },
    { label: "BI Developer", href: "/tracks/bi-developer" },
  ],
  Resources: [
    { label: "Cheat Sheets", href: "/resources/cheatsheets" },
    { label: "Dataset Library", href: "/resources/datasets" },
    { label: "Glossary", href: "/resources/glossary" },
    { label: "Interview Prep", href: "/resources/interview" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Certifications", href: "/certifications" },
    { label: "Community", href: "/community" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Top: logo + links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🧠</span>
              <span className="font-bold text-base">
                DataMind <span className="text-primary">Academy</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free, structured, project-based learning for the data age.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <span>© {new Date().getFullYear()} DataMind Academy. All rights reserved.</span>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/sitemap" className="hover:text-foreground transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
