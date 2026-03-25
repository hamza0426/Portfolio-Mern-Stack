import React from "react";
import Hero from "./sub-sections/Hero";
import Timeline from "./sub-sections/Timeline";
import About from "./sub-sections/About";
import Skills from "./sub-sections/Skills";
import Portfolio from "./sub-sections/Projects";
import Applications from "./sub-sections/Applications";
import Contact from "./sub-sections/Contact";

const Home = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section id="home" className="w-full">
        <div className="px-5 md:px-8 lg:px-12 mx-auto w-full max-w-7xl">
          <Hero />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="w-full py-16 md:py-20 lg:py-24">
        <div className="px-5 md:px-8 lg:px-12 mx-auto w-full max-w-7xl">
          <About />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="w-full py-16 md:py-20 lg:py-24">
        <div className="px-5 md:px-8 lg:px-12 mx-auto w-full max-w-7xl">
          <Timeline />
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="w-full py-16 md:py-20 lg:py-24">
        <div className="px-5 md:px-8 lg:px-12 mx-auto w-full max-w-7xl">
          <Skills />
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="w-full py-16 md:py-20 lg:py-24">
        <div className="px-5 md:px-8 lg:px-12 mx-auto w-full max-w-7xl">
          <Portfolio />
        </div>
      </section>

      {/* Applications Section */}
      <section id="applications" className="w-full py-16 md:py-20 lg:py-24">
        <div className="px-5 md:px-8 lg:px-12 mx-auto w-full max-w-7xl">
          <Applications />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full py-16 md:py-20 lg:py-24">
        <div className="px-5 md:px-8 lg:px-12 mx-auto w-full max-w-7xl">
          <Contact />
        </div>
      </section>
    </div>
  );
};

export default Home;

// import React from "react";
// import Hero from "./sub-sections/Hero";
// import Timeline from "./sub-sections/Timeline";
// import About from "./sub-sections/About";
// import Skills from "./sub-sections/Skills";
// import Portfolio from "./sub-sections/Portfolio";
// import Applications from "./sub-sections/Applications";
// import Contact from "./sub-sections/Contact";

// const Home = () => {
//   return (
//     <article className="px-5 mt-10 sm:mt-14 md:mt-16 lg:mt-24 xl:mt-32 sm:mx-auto w-full max-w-[1050px] flex flex-col gap-14">
//       <Hero />
//       <Timeline />
//       <About />
//       <Skills />
//       <Portfolio />
//       <Applications />
//       <Contact />
//     </article>
//   );
// };

// export default Home;
