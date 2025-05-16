import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, TrendingUp, PieChart, BarChart, Package, Lightbulb, Users, IndianRupee, Calendar, School, Book, Map } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label, LineChart, CartesianGrid, XAxis, YAxis, Line, BarChart as RechartsBarChart, Bar, Legend } from 'recharts'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useState } from "react"

interface ProgramProgressProps {
  period: string;
}

export function ProgramProgress({
  period,
}: ProgramProgressProps) {
  // Investment data
  const programExpense = 30; // in Cr
  const budgetPercentage = 10;
  const totalBudget = (programExpense / budgetPercentage) * 100; // Calculate total budget

  // Asset distribution data
  const totalKits = 30;
  const distributedKits = 25;
  const totalSparks = 15;
  const totalLEDs = 50;
  const distributedLEDs = 40;

  // Calculate percentages for progress bars
  const kitsProgress = (distributedKits / totalKits) * 100;
  const ledsProgress = (distributedLEDs / totalLEDs) * 100;

  // Data for investment pie chart
  const investmentData = [
    { name: 'Program Expense', value: programExpense },
    { name: 'Remaining Budget', value: totalBudget - programExpense }
  ];

  // Data for asset distribution pie chart
  const assetData = [
    { name: 'Distributed Kits', value: distributedKits },
    { name: 'Remaining Kits', value: totalKits - distributedKits },
    { name: 'Distributed LEDs', value: distributedLEDs },
    { name: 'Remaining LEDs', value: totalLEDs - distributedLEDs }
  ];

  const COLORS = ['#0ea5e9', '#f97316', '#22c55e', '#eab308'];

  // Progress Trend Data
  type ProgressTrendYear = 'FY26' | 'FY27' | 'FY28' | 'Total';
  interface ProgressTrendRow {
    attribute: string;
    FY26: { Plan: number; Completed: number };
    FY27: { Plan: number; Completed: number };
    FY28: { Plan: number; Completed: number };
    Total: { Plan: number; Completed: number };
  }
  const progressTrendRaw: ProgressTrendRow[] = [
    {
      attribute: "Investment",
      FY26: { Plan: 1000, Completed: 500 },
      FY27: { Plan: 800000, Completed: 480000 },
      FY28: { Plan: 600000, Completed: 360000 },
      Total: { Plan: 1881500, Completed: 840500 },
    },
    {
      attribute: "No of District to be Covered",
      FY26: { Plan: 10, Completed: 5 },
      FY27: { Plan: 8, Completed: 4.8 },
      FY28: { Plan: 5, Completed: 3 },
      Total: { Plan: 32.8, Completed: 12.8 },
    },
    {
      attribute: "No of Blocks to be  Covered",
      FY26: { Plan: 30, Completed: 15 },
      FY27: { Plan: 24, Completed: 14.4 },
      FY28: { Plan: 15, Completed: 9 },
      Total: { Plan: 98.4, Completed: 38.4 },
    },
    {
      attribute: "No. Of school to be  Covered",
      FY26: { Plan: 100, Completed: 50 },
      FY27: { Plan: 80, Completed: 48 },
      FY28: { Plan: 50, Completed: 30 },
      Total: { Plan: 328, Completed: 128 },
    },
    {
      attribute: "No. Of Teachers to be Trained",
      FY26: { Plan: 100, Completed: 50 },
      FY27: { Plan: 80, Completed: 48 },
      FY28: { Plan: 60, Completed: 36 },
      Total: { Plan: 338, Completed: 134 },
    },
    {
      attribute: "No Of Kits to be Distributed",
      FY26: { Plan: 1000, Completed: 500 },
      FY27: { Plan: 800, Completed: 480 },
      FY28: { Plan: 500, Completed: 300 },
      Total: { Plan: 3280, Completed: 1280 },
    },
    {
      attribute: "No Of  Sampark TV to be  Distributed",
      FY26: { Plan: 1500, Completed: 750 },
      FY27: { Plan: 900, Completed: 540 },
      FY28: { Plan: 600, Completed: 360 },
      Total: { Plan: 4290, Completed: 1650 },
    },
    {
      attribute: "No Of TV to be  Distributed",
      FY26: { Plan: 500, Completed: 250 },
      FY27: { Plan: 400, Completed: 240 },
      FY28: { Plan: 300, Completed: 180 },
      Total: { Plan: 1690, Completed: 670 },
    },
  ];

  const [progressTrendYear, setProgressTrendYear] = useState<ProgressTrendYear>("FY26");
  const progressTrendData = progressTrendRaw.map(row => ({
    attribute: row.attribute,
    Plan: row[progressTrendYear].Plan,
    Completed: row[progressTrendYear].Completed,
  }));

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
            <div className="flex flex-wrap items-center gap-4">
              {/* Duration Filter */}
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100">
                <Calendar className="h-4 w-4 text-blue-600" />
                <Select defaultValue="FY26Q1">
                  <SelectTrigger className="w-[180px] border-none shadow-none focus:ring-0">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FY26Q1">FY26 Q1</SelectItem>
                    <SelectItem value="FY26Q2">FY26 Q2</SelectItem>
                    <SelectItem value="FY26Q3">FY26 Q3</SelectItem>
                    <SelectItem value="FY26Q4">FY26 Q4</SelectItem>
                    <SelectItem value="FY26YTD">FY26 YTD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 bg-white flex items-center gap-2 hover:border-orange-200 transition-colors h-14">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Strategic Goals</span>
                </div>
                <div className="px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 bg-white flex items-center gap-2 hover:border-orange-200 transition-colors h-14">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Unified Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Investment Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-blue-500/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5 text-blue-600" />
              Investment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="h-[300px] flex flex-col items-center justify-between">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={investmentData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {investmentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value) => [`${value} Cr`, '']}
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '8px'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></span> Program Expense
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></span> Remaining Budget
                  </div>
                </div>
              </div>

              {/* Investment Details */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600">Program Expenses</div>
                  <div className="text-2xl font-bold text-blue-600">{programExpense} Cr</div>
                </div>
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600">Budget Percentage</div>
                  <div className="text-2xl font-bold text-orange-600">{budgetPercentage}%</div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="text-sm text-gray-600">Total Annual Budget</div>
                  <div className="text-2xl font-bold text-green-600">{totalBudget} Cr</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Asset Distribution Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5 text-orange-600" />
              Asset Distribution
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pie Chart */}
              <div className="h-[300px] flex flex-col items-center justify-between">
                <div className="h-[200px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={assetData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {assetData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'white',
                          border: '1px solid #e2e8f0',
                          borderRadius: '8px',
                          padding: '8px'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                {/* Legend */}
                <div className="flex flex-wrap justify-center gap-3 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></span> Distributed Kits
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></span> Remaining Kits
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[2] }}></span> Distributed LEDs
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="inline-block w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[3] }}></span> Remaining LEDs
                  </div>
                </div>
              </div>

              {/* Asset Details */}
              <div className="space-y-4">
                {/* Kits Section */}
                <div className="bg-orange-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Package className="h-4 w-4 text-orange-600" />
                    <span className="font-medium">Kits Distribution</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm text-gray-600">Distributed</div>
                      <div className="text-xl font-bold text-orange-600">{distributedKits}/{totalKits}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Progress</div>
                      <div className="text-xl font-bold text-green-600">{Math.round(kitsProgress)}%</div>
                    </div>
                  </div>
                </div>

                {/* LED Section */}
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Lightbulb className="h-4 w-4 text-blue-600" />
                    <span className="font-medium">LED Distribution</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <div className="text-sm text-gray-600">Distributed</div>
                      <div className="text-xl font-bold text-blue-600">{distributedLEDs}/{totalLEDs}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Progress</div>
                      <div className="text-xl font-bold text-green-600">{Math.round(ledsProgress)}%</div>
                    </div>
                  </div>
                </div>

                {/* Sparks Section */}
                <div className="bg-green-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="h-4 w-4 text-green-600" />
                    <span className="font-medium">Total Sparks</span>
                  </div>
                  <div className="text-2xl font-bold text-green-600">{totalSparks}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-green-500/10 to-blue-500/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Stat Details */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3">
                  <School className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">Schools to be Covered</div>
                    <div className="text-2xl font-bold text-blue-600">100</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">% of Schools Covered</div>
                    <div className="text-2xl font-bold text-green-600">75%</div>
                  </div>
                </div>
              </div>
              {/* Pie Charts */}
              <div className="flex flex-col gap-6 items-center justify-center">
                {/* Students Pie Chart */}
                <div className="flex flex-col items-center">
                  <div className="h-[100px] w-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[{ name: 'Covered', value: 60 }, { name: 'Remaining', value: 40 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#e5e7eb" />
                          <Label
                            value={`60%`}
                            position="center"
                            fill="#3b82f6"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700">Students</span>
                </div>
                {/* Schools Pie Chart */}
                <div className="flex flex-col items-center">
                  <div className="h-[100px] w-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[{ name: 'Covered', value: 75 }, { name: 'Remaining', value: 25 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#22c55e" />
                          <Cell fill="#e5e7eb" />
                          <Label
                            value={`75%`}
                            position="center"
                            fill="#22c55e"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700">Schools</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Teacher Training & Teacher Acceptance Feedback Card */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="bg-gradient-to-r from-orange-500/10 to-orange-500/5 border-b">
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-600" />
              Teacher Training & Teacher Acceptance Feedback
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Teacher Training Section */}
              <div className="space-y-4">
                <div className="bg-orange-50 p-4 rounded-xl flex items-center gap-3">
                  <Users className="h-5 w-5 text-orange-600" />
                  <div>
                    <div className="text-sm text-gray-600">No of Teachers Trained</div>
                    <div className="text-2xl font-bold text-orange-600">100</div>
                  </div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-xl flex items-center gap-3">
                  <Users className="h-5 w-5 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-600">No of Master Teachers Trained</div>
                    <div className="text-2xl font-bold text-yellow-500">10</div>
                  </div>
                </div>
              </div>
              {/* Teacher Acceptance Feedback Section */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div>
                    <div className="text-sm text-gray-600">No of Feedback</div>
                    <div className="text-2xl font-bold text-blue-600">10</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Training Acceptance</div>
                    <div className="text-2xl font-bold text-green-600">4/5</div>
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Program Acceptance</div>
                    <div className="text-2xl font-bold text-green-600">1/5</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Classroom Impact Card (Full Width) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-orange-500/5 border-b">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <PieChart className="h-6 w-6 text-blue-600" />
              Classroom Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            {/* Enrollment Section */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <Users className="h-5 w-5 text-blue-600" />
                <span className="text-lg font-semibold text-gray-800">Enrollment</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Pie Chart */}
                <div className="flex flex-col items-center justify-center">
                  <div className="h-[110px] w-[110px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[{ name: 'Enrolled', value: 10000 }, { name: 'Remaining', value: 90000 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={35}
                          outerRadius={50}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#e5e7eb" />
                          <Label
                            value={`10%`}
                            position="center"
                            fill="#3b82f6"
                            style={{ fontSize: '18px', fontWeight: 'bold' }}
                          />
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm">
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span> Enrolled</div>
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-gray-300"></span> Remaining</div>
                  </div>
                </div>
                {/* Stat Blocks */}
                <div className="space-y-3">
                  <div className="bg-blue-50 p-4 rounded-xl flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="text-sm text-gray-600">Enrolled Users</div>
                      <div className="text-2xl font-bold text-blue-600">10,000</div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600">Enrolled Users Cumulative</div>
                      <div className="text-2xl font-bold text-green-600">100,000</div>
                    </div>
                  </div>
                </div>
                {/* Target & Status */}
                <div className="space-y-3 flex flex-col items-center justify-center">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xs text-gray-600">Target for this period:</span>
                    <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded">15,000</span>
                  </div>
                  <div className="flex items-center justify-center gap-1 text-green-600 text-xs font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                    Status: On Track
                  </div>
                  <div className="text-xs text-gray-500 text-center mt-2">Enrollment is steadily increasing this quarter.</div>
                </div>
              </div>
            </div>
            {/* Divider */}
            <div className="border-t border-slate-200 my-6"></div>
            {/* Resources Used Section */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Book className="h-5 w-5 text-orange-600" />
                <span className="text-lg font-semibold text-gray-800">Resources Used</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Stat Blocks */}
                <div className="space-y-3">
                  <div className="bg-orange-50 p-4 rounded-xl flex items-center gap-3">
                    <Book className="h-5 w-5 text-orange-600" />
                    <div>
                      <div className="text-sm text-gray-600">Resources Used</div>
                      <div className="text-2xl font-bold text-orange-600">4,223</div>
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-xl flex items-center gap-3">
                    <Book className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="text-sm text-gray-600">Resources Used Cumulative</div>
                      <div className="text-2xl font-bold text-green-600">53,000</div>
                    </div>
                  </div>
                </div>
                {/* Class Resource Used Pie Chart */}
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-600" />
                    Class Resource Used
                  </div>
                  <div className="h-[100px] w-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[{ name: 'FLN', value: 40 }, { name: 'Class 6 to 8', value: 35 }, { name: 'Other', value: 25 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e42" />
                          <Cell fill="#a3e635" />
                          <Label
                            value={''}
                            position="center"
                            fill="#2563eb"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm">
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span> FLN</div>
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-orange-400"></span> Class 6 to 8</div>
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-lime-400"></span> Other</div>
                  </div>
                </div>
                {/* Subject Resource Used Pie Chart */}
                <div className="flex flex-col items-center">
                  <div className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-green-600" />
                    Subject Resource Used
                  </div>
                  <div className="h-[100px] w-[100px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={[{ name: 'English', value: 30 }, { name: 'Math', value: 30 }, { name: 'Science', value: 25 }, { name: 'Other', value: 15 }]}
                          cx="50%"
                          cy="50%"
                          innerRadius={30}
                          outerRadius={45}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          <Cell fill="#3b82f6" />
                          <Cell fill="#f59e42" />
                          <Cell fill="#22c55e" />
                          <Cell fill="#a3e635" />
                          <Label
                            value={''}
                            position="center"
                            fill="#2563eb"
                            style={{ fontSize: '16px', fontWeight: 'bold' }}
                          />
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-wrap justify-center gap-3 mt-2 text-sm">
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-blue-500"></span> English</div>
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-orange-400"></span> Math</div>
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-green-500"></span> Science</div>
                    <div className="flex items-center gap-2"><span className="inline-block w-3 h-3 rounded-full bg-lime-400"></span> Other</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Program Monitoring Card (Full Width) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-purple-500/10 to-blue-500/5 border-b">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <BarChart className="h-6 w-6 text-purple-600" />
              Program Monitoring
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* School Audit & Review Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <School className="h-5 w-5 text-purple-600" />
                    <span className="text-lg font-semibold text-gray-800">School Audit & Review</span>
                  </div>
                  <div className="bg-purple-50 px-4 py-2 rounded-xl">
                    <span className="text-2xl font-bold text-purple-600">78</span>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { quarter: '0', audits: 0 },
                        { quarter: 'Q1', audits: 18 },
                        { quarter: 'Q2', audits: 22 },
                        { quarter: 'Q3', audits: 20 },
                        { quarter: 'Q4', audits: 18 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="quarter" />
                      <YAxis domain={[0, 'auto']} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="audits"
                        stroke="#8b5cf6"
                        strokeWidth={2}
                        dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* State Advocacy Meetings Section */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-lg font-semibold text-gray-800">State Advocacy Meetings</span>
                  </div>
                  <div className="bg-blue-50 px-4 py-2 rounded-xl">
                    <span className="text-2xl font-bold text-blue-600">12</span>
                  </div>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsBarChart
                      data={[
                        { type: 'DM', meetings: 5 },
                        { type: 'DO', meetings: 4 },
                        { type: 'Block', meetings: 3 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="meetings" fill="#3b82f6" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* District Progress Section */}
              <div className="md:col-span-2 space-y-6">
                <div className="flex items-center gap-3">
                  <Map className="h-5 w-5 text-green-600" />
                  <span className="text-lg font-semibold text-gray-800">District Progress</span>
                </div>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={[
                        { district: 'District A', progress: 85 },
                        { district: 'District B', progress: 75 },
                        { district: 'District C', progress: 65 },
                        { district: 'District D', progress: 55 },
                        { district: 'District E', progress: 45 },
                        { district: 'District F', progress: 35 }
                      ]}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="district" 
                        angle={-45}
                        textAnchor="end"
                        height={70}
                        interval={0}
                      />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="progress"
                        stroke="#22c55e"
                        strokeWidth={2}
                        dot={{ fill: '#22c55e', strokeWidth: 2 }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Progress Trend Card (Full Width) */}
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2">
          <CardHeader className="bg-gradient-to-r from-blue-500/10 to-green-500/5 border-b">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <TrendingUp className="h-6 w-6 text-blue-600" />
              Progress Trend
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
              <div className="text-lg font-semibold text-gray-800">Progress by Attribute</div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Year:</span>
                <Select value={progressTrendYear} onValueChange={v => setProgressTrendYear(v as ProgressTrendYear)}>
                  <SelectTrigger className="w-[120px] border-slate-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FY26">FY26</SelectItem>
                    <SelectItem value="FY27">FY27</SelectItem>
                    <SelectItem value="FY28">FY28</SelectItem>
                    <SelectItem value="Total">Total</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={progressTrendData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attribute" angle={-30} textAnchor="end" interval={0} height={100} tick={{ fontSize: 12 }} />
                  <YAxis />
                  <Tooltip />
                  <Legend verticalAlign="top" height={36} />
                  <Bar dataKey="Plan" fill="#3b82f6" name="Plan" />
                  <Bar dataKey="Completed" fill="#22c55e" name="Completed" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 