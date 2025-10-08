import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoader from "../../components/SpecialLoader";
import {
  addNewTimeline,
  clearAllTimelineErrors,
  getAllTimelines,
  resetTimelineSlice,
} from "../../store/slices/Timeline/timelineSlice.js";

const AddTimeline = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const dispatch = useDispatch();
  const { loading, error, message } = useSelector((state) => state.timelines);

  const handleAddNewTimeline = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("from", from);
    formData.append("to", to);
    dispatch(addNewTimeline(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllTimelineErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetTimelineSlice());
      dispatch(getAllTimelines());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14">
      <form
        onSubmit={handleAddNewTimeline}
        className="w-full px-5 md:w-[650px]"
      >
        <div className="space-y-12">
          <div className="border-b border-gray-300 pb-12">
            <h2 className="font-semibold text-gray-900 text-3xl text-center">
              ADD A NEW TIMELINE
            </h2>

            <div className="mt-10 flex flex-col gap-5">
              {/* Title */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="Matriculation"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Description */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900">
                  Description
                </label>
                <div className="mt-2">
                  <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  ></textarea>
                </div>
              </div>

              {/* From */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900">
                  From
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    placeholder="From"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* To */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900">
                  To
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    placeholder="To"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-6 flex items-center justify-end gap-x-6">
          {!loading ? (
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md transition"
            >
              Add Timeline
            </button>
          ) : (
            <SpecialLoader content="Adding New Skill..." />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddTimeline;
