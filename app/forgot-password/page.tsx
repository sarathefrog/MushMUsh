import { strings } from "@/lib/strings";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md mx-auto py-24 px-4 sm:px-6">
      <Card className="p-8 text-center">
        <h1 className="font-heading text-2xl font-bold mb-4">
          Reset Password
        </h1>
        <p className="text-muted text-sm mb-8">
          This is a placeholder page. In a real application, this would send a password reset link to your email.
        </p>
        <Link href="/login">
          <Button fullWidth variant="secondary">Back to Login</Button>
        </Link>
      </Card>
    </div>
  );
}
