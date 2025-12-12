import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllSkillErrors,
  deleteSkill,
  getAllSkills,
  resetSkillSlice,
  updateSkill,
} from "../store/slices/Skill/skillSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const ManageSkills = () => {
  const { loading, skills, error, message } = useSelector(
    (state) => state.skills
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const btnReturnToDashboard = () => {
    navigate("/");
  };

  const [newProficiency, setNewProfieciency] = useState(1);
  const handleInputChange = (proficiency) => {
    setNewProfieciency(proficiency);
  };

  const btnDeleteSkill = (id) => {
    dispatch(deleteSkill(id));
  };

  const btnUpdateSkill = (id) => {
    dispatch(updateSkill(id, newProficiency));
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
  }, [dispatch, loading, error, message]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-gray-100 p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Your Skills</h1>
        <button
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          onClick={btnReturnToDashboard}
        >
          Return to Dashboard
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid sm:grid-cols-2 gap-4">
        {skills.map((element) => (
          <div
            key={element._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col gap-4"
          >
            {/* Title + Delete Button */}
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">{element.title}</h2>

              {/* Delete Icon */}
              <button
                onClick={() => btnDeleteSkill(element._id)}
                className="text-gray-500 hover:text-red-500"
                title="Delete"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {/* Proficiency Input */}
            <div className="flex items-center gap-3">
              <label className="text-lg font-medium">Proficiency:</label>
              <input
                type="number"
                defaultValue={element.proficiency}
                onChange={(e) => handleInputChange(e.target.value)}
                onBlur={() => btnUpdateSkill(element._id)}
                className="border border-gray-300 rounded-md p-2 w-24 focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageSkills;
