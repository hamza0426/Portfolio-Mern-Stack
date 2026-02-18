import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const ViewProject = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [stack, setStack] = useState("");
  const [gitRepoLink, setGitRepoLink] = useState("");
  const [deployed, setDeployed] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [projectImage, setProjectImage] = useState("");

  const { id } = useParams();
  const navigate = useNavigate();

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
        setProjectImage(project.projectImage?.url || "");
      } catch (error) {
        toast.error(error?.response?.data?.message || "Error loading project");
      }
    };

    getProject();
  }, [id]);

  const handleReturnToManageProjects = () => {
    navigate("/projects");
  };

  const descriptionList = description
    ? description.split(". ").filter((item) => item.trim() !== "")
    : [];

  const technologiesList = technologies
    ? technologies.split(", ").filter((item) => item.trim() !== "")
    : [];

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Project Details</h1>

          <button
            onClick={handleReturnToManageProjects}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Return to Manage Projects
          </button>
        </div>

        {/* Banner Image */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">{title}</h2>

          <img
            src={projectImage || "/avatarHolder.jpg"}
            alt="projectImage"
            className="w-full h-auto rounded-md shadow-sm"
          />
        </div>

        {/* Content Sections */}
        <div className="space-y-8">
          {/* Description */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Description
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {descriptionList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Technologies */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Technologies
            </h3>
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {technologiesList.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Stack */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Stack</h3>
            <p className="text-gray-700">{stack}</p>
          </div>

          {/* Deployed */}
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-800">
              Deployed
            </h3>
            <p className="text-gray-700">{deployed}</p>
          </div>

          {/* GitHub Link */}
          {gitRepoLink && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Github Repository
              </h3>
              <a
                href={gitRepoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline break-words"
              >
                {gitRepoLink}
              </a>
            </div>
          )}

          {/* Project Link */}
          {projectLink && (
            <div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">
                Live Project
              </h3>
              <a
                href={projectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline break-words"
              >
                {projectLink}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewProject;
