import { Avatar } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-6">
      <h2 className="text-xl font-semibold">Dashboard</h2>

      <div className="flex items-center gap-4">
        <Avatar>R</Avatar>
      </div>
    </header>
  );
};

export default Navbar;
