import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import {
  clearAllProjectErrors,
  getAllProjects,
  resetProjectSlice,
  updateProject,
} from "../store/slices/Project/projectSlice";

const UpdateProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [projectImagePreview, setProjectImagePreview] = useState("");

  const { error, message, loading } = useSelector((state) => state.projects);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  const handleProjectImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setProjectImagePreview(reader.result);
      setProjectImage(file);
    };
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/api/v1/project/get-one-project/${id}`,
          { withCredentials: true },
        );

        const project = res.data.project;

        setTitle(project.title || "");
        setDescription(project.description || "");
        setStack(project.stack || "");
        setDeployed(project.deployed || "");
        setTechnologies(project.technologies || "");
        setGitRepoLink(project.gitRepoLink || "");
        setProjectLink(project.projectLink || "");
        setProjectImagePreview(project.projectImage?.url || "");
      } catch (error) {
        toast.error(error?.response?.data?.message);
      }
    };

    getProject();

    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }

    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [id, message, error, dispatch]);

  const handleUpdateProject = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("deployed", deployed);
    formData.append("stack", stack);
    formData.append("technologies", technologies);
    formData.append("gitRepoLink", gitRepoLink);
    formData.append("projectLink", projectLink);
    formData.append("projectImage", projectImage);

    dispatch(updateProject(id, formData));
  };

  const handleReturnToDashboard = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center">
      <form
        onSubmit={handleUpdateProject}
        className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 md:p-10"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-800">Update Project</h2>

          <button
            type="button"
            onClick={handleReturnToDashboard}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Return to Dashboard
          </button>
        </div>

        <div className="space-y-6">
          {/* Banner */}
          <div>
            <img
              src={projectImagePreview || "/avatarHolder.jpg"}
              alt="Project Image"
              className="w-full h-auto rounded-md shadow mb-4"
            />
            <input
              type="file"
              onChange={handleProjectImage}
              className="w-full text-sm"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Title
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              rows="4"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          {/* Technologies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Technologies
            </label>
            <textarea
              rows="3"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={technologies}
              onChange={(e) => setTechnologies(e.target.value)}
            />
          </div>

          {/* Stack (Simple String Input) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Stack
            </label>
            <input
              type="text"
              placeholder="Example: MERN Stack"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={stack}
              onChange={(e) => setStack(e.target.value)}
            />
          </div>

          {/* Deployed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deployed
            </label>
            <select
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={deployed}
              onChange={(e) => setDeployed(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          {/* GitHub Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              GitHub Repository Link
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={gitRepoLink}
              onChange={(e) => setGitRepoLink(e.target.value)}
            />
          </div>

          {/* Project Link */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Link
            </label>
            <input
              type="text"
              className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-52 bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProject;
