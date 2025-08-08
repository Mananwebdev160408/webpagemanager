"use client";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomGradient } from "@/components/ui/bottomgradient";
import { LabelInputContainer } from "@/components/ui/labelinputconstainer";
import axios from "axios";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { NextResponse } from "next/server";
import toast from "react-hot-toast";
export default function login() {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const axiosres = await axios.post("/api/user/login", user);
    if (!axiosres) {
      toast.error("axios side error");
      return NextResponse({ message: "axios side error" });
    }
    toast.success("Login successful");
    console.log(axiosres);
    router.push(`/home/${axiosres.data.existinguser._id}`);
  };
  return (
    <div className=" flex h-screen items-center justify-center bg-slate-900 ">
      <Toaster reverseOrder={false} position="top-center" />
      <div className="shadow-input mx-auto z-50 w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Link Manager
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Login to access your saved links
        </p>

        <form className="my-8 z-50 " onSubmit={handleSubmit}>
          <LabelInputContainer className=" z-50 mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              onChange={(e) => setuser({ ...user, email: e.target.value })}
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
            />
          </LabelInputContainer>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="••••••••"
              type="password"
              onChange={(e) => setuser({ ...user, password: e.target.value })}
            />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
            type="submit"
          >
            Login &rarr;
            <BottomGradient />
          </button>
        </form>
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>{" "}
    </div>
  );
}
