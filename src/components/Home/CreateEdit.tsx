import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import DatePickerValue from "../common/DatePicker";

export default function CreateEdit({ open, handleClose }: any) {
  const initialValues = {
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
    { value: "todo", label: "Todo" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex justify-between items-center">
            <p className="font-bold">Create Task</p>
            <img src="/assets/icons/close.svg" alt="" />
          </div>
          <div className="mt-2">
            <hr />
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="parent-container">
            <input
              type="text"
              name="title"
              placeholder="Task Title"
              value={params.title}
              onChange={() => {}}
              className="w-full mb-2 p-2 border rounded"
            />
            <ReactQuill
              value={params?.description}
              onChange={() => {}}
              readOnly={false}
              modules={modules}
              formats={formats}
              theme={"snow"}
              placeholder="Enter text here..."
              bounds=".editor-container"
              className="editor"
            />
            <div className="flex justify-between items-start">
              <div>
                <p>Task Category*</p>
                <div className="flex justify-start items-center gap-2">
                  <p className="p-2 border rounded-2xl">Work</p>
                  <p className="p-2 border rounded-2xl">Personal</p>
                </div>
              </div>
              <div>
                <p>Due On*</p>
                <DatePickerValue
                  label="Due Date"
                  value={params?.due_date}
                  onChange={() => {}}
                />
              </div>
              <div>
                <p>Task Status*</p>
                <select value={params?.status} onChange={() => {}}>
                  {statusOptions.map((option: any) => (
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
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
