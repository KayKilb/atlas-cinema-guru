//app/login/page.tsx
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    // If user is already logged in, redirect to home
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to Atlas Cinema Guru</h1>
      <p className="mb-4">Log in with GitHub to continue</p>
      <button
        onClick={() => signIn("github")}
        className="bg-gray-800 text-white px-4 py-2 rounded-lg"
      >
        Sign in with GitHub
      </button>
    </div>
  );
}
