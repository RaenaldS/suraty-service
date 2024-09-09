"use client";
import IconLockDots from "@/components/icon/icon-lock-dots";
import { useRouter } from "next/navigation";
import React from "react";
import IconUser from "../icon/icon-user";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { LoginSchema } from "@/src/schema/login";
import { z } from "zod";
import { signIn } from "next-auth/react";
import clsx from "clsx";

type Inputs = z.infer<typeof LoginSchema>;

const ComponentsAuthLoginForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<string>();
  const [error, setError] = useState<{ message: string }>();
  const {
    register,
    handleSubmit,
    // watch,
    // reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: zodResolver(LoginSchema),
  });

  const processForm: SubmitHandler<Inputs> = async (data) => {
    setLoading("Loading...");
    const res = await signIn("credentials", {
      username: data.username,
      password: data.password,
      redirect: false,
      // callbackUrl: "/dashboard",
    });

    // console.log(res);

    if (!res?.error) {
      // setTimeout(() => {
      //   console.log("menunggu");
      setLoading("Registering your session...");
      // }, 2000);
      router.push("/backend/dashboard");
    } else {
      setError({ message: res.error });
      setTimeout(() => {
        setError(undefined);
      }, 5000);
      console.log("login error", res);
      setLoading(undefined);
    }

    return;
    // router.push("/dashboard");
  };

  return (
    <form
      className="space-y-5 dark:text-white"
      onSubmit={handleSubmit(processForm)}
    >
      <div>
        <label htmlFor="Email">Username</label>
        <div
          className={clsx("relative text-white-dark", {
            "has-error": errors.username,
          })}
        >
          <input
            id="Email"
            type="text"
            placeholder="Enter Username"
            className="form-input ps-10 placeholder:text-white-dark"
            {...register("username")}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconUser fill={true} />
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <div
          className={clsx("relative text-white-dark", {
            "has-error": errors.password,
          })}
        >
          <input
            id="Password"
            type="password"
            placeholder="Enter Password"
            className="form-input ps-10 placeholder:text-white-dark"
            {...register("password")}
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
        </div>
      </div>

      <button
        type="submit"
        className="btn !mt-6 w-full border-0 bg-green-500 uppercase text-white shadow-[0_10px_20px_-10px_rgba(34,197,94,0.4)] hover:bg-green-600"
        disabled={typeof loading === "string"}
      >
        {loading ? (
          <>
            <span className="inline-block h-3 w-3 animate-ping rounded-full bg-white ltr:mr-4 rtl:ml-4"></span>{" "}
            {loading}
          </>
        ) : (
          "Sign in"
        )}
      </button>
    </form>
  );
};

export default ComponentsAuthLoginForm;
