import { useState } from "react"
import { Target, TrendingUp, PieChart as PieChartIcon, School, Users, Building2, Map, MapPin, Globe } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts'
import { IndiaMap } from './IndiaMap'

interface ProgramGoalsCoverageProps {
  period: string;
}

interface CoverageData {
  totalDistricts: number;
  coveredDistricts: number;
  totalSchools: number;
  coveredSchools: number;
  totalStudents: number;
  coveredStudents: number;
}

interface ProgramGoal {
  slNo: number;
  attribute: string;
  fy26: number;
  fy27: number;
  fy28: number;
  total: number;
}

// Updated color constants with subtle orange accent
const COLORS = ['#3b82f6', '#e2e8f0'];  // Blue primary, slate lighter

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-slate-200">
        <p className="text-sm font-medium text-gray-900">{payload[0].name}</p>
        <p className="text-sm text-blue-600">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function ProgramGoalsCoverage({ period }: ProgramGoalsCoverageProps) {
  // Coverage data state
  const [coverageData] = useState<CoverageData>({
    totalDistricts: 25,
    coveredDistricts: 12,
    totalSchools: 1000,
    coveredSchools: 200,
    totalStudents: 50000,
    coveredStudents: 25000,
  });

  // Program goals data
  const [programGoals] = useState<ProgramGoal[]>([
    { slNo: 1, attribute: 'Investment', fy26: 1000000, fy27: 800000, fy28: 600000, total: 2400000 },
    { slNo: 2, attribute: 'Teachers to be Trained', fy26: 100, fy27: 80, fy28: 60, total: 240 },
    { slNo: 3, attribute: 'Kits to be Distributed', fy26: 1000, fy27: 800, fy28: 500, total: 2300 },
    { slNo: 4, attribute: 'Sampark TV to be Distributed', fy26: 1500, fy27: 900, fy28: 600, total: 3000 },
    { slNo: 5, attribute: 'TV to be Distributed', fy26: 500, fy27: 400, fy28: 300, total: 1200 },
  ]);

  // District-wise data
  const districtData = {
    "Panchkula": { zone: "North", blocks: 8, schools: 120, covered: true, teachers: 480, students: 12000 },
    "Ambala": { zone: "North", blocks: 12, schools: 180, covered: true, teachers: 720, students: 18000 },
    "Yamunanagar": { zone: "North", blocks: 15, schools: 220, covered: false, teachers: 880, students: 22000 },
    "Kurukshetra": { zone: "North", blocks: 10, schools: 150, covered: true, teachers: 600, students: 15000 },
    "Kaithal": { zone: "North", blocks: 11, schools: 160, covered: false, teachers: 640, students: 16000 },
    "Karnal": { zone: "Central", blocks: 14, schools: 200, covered: true, teachers: 800, students: 20000 },
    "Panipat": { zone: "Central", blocks: 9, schools: 140, covered: true, teachers: 560, students: 14000 },
    "Sonipat": { zone: "Central", blocks: 13, schools: 190, covered: true, teachers: 760, students: 19000 },
    "Rohtak": { zone: "Central", blocks: 10, schools: 150, covered: false, teachers: 600, students: 15000 },
    "Jhajjar": { zone: "South", blocks: 8, schools: 130, covered: true, teachers: 520, students: 13000 },
    "Gurugram": { zone: "South", blocks: 16, schools: 250, covered: true, teachers: 1000, students: 25000 },
    "Faridabad": { zone: "South", blocks: 15, schools: 230, covered: true, teachers: 920, students: 23000 },
    "Palwal": { zone: "South", blocks: 9, schools: 140, covered: false, teachers: 560, students: 14000 },
    "Nuh": { zone: "South", blocks: 8, schools: 120, covered: true, teachers: 480, students: 12000 },
    "Rewari": { zone: "South", blocks: 10, schools: 150, covered: true, teachers: 600, students: 15000 },
    "Mahendragarh": { zone: "West", blocks: 9, schools: 130, covered: false, teachers: 520, students: 13000 },
    "Charkhi Dadri": { zone: "West", blocks: 7, schools: 110, covered: true, teachers: 440, students: 11000 },
    "Bhiwani": { zone: "West", blocks: 12, schools: 180, covered: false, teachers: 720, students: 18000 },
    "Hisar": { zone: "West", blocks: 14, schools: 210, covered: true, teachers: 840, students: 21000 },
    "Fatehabad": { zone: "West", blocks: 11, schools: 160, covered: false, teachers: 640, students: 16000 },
    "Sirsa": { zone: "West", blocks: 13, schools: 190, covered: true, teachers: 760, students: 19000 },
    "Jind": { zone: "Central", blocks: 12, schools: 170, covered: false, teachers: 680, students: 17000 }
  };

  const getChartData = (covered: number, total: number) => [
    { name: 'Covered', value: covered },
    { name: 'Remaining', value: total - covered }
  ];

  const StatCard = ({ 
    title, 
    covered, 
    total, 
    icon: Icon 
  }: { 
    title: string; 
    covered: number; 
    total: number; 
    icon: any 
  }) => {
    const percentage = Math.round((covered / total) * 100);
    
    return (
      <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Icon className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
              <span className="text-xs text-gray-600">Covered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-200"></div>
              <span className="text-xs text-gray-600">Remaining</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7">
            <div className="h-[180px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getChartData(covered, total)}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {getChartData(covered, total).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                    <Label
                      value={`${percentage}%`}
                      position="center"
                      fill="#2563eb"
                      style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))'
                      }}
                    />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="col-span-5 flex flex-col justify-center">
            <div className="space-y-4">
              <div>
                <div className="text-sm text-gray-600">Total</div>
                <div className="text-2xl font-bold text-gray-900">{total.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-gray-600">Covered</div>
                <div className="text-2xl font-bold text-blue-600">{covered.toLocaleString()}</div>
              </div>
              <div className="pt-2">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="max-w-[1600px] mx-auto px-4 py-6 space-y-6">
          {/* Header Section */}
          <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-xl overflow-hidden">
            <div className="px-6 py-6 bg-gradient-to-r from-blue-500/10 via-orange-400/5 to-blue-500/10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                    Program Goals & Coverage
                  </h1>
                  <p className="text-gray-600/90 text-base md:text-lg">
                    Monitor strategic objectives and implementation coverage across districts
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 hover:border-orange-200 transition-colors">
                    <Target className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Program Goals</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100 hover:border-orange-200 transition-colors">
                    <TrendingUp className="h-4 w-4 text-orange-600" />
                    <span className="text-gray-800 font-medium whitespace-nowrap text-sm">Coverage Status</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
            {/* Left Column - Map */}
            <div className="xl:col-span-7">
              <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-xl h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2.5 bg-blue-50 rounded-xl">
                        <Globe className="h-6 w-6 text-blue-600" />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900">District Coverage Status</h2>
                    </div>
                  </div>
                  <IndiaMap
                    coveredDistricts={coverageData.coveredDistricts}
                    onHover={(district) => console.log(district)}
                  />
                  
                  {/* Summary Section */}
                  <div className="mt-2 pt-3 border-t border-slate-100">
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Coverage by Zone</h3>
                        <div className="space-y-2">
                          {["North", "South", "East", "West", "Central"].map(zone => {
                            const districtsInZone = Object.entries(districtData).filter(([_, data]) => data.zone === zone);
                            const coveredInZone = districtsInZone.filter(([_, data]) => data.covered).length;
                            const totalInZone = districtsInZone.length;
                            return (
                              <div key={zone} className="flex items-center justify-between">
                                <span className="text-sm text-gray-700 font-medium">{zone} Zone</span>
                                <div className="flex items-center gap-3">
                                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-gradient-to-r from-blue-500 to-orange-500 rounded-full"
                                      style={{ width: `${(coveredInZone / totalInZone) * 100}%` }}
                                    ></div>
                                  </div>
                                  <span className="text-sm font-medium text-gray-800 min-w-[40px] text-right">
                                    {coveredInZone}/{totalInZone}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Coverage Insights</h3>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2.5 text-sm text-gray-700">
                            <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <PieChartIcon className="h-3.5 w-3.5 text-orange-600" />
                            </div>
                            <span className="leading-tight">
                              {Math.round((coverageData.coveredDistricts / coverageData.totalDistricts) * 100)}% overall district progress achieved
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm text-gray-700">
                            <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                              <School className="h-3.5 w-3.5 text-blue-600" />
                            </div>
                            <span className="leading-tight">
                              {coverageData.coveredSchools.toLocaleString()} schools implementing the program
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm text-gray-700">
                            <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                              <Users className="h-3.5 w-3.5 text-slate-600" />
                            </div>
                            <span className="leading-tight">
                              {coverageData.coveredStudents.toLocaleString()} students benefiting from the initiative
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5 text-sm text-gray-700">
                            <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center flex-shrink-0">
                              <Target className="h-3.5 w-3.5 text-orange-600" />
                            </div>
                            <span className="leading-tight">
                              {Math.round((Object.values(districtData).filter(d => d.covered).length / Object.values(districtData).length) * 100)}% implementation rate across regions
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Stats */}
            <div className="xl:col-span-5 space-y-4">
              <StatCard
                title="District Coverage"
                covered={coverageData.coveredDistricts}
                total={coverageData.totalDistricts}
                icon={Building2}
              />
              <StatCard
                title="School Coverage"
                covered={coverageData.coveredSchools}
                total={coverageData.totalSchools}
                icon={School}
              />
              <StatCard
                title="Student Coverage"
                covered={coverageData.coveredStudents}
                total={coverageData.totalStudents}
                icon={Users}
              />
            </div>
          </div>

          {/* Program Goals Cards */}
          <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-xl overflow-hidden">
            <div className="p-6 border-b border-slate-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-50 rounded-xl">
                    <Target className="h-5 w-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Program Goals by Year</h2>
                </div>
                <div className="flex items-center gap-3">
                  <div className="px-3 py-1.5 bg-blue-50 rounded-lg text-blue-700 font-medium text-sm">
                    FY 2026-2028
                  </div>
                </div>
              </div>
            </div>
            <div className="p-6 bg-gradient-to-b from-slate-50/50 to-white">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programGoals.map((goal, index) => {
                  // Alternate between blue and orange themes
                  const isBlueTheme = index % 2 === 0;
                  const cardTheme = isBlueTheme ? {
                    bg: 'bg-blue-50/30',
                    border: 'hover:border-blue-200',
                    iconBg: 'bg-blue-100',
                    iconText: 'text-blue-700',
                    total: 'text-blue-700',
                    gradient: 'from-blue-500 to-blue-400'
                  } : {
                    bg: 'bg-orange-50/30',
                    border: 'hover:border-orange-200',
                    iconBg: 'bg-orange-100',
                    iconText: 'text-orange-700',
                    total: 'text-orange-700',
                    gradient: 'from-orange-500 to-orange-400'
                  };

                  return (
                    <div 
                      key={goal.slNo} 
                      className={`${cardTheme.bg} rounded-xl p-6 border-2 border-slate-100 ${cardTheme.border} transition-all hover:shadow-lg`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`h-8 w-8 rounded-full ${cardTheme.iconBg} flex items-center justify-center flex-shrink-0`}>
                          <span className={`text-sm font-semibold ${cardTheme.iconText}`}>{goal.slNo}</span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">{goal.attribute}</h3>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/80 transition-colors">
                          <span className="text-sm text-gray-600">FY26</span>
                          <span className="text-sm font-medium text-gray-900">{goal.fy26.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/80 transition-colors">
                          <span className="text-sm text-gray-600">FY27</span>
                          <span className="text-sm font-medium text-gray-900">{goal.fy27.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between p-2 rounded-lg hover:bg-white/80 transition-colors">
                          <span className="text-sm text-gray-600">FY28</span>
                          <span className="text-sm font-medium text-gray-900">{goal.fy28.toLocaleString()}</span>
                        </div>
                        <div className="pt-3 mt-3 border-t border-slate-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-700">Total Target</span>
                            <span className={`text-lg font-semibold ${cardTheme.total}`}>{goal.total.toLocaleString()}</span>
                          </div>
                          <div className="mt-3">
                            <div className="h-[100px]">
                              <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                  <Pie
                                    data={[
                                      { name: 'FY26', value: goal.fy26 },
                                      { name: 'FY27', value: goal.fy27 },
                                      { name: 'FY28', value: goal.fy28 }
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={25}
                                    outerRadius={35}
                                    paddingAngle={2}
                                    dataKey="value"
                                  >
                                    <Cell fill={isBlueTheme ? '#3b82f6' : '#f97316'} />
                                    <Cell fill={isBlueTheme ? '#60a5fa' : '#fb923c'} />
                                    <Cell fill={isBlueTheme ? '#93c5fd' : '#fdba74'} />
                                  </Pie>
                                  <Tooltip 
                                    content={({ active, payload }) => {
                                      if (active && payload && payload.length) {
                                        const data = payload[0].payload;
                                        return (
                                          <div className="bg-white p-2 shadow-lg rounded-lg border border-slate-200 text-xs">
                                            <p className="font-medium text-gray-900">{data.name}</p>
                                            <p className={`font-medium ${cardTheme.total}`}>
                                              {data.value.toLocaleString()} ({Math.round((data.value / goal.total) * 100)}%)
                                            </p>
                                          </div>
                                        );
                                      }
                                      return null;
                                    }}
                                  />
                                </PieChart>
                              </ResponsiveContainer>
                            </div>
                            
                            {/* Year-wise percentage labels */}
                            <div className="grid grid-cols-3 gap-1 mt-2">
                              <div className="text-center">
                                <div className="text-xs text-gray-500">FY26</div>
                                <div className="text-xs font-medium text-gray-700">{Math.round((goal.fy26 / goal.total) * 100)}%</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500">FY27</div>
                                <div className="text-xs font-medium text-gray-700">{Math.round((goal.fy27 / goal.total) * 100)}%</div>
                              </div>
                              <div className="text-center">
                                <div className="text-xs text-gray-500">FY28</div>
                                <div className="text-xs font-medium text-gray-700">{Math.round((goal.fy28 / goal.total) * 100)}%</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 