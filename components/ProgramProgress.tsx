import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp } from "lucide-react"

interface ProgramProgressProps {
  period: string;
}

export function ProgramProgress({
  period,
}: ProgramProgressProps) {
  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-xl overflow-hidden">
        <div className="px-6 py-6 bg-gradient-to-r from-blue-500/10 via-orange-400/5 to-blue-500/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Program Progress
              </h1>
              <p className="text-gray-600/90 text-base md:text-lg">
                Track and monitor program objectives and milestones
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 hover:border-orange-200 transition-colors">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Strategic Goals</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 hover:border-orange-200 transition-colors">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Progress Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 