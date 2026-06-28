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
  <div className="rounded-2xl bg-white p-4 shadow-sm md:p-5">
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      {/* Filters */}

      <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-2 xl:flex xl:items-center xl:gap-4">
        {/* Search */}

        <div className="relative sm:col-span-2 xl:w-80">
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
          <SelectTrigger className="w-full xl:w-44">
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
          <SelectTrigger className="w-full xl:w-44">
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
          <SelectTrigger className="w-full xl:w-44">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>

          <SelectContent side="bottom" className="bg-white">
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="dueDate">Due Date</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Create Button */}

      <Button
        onClick={onCreate}
        className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 sm:w-auto xl:shrink-0"
      >
        <Plus className="mr-2 h-4 w-4" />
        New Task
      </Button>
    </div>
  </div>
);
};

export default TaskToolbar;
