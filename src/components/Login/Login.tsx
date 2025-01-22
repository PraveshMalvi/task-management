// src/components/Login.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { User } from "firebase/auth";
import { signInWithGoogle } from "../../authService";

interface LoginProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const Login: React.FC<LoginProps> = ({ setUser }) => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      setUser(user);
      navigate("/tasks");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-white overflow-hidden">
      <div className="h-full w-full flex justify-start items-center">
        <div className="flex flex-col justify-center items-start gap-2 h-full w-1/2 p-16">
          <p className="text-[#7B1984] text-2xl font-bold">TaskBuddy</p>
          <p className="text-sm w-[65%]">
            Streamline your workflow and track progress effortlessly with our
            all-in-one task management app.
          </p>
          <button
            onClick={handleSignIn}
            className="mt-6 px-6 py-3 bg-[#292929] text-white rounded-xl shadow hover:bg-blue-600 flex justify-center items-center gap-2"
          >
            <img src="/assets/icons/googleIcon.svg" alt="" />
            <span>Sign In with Google</span>
          </button>
        </div>
        <div className="w-1/2 relative h-full">
          <img
            className="absolute top-4 right-0 z-20"
            src="/assets/images/loginBg.webp"
            alt=""
          />
          <img
            className="absolute top-0 right-0 z-10"
            src="/assets/images/circlesBg.webp"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
