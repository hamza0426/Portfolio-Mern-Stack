import React, { useEffect, useState } from "react";
import {
  Github,
  Linkedin,
  Twitter,
  Mail,
  ExternalLink,
  Download,
} from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";

const Hero = () => {
  const [user, setUser] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getProfile = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/user/get-user-portfolio",
          { withCredentials: true },
        );
        setUser(data.user);
        setIsLoaded(true);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setIsLoaded(true);
      }
    };
    getProfile();
  }, []);

  return (
    <section
      id="home"
      className="pt-[100px] pb-16 md:pb-24 lg:pb-32 px-4 md:px-8 lg:px-12 animate-fade-in"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="flex flex-col justify-center">
            {/* Main Heading */}
            <div className="mb-8 animate-fade-in">
              <p
                className="text-sm uppercase tracking-widest font-semibold mb-2"
                style={{ color: "var(--text-tertiary)" }}
              >
                Welcome to my portfolio
              </p>

              <h1 className="mb-4" style={{ color: "var(--text-primary)" }}>
                Muhammad Hamza
                <br />
                <span style={{ color: "var(--accent-primary)" }}>Owais</span>
              </h1>

              <p
                className="text-lg md:text-xl font-medium mb-2"
                style={{ color: "var(--accent-primary)" }}
              >
                Software Engineer
              </p>

              <p
                className="text-base md:text-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                Full Stack Developer • MERN Stack • Java Backend
              </p>
            </div>

            {/* About Text */}
            {user.aboutMe && (
              <p
                className="text-base leading-relaxed mb-10 max-w-lg"
                style={{ color: "var(--text-secondary)" }}
              >
                {user.aboutMe}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in">
              <Link
                to={user.githubURL || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-primary w-full sm:w-auto flex items-center justify-center gap-2">
                  <Github size={20} />
                  View GitHub
                </button>
              </Link>

              <Link
                to={user.resume?.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button className="btn btn-secondary w-full sm:w-auto flex items-center justify-center gap-2">
                  <Download size={20} />
                  Download Resume
                </button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {user.linkedInURL && (
                <Link
                  to={user.linkedInURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <Linkedin size={20} />
                </Link>
              )}
              {user.twitterURL && (
                <Link
                  to={user.twitterURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
                  style={{
                    backgroundColor: "var(--accent-light)",
                    color: "var(--accent-primary)",
                  }}
                >
                  <Twitter size={20} />
                </Link>
              )}
              <button
                className="p-3 rounded-lg transition-all duration-300 hover:scale-110"
                style={{
                  backgroundColor: "var(--accent-light)",
                  color: "var(--accent-primary)",
                }}
              >
                <Mail size={20} />
              </button>
            </div>
          </div>

          {/* Right Side - Profile Image */}
          <div className="hidden lg:flex justify-center items-center">
            <div className="relative w-80 h-80">
              {/* Gradient Background Circle */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)",
                  opacity: 0.1,
                }}
              ></div>

              {/* Profile Image Container */}
              <div
                className="relative w-full h-full rounded-2xl overflow-hidden border-4 border-[var(--border-color)] shadow-2xl"
                style={{ backgroundColor: "var(--bg-secondary)" }}
              >
                {/* Placeholder for profile image */}
                {user.avatar?.url ? (
                  <img
                    src={user.avatar.url}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center flex-col gap-4"
                    style={{ backgroundColor: "var(--accent-light)" }}
                  >
                    <div
                      className="w-20 h-20 rounded-full"
                      style={{
                        backgroundColor: "var(--accent-primary)",
                        opacity: 0.3,
                      }}
                    ></div>
                    <p
                      className="text-sm"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      Profile Image
                    </p>
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border-2 border-[var(--accent-primary)] opacity-30"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-full border-2 border-[var(--accent-primary)] opacity-20"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="divider"></div>
    </section>
  );
};

export default Hero;

// import {
//   ExternalLink,
//   Facebook,
//   Github,
//   Instagram,
//   Linkedin,
//   Twitter,
//   Youtube,
// } from "lucide-react";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Typewriter } from "react-simple-typewriter";
// import axios from "axios";

// const Hero = () => {
//   const [user, setUser] = useState({});

//   useEffect(() => {
//     const getMyProfile = async () => {
//       const { data } = await axios.get(
//         "http://localhost:4000/api/v1/user/get-user-portfolio",
//         { withCredentials: true },
//       );
//       setUser(data.user);
//     };
//     getMyProfile();
//   }, []);

//   return (
//     <div className="w-full bg-red-500">
//       <div className="flex items-center gap-2 mb-2">
//         <span className="bg-green-400 rounded-full h-2 w-2"></span>
//         <p>Online</p>
//       </div>

//       <h1
//         className="overflow-x-hidden text-[1.3rem] sm:text-[1.75rem]
//       md:text-[2.2rem] lg:text-[2.8rem] tracking-[2px] mb-4"
//       >
//         Hey, I'm Muhammad Hamza Owais
//       </h1>

//       <h1
//         className="text-tubeLight-effect overflow-x-hidden text-[1.3rem]
//       sm:text-[1.75rem] md:text-[2.2rem] lg:text-[2.8rem] tracking-[15px]"
//       >
//         <Typewriter
//           words={["FULLSTACK DEVELOPER", "FREELANCER"]}
//           loop={50}
//           cursor
//           typeSpeed={70}
//           deleteSpeed={50}
//           delaySpeed={1000}
//         />
//       </h1>

//       <div
//         className="w-fit px-5 py-2 bg-slate-50 rounded-[20px] flex gap-5
//       items-center mt-4 md:mt-8 lg:mt-10"
//       >
//         <Link to={"https://www.youtube.com/@CodeWithZeeshu"} target="_blank">
//           <Youtube className="text-red-500 w-7 h-7" />
//         </Link>

//         <Link to={user.instagramURL} target="_blank">
//           <Instagram className="text-pink-500 w-7 h-7" />
//         </Link>

//         <Link to={user.facebookURL} target="_blank">
//           <Facebook className="text-blue-800 w-7 h-7" />
//         </Link>

//         <Link to={user.linkedInURL} target="_blank">
//           <Linkedin className="text-sky-500 w-7 h-7" />
//         </Link>

//         <Link to={user.twitterURL} target="_blank">
//           <Twitter className="text-blue-800 w-7 h-7" />
//         </Link>
//       </div>

//       <div className="mt-4 md:mt-8 lg:mt-10 flex gap-3">
//         <Link to={user.githubURL} target="_blank">
//           <button className="rounded-[30px] flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition">
//             <Github />
//             <span>Github</span>
//           </button>
//         </Link>

//         <Link to={user.resume && user.resume.url} target="_blank">
//           <button className="rounded-[30px] flex items-center gap-2 px-4 py-2 bg-black text-white hover:bg-gray-800 transition">
//             <ExternalLink />
//             <span>Resume</span>
//           </button>
//         </Link>
//       </div>

//       <p className="mt-8 text-xl tracking-[2px]">{user.aboutMe}</p>

//       <hr className="my-8 md:my-10" />
//     </div>
//   );
// };

// export default Hero;
