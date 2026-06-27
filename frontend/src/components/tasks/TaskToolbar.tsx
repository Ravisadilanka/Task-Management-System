import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  onCreate: () => void;

  search: string;
  status: string;
  priority: string;
  sort: string;

  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onPriorityChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const TaskToolbar = ({
  onCreate,
  search,
  status,
  priority,
  sort,
  onSearchChange,
  onStatusChange,
  onPriorityChange,
  onSortChange,
}: Props) => {
  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-1 flex-col gap-4 lg:flex-row">
          {/* Search */}

          <div className="relative w-full lg:max-w-sm">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search tasks..."
              className="pl-10"
            />
          </div>

          {/* Status */}

          <Select value={status} onValueChange={onStatusChange}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent side="bottom" className="bg-white">
              <SelectItem value="all">All Status</SelectItem>

              <SelectItem value="Open">Open</SelectItem>

              <SelectItem value="In Progress">In Progress</SelectItem>

              <SelectItem value="Testing">Testing</SelectItem>

              <SelectItem value="Done">Done</SelectItem>
            </SelectContent>
          </Select>

          {/* Priority */}

          <Select value={priority} onValueChange={onPriorityChange}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>

            <SelectContent side="bottom" className="bg-white">
              <SelectItem value="all">All Priority</SelectItem>

              <SelectItem value="High">High</SelectItem>

              <SelectItem value="Medium">Medium</SelectItem>

              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}

          <Select value={sort} onValueChange={onSortChange}>
            <SelectTrigger className="w-full lg:w-44">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>

            <SelectContent side="bottom" className="bg-white">
              <SelectItem value="newest">Newest</SelectItem>

              <SelectItem value="oldest">Oldest</SelectItem>

              <SelectItem value="dueDate">Due Date</SelectItem>
            </SelectContent>
          </Select>
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
