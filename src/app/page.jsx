"use client";
import { motion } from "motion/react";
import React from "react";
import { useRouter } from "next/navigation";
import {ColourfulText} from "@/components/ui/colourful-text";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <AuroraBackground>
        <motion.div
          initial={{ opacity: 0.0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
        >

         
      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        Manage your  <ColourfulText text="Important" /> <br /> Links here
      </h1>
      
        </motion.div>
        <div className=" z-50 flex gap-8 justify-center mt-10">
          <button onClick={()=>router.push("/login")} className=" cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Login
          </button>
          <button onClick={()=>router.push("/signup")} className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Signup
          </button>
        </div>
      </AuroraBackground>
    </>
  );
}
