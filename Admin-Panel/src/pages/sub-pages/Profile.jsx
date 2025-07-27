import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="w-full p-4">
      <div className="grid gap-6">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-gray-500">Full Profile Preview</p>
        </div>

        <div className="grid gap-4">
          <div className="flex flex-col lg:flex-row gap-5 justify-between">
            <div className="w-full sm:w-72">
              <label className="block mb-1 font-semibold">Profile Image</label>
              <img
                src={user?.avatar?.url}
                alt="avatar"
                className="w-full h-auto rounded-2xl"
              />
            </div>

            <div className="w-full sm:w-72">
              <label className="block mb-1 font-semibold">Resume</label>
              <Link
                to={user?.resume?.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={user?.resume?.url}
                  alt="resume"
                  className="w-full h-auto rounded-2xl"
                />
              </Link>
            </div>
          </div>

          <div>
            <label className="block mb-1 font-semibold">Full Name</label>
            <input
              type="text"
              value={user?.fullName || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Phone</label>
            <input
              type="text"
              value={user?.phone || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">About Me</label>
            <textarea
              value={user?.aboutMe || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
              rows={4}
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Portfolio URL</label>
            <input
              type="text"
              value={user?.portfolioURL || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Github URL</label>
            <input
              type="text"
              value={user?.githubURL || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">LinkedIn URL</label>
            <input
              type="text"
              value={user?.linkedInURL || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Instagram URL</label>
            <input
              type="text"
              value={user?.instagramURL || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Twitter(X) URL</label>
            <input
              type="text"
              value={user?.twitterURL || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div>
            <label className="block mb-1 font-semibold">Facebook URL</label>
            <input
              type="text"
              value={user?.facebookURL || ""}
              disabled
              className="w-full px-3 py-2 border rounded-lg bg-gray-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
