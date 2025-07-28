import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {
  resetProfile,
  updateProfile,
} from "../../store/slices/user/profileSlice.js";
import { clearUserErrors } from "../../store/slices/user/authSlice.js";
import { getUser } from "../../store/slices/user/infoSlice.js";
import Loader from "../../components/Loader";
// import SpecialLoadingButton from "./SpecialLoadingButton";

const UpdateProfile = () => {
  const { loading, error, isUpdated, message } = useSelector(
    (state) => state.profile
  );
  const { user } = useSelector((state) => state.auth);

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [aboutMe, setAboutMe] = useState(user?.aboutMe || "");
  const [portfolioURL, setPortfolioURL] = useState(user?.portfolioURL || "");
  const [linkedInURL, setLinkedInURL] = useState(user?.linkedInURL || "");
  const [githubURL, setGithubURL] = useState(user?.githubURL || "");
  const [instagramURL, setInstagramURL] = useState(user?.instagramURL || "");
  const [twitterURL, setTwitterURL] = useState(user?.twitterURL || "");
  const [facebookURL, setFacebookURL] = useState(user?.facebookURL || "");
  const [avatar, setAvatar] = useState(user?.avatar?.url || "");
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar?.url || "");
  const [resume, setResume] = useState(user?.resume?.url || "");
  const [resumePreview, setResumePreview] = useState(user?.resume?.url || "");

  const dispatch = useDispatch();

  const avatarHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setAvatarPreview(reader.result);
      setAvatar(file);
    };
    reader.readAsDataURL(file);
  };

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setResumePreview(reader.result);
      setResume(file);
    };
    reader.readAsDataURL(file);
  };

  const handleUpdateProfile = () => {
    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("aboutMe", aboutMe);
    formData.append("portfolioURL", portfolioURL);
    formData.append("linkedInURL", linkedInURL);
    formData.append("githubURL", githubURL);
    formData.append("instagramURL", instagramURL);
    formData.append("twitterURL", twitterURL);
    formData.append("facebookURL", facebookURL);
    formData.append("avatar", avatar);
    formData.append("resume", resume);
    dispatch(updateProfile(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearUserErrors());
    }
    if (isUpdated) {
      dispatch(getUser());
      dispatch(resetProfile());
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch, error, isUpdated, message]);

  return (
    <div className="w-full p-4 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Update Profile</h1>
        <p className="text-gray-500">Update Your Profile Here</p>
      </div>

      <div className="grid gap-6">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 space-y-2">
            <label className="font-medium">Profile Image</label>
            <img
              src={avatarPreview || "/avatarHolder.jpg"}
              alt="avatar"
              className="w-full h-auto rounded-xl object-cover"
            />
            <input type="file" onChange={avatarHandler} />
          </div>

          <div className="flex-1 space-y-2">
            <label className="font-medium">Resume</label>
            <Link to={user?.resume?.url} target="_blank">
              <img
                src={resumePreview || "/avatarHolder.jpg"}
                alt="resume"
                className="w-full h-auto rounded-xl object-cover"
              />
            </Link>
            <input type="file" onChange={resumeHandler} />
          </div>
        </div>

        {[
          ["Full Name", fullName, setFullName],
          ["Email", email, setEmail],
          ["Phone", phone, setPhone],
          ["About Me", aboutMe, setAboutMe, true],
          ["Portfolio URL", portfolioURL, setPortfolioURL],
          ["LinkedIn URL", linkedInURL, setLinkedInURL],
          ["Github URL", githubURL, setGithubURL],
          ["Instagram URL", instagramURL, setInstagramURL],
          ["Twitter(X) URL", twitterURL, setTwitterURL],
          ["Facebook URL", facebookURL, setFacebookURL],
        ].map(([label, value, setter, isTextarea], index) => (
          <div key={index} className="space-y-2">
            <label className="font-medium">{label}</label>
            {isTextarea ? (
              <textarea
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
              />
            ) : (
              <input
                type="text"
                value={value}
                onChange={(e) => setter(e.target.value)}
                className="w-full p-2 border rounded-md focus:outline-none focus:ring"
              />
            )}
          </div>
        ))}

        <div>
          {!loading ? (
            <button
              onClick={handleUpdateProfile}
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
            >
              Update Profile
            </button>
          ) : (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
