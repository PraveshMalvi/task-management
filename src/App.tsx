import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login/Login";
import { User } from "firebase/auth";
import TaskList from "./components/Home/TaskList";

// PrivateRoute component
const PrivateRoute = ({
  user,
  children,
}: {
  user: User | null;
  children: JSX.Element;
}) => {
  return user ? children : <Navigate to="/" replace />;
};

function App() {
  const [user, setUser] = useState<User | null>(null);

  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<Login setUser={setUser} />} />

      {/* Private Route */}
      <Route
        path="/tasks"
        element={
          <PrivateRoute user={user}>
            <TaskList user={user} setUser={setUser} />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
