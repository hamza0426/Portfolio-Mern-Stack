import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  // clearAllMessageErrors,
  // deleteMessage,
  getAllMessages,
  // resetMessagesSlice,
} from "../../store/slices/Message/messagesSlice.js";
import SpecialLoader from "../../components/SpecialLoader";

const Messages = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allMessages, loading, error, message } = useSelector(
    (state) => state.messages
  );

  const [messageId, setMessageId] = useState("");

  const handleReturnToDashboard = () => {
    console.log("Navogating to dashboard...");
    navigate("/");
  };

  const handleMessageDelete = (id) => {
    setMessageId(id);
    // dispatch(deleteMessage(id));
  };

  // useEffect(() => {
  //   dispatch(getAllMessages());
  // }, [dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // dispatch(clearAllMessageErrors());
    }
    if (message) {
      toast.success(message);
      // dispatch(resetMessagesSlice());
      dispatch(getAllMessages());
    }
  }, [dispatch, error, message, loading]);

  return (
    <div className="min-h-screen sm:gap-4 sm:py-4 sm:pl-20">
      {/* Main Card */}
      <div className="bg-white shadow-md rounded-lg border">
        {/* Header */}
        <div className="flex gap-4 justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Messages</h2>
          <button
            onClick={handleReturnToDashboard}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Return to Dashboard
          </button>
        </div>

        {/* Content */}
        <div className="p-4 grid sm:grid-cols-2 gap-4">
          {allMessages && allMessages.length > 0 ? (
            allMessages.map((element) => (
              <div
                key={element._id}
                className="bg-gray-50 border rounded-lg shadow-sm p-4 flex flex-col gap-2"
              >
                <p className="text-gray-900">
                  <span className="font-bold mr-2">Sender Name:</span>
                  {element.senderName}
                </p>
                <p className="text-gray-900">
                  <span className="font-bold mr-2">Subject:</span>
                  {element.subject}
                </p>
                <p className="text-gray-900">
                  <span className="font-bold mr-2">Message:</span>
                  {element.message}
                </p>

                {/* Footer */}
                <div className="flex justify-end pt-2">
                  {loading && messageId === element._id ? (
                    <SpecialLoader content="Deleting" width="w-32" />
                  ) : (
                    <button
                      onClick={() => handleMessageDelete(element._id)}
                      className="w-32 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 text-2xl font-semibold text-center text-gray-600">
              No Messages Found!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
