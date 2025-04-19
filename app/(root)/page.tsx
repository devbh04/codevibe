"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import InfoCards from "@/components/shared/infobox";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "@/components/ui/background-lines";
import { BoxesCore } from "@/components/ui/background-boxes";
import Footer from "@/components/shared/footer";

const Home = () => {
  return (
    <>
    <div className="flex flex-col items-center text-white">
      {/* Hero Section */}
      <div className="w-full max-w-6xl p-4 rounded-xl bg-black my-10">
        <BackgroundLines className="flex items-center bg-black justify-center w-full flex-col px-4 mb-20 mt-10 py-10">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-300 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            CodeVibe <br /> AI-Powered Coding
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Supercharge your development workflow with intelligent code
            suggestions, real-time debugging, and personalized learning - all
            powered by cutting-edge AI technology.
          </p>
        </BackgroundLines>
      </div>

      {/* Other sections */}
      <div className="w-full max-w-6xl space-y-20 my-10">
        {/* Boxes Section with Image */}
        <div className="relative w-[full] overflow-hidden bg-slate-black flex flex-col items-center justify-center rounded-lg h-[650px]">
          {/* Background Boxes */}
          <div className="absolute inset-0 w-full h-full z-10">
            <BoxesCore />
          </div>
          
          {/* Background Overlay */}
          <div className="absolute inset-0 w-full h-full bg-slate-900/80 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />
          
          {/* Image Container */}
          <div className="relative z-30 w-full max-w-5xl h-full flex items-center justify-center p-4">
            <img
              src="codeeditorpage.png"
              alt="Code Editor Example"
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        <div className="flex justify-center">
          <DotLottieReact
            className="h-96"
            src="https://lottie.host/8ba59d92-c070-4a44-8816-23f5efd18f02/KQqnIrJPQs.lottie"
            loop
            autoplay
          />
          <div className="flex flex-col justify-center gap-10">
            <h1 className="flex justify-center text-4xl">A New Way to Learn</h1>
            <p className="flex justify-center w-96 text-slate-300 text-center">
              LeetCode is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col justify-center gap-10">
            <h1 className="flex justify-center text-4xl">
              We Create Bright Minds
            </h1>
            <p className="flex justify-center w-96 text-slate-300 text-center">
              LeetCode is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </p>
          </div>
          <DotLottieReact
            className="h-96"
            src="https://lottie.host/ce984ff6-7b85-45aa-9f36-bd91064d3cdb/iyAAgNZsd2.lottie"
            loop
            autoplay
          />
        </div>
        <div className="flex justify-center">
          <DotLottieReact
            className="h-96"
            src="https://lottie.host/ceafab49-4fb2-45d5-945b-7e753c78a8fc/S4fw1BdTVH.lottie"
            loop
            autoplay
          />
          <div className="flex flex-col justify-center gap-10">
            <h1 className="flex justify-center text-4xl">Our Learners</h1>
            <p className="flex justify-center w-96 text-slate-300 text-center">
              LeetCode is the best platform to help you enhance your skills,
              expand your knowledge and prepare for technical interviews.
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          <div className="grid justify-center p-4">
            <h1 className="flex justify-center text-4xl text-center">
              Valued by Coding Enthusiasts Globally.
            </h1>
            <p className="flex justify-center text-xl mt-2 text-center">
              Empowering the Global Network of Competitive Coding.
            </p>
          </div>
          <InfoCards />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Home;
