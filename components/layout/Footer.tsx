import { strings } from "@/lib/strings";

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-heading text-sm font-bold tracking-tight">
            {strings.siteName}
          </p>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} {strings.siteName}. All pieces are one of a kind.
          </p>
        </div>
      </div>
    </footer>
  );
}
