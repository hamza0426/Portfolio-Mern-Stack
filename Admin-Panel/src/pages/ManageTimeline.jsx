import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllTimelineErrors,
  deleteTimeline,
  getAllTimelines,
  resetTimeline,
  updateTimeline, // ✅ import the update function
} from "../store/slices/Timeline/timelineSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Trash2, Edit3, Save, X } from "lucide-react";

const ManageTimeline = () => {
  const { loading, timeline, error, message } = useSelector(
    (state) => state.timelines
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ States for editing
  const [editMode, setEditMode] = useState(null); // stores id of the timeline being edited
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    from: "",
    to: "",
  });

  const btnDeleteTimeline = (id) => {
    dispatch(deleteTimeline(id));
  };

  const btnReturnToDashboard = () => {
    navigate("/");
  };

  // ✅ Enable Edit Mode
  const btnEditTimeline = (timeline) => {
    setEditMode(timeline._id);
    setEditData({
      title: timeline.title,
      description: timeline.description,
      from: timeline.timeline.from,
      to: timeline.timeline.to || "",
    });
  };

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // ✅ Save Updated Data
  const btnUpdate = (id) => {
    dispatch(updateTimeline(id, editData));
    setEditMode(null);
  };

  // ✅ Cancel Edit Mode
  const btnCancelEdit = () => {
    setEditMode(null);
    setEditData({ title: "", description: "", from: "", to: "" });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimeline());
      dispatch(getAllTimelines());
    }
  }, [dispatch, error, message, loading]);

  useEffect(() => {
    dispatch(getAllTimelines());
  }, [dispatch]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Manage Your Timeline
          </h2>
          <button
            onClick={btnReturnToDashboard}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-500 transition"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
            <thead className="bg-gray-200 text-gray-800 uppercase text-sm">
              <tr>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3 hidden md:table-cell">Description</th>
                <th className="px-4 py-3 hidden md:table-cell">From</th>
                <th className="px-4 py-3 hidden md:table-cell">To</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {timeline.length > 0 ? (
                timeline.map((element) => (
                  <tr
                    key={element._id}
                    className="bg-gray-50 border-t hover:bg-gray-100 transition"
                  >
                    {/* Title */}
                    <td className="px-4 py-3 font-medium text-gray-900">
                      {editMode === element._id ? (
                        <input
                          type="text"
                          name="title"
                          value={editData.title}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        element.title
                      )}
                    </td>

                    {/* Description */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      {editMode === element._id ? (
                        <input
                          type="text"
                          name="description"
                          value={editData.description}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        element.description
                      )}
                    </td>

                    {/* From */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      {editMode === element._id ? (
                        <input
                          type="text"
                          name="from"
                          value={editData.from}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        element.timeline.from
                      )}
                    </td>

                    {/* To */}
                    <td className="px-4 py-3 hidden md:table-cell">
                      {editMode === element._id ? (
                        <input
                          type="text"
                          name="to"
                          value={editData.to}
                          onChange={handleChange}
                          className="border rounded px-2 py-1 w-full"
                        />
                      ) : (
                        element.timeline.to || "____"
                      )}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3 flex justify-end gap-2">
                      {editMode === element._id ? (
                        <>
                          <button
                            onClick={() => btnUpdate(element._id)}
                            className="border-2 border-green-600 text-green-600 rounded-full h-8 w-8 flex justify-center items-center hover:bg-green-600 hover:text-white transition"
                          >
                            <Save className="h-5 w-5" />
                          </button>
                          <button
                            onClick={btnCancelEdit}
                            className="border-2 border-gray-400 text-gray-600 rounded-full h-8 w-8 flex justify-center items-center hover:bg-gray-300 transition"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => btnEditTimeline(element)}
                            className="border-2 border-blue-600 text-blue-600 rounded-full h-8 w-8 flex justify-center items-center hover:bg-blue-600 hover:text-white transition"
                          >
                            <Edit3 className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => btnDeleteTimeline(element._id)}
                            className="border-2 border-red-600 text-red-600 rounded-full h-8 w-8 flex justify-center items-center hover:bg-red-600 hover:text-white transition"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
                    className="px-4 py-6 text-center text-gray-500 text-lg"
                  >
                    You have not added any timeline.
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

export default ManageTimeline;

// /* eslint-disable no-unused-vars */
// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   clearAllTimelineErrors,
//   deleteTimeline,
//   getAllTimelines,
//   resetTimeline,
// } from "../store/slices/Timeline/timelineSlice";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import { Trash2 } from "lucide-react";

// const ManageTimeline = () => {
//   const { loading, timeline, error, message } = useSelector(
//     (state) => state.timelines
//   );
//   const [timelineId, setTimelineId] = useState("");
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const btnDeleteTimeline = (id) => {
//     setTimelineId(id);
//     dispatch(deleteTimeline(id));
//   };
//   const btnReturnToDashboard = () => {
//     navigate("/");
//   };
//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearAllTimelineErrors());
//     }
//     if (message) {
//       toast.success(message);
//       dispatch(resetTimeline());
//       dispatch(getAllTimelines());
//     }
//   }, [dispatch, error, message, loading]);
//   return (
//     <div className="flex min-h-screen w-full flex-col bg-gray-100 p-4">
//       <div className="bg-white shadow-md rounded-lg p-6">
//         {/* Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4 mb-4">
//           <h2 className="text-2xl font-semibold text-gray-800">
//             Manage Your Timeline
//           </h2>
//           <button
//             onClick={btnReturnToDashboard}
//             className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-500 transition"
//           >
//             Return to Dashboard
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm text-left text-gray-700 border border-gray-200 rounded-lg">
//             <thead className="bg-gray-200 text-gray-800 uppercase text-sm">
//               <tr>
//                 <th className="px-4 py-3">Title</th>
//                 <th className="px-4 py-3 hidden md:table-cell">Description</th>
//                 <th className="px-4 py-3 hidden md:table-cell">From</th>
//                 <th className="px-4 py-3 hidden md:table-cell">To</th>
//                 <th className="px-4 py-3 text-right">Action</th>
//               </tr>
//             </thead>

//             <tbody>
//               {timeline.length > 0 ? (
//                 timeline.map((element) => (
//                   <tr
//                     key={element._id}
//                     className="bg-gray-50 border-t hover:bg-gray-100 transition"
//                   >
//                     <td className="px-4 py-3 font-medium text-gray-900">
//                       {element.title}
//                     </td>
//                     <td className="px-4 py-3 hidden md:table-cell">
//                       {element.description}
//                     </td>
//                     <td className="px-4 py-3 hidden md:table-cell">
//                       {element.timeline.from}
//                     </td>
//                     <td className="px-4 py-3 hidden md:table-cell">
//                       {element.timeline.to ? element.timeline.to : "____"}
//                     </td>
//                     <td className="px-4 py-3 flex justify-end">
//                       <button
//                         onClick={() => btnDeleteTimeline(element._id)}
//                         className="border-2 border-red-600 text-red-600 rounded-full h-8 w-8 flex justify-center items-center hover:bg-red-600 hover:text-white transition"
//                       >
//                         <Trash2 className="h-5 w-5" />
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan="5"
//                     className="px-4 py-6 text-center text-gray-500 text-lg"
//                   >
//                     You have not added any timeline.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ManageTimeline;
