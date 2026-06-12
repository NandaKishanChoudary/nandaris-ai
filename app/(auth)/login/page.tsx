import { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { VENTURE_IQ } from "@/lib/constants";

export const metadata = {
  title: "Sign In",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-venture text-venture-foreground text-lg font-bold">
          N
        </div>
        <p className="text-sm text-muted-foreground">{VENTURE_IQ}</p>
      </div>
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
