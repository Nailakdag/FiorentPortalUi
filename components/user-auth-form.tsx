"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { ControlledInput } from "@/components/ui/controlled-input";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { userAuthSchema } from "@/lib/validations/auth";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type FormData = z.infer<typeof userAuthSchema>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const searchParams = useSearchParams();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    const signInResult = await signIn("credentials", {
      email: data.email.toLowerCase(),
      password: data.password,
      redirect: false,
      callbackUrl: searchParams?.get("from") || "/",
    });

    if (signInResult) {
      if (signInResult?.error) {
        setIsLoading(false);
        toast({
          title: signInResult?.error ?? "Giriş başarısız",
          variant: "destructive",
        });
      } else {
        setIsLoading(false);
        router.replace(signInResult.url as string);
      }
    }
    setIsLoading(false);
  }

  return (
    <div className={cn("mt-5", className)} {...props}>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className="grid gap-2">
          <div>
            <ControlledInput<FormData>
              control={control}
              name="email"
              type="email"
              placeholder="Email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              isDisabled={isLoading}
              variant="login"
            />
          </div>
          <div className="mt-3">
            <ControlledInput<FormData>
              control={control}
              name="password"
              type="password"
              placeholder="Şifre"
              autoCapitalize="none"
              autoCorrect="off"
              isDisabled={isLoading}
              variant="login"
            />
          </div>
          <div className="mt-3 flex items-center justify-between">
            <div className="flex items-center">
              <Input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                variant="login"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm leading-6 text-gray-900"
              >
                Beni hatırla
              </label>
            </div>
            <Link
              href="forgot-password"
              className="text-sm text-[#1249BD] hover:text-[#273147] "
            >
              <p>Şifremi Unuttum</p>
            </Link>
          </div>

          <Button
            className="rounded-s-l mb-5 mt-5 h-14 rounded-e-none bg-[#1249BD] p-0 pl-3 hover:bg-[#0B2F7B]"
            disabled={isLoading}
          >
            <div className="flex w-full items-center">
              <div className="flex w-5/6 text-start text-base">
                {isLoading && (
                  <Icons.spinner className="mr-2 mt-1 h-4 w-4 animate-spin" />
                )}
                Giriş Yap
              </div>
              <div className=" flex h-14 w-1/6 content-end items-center justify-center bg-[#023aae] ">
                <ChevronRightIcon className="h-8  bg-[#023aae] px-1" />
              </div>
            </div>
          </Button>
        </div>
      </form>
    </div>
  );
}
