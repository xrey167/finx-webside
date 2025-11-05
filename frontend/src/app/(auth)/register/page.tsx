"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const schema = z
  .object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirm: z.string().min(6),
  })
  .refine((d) => d.password === d.confirm, {
    path: ["confirm"],
    message: "Passwords must match",
  });

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    console.log("register", data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md" variant="glass">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold gradient-text">Create account</h1>
          <p className="text-sm text-text-secondary">Join FinX to start your trading journey.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Name</label>
            <Input placeholder="Satoshi Nakamoto" {...register("name")} error={errors.name?.message} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Email</label>
            <Input type="email" placeholder="you@example.com" {...register("email")} error={errors.email?.message} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Password</label>
            <Input type="password" placeholder="••••••••" {...register("password")} error={errors.password?.message} />
          </div>
          <div>
            <label className="mb-1 block text-sm text-text-secondary">Confirm</label>
            <Input type="password" placeholder="••••••••" {...register("confirm")} error={errors.confirm?.message} />
          </div>
          <Button type="submit" isLoading={isSubmitting} className="w-full">
            Create account
          </Button>
        </form>
      </Card>
    </div>
  );
}
