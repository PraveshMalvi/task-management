// src/components/Home.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../authService";
import { User } from "firebase/auth";
import CreateEdit from "./CreateEdit";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import moment from "moment";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { doc, deleteDoc } from "firebase/firestore";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
  const [openModal, setOpenModal] = useState({
    add: false,
    edit: false,
    data: {},
    id: "",
  });
  const [tasks, setTasks] = useState<TaskGroups>({
    todo: [],
    in_progress: [],
    completed: [],
  });
  const [anchorElMap, setAnchorElMap] = useState<
    Record<string, HTMLElement | null>
  >({});
  const [loading, setLoading] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  console.log("dateRange", dateRange);

  const fetchTasks = async () => {
    setLoading(true);
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
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

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

  const handleModal = (type: string, value: boolean, data: any = {}) => {
    setOpenModal((prevState) => ({
      ...prevState,
      [type]: value,
      data,
      id: data?.id ?? "",
    }));
  };

  const handleMenuOpen = (
    taskId: string,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorElMap((prevState) => ({
      ...prevState,
      [taskId]: event.currentTarget,
    }));
  };

  const handleMenuClose = (taskId: string) => {
    setAnchorElMap((prevState) => ({
      ...prevState,
      [taskId]: null,
    }));
  };

  const handleDeleteTask = async (taskId: string, status: string) => {
    try {
      await deleteDoc(doc(db, "tasks", taskId));

      setTasks((prevTasks: any) => ({
        ...prevTasks,
        [status.toLowerCase()]: prevTasks[status.toLowerCase()]?.filter(
          (task: any) => task.id !== taskId
        ),
      }));
      fetchTasks();
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const renderTaskList = (tasks: Task[], section: string) => {
    return tasks.map((item) => (
      <div
        className="grid grid-cols-5 w-full py-3 px-4 border-b border-black/10"
        key={item.id}
      >
        <p>{item?.title}</p>
        <p>{moment(item?.due_date).format("LL")}</p>
        <p>{item?.status}</p>
        <p>{item?.category}</p>
        <p className="w-full flex justify-end items-end">
          <div>
            <Button
              id={`basic-button-${item.id}`}
              aria-controls={
                anchorElMap[item.id] ? `basic-menu-${item.id}` : undefined
              }
              aria-haspopup="true"
              aria-expanded={Boolean(anchorElMap[item.id]) ? "true" : undefined}
              onClick={(event) => handleMenuOpen(item.id, event)}
            >
              <img src="/assets/icons/moreIcon.svg" alt="" />
            </Button>
            <Menu
              id={`basic-menu-${item.id}`}
              anchorEl={anchorElMap[item.id]}
              open={Boolean(anchorElMap[item.id])}
              onClose={() => handleMenuClose(item.id)}
              MenuListProps={{
                "aria-labelledby": `basic-button-${item.id}`,
              }}
            >
              <MenuItem
                onClick={() => {
                  handleModal("edit", true, item);
                  handleMenuClose(item.id);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  handleDeleteTask(item.id, item.status);
                  handleMenuClose(item.id);
                }}
              >
                Delete
              </MenuItem>
            </Menu>
          </div>
        </p>
      </div>
    ));
  };

  return (
    <div className="w-full h-full flex flex-col gap-4 p-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold">TaskBuddy</p>
        <div className="flex justify-center items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-400"></div>
          <p>{user?.displayName || "User"}</p>
        </div>
      </div>

      {/* Filters & Add Task */}
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
          <select
            name="status"
            value={""}
            onChange={() => {}}
            className="border rounded-full py-1 px-2"
          >
            {[
              { value: "Work", label: "Work" },
              { value: "Personal", label: "Personal" },
            ].map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <DatePicker
            placeholderText="Due Date"
            selectsRange
            startDate={startDate}
            endDate={endDate}
            onChange={(update: any) => {
              setDateRange(update);
            }}
            isClearable={true}
            className="border rounded-full py-1 px-2 text-black"
          />
        </div>
        <div className="flex justify-center items-center gap-2">
          <input
            type="text"
            name="search"
            placeholder="Search"
            className="w-full py-2 px-4 border rounded-full"
          />
          <button
            onClick={() => handleModal("add", true, {})}
            className="bg-[#7B1984] p-2 rounded-full w-[200px] h-fit text-white"
          >
            ADD TASK
          </button>
        </div>
      </div>

      <div className="mt-2">
        <hr />
      </div>

      {/* Tasks */}
      <div className="w-full">
        <div className="grid grid-cols-5 w-full px-4">
          {["Task Name", "Due On", "Task Status", "Task Category", ""].map(
            (item, index) => (
              <p key={index}>{item}</p>
            )
          )}
        </div>

        {/* Sections */}
        {loading ? (
          <div className="w-full h-[60vh] flex justify-center items-center">
            <p className="text-[24px] font-bold">Loading...</p>
          </div>
        ) : (
          <div className="mt-4">
            <div className="flex justify-between items-center w-full bg-[#FAC3FF] py-2 px-4 rounded-tl-lg rounded-tr-lg mt-4">
              <p>To-Do</p>
              <img src="/assets/icons/upIcon.svg" alt="" />
            </div>
            <div className="w-full min-h-[200px] max-h-[300px] overflow-y-auto bg-[#F1F1F1] rounded-br-lg rounded-bl-lg">
              {renderTaskList(tasks.todo, "To-Do")}
            </div>

            <div className="flex justify-between items-center w-full bg-[#85D9F1] py-2 px-4 rounded-tl-lg rounded-tr-lg mt-4">
              <p>In-Progress</p>
              <img src="/assets/icons/upIcon.svg" alt="" />
            </div>
            <div className="w-full min-h-[200px] max-h-[300px] overflow-y-auto bg-[#F1F1F1] rounded-br-lg rounded-bl-lg">
              {renderTaskList(tasks.in_progress, "In-Progress")}
            </div>

            <div className="flex justify-between items-center w-full bg-[#CEFFCC] py-2 px-4 rounded-tl-lg rounded-tr-lg mt-4">
              <p>Completed</p>
              <img src="/assets/icons/upIcon.svg" alt="" />
            </div>
            <div className="w-full min-h-[200px] max-h-[300px] overflow-y-auto bg-[#F1F1F1] rounded-br-lg rounded-bl-lg">
              {renderTaskList(tasks.completed, "Completed")}
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <CreateEdit
        type="add"
        open={openModal.add}
        handleClose={handleModal}
        task={openModal?.data}
        fetchTasks={fetchTasks}
      />
      <CreateEdit
        type="edit"
        open={openModal.edit}
        handleClose={handleModal}
        task={openModal?.data}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default TaskList;
