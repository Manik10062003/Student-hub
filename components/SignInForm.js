"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password
    });
    if (res.error) {
      alert(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#001F3F] px-4">
      <div className="bg-white rounded shadow-lg p-6 w-full max-w-sm space-y-4">
        <Button
          className="w-full bg-yellow-400 text-[#001F3F] hover:bg-yellow-500"
          onClick={() => signIn("google")}
        >
          Sign in with Google
        </Button>
        <div className="text-center text-sm text-gray-500">or</div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <Button
            type="submit"
            className="w-full bg-yellow-400 text-[#001F3F] hover:bg-yellow-500"
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
}
