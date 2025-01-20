import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { User } from "firebase/auth";

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/home" element={<Home user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
