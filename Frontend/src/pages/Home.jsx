import React from "react";
import Hero from "./sub-sections/Hero";
import Timeline from "./sub-sections/Timeline";
import About from "./sub-sections/About";
import Skills from "./sub-sections/Skills";
import Portfolio from "./sub-sections/Portfolio";
import Applications from "./sub-sections/Applications";
import Contact from "./sub-sections/Contact";

const Home = () => {
  return (
    <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
      <Hero />
      <Timeline />
      <About />
      <Skills />
      <Portfolio />
      <Applications />
      <Contact />
    </article>
  );
};

export default Home;
