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

         
      <h1 className="text-5xl md:text-[70px] gap-4 flex flex-col sm:text-[60px] lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
        <div className=" flex  gap-4 lg:flex-row flex-col  " >Manage your  <div><ColourfulText text="Important" /></div></div>  Links here
      </h1>
      
        </motion.div>
        <div className=" z-50 flex gap-8 sm:flex-row flex-col justify-center mt-10">
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
