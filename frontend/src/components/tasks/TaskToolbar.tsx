import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Props {
  onCreate: () => void;
}

const TaskToolbar = ({ onCreate }: Props) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:max-w-sm">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <Input placeholder="Search tasks..." className="pl-10" />
        </div>

        <Button
          onClick={onCreate}
          className="rounded-xl bg-blue-600 hover:bg-blue-700"
        >
          <Plus size={18} />
          New Task
        </Button>
      </div>
    </div>
  );
};

export default TaskToolbar;
