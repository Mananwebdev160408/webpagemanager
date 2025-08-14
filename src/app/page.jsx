"use client";
import { motion } from "motion/react";
import React from "react";
import { useRouter } from "next/navigation";
import { ColourfulText } from "@/components/ui/colourful-text";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Image from "next/image";
export default function Home() {
  const router = useRouter();
  return (
    <>
      <AuroraBackground>
        <div className="flex flex-col-reverse md:flex-row h-screen">
          <section className="left w-[100vw] sm:w-[50vw]  border-0 flex  justify-center flex-col gap-10  pl-16 ">
          {" "}
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <h1 className="flex flex-col gap-4">
              <div className="text-5xl md:text-[70px]   sm:text-[60px] lg:text-6xl font-bold  text-white relative z-2 font-sans">
                Manage Your Web Pages Effortlessly
              </div>
              <div className="text-3xl md:text-[40px] leading-12   sm:text-[40px] lg:text-3xl font-bold  text-white relative z-2 font-sans">
                Save any link, give it a name,
                <br />
                add a description
              </div>
              <div className="text-5xl md:text-[60px]   sm:text-[60px] lg:text-8xl font-bold  relative z-2 font-sans ">
                <ColourfulText className="" text="PagePilot" />
              </div>
            </h1>
          </motion.div>
          <div className="scale-150  ml-46  mt-10">
            <motion.button
              initial={{ opacity: 0.0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.3,
                duration: 0.8,
                ease: "easeInOut",
              }}
              onClick={() => router.push("/login")}
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Get Started
            </motion.button>
          </div>
        </section>
        <section className="right w-[100vw] sm:w-[50vw]  flex items-center justify-center  ">
          <motion.div
            initial={{ opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="z-50"
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
          >
            <Image
          src="/app.png"
          alt="App Image"
          width={800}
          height={500}
          className="w-[800px] h-[500px] z-50 object-fill border-4 rounded-2xl border-violet-700  "
          
          />
          </motion.div>
        </section>

          </div>{" "}
      </AuroraBackground>
    </>
  );
}
