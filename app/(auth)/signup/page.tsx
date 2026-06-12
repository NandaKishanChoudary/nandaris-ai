import { SignupForm } from "@/components/auth/signup-form";
import { VENTURE_IQ } from "@/lib/constants";

export const metadata = {
  title: "Sign Up",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-venture text-venture-foreground text-lg font-bold">
          N
        </div>
        <p className="text-sm text-muted-foreground">{VENTURE_IQ}</p>
      </div>
      <SignupForm />
    </div>
  );
}
