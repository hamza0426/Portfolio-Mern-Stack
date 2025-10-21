import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  getAllApplications,
  resetApplicationSlice,
} from "../../store/slices/Application/applicationSlice.js";
import { clearAllSkillErrors } from "../../store/slices/Skill/skillSlice.js";
import { clearAllTimelineErrors } from "../../store/slices/Timeline/timelineSlice.js";
import { clearAllProjectErrors } from "../../store/slices/Project/projectSlice.js";
import SpecialLoader from "../../components/SpecialLoader.jsx";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const gotoMangeSkills = () => navigate("/skills");
  const gotoMangeTimeline = () => navigate("/timeline");
  const gotoMangeProjects = () => navigate("/update-project");

  const { user } = useSelector((state) => state.auth);
  const {
    skills,
    loading: skillLoading,
    error: skillError,
  } = useSelector((state) => state.skills);
  const {
    applications,
    loading: applicationsLoading,
    error: applicationError,
    message: appMessage,
  } = useSelector((state) => state.applications);
  const {
    timeline,
    loading: timelineLoading,
    error: timelineError,
  } = useSelector((state) => state.timelines);
  const { projects, error: projectError } = useSelector(
    (state) => state.projects
  );

  const [applicationId, setApplicationId] = useState(null);

  const btnDeleteApplication = (id) => {
    setApplicationId(id);
    dispatch(deleteApplication(id));
  };

  useEffect(() => {
    if (skillError) {
      toast.error(skillError);
      dispatch(clearAllSkillErrors());
    }
    if (applicationError) {
      toast.error(applicationError);
      dispatch(clearAllApplicationErrors());
    }
    if (projectError) {
      toast.error(projectError);
      dispatch(clearAllProjectErrors());
    }
    if (appMessage) {
      toast.success(appMessage);
      setApplicationId(null);
      dispatch(resetApplicationSlice());
      dispatch(getAllApplications());
    }
    if (timelineError) {
      toast.error(timelineError);
      dispatch(clearAllTimelineErrors());
    }
  }, [
    dispatch,
    skillError,
    skillLoading,
    applicationError,
    applicationsLoading,
    appMessage,
    timelineError,
    timelineLoading,
    projectError,
  ]);

  return (
    <div className="flex flex-col gap-4 p-4 sm:pl-14">
      <main className="grid gap-4 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid gap-4 md:gap-8 lg:col-span-2">
          {/* --- Top Stats Section --- */}
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {/* About Me Card */}
            <div className="sm:col-span-2 bg-white shadow-md rounded-xl p-6">
              <p className="text-gray-700 mb-4">{user?.aboutMe}</p>
              <button className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500">
                Visit Portfolio
              </button>
            </div>

            {/* Projects */}
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Projects Completed</h3>
              <p className="text-5xl font-bold mb-4">
                {projects && projects.length}
              </p>
              <button
                onClick={gotoMangeProjects}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
              >
                Manage Projects
              </button>
            </div>

            {/* Skills */}
            <div className="bg-white shadow-md rounded-xl p-6 flex flex-col justify-center">
              <h3 className="text-xl font-semibold mb-2">Skills</h3>
              <p className="text-5xl font-bold mb-4">
                {skills && skills.length}
              </p>
              <button
                onClick={gotoMangeSkills}
                className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500"
              >
                Manage Skills
              </button>
            </div>
          </div>

          {/* --- Projects Table --- */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Projects</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b bg-gray-100 text-gray-700">
                    <th className="py-2 px-3">Title</th>
                    <th className="py-2 px-3 hidden md:table-cell">Stack</th>
                    <th className="py-2 px-3 hidden md:table-cell">Deployed</th>
                    <th className="py-2 px-3">Update</th>
                    <th className="py-2 px-3 text-right">Visit</th>
                  </tr>
                </thead>
                <tbody>
                  {projects && projects.length > 0 ? (
                    projects.map((element) => (
                      <tr key={element._id} className="border-b">
                        <td className="py-2 px-3">{element.title}</td>
                        <td className="py-2 px-3 hidden md:table-cell">
                          {element.stack}
                        </td>
                        <td className="py-2 px-3 hidden md:table-cell">
                          <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-md">
                            {element.deployed}
                          </span>
                        </td>
                        <td className="py-2 px-3">
                          <Link to={`/update-project/${element._id}`}>
                            <button className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">
                              Update
                            </button>
                          </Link>
                        </td>
                        <td className="py-2 px-3 text-right">
                          <Link to={element.projectLink} target="_blank">
                            <button className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
                              Visit
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="py-4 text-xl">
                        You have not added any project.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* --- Skills List --- */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">Skills</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {skills && skills.length > 0 ? (
                skills.map((element) => (
                  <div
                    key={element._id}
                    className="bg-gray-50 p-4 rounded-md shadow-sm"
                  >
                    <h3 className="font-semibold mb-2">{element.title}</h3>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-indigo-600 h-2 rounded-full"
                        style={{ width: `${element.proficiency}%` }}
                      ></div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xl">You have not added any skill.</p>
              )}
            </div>
          </div>

          {/* --- Software Applications & Timeline --- */}
          <div className="grid min-[1050px]:grid-cols-2 gap-4">
            {/* Software Applications */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <h2 className="text-2xl font-semibold mb-4">
                Software Applications
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-2 px-3 text-left">Name</th>
                      <th className="py-2 px-3 text-left">Icon</th>
                      <th className="py-2 px-3 text-center">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {applications && applications.length > 0 ? (
                      applications.map((element) => (
                        <tr key={element._id} className="border-b">
                          <td className="py-2 px-3">{element.name}</td>
                          <td className="py-2 px-3">
                            <img
                              src={element.svg?.url}
                              alt={element.name}
                              className="w-7 h-7"
                            />
                          </td>
                          <td className="py-2 px-3 text-center">
                            {applicationsLoading &&
                            applicationId === element._id ? (
                              <SpecialLoader content="Deleting" width="w-fit" />
                            ) : (
                              <button
                                onClick={() =>
                                  btnDeleteApplication(element._id)
                                }
                                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                              >
                                Delete
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-4 text-xl">
                          You have not added any software application.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white shadow-md rounded-xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold">Timeline</h2>
                <button
                  onClick={gotoMangeTimeline}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-500"
                >
                  Manage Timeline
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="py-2 px-3 text-left">Title</th>
                      <th className="py-2 px-3 text-left">From</th>
                      <th className="py-2 px-3 text-right">To</th>
                    </tr>
                  </thead>
                  <tbody>
                    {timeline && timeline.length > 0 ? (
                      timeline.map((element) => (
                        <tr key={element._id} className="border-b">
                          <td className="py-2 px-3">{element.title}</td>
                          <td className="py-2 px-3">{element.timeline.from}</td>
                          <td className="py-2 px-3 text-right">
                            {element.timeline.to}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td className="py-4 text-xl">
                          You have not added any timeline.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
