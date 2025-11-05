"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof schema>;

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log("login", data);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md" variant="glass">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">FinX</h1>
          <p className="text-text-secondary mt-2">Welcome back to your trading platform</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Email</label>
            <Input type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Password</label>
            <Input type="password" placeholder="••••••••" {...register("password")} error={errors.password?.message} />
          </div>
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Sign in
          </Button>
        </form>
        <div className="text-center mt-4">
          <p className="text-text-muted">
            Don&apos;t have an account? <a href="/register" className="text-accent hover:underline">Sign up</a>
          </p>
        </div>
      </Card>
    </div>
  );
}
