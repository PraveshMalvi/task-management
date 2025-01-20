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
      navigate("/home");
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Task Manager</h1>
      <button
        onClick={handleSignIn}
        className="px-6 py-3 bg-blue-500 text-black rounded shadow hover:bg-blue-600"
      >
        Sign In with Google
      </button>
    </div>
  );
};

export default Login;
