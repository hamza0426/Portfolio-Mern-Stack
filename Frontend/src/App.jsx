import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Footer from "./pages/Footer";
import ProjectView from "./pages/ProjectView";
import Header from "./pages/Header";
import { useEffect, useState } from "react";

function App() {
  const [isDark, setIsDark] = useState(() => {
    // Initialize from localStorage
    return localStorage.getItem("portfolio-dark-mode") === "true";
  });

  // Update dark mode class on mount and when isDark changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  // Handle dark mode toggle
  const handleDarkModeToggle = (newState) => {
    setIsDark(newState);
    localStorage.setItem("portfolio-dark-mode", newState.toString());
  };

  return (
    <div>
      <Router>
        <Header isDark={isDark} setIsDark={handleDarkModeToggle} />

        <main>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            pauseOnHover={true}
          />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectView />} />
          </Routes>
        </main>

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
