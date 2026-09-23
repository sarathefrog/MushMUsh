"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { loginAction } from "@/actions/auth";
import { strings } from "@/lib/strings";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import Link from "next/link";

import { Suspense } from "react";
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-24 px-4 sm:px-6">
      <Suspense fallback={<div className="p-8 text-center text-muted">Loading...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
