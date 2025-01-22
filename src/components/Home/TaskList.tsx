// src/components/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../authService";
import { User } from "firebase/auth";
import CreateEdit from "./CreateEdit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import moment from "moment";

interface TaskListProps {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

type Task = {
  id: string;
  title: string;
  description: string;
  category: string;
  due_date: string;
  status: "To-Do" | "In-Progress" | "Completed";
  attachment?: string;
};

type TaskGroups = {
  todo: Task[];
  in_progress: Task[];
  completed: Task[];
};

const TaskList: React.FC<TaskListProps> = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [tasks, setTasks] = useState<TaskGroups>({
    todo: [],
    in_progress: [],
    completed: [],
  });

  const fetchTasks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "tasks"));
      const allTasks = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];

      const groupedTasks: TaskGroups = {
        todo: allTasks.filter((task) => task.status === "To-Do"),
        in_progress: allTasks.filter((task) => task.status === "In-Progress"),
        completed: allTasks.filter((task) => task.status === "Completed"),
      };

      setTasks(groupedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  console.log("tasks:", tasks);

  useEffect(() => {
    fetchTasks();
  }, []);

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
    <div className="w-full h-full flex flex-col gap-4 p-8">
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">TaskBuddy</p>
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          <p>{user?.displayName || "User"}</p>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <button>List</button>
          <button>Board</button>
        </div>
        <button onClick={handleSignOut} className="border px-4 py-1 rounded-lg">
          Logout
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex justify-center items-center gap-4">
          <p>Filter by:</p>
          <button>Category</button>
          <button>Due Date</button>
        </div>
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            name="search"
            placeholder="Search"
            value={""}
            //   onChange={handleFormChange}
            className="w-full py-2 px-4 border rounded-full"
          />
          <button
            onClick={() => setOpenModal(true)}
            className="bg-[#7B1984] p-2 rounded-full w-[200px] h-fit text-white"
          >
            ADD TASK
          </button>
        </div>
      </div>
      <div className="mt-2">
        <hr />
      </div>

      <div className="w-full">
        <div className="grid grid-cols-5 w-full px-4">
          {/* tasks heading */}
          {["Task Name", "Due On", "Task Status", "Task Category", ""]?.map(
            (item: any, index: number) => (
              <p className="" key={index}>
                {item}
              </p>
            )
          )}
        </div>

        {/* todo tasks */}
        <div className="flex justify-between items-center w-full bg-[#FAC3FF] py-2 px-4 rounded-tl-lg rounded-tr-lg mt-4">
          <p>Todo</p>
          <img src="/assets/icons/upIcon.svg" alt="" />
        </div>
        <div className="w-full min-h-[200px] bg-[#F1F1F1]">
          {tasks?.todo?.map((item: any) => (
            <div className="grid grid-cols-5 w-full py-3 px-4 border-b border-black/10">
              <p>{item?.title}</p>
              <p>{moment(item?.due_date).format("LL")}</p>
              <p>{item?.status}</p>
              <p>{item?.category}</p>
              <p className="w-full flex justify-end items-end">
                <img src="/assets/icons/moreIcon.svg" alt="" />
              </p>
            </div>
          ))}
        </div>

        {/* in progress tasks */}
        <div className="flex justify-between items-center w-full bg-[#85D9F1] py-2 px-4 rounded-tl-lg rounded-tr-lg mt-4">
          <p>In-Progress</p>
          <p>Toggle</p>
        </div>
        <div className="w-full min-h-[200px] bg-[#F1F1F1]">
          {/* in progress tasks list */}
        </div>

        {/* completed tasks */}
        <div className="flex justify-between items-center w-full bg-[#CEFFCC] py-2 px-4 rounded-tl-lg rounded-tr-lg mt-4">
          <p>Completed</p>
          <p>Toggle</p>
        </div>
        <div className="w-full min-h-[200px] bg-[#F1F1F1]">
          {/* completed tasks list */}
        </div>
      </div>
      <CreateEdit open={openModal} handleClose={() => setOpenModal(false)} />
    </div>
  );
};

export default TaskList;
