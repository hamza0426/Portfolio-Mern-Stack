/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { forgotPassword } from '../store/slices/user/passwordSlice';
import { toast } from 'react-toastify';
import { clearAllErrors } from '../store/slices/user/authSlice';
import Loader from '../components/Loader';

const ForgotPassword = () => {
  const [ email, setEmail ] = useState("")
  const { loading, error, message } = useSelector((state) => state.password)
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const handleForgotPass = (e) => {
    e.preventDefault();
    if(!email) {
      toast.error("Please enter your email address");
      return;
    }
    dispatch(forgotPassword(email));
  }

  useEffect(() => {
    if(error) {
      toast.error(error);
      dispatch(clearAllErrors());
    }
    if(isLoggedIn) {
      navigate("/");
    }
    if(message !== null) {
      toast.success(message);
    }
  }, [loading, dispatch, error, isLoggedIn, message]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Forgot Password</h2>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          
          <div className="flex justify-between items-center text-sm">
            
            <Link to="/login" 
            className="text-indigo-600 hover:underline">Remember your Password?</Link>
          </div>
          {
            loading ? <Loader /> : <button
            type="submit"
            onClick={handleForgotPass}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Request for Reset Password
          </button>
          }
        </form>
      </div>
    </div>
  )
}

export default ForgotPassword;
