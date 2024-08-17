import {About} from "@/components/about";
import { Contact } from "@/components/contact";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { Projects } from "@/components/projects";
import React from "react";

export default function page() {
  return (
    <div className="">
      <Navbar />
      <Hero />
      <About />
      <Projects/>
      <Contact/>
    </div>
  );
}
