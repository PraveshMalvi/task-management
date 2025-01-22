import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { db } from "../../firebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function CreateEdit({ open, handleClose, task, type }: any) {
  const initialValues = task || {
    title: "",
    description: "",
    category: "",
    due_date: "",
    status: "",
    attachment: "",
  };
  const [params, setParams] = React.useState(initialValues);

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];

  const statusOptions = [
    { value: "To-do", label: "To-do" },
    { value: "In-Progress", label: "In-Progress" },
    { value: "Completed", label: "Completed" },
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setParams((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value: string) => {
    setParams((prev: any) => ({ ...prev, description: value }));
  };

  const handleSubmit = async () => {
    try {
      if (task?.id) {
        // Update existing task
        const taskDoc = doc(db, "tasks", task.id);
        await updateDoc(taskDoc, params);
        console.log("Task updated!");
      } else {
        // Handle new task creation (as in the original implementation)
        const docRef = await addDoc(collection(db, "tasks"), params);
        console.log("Task created with ID:", docRef.id);
      }
      handleClose(type, false);
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  return (
    <Dialog open={open} onClose={() => handleClose(type, false)}>
      <DialogTitle>
        <div className="flex justify-between items-center">
          <p className="font-bold">Create Task</p>
          <img className="cursor-pointer" onClick={()=>handleClose(type, false)} src="/assets/icons/close.svg" alt="" />
        </div>
        <hr className="mt-2" />
      </DialogTitle>
      <DialogContent>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            name="title"
            placeholder="Task Title"
            value={params.title}
            onChange={handleInputChange}
            className="w-full mb-2 p-2 border rounded"
          />
          <ReactQuill
            value={params.description}
            onChange={handleQuillChange}
            modules={modules}
            formats={formats}
            theme="snow"
            placeholder="Enter description here..."
            className="editor"
          />
          <div className="flex justify-between mt-2">
            <div className="flex flex-col gap-1">
              <p>Task Category*</p>
              <div className="flex justify-start items-center gap-2">
                <p
                  onClick={(e: any) =>
                    setParams((prev: any) => ({ ...prev, category: "Work" }))
                  }
                  className={`py-1 px-5  rounded-2xl cursor-pointer ${
                    params?.category === "Work"
                      ? "bg-[#7B1984] border-0 text-white"
                      : "border text-black"
                  }`}
                >
                  Work
                </p>
                <p
                  onClick={(e: any) =>
                    setParams((prev: any) => ({
                      ...prev,
                      category: "Personal",
                    }))
                  }
                  className={`py-1 px-5 border rounded-2xl cursor-pointer ${
                    params?.category === "Personal"
                      ? "bg-[#7B1984] border-0 text-white"
                      : "border text-black"
                  }`}
                >
                  Personal
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p>Due On*</p>
              <input
                type="date"
                name="due_date"
                value={params.due_date}
                onChange={handleInputChange}
                className="border rounded py-1 px-2"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p>Task Status*</p>
              <select
                name="status"
                value={params.status}
                onChange={handleInputChange}
                className="border rounded py-1 px-2"
              >
                {statusOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <div className="border-t w-full flex justify-end items-end gap-4 py-4">
          <button
            onClick={() => handleClose(type, false)}
            className="bg-white py-2 px-6 rounded-full border"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-[#7B1984] text-white py-2 px-6 rounded-full"
          >
            Create
          </button>
        </div>
      </DialogActions>
    </Dialog>
  );
}
