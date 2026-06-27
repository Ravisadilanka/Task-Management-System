interface Props {
  type: "status" | "priority";
  value: string;
}

const TaskBadge = ({ type, value }: Props) => {
  let classes = "";

  if (type === "priority") {
    switch (value) {
      case "High":
        classes =
          "bg-red-100 text-red-700";
        break;

      case "Medium":
        classes =
          "bg-amber-100 text-amber-700";
        break;

      default:
        classes =
          "bg-green-100 text-green-700";
    }
  }

  if (type === "status") {
    switch (value) {
      case "Open":
        classes =
          "bg-yellow-100 text-yellow-700";
        break;

      case "In Progress":
        classes =
          "bg-blue-100 text-blue-700";
        break;

      case "Testing":
        classes =
          "bg-purple-100 text-purple-700";
        break;

      default:
        classes =
          "bg-green-100 text-green-700";
    }
  }

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${classes}`}
    >
      {value}
    </span>
  );
};

export default TaskBadge;