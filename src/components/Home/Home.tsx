// src/components/Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../authService";
import { User } from "firebase/auth";

interface HomeProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
  }

const Home: React.FC<HomeProps> = ({ user, setUser }) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logOut();
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Welcome, {user?.displayName || "User"}!</h1>
      <button
        onClick={handleSignOut}
        className="px-6 py-3 bg-red-500 text-white rounded shadow hover:bg-red-600"
      >
        Sign Out
      </button>
    </div>
  );
};

export default Home;
