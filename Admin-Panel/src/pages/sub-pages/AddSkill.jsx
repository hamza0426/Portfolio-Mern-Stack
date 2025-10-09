/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import SpecialLoader from "../../components/SpecialLoader";
import {
  addNewSkill,
  clearAllSkillErrors,
  getAllSkills,
  resetSkillSlice,
} from "../../store/slices/Skill/skillSlice.js";

const AddSkill = () => {
  const [title, setTitle] = useState("");
  const [proficiency, setProficiency] = useState("");
  const [img, setImg] = useState("");
  const [imgPreview, setImgPreview] = useState("");

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.skills);

  const handleImg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImgPreview(reader.result);
      setImg(file);
    };
  };

  const handleAddNewSkill = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("proficiency", proficiency);
    formData.append("img", img);
    dispatch(addNewSkill(formData));
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllSkillErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetSkillSlice());
      dispatch(getAllSkills());
    }
  }, [dispatch, loading, error]);

  return (
    <div className="flex justify-center items-center min-h-screen sm:gap-4 sm:py-4 sm:pl-14">
      <form onSubmit={handleAddNewSkill} className="w-full px-5 md:w-[650px]">
        <div className="space-y-12">
          <div className="border-b border-gray-300 pb-12">
            <h2 className="font-semibold text-gray-900 text-3xl text-center">
              ADD A NEW SKILL
            </h2>

            <div className="mt-10 flex flex-col gap-5">
              {/* Title Field */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900">
                  Title
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    placeholder="React.JS"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* Proficiency Field */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-900">
                  Proficiency
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    placeholder="30"
                    value={proficiency}
                    onChange={(e) => setProficiency(e.target.value)}
                    className="w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                  />
                </div>
              </div>

              {/* SVG Upload */}
              <div className="w-full col-span-full">
                <label className="block text-sm font-medium text-gray-900">
                  Skill Image
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-300 px-6 py-10">
                  <div className="text-center">
                    {imgPreview ? (
                      <img
                        src={imgPreview || "/docHolder.jpg"}
                        alt="Preview"
                        className="mx-auto h-12 w-12 object-contain"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}

                    <div className="mt-4 flex text-sm leading-6 text-gray-600 justify-center">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                      >
                        <span>Upload a file/image</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          onChange={handleImg}
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
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
              Add Skill
            </button>
          ) : (
            <SpecialLoader content="Adding New Skill" />
          )}
        </div>
      </form>
    </div>
  );
};

export default AddSkill;
