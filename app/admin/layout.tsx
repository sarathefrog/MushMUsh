import Link from "next/link";
import { getAuthService } from "@/lib/data";
import { redirect } from "next/navigation";
import { strings } from "@/lib/strings";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = getAuthService();
  const session = await auth.getSession();

  // Double check auth here just in case proxy.ts is bypassed
  if (!session || session.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-surface p-6 hidden md:block">
        <h2 className="font-heading font-bold text-sm tracking-widest text-muted uppercase mb-6">
          Admin
        </h2>
        <nav className="space-y-2">
          <Link
            href="/admin"
            className="block px-3 py-2 text-sm font-medium rounded-input hover:bg-black/5 transition-colors focus-ring"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/orders"
            className="block px-3 py-2 text-sm font-medium rounded-input hover:bg-black/5 transition-colors focus-ring"
          >
            Orders
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 md:p-12 overflow-auto bg-white">
        {/* Mobile nav fallback */}
        <nav className="md:hidden flex gap-4 mb-8 border-b border-border pb-4">
          <Link href="/admin" className="text-sm font-medium hover:text-primary">
            Dashboard
          </Link>
          <Link href="/admin/orders" className="text-sm font-medium hover:text-primary">
            Orders
          </Link>
        </nav>
        {children}
      </div>
    </div>
  );
}
