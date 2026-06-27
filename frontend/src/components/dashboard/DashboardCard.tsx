import type { ReactNode } from "react";

interface Props {
  title: string;
  value: number;
  icon: ReactNode;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  icon,
  color,
}: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl text-white ${color}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;