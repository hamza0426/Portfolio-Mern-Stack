import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ManageTimeline from "./pages/ManageTimeline";
import ManageProjects from "./pages/ManageProjects";
import ViewProject from "./pages/ViewProject";
import UpdateProject from "./pages/UpdateProject";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ManageSkills from "./pages/ManageSkills";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/user/authSlice";
import { getAllMessages } from "./store/slices/Message/messagesSlice";
import Messages from "./pages/sub-pages/Messages";
import { getAllTimelines } from "./store/slices/Timeline/timelineSlice";
import { getAllSkills } from "./store/slices/Skill/skillSlice";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllMessages());
    dispatch(getAllTimelines());
    dispatch(getAllSkills());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        pauseOnHover={true}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path="/skills" element={<ManageSkills />} />
        <Route path="/timeline" element={<ManageTimeline />} />
        {/* <Route path='/software' element={<} /> */}
        <Route path="/projects" element={<ManageProjects />} />
        <Route path="/view-project" element={<ViewProject />} />
        <Route path="/update-project" element={<UpdateProject />} />
        <Route path="/messages" element={<Messages />} />
      </Routes>
    </Router>
  );
};

export default App;
