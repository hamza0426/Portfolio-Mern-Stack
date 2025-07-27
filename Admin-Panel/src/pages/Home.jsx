/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUser,
  FiLogOut,
  FiGrid,
  FiFolder,
  FiClock,
  FiMessageSquare,
  FiPenTool,
  FiMenu,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout, clearUserErrors } from "../store/slices/user/authSlice.js";
import { toast } from "react-toastify";
import Dashboard from "./sub-pages/Dashboard";
import AddProject from "./sub-pages/AddProject";
import AddSkill from "./sub-pages/AddSkill";
import AddApplication from "./sub-pages/AddApplication";
import AddTimeline from "./sub-pages/AddTimeline";
import Messages from "./sub-pages/Messages";
import Account from "./sub-pages/Account.jsx";

const HomePage = () => {
  const [active, setActive] = useState("Dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isLoggedIn, error, user, loading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged Out!");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }
    if (!loading && isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, error, dispatch, navigate]);

  const menuItems = [
    { name: "Dashboard", icon: <FiHome /> },
    { name: "Add Project", icon: <FiFolder /> },
    { name: "Add Skill", icon: <FiPenTool /> },
    { name: "Add Application", icon: <FiGrid /> },
    { name: "Add Timeline", icon: <FiClock /> },
    { name: "Messages", icon: <FiMessageSquare /> },
    { name: "Account", icon: <FiUser /> },
  ];

  const renderContent = () => {
    switch (active) {
      case "Dashboard":
        return <Dashboard />;
      case "Add Project":
        return <AddProject />;
      case "Add Skill":
        return <AddSkill />;
      case "Add Application":
        return <AddApplication />;
      case "Add Timeline":
        return <AddTimeline />;
      case "Messages":
        return <Messages />;
      case "Account":
        return <Account />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen flex-col sm:flex-row bg-gray-100">
      {/* Sidebar */}
      <div className="hidden sm:flex flex-col items-center w-16 bg-white border-r shadow-lg z-40">
        <div className="flex flex-col items-center gap-4 py-6">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`p-2 rounded-md text-xl ${
                active === item.name
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-400 hover:text-black"
              }`}
              onClick={() => setActive(item.name)}
              title={item.name}
            >
              {item.icon}
            </button>
          ))}
        </div>
        <div className="mt-auto py-6">
          <button
            onClick={handleLogout}
            className="p-2 text-gray-400 hover:text-red-500"
            title="Logout"
          >
            <FiLogOut size={20} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Toggle */}
      <div className="sm:hidden flex items-center justify-between px-4 py-3 bg-white border-b shadow-md">
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-gray-600"
        >
          <FiMenu size={24} />
        </button>
        <h1 className="text-xl font-semibold">
          {user ? `Welcome, ${user.fullName}` : "Welcome"}
        </h1>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white px-4 py-2 border-b shadow-sm space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`flex items-center gap-2 w-full text-left p-2 rounded ${
                active === item.name
                  ? "bg-blue-100 text-blue-600"
                  : "text-gray-600 hover:text-black"
              }`}
              onClick={() => {
                setActive(item.name);
                setMobileMenuOpen(false);
              }}
            >
              {item.icon}
              <span>{item.name}</span>
            </button>
          ))}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4">
        <div className="hidden sm:flex items-center gap-4 mb-6">
          {user?.avatar?.url && (
            <img
              src={user.avatar.url}
              alt="User avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <h2 className="text-3xl font-semibold">
            Welcome back, {user?.fullName}
          </h2>
        </div>

        {renderContent()}
      </main>
    </div>
  );
};

export default HomePage;
