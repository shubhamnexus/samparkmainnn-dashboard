import { BarChart2, FileText, Target, Users, Activity, Settings } from "lucide-react"
import Link from "next/link"

export function Sidebar() {
  return (
    <aside className="flex flex-col justify-between h-screen w-64 flex-shrink-0 border-r bg-gray-50">
      <nav className="flex flex-col p-2">
        <Link
          href="/goals"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
        >
          <Target className="h-5 w-5" />
          <span>Program Goals & Coverage</span>
        </Link>
        <Link
          href="/progress"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
        >
          <BarChart2 className="h-5 w-5" />
          <span>Program Progress</span>
        </Link>
        <Link
          href="/performance"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
        >
          <Users className="h-5 w-5" />
          <span>High Performing Schools & Teachers</span>
        </Link>
        <Link
          href="/report"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
        >
          <FileText className="h-5 w-5" />
          <span>Generate Report</span>
        </Link>
        <Link
          href="/updates"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
        >
          <Activity className="h-5 w-5" />
          <span>Live Updates</span>
        </Link>
      </nav>
      
      <div className="p-2 mt-auto border-t">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-600 transition-all hover:bg-gray-100"
        >
          <Settings className="h-5 w-5" />
          <span>Settings</span>
        </Link>
      </div>
    </aside>
  )
}
