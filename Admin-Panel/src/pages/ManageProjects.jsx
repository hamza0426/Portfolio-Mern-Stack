import { Eye, Pen, Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllProjectErrors,
  deleteProject,
  getAllProjects,
  resetProjectSlice,
} from "../store/slices/Project/projectSlice";

const ManageProjects = () => {
  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const { projects, loading, error, message } = useSelector(
    (state) => state.projects,
  );

  const handleReturnToDashboard = () => {
    navigateTo("/");
  };

  const handleProjectDelete = (id) => {
    dispatch(deleteProject(id));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllProjectErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetProjectSlice());
      dispatch(getAllProjects());
    }
  }, [dispatch, error, loading, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 p-4">
      {/* Header */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold">Manage Your Projects</h1>
          <button
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            onClick={handleReturnToDashboard}
          >
            Return to Dashboard
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 text-left">
            <thead className="bg-gray-200 text-gray-800">
              <tr>
                <th className="px-4 py-3">Thumbnail</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Stack</th>
                <th className="px-4 py-3 hidden md:table-cell">Deployed</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects && projects.length > 0 ? (
                projects.map((element) => (
                  <tr
                    key={element._id}
                    className="border-t bg-gray-50 hover:bg-gray-100"
                  >
                    <td className="px-4 py-3">
                      <img
                        src={element.projectImage && element.projectImage.url}
                        alt={element.title}
                        className="w-16 h-16 object-cover"
                      />
                    </td>

                    <td className="px-4 py-3 font-medium">{element.title}</td>

                    <td className="px-4 py-3 hidden md:table-cell">
                      {element.stack}
                    </td>

                    <td className="px-4 py-3 hidden md:table-cell">
                      {element.deployed}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {/* View */}
                        <Link to={`/view-project/${element._id}`}>
                          <button
                            title="View"
                            className="border-2 border-green-600 text-green-600 rounded-full h-8 w-8 flex items-center justify-center hover:bg-green-600 hover:text-black"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                        </Link>

                        {/* Update */}
                        <Link to={`/update-project/${element._id}`}>
                          <button
                            title="Update"
                            className="border-2 border-yellow-400 text-yellow-400 rounded-full h-8 w-8 flex items-center justify-center hover:bg-yellow-400 hover:text-black"
                          >
                            <Pen className="h-5 w-5" />
                          </button>
                        </Link>

                        {/* Delete */}
                        <button
                          title="Delete"
                          onClick={() => handleProjectDelete(element._id)}
                          className="border-2 border-red-600 text-red-600 rounded-full h-8 w-8 flex items-center justify-center hover:bg-red-600 hover:text-white"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-xl text-center">
                    You have not added any project.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageProjects;
