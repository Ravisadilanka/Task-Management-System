import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  color,
}: Props) => {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            {value}
          </h2>

        </div>

        <div className={`${color} rounded-2xl p-4`}>

          <Icon size={28} className="text-white" />

        </div>

      </div>

    </div>
  );
};

export default DashboardCard;