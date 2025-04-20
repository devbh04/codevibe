"use client";
import React, { useEffect, useState } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import InfoCards from "@/components/shared/infobox";
import { BackgroundLines } from "@/components/ui/background-lines";
import { BoxesCore } from "@/components/ui/background-boxes";
import Footer from "@/components/shared/footer";
import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BASE_URL } from "@/lib/url";
import useUserStore from "@/store/userStore";

const Home = () => {
  const { user, initialize } = useUserStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
    <div className="flex flex-col items-center text-white">
      {/* Hero Section */}
      <div className="w-full max-w-6xl p-4 rounded-xl bg-black mt-10">
        <BackgroundLines className="flex items-center bg-black justify-center w-full flex-col px-4 mb-10 mt-10 py-10">
          <h2 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-300 to-neutral-700 dark:from-neutral-600 dark:to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
            CodeVibe <br /> AI-Powered Coding
          </h2>
          <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
            Supercharge your development workflow with intelligent code
            suggestions, real-time debugging, and personalized learning - all
            powered by cutting-edge AI technology.
          </p>
          <div className="flex gap-4 justify-center mt-10">
            {user ? (
              <p className="text-2xl">Welcome, {user.name}!</p>
            ) : (
              <>
                <Login />
                <Register />
              </>
            )}
          </div>
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
              CodeVibe is the best AI-Driven platform to help you enhance your skills,
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
            Empowering future innovators with AI-driven coding tools, CodeVibe nurtures creativity, logic, and problem-solving from the very first line of code.
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
            From beginners to budding developers, our learners thrive with personalized guidance, hands-on challenges, and the smart support of CodeVibe’s AI.
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


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserStore();

  const handleLogin = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      alert(data.error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-none hover:bg-black border border-slate-700 text-xl h-12 cursor-pointer">Login</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900">
        <DialogHeader>
          <DialogTitle>Log into your profile</DialogTitle>
          <DialogDescription>
            Use your email and password to log into your account
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" className="col-span-3" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" className="col-span-3" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleLogin}  className="bg-slate-800">Login</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useUserStore();

  const handleRegister = async () => {
    const res = await fetch(`${BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password })
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
    } else {
      alert(data.error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-none hover:bg-black border border-slate-700 text-xl h-12 cursor-pointer">Register</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-slate-900">
        <DialogHeader>
          <DialogTitle>Create your Account</DialogTitle>
          <DialogDescription>
            Create your account by giving your name and email. Also set a strong password
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" onChange={(e)=>setName(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" className="col-span-3" onChange={(e)=>setEmail(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Password
            </Label>
            <Input id="password" className="col-span-3" onChange={(e)=>setPassword(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleRegister} className="bg-slate-800">Create my account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}