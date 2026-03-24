import {
  ExternalLink,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  MapPin,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

/* ── Role display config ────────────────────────────────────────────────
   One large primary role + smaller supporting skill chips.
   Edit these to match exactly what you want to show.
────────────────────────────────────────────────────────────────────────── */
const ROLES = [
  { label: "Software Engineer", primary: true },
  { label: "MERN Stack Developer", primary: false },
  { label: "Python / Flask", primary: false },
];

const Hero = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const getMyProfile = async () => {
      const { data } = await axios.get(
        "http://localhost:4000/api/v1/user/get-user-portfolio",
        { withCredentials: true },
      );
      setUser(data.user);
    };
    getMyProfile();
  }, []);

  return (
    <section className="w-full">
      {/*
        ── Layout ────────────────────────────────────────────────────
        Mobile:  single column, avatar stacked above text
        lg+:     two columns — text left, avatar right
      */}
      <div className="flex flex-col-reverse lg:flex-row lg:items-center lg:justify-between gap-10 lg:gap-8">
        {/* ══ LEFT — Text ════════════════════════════════════════════ */}
        <div
          className="flex-1 flex flex-col gap-5"
          style={{ animation: "fadeUp 0.6s ease forwards" }}
        >
          {/* Greeting mono label */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              letterSpacing: "3px",
              textTransform: "uppercase",
              color: "var(--color-ember)",
              margin: 0,
            }}
          >
            Hello, I'm
          </p>

          {/* Name */}
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 600,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              lineHeight: 1.15,
              color: "var(--text-primary)",
              margin: 0,
            }}
          >
            Muhammad Hamza Owais
          </h1>

          {/* ── Role display ─────────────────────────────────────────
              Primary = large ember-colored title
              Secondary = small monospace chips
          */}
          <div className="flex flex-wrap items-center gap-2">
            {ROLES.map(({ label, primary }) =>
              primary ? (
                <span
                  key={label}
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    fontWeight: 600,
                    letterSpacing: "0.02em",
                    color: "var(--color-ember)",
                  }}
                >
                  {label}
                </span>
              ) : (
                <span
                  key={label}
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.7rem",
                    fontWeight: 500,
                    letterSpacing: "0.05em",
                    padding: "4px 12px",
                    borderRadius: "999px",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border-col)",
                    backgroundColor: "var(--bg-surface)",
                  }}
                >
                  {label}
                </span>
              ),
            )}
          </div>

          {/* Location */}
          <div
            className="flex items-center gap-1.5"
            style={{ color: "var(--text-muted)", fontSize: "0.85rem" }}
          >
            <MapPin
              size={13}
              style={{ color: "var(--color-ember)", flexShrink: 0 }}
            />
            <span>Karachi, Pakistan</span>
          </div>

          {/* Bio from backend */}
          {user.aboutMe && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.95rem",
                lineHeight: 1.75,
                color: "var(--text-muted)",
                maxWidth: "480px",
                margin: 0,
              }}
            >
              {user.aboutMe}
            </p>
          )}

          {/* ── CTA Buttons ──────────────────────────────────────── */}
          <div className="flex flex-wrap gap-3 mt-1">
            <Link to={user.githubURL || "#"} target="_blank">
              <button
                className="flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  padding: "10px 22px",
                  backgroundColor: "var(--color-ember)",
                  color: "#ffffff",
                  border: "none",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-amber)";
                  e.currentTarget.style.color = "#1A1A2E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--color-ember)";
                  e.currentTarget.style.color = "#ffffff";
                }}
              >
                <Github size={15} />
                GitHub
              </button>
            </Link>

            <Link to={user.resume?.url || "#"} target="_blank">
              <button
                className="flex items-center gap-2 rounded-full text-sm font-medium transition-all duration-200"
                style={{
                  fontFamily: "var(--font-body)",
                  padding: "10px 22px",
                  backgroundColor: "transparent",
                  color: "var(--text-primary)",
                  border: "1px solid var(--border-col)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-ember)";
                  e.currentTarget.style.color = "var(--color-ember)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border-col)";
                  e.currentTarget.style.color = "var(--text-primary)";
                }}
              >
                <ExternalLink size={15} />
                Resume
              </button>
            </Link>
          </div>

          {/* ── Social Icons ─────────────────────────────────────── */}
          <div className="flex items-center gap-1 mt-1">
            {[
              {
                href: "https://www.youtube.com/@CodeWithZeeshu",
                Icon: Youtube,
                hoverColor: "#ef4444",
              },
              {
                href: user.instagramURL,
                Icon: Instagram,
                hoverColor: "#ec4899",
              },
              { href: user.facebookURL, Icon: Facebook, hoverColor: "#2563eb" },
              { href: user.linkedInURL, Icon: Linkedin, hoverColor: "#0ea5e9" },
              { href: user.twitterURL, Icon: Twitter, hoverColor: "#38bdf8" },
            ].map(({ href, Icon, hoverColor }) => (
              <Link
                key={hoverColor}
                to={href || "#"}
                target="_blank"
                className="flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: "36px",
                  height: "36px",
                  color: "var(--text-muted)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--bg-surface)";
                  e.currentTarget.style.color = hoverColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--text-muted)";
                }}
              >
                <Icon size={18} />
              </Link>
            ))}
          </div>
        </div>

        {/* ══ RIGHT — Avatar Placeholder ══════════════════════════════
            Replace the inner content with your <img> when ready:
              <img
                src={user.avatar?.url}
                alt="Muhammad Hamza Owais"
                className="w-full h-full object-cover object-top"
              />
        */}
        <div
          className="flex-shrink-0 mx-auto lg:mx-0 rounded-2xl relative overflow-hidden flex flex-col items-center justify-center gap-3"
          style={{
            width: "clamp(200px, 30vw, 320px)",
            height: "clamp(230px, 35vw, 380px)",
            backgroundColor: "var(--bg-surface)",
            border: "1px solid var(--border-col)",
            animation: "fadeIn 0.7s ease forwards",
          }}
        >
          {/* Ember corner accent — top right */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 56,
              height: 56,
              backgroundColor: "var(--color-ember)",
              opacity: 0.08,
              borderBottomLeftRadius: 16,
            }}
          />
          {/* Amber corner accent — bottom left */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: 36,
              height: 36,
              backgroundColor: "var(--color-amber)",
              opacity: 0.1,
              borderTopRightRadius: 16,
            }}
          />

          {/* Initials circle */}
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              backgroundColor: "rgba(232, 99, 10, 0.1)",
              border: "2px solid rgba(232, 99, 10, 0.25)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.4rem",
                fontWeight: 600,
                color: "var(--color-ember)",
              }}
            >
              MH
            </span>
          </div>

          <p
            style={{
              fontSize: "0.75rem",
              color: "var(--text-muted)",
              margin: 0,
            }}
          >
            Add your photo here
          </p>
        </div>
      </div>

      {/* Section divider */}
      <div
        style={{
          marginTop: "3.5rem",
          borderTop: "1px solid var(--border-col)",
        }}
      />
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
