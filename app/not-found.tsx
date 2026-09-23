import { strings } from "@/lib/strings";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto py-32 px-4 sm:px-6 text-center">
      <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="font-heading text-2xl font-bold mb-4">
        {strings.noResults}
      </h2>
      <p className="text-muted mb-8">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link href="/">
        <Button size="lg">{strings.heroCta}</Button>
      </Link>
    </div>
  );
}
