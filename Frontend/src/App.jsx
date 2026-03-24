import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ProjectView from "./pages/ProjectView";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      style={{
        backgroundColor: "var(--bg-page)",
        color: "var(--text-primary)",
        fontFamily: "var(--font-body)",
        minHeight: "100vh",
        transition: "background-color 0.3s, color 0.3s",
      }}
    >
      <Router>
        {/* ── Dark / Light Toggle Button ───────────────────────────── */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          aria-label="Toggle dark mode"
          style={{
            position: "fixed",
            top: "1.25rem",
            right: "1.25rem",
            zIndex: 50,
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            border: "1px solid var(--border-col)",
            backgroundColor: "var(--bg-surface)",
            color: "var(--text-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-ember)";
            e.currentTarget.style.color = "var(--color-ember)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border-col)";
            e.currentTarget.style.color = "var(--text-muted)";
          }}
        >
          {darkMode ? <Sun size={17} /> : <Moon size={17} />}
        </button>

        <ToastContainer
          position="bottom-right"
          autoClose={3000}
          pauseOnHover
          theme={darkMode ? "dark" : "light"}
        />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project/:id" element={<ProjectView />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;

// import "./App.css";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/Home";
// import Footer from "./pages/Footer";
// import ProjectView from "./pages/ProjectView";
// import { useEffect, useState } from "react";

// function App() {
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   return (
//     <div className="bg-white dark:bg-gray-900 text-black dark:text-white min-h-screen">
//       <Router>
//         <button
//           onClick={() => setDarkMode(!darkMode)}
//           className="fixed top-5 right-5 z-50 bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded hover:opacity-80 transition"
//         >
//           Toggle Theme
//         </button>
//         <h1 className="ml-4 text-3xl">Hello Theme</h1>
//         <ToastContainer
//           position="bottom-right"
//           autoClose={3000}
//           pauseOnHover={true}
//         />
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/project/:id" element={<ProjectView />} />
//           {/* <Route path="/" element={<Home />} /> */}
//         </Routes>
//         <Footer />
//       </Router>
//     </div>
//   );
// }

// export default App;
