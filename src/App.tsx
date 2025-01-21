import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { User } from "firebase/auth";
import TaskList from "./components/Home/TaskList";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const { id } = useParams() as any;

  return (
    <Routes>
      <Route path="/" element={<Login setUser={setUser} />} />
      <Route path="/tasks" element={<TaskList user={user} setUser={setUser} />} />
    </Routes>
  );
}

export default App;
