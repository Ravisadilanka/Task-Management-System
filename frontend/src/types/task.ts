export interface Task {
  _id: string;
  title: string;
  description: string;
  status: "Open" | "In Progress" | "Testing" | "Completed";
  priority: "Low" | "Medium" | "High";
  dueDate: string;

  createdBy: {
    _id: string;
    name: string;
    email: string;
  };

  assignedTo: {
    _id: string;
    name: string;
    email: string;
  };
}