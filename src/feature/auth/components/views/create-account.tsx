"use client";

import { GitHubIcon } from "@/components/icons/brand/github";
import { GoogleIcon } from "@/components/icons/brand/google";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useCreateAccount } from "../../hooks/create-account";
import {
  CreateAccountSchema,
  CreateAccountSchemaType,
} from "../../schema/create-account";

export function CreateAccountForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm<CreateAccountSchemaType>({
    resolver: zodResolver(CreateAccountSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const { createAccountWithEmail, createAccountWithSocial, isLoading } =
    useCreateAccount();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(createAccountWithEmail)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <h1 className="text-6xl font-extrabold">Hello!</h1>
                  <p className="text-muted-foreground text-balance">
                    Create your new account
                  </p>
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-3">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create account"}
                </Button>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => {
                      createAccountWithSocial("google");
                    }}
                  >
                    <GoogleIcon />
                    <span>Google</span>
                  </Button>
                  <Button
                    variant="outline"
                    type="button"
                    className="w-full"
                    disabled={isLoading}
                    onClick={() => {
                      createAccountWithSocial("github");
                    }}
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/login" className="underline underline-offset-4">
                    Login
                  </Link>
                </div>
              </div>
            </form>
          </Form>
          <div className="bg-slate-900 items-center justify-center hidden md:flex">
            <p className="text-white text-4xl font-extrabold">@AI Advisor</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
