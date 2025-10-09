import React, { useEffect, useState } from "react";
import { FaLink } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  addProject,
  clearProjectErrors,
  getAllProjects,
  resetProjectSlice,
} from "../../store/slices/Project/projectSlice.js";
import SpecialLoader from "../../components/SpecialLoader";

const AddProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectImagePreview, setProjectImagePreview] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [deployed, setDeployed] = useState("");

  const handleSvg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectImagePreview(reader.result);
      setProjectImage(file);
    };
  };

  const { loading, error, message } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const addProjectForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("technologies", technologies);
    formData.append("stack", stack);
    formData.append("deployed", deployed);
    formData.append("projectImage", projectImage);
    dispatch(addProject(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex mt-7 justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={addProjectForm} className="w-full px-5 md:w-[1000px]">
        <div className="border-b border-gray-900/10 pb-12">
          <h2 className="font-semibold text-gray-900 text-3xl mb-10">
            ADD NEW PROJECT
          </h2>

          <div className="flex flex-col gap-5">
            {/* Project Title */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Project Title
              </label>
              <input
                type="text"
                placeholder="MERN STACK PORTFOLIO"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Description
              </label>
              <textarea
                placeholder="Feature 1. Feature 2. Feature 3."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none h-28 resize-none"
              />
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Technologies Used In This Project
              </label>
              <textarea
                placeholder="HTML, CSS, JAVASCRIPT, REACT"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none h-20 resize-none"
              />
            </div>

            {/* Stack */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Stack
              </label>
              <input
                type="text"
                placeholder="Enter stack e.g. MERN, MEAN, NEXT.JS"
                value={stack}
                onChange={(e) => setStack(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>

            {/* Deployed */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Deployed
              </label>
              <select
                value={deployed}
                onChange={(e) => setDeployed(e.target.value)}
                className="mt-2 w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
              >
                <option value="">Is this project deployed?</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            {/* GitHub Link */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Github Repository Link
              </label>
              <div className="mt-2 relative">
                <FaLink className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Github Repository Link"
                  value={gitRepoLink}
                  onChange={(e) => setGitRepoLink(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Project Link */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Project Link
              </label>
              <div className="mt-2 relative">
                <FaLink className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Project Deployment Link"
                  value={projectLink}
                  onChange={(e) => setProjectLink(e.target.value)}
                  className="w-full border border-gray-300 rounded-md p-2 pl-10 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
              </div>
            </div>

            {/* Project Banner */}
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Project Banner
              </label>
              <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10">
                <div className="text-center">
                  {projectImagePreview ? (
                    <img
                      className="mx-auto h-[250px] w-full object-contain"
                      src={projectImagePreview}
                      alt="Banner Preview"
                    />
                  ) : (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                  <div className="mt-4 flex text-sm text-gray-600 justify-center">
                    <label className="cursor-pointer text-indigo-600 font-semibold hover:text-indigo-500">
                      Upload a file
                      <input
                        type="file"
                        className="hidden"
                        onChange={handleSvg}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {loading ? (
            <SpecialLoader content={"ADDING NEW PROJECT"} width={"w-56"} />
          ) : (
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none w-56"
            >
              Add Project
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddProject;
