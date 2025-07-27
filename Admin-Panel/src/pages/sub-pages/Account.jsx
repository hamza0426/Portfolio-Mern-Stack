import { useState } from "react";
import UpdatePassword from "./UpdatePassword";
import Profile from "./Profile";
import UpdateProfile from "./UpdateProfile";

const Account = () => {
  const [selectedComponent, setSelectedComponent] = useState("Profile");

  const renderComponent = () => {
    switch (selectedComponent) {
      case "Profile":
        return <Profile />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      default:
        return <Profile />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-1 flex flex-col gap-6 bg-gray-100 p-4 md:flex-row">
        {/* Sidebar */}
        <nav className="w-full md:w-1/4 bg-white p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Settings</h2>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedComponent("Profile")}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedComponent === "Profile"
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedComponent("Update Profile")}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedComponent === "Update Profile"
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Update Profile
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedComponent("Update Password")}
                className={`w-full text-left px-3 py-2 rounded ${
                  selectedComponent === "Update Password"
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Update Password
              </button>
            </li>
          </ul>
        </nav>

        {/* Content */}
        <div className="w-full md:w-3/4 bg-white p-4 rounded shadow-md">
          {renderComponent()}
        </div>
      </main>
    </div>
  );
};

export default Account;
