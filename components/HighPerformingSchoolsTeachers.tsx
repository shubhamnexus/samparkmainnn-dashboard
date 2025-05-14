import { getFilteredData } from "@/services/dataService"
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Target, TrendingUp } from "lucide-react";

interface HighPerformingSchoolsTeachersProps {
  period: string;
}

export function HighPerformingSchoolsTeachers({ period }: HighPerformingSchoolsTeachersProps) {
  const filteredData = getFilteredData(period);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-xl overflow-hidden">
        <div className="px-6 py-6 bg-gradient-to-r from-blue-500/10 via-orange-400/5 to-blue-500/10">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                High Performing Schools & Teachers
              </h1>
              <p className="text-gray-600/90 text-base md:text-lg">
                Monitor and recognize excellence in educational institutions and teaching staff
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 hover:border-orange-200 transition-colors">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Performance Metrics</span>
              </div>
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 hover:border-orange-200 transition-colors">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Achievement Trends</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 