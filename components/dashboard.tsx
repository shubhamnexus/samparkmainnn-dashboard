"use client"

import { useState } from "react"
import { LayoutDashboard, BarChart2, PieChart, FileText, Settings, ChevronLeft, Activity, Target, MapPin, Sparkles, Award } from "lucide-react"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { ProgramProgress } from "./ProgramProgress"
import { LiveUpdates } from "./LiveUpdates"
import { HighPerformingSchoolsTeachers } from "@/components/HighPerformingSchoolsTeachers"
import { ReportGenerator } from "./ReportGenerator"
import { ProgramGoalsCoverage } from "./ProgramGoalsCoverage"
import { Calendar } from "./ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { PERIODS } from "@/data/constants"

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("YTD")
  const [currentView, setCurrentView] = useState("goals")
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-50 to-gray-50">
      {/* Header */}
      <header className="sticky top-0 z-10 flex h-16 items-center justify-between bg-white/90 px-8 shadow-sm backdrop-blur-md border-b border-slate-200">
        {/* Left section */}
        <div className="flex items-center space-x-24">
          <div className="flex items-center gap-3">
            <img 
              src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/Frame%2050.png" 
              alt="Partner Logo" 
              className="h-12 w-auto hover:opacity-80 transition-opacity duration-300" 
            />
          </div>
          
          {/* Organization details */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 hover:scale-105 transition-all duration-300 group">
              <MapPin className="h-4 w-4 text-slate-500 group-hover:text-slate-600 transition-colors" />
              <span className="font-medium">
                Haryana
              </span>
            </div>
            <div className="relative flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-orange-50 to-slate-100 text-slate-700 font-medium hover:bg-slate-100 hover:scale-105 transition-all duration-300 group">
              <Sparkles className="h-4 w-4 text-orange-500 group-hover:text-orange-600 transition-colors" />
              <span className="font-medium">
                Smart Shala Program
              </span>
            </div>
          </div>
        </div>

        {/* Right section - Logo */}
        <div className="flex items-center">
          <img 
            src="https://22527425.fs1.hubspotusercontent-na1.net/hubfs/22527425/BofA-logo.svg"
            alt="Bank of America"
            className="h-6 hover:opacity-80 transition-opacity duration-300"
          />
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={cn(
          "fixed top-16 bottom-0 transition-all duration-300 ease-in-out",
          isSidebarCollapsed ? "w-0" : "w-64"
        )}>
          <div className={cn(
            "h-full flex-shrink-0 border-r border-slate-200 bg-white/80 backdrop-blur-sm overflow-hidden",
            isSidebarCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
          )}>
            <nav className="h-full flex flex-col p-4 overflow-hidden">
              <div className="flex flex-col h-full max-h-full">
                <div className="space-y-2 flex-shrink-0">
                  <a
                    href="#"
                    onClick={() => setCurrentView("goals")}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-slate-100 hover:text-orange-600 ${
                      currentView === "goals" ? "bg-gradient-to-r from-orange-50 to-slate-100 text-orange-600 font-medium" : ""
                    }`}
                  >
                    <Target className="h-5 w-5" />
                    <span className={cn("transition-opacity duration-300",
                      isSidebarCollapsed ? "opacity-0" : "opacity-100"
                    )}>Program Goals & Coverage</span>
                  </a>
                  <a
                    href="#"
                    onClick={() => setCurrentView("coverage")}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-slate-100 hover:text-orange-600 ${
                      currentView === "coverage" ? "bg-gradient-to-r from-orange-50 to-slate-100 text-orange-600 font-medium" : ""
                    }`}
                  >
                    <BarChart2 className="h-5 w-5" />
                    <span className={cn("transition-opacity duration-300",
                      isSidebarCollapsed ? "opacity-0" : "opacity-100"
                    )}>Program Progress</span>
                  </a>
                  <a
                    href="#"
                    onClick={() => setCurrentView("district")}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-slate-100 hover:text-orange-600 ${
                      currentView === "district" ? "bg-gradient-to-r from-orange-50 to-slate-100 text-orange-600 font-medium" : ""
                    }`}
                  >
                    <div className="flex items-center justify-center w-5 h-5">
                      <Award className="h-6 w-6" strokeWidth={2} />
                    </div>
                    <span className={cn("transition-opacity duration-300",
                      isSidebarCollapsed ? "opacity-0" : "opacity-100"
                    )}>High Performing Schools & Teachers</span>
                  </a>
                  <a
                    href="#"
                    onClick={() => setCurrentView("report")}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-slate-100 hover:text-orange-600 ${
                      currentView === "report" ? "bg-gradient-to-r from-orange-50 to-slate-100 text-orange-600 font-medium" : ""
                    }`}
                  >
                    <FileText className="h-5 w-5" />
                    <span className={cn("transition-opacity duration-300",
                      isSidebarCollapsed ? "opacity-0" : "opacity-100"
                    )}>Generate Report</span>
                  </a>
                  <a
                    href="#"
                    onClick={() => setCurrentView("live-updates")}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-slate-100 hover:text-orange-600 ${
                      currentView === "live-updates" ? "bg-gradient-to-r from-orange-50 to-slate-100 text-orange-600 font-medium" : ""
                    }`}
                  >
                    <Activity className="h-5 w-5" />
                    <span className={cn("transition-opacity duration-300",
                      isSidebarCollapsed ? "opacity-0" : "opacity-100"
                    )}>Live Updates</span>
                  </a>
                </div>
                <div className="mt-auto flex-shrink-0">
                  <div className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-slate-600 transition-all hover:bg-gradient-to-r hover:from-orange-50 hover:to-slate-100 hover:text-orange-600">
                    <Settings className="h-5 w-5" />
                    <span className={cn("transition-opacity duration-300",
                      isSidebarCollapsed ? "opacity-0" : "opacity-100"
                    )}>Settings</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          {/* Toggle Button */}
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute -right-3 top-6 z-10 h-7 w-7 rounded-full border bg-white p-0 shadow-sm hover:bg-orange-50 hover:text-orange-600 text-slate-600 transition-colors",
              isSidebarCollapsed ? "-right-3" : "-right-3"
            )}
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          >
            <ChevronLeft className={cn(
              "h-4 w-4 transition-transform duration-300",
              isSidebarCollapsed ? "rotate-180" : ""
            )} />
          </Button>
        </aside>

        {/* Main Content - Adjust margin to account for fixed sidebar */}
        <main className={cn(
          "flex-1 overflow-auto p-6 bg-gradient-to-br from-gray-50 to-gray-100",
          isSidebarCollapsed ? "ml-0" : "ml-64"
        )}>
          {currentView === "goals" && (
            <ProgramGoalsCoverage
              period={selectedPeriod}
            />
          )}
          {currentView === "coverage" && (
            <ProgramProgress
              period={selectedPeriod}
            />
          )}
          {currentView === "district" && (
            <HighPerformingSchoolsTeachers
              period={selectedPeriod}
            />
          )}
          {currentView === "report" && (
            <ReportGenerator />
          )}
          {currentView === "live-updates" && <LiveUpdates />}
        </main>
      </div>
    </div>
  )
}
