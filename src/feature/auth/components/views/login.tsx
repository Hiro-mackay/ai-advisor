"use client";
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

import { GitHubIcon } from "@/components/icons/brand/github";
import { GoogleIcon } from "@/components/icons/brand/google";
import { useForm } from "react-hook-form";
import { useLogin } from "../../hooks/login";
import { LoginSchema, LoginSchemaType } from "../../schema/login";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { isLoading, loginWithEmail, loginWithSocial } = useLogin();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Form {...form}>
            <form
              className="p-6 md:p-8"
              onSubmit={form.handleSubmit(loginWithEmail)}
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col">
                  <h1 className="text-6xl font-extrabold">Welcome back!</h1>
                  <p className="text-muted-foreground text-balance">
                    Login to your account
                  </p>
                </div>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="text"
                          placeholder="m@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center">
                        <FormLabel>Password</FormLabel>
                        <Link
                          href="/forgot-password"
                          className="ml-auto text-sm underline-offset-2 hover:underline"
                        >
                          Forgot your password?
                        </Link>
                      </div>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Logging in..." : "Login"}
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
                      loginWithSocial("google");
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
                      loginWithSocial("github");
                    }}
                  >
                    <GitHubIcon />
                    <span>GitHub</span>
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/create-account"
                    className="underline underline-offset-4"
                  >
                    Create Account
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
