"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { BottomGradient } from "@/components/ui/bottomgradient";
import { LabelInputContainer } from "@/components/ui/labelinputconstainer";
import toast from "react-hot-toast";
export default function Signup() {
  const [user, setuser] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        console.log(user);
        const axiosres = await axios.post("/api/user/signup", user);
        if (!axiosres){
          toast.error("axios side error");
          return NextResponse({ message: "axios side error" });
        }
        console.log(axiosres);
        toast.success("Signup successful");
        router.push('/login')
    } catch (error) {
        console.log(error);
        
    }
  };
  return (
    <div className=" flex h-screen items-center justify-center bg-slate-900 ">
      <div className="shadow-input mx-auto z-50 w-full max-w-md rounded-none bg-white p-4 md:rounded-2xl md:p-8 dark:bg-black">
        <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
          Welcome to Link Manager
        </h2>
        <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
          Create an account to maintain your links
        </p>

        <form className="my-8 z-50 " onSubmit={handleSubmit}>
          <LabelInputContainer className=" z-50 mb-4">
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              placeholder="Manan Gupta"
              type="text"
              onChange={(e) => setuser({ ...user, name: e.target.value })}
            />
          </LabelInputContainer>
          <LabelInputContainer className=" z-50 mb-4">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              placeholder="projectmayhem@fc.com"
              type="email"
              onChange={(e) => setuser({ ...user, email: e.target.value })}
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
            Sign up &rarr;
            <BottomGradient />
          </button>
        </form>
        <p className="text-center text-sm text-neutral-600 dark:text-neutral-300">
          Already have an account? <a href="/login" className="text-blue-500 hover:underline">Login</a>
        </p>
      </div>{" "}
    </div>
  );
}
