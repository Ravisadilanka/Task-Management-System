import { CheckSquare } from "lucide-react"

const AppLogo = () => {
  return (
    <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-md">
            <CheckSquare size={24} />
        </div>

        <div className="text-xl font-bold">
            Task Manager
        </div>
    </div>
  )
}

export default AppLogo