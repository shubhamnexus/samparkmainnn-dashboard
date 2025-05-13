import { useState } from "react"
import { Target, TrendingUp, PieChart as PieChartIcon, School, Users, Building2 } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Label } from 'recharts'
import { IndiaMap } from './IndiaMap'

interface ProgramGoalsProgressProps {
  period: string;
}

interface ProgressData {
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

const COLORS = ['#f97316', '#fee2d7'];
const HOVER_COLORS = ['#ea580c', '#ffd4c4'];

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
}

const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 shadow-lg rounded-lg border border-orange-100">
        <p className="text-sm font-medium text-orange-900">{payload[0].name}</p>
        <p className="text-sm text-orange-600">{payload[0].value.toLocaleString()}</p>
      </div>
    );
  }
  return null;
};

export function ProgramGoalsProgress({ period }: ProgramGoalsProgressProps) {
  // Progress data state
  const [progressData] = useState<ProgressData>({
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

  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill } = props;
    return (
      <g>
        <path
          d={`M${cx},${cy - outerRadius - 6}L${cx},${cy + outerRadius + 6}`}
          stroke={fill}
          strokeWidth={2}
          strokeDasharray="4 4"
        />
        <path
          d={`M${cx - outerRadius - 6},${cy}L${cx + outerRadius + 6},${cy}`}
          stroke={fill}
          strokeWidth={2}
          strokeDasharray="4 4"
        />
        <path
          d={`M${cx},${cy}L${cx + outerRadius * Math.cos(startAngle)},${
            cy + outerRadius * Math.sin(startAngle)
          }`}
          stroke={fill}
          strokeWidth={2}
        />
        <path
          d={`M${cx},${cy}L${cx + outerRadius * Math.cos(endAngle)},${
            cy + outerRadius * Math.sin(endAngle)
          }`}
          stroke={fill}
          strokeWidth={2}
        />
      </g>
    );
  };

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
      <div className="bg-white rounded-2xl border-2 border-orange-200/60 shadow-xl p-6 hover:border-orange-300 transition-all hover:shadow-2xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-xl">
              <Icon className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-lg font-semibold text-orange-900">{title}</h3>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#f97316]"></div>
              <span className="text-xs text-gray-600">Covered</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#fee2d7]"></div>
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
                    activeShape={renderActiveShape}
                  >
                    {getChartData(covered, total).map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={COLORS[index % COLORS.length]}
                        onMouseEnter={() => {}}
                        onMouseLeave={() => {}}
                      />
                    ))}
                    <Label
                      value={`${percentage}%`}
                      position="center"
                      fill="#ea580c"
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
                <div className="text-2xl font-bold text-orange-600">{covered.toLocaleString()}</div>
              </div>
              <div className="pt-2">
                <div className="h-2 bg-orange-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full"
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
    <div className="min-h-screen bg-gradient-to-b from-orange-50/50 to-white">
      <div className="max-w-[1600px] mx-auto px-4 py-6 space-y-6">
        {/* Header Section */}
        <div className="bg-white rounded-2xl border-2 border-orange-200/60 shadow-xl overflow-hidden">
          <div className="px-6 py-6 bg-gradient-to-r from-orange-500/10 via-orange-400/5 to-orange-500/10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1">
                <h1 className="text-3xl md:text-4xl font-bold text-orange-900">
                  Program Goals & Progress
                </h1>
                <p className="text-orange-600/90 text-base md:text-lg">
                  Track progress and monitor implementation across regions
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-orange-100 hover:border-orange-200 transition-colors">
                  <Target className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-800 font-medium whitespace-nowrap text-sm">Strategic Goals</span>
                </div>
                <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-orange-100 hover:border-orange-200 transition-colors">
                  <TrendingUp className="h-4 w-4 text-orange-600" />
                  <span className="text-orange-800 font-medium whitespace-nowrap text-sm">Progress Tracking</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Map */}
          <div className="xl:col-span-7">
            <div className="bg-white rounded-2xl border-2 border-orange-200/60 shadow-xl h-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-orange-900">District Progress Map</h2>
                </div>
                <IndiaMap
                  coveredDistricts={progressData.coveredDistricts}
                  onHover={(district) => console.log(district)}
                />
                
                {/* Summary Section */}
                <div className="mt-auto pt-4 border-t border-orange-100">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">Zone-wise Progress</h3>
                      <div className="space-y-2.5">
                        {["North", "South", "East", "West", "Central"].map(zone => {
                          const districtsInZone = Object.entries(districtData).filter(([_, data]) => data.zone === zone);
                          const coveredInZone = districtsInZone.filter(([_, data]) => data.covered).length;
                          const totalInZone = districtsInZone.length;
                          return (
                            <div key={zone} className="flex items-center justify-between">
                              <span className="text-sm text-gray-700 font-medium">{zone} Zone</span>
                              <div className="flex items-center gap-3">
                                <div className="w-24 h-2 bg-orange-100 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-orange-500 rounded-full"
                                    style={{ width: `${(coveredInZone / totalInZone) * 100}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm font-medium text-orange-800 min-w-[40px] text-right">
                                  {coveredInZone}/{totalInZone}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-orange-900 mb-3">Key Insights</h3>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-2.5 text-sm text-gray-700">
                          <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <PieChartIcon className="h-3.5 w-3.5 text-green-600" />
                          </div>
                          <span className="leading-tight">
                            {Math.round((progressData.coveredDistricts / progressData.totalDistricts) * 100)}% overall district progress achieved
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-gray-700">
                          <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <School className="h-3.5 w-3.5 text-blue-600" />
                          </div>
                          <span className="leading-tight">
                            {progressData.coveredSchools.toLocaleString()} schools implementing the program
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 text-sm text-gray-700">
                          <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Users className="h-3.5 w-3.5 text-purple-600" />
                          </div>
                          <span className="leading-tight">
                            {progressData.coveredStudents.toLocaleString()} students benefiting from the initiative
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
              title="District Progress"
              covered={progressData.coveredDistricts}
              total={progressData.totalDistricts}
              icon={Building2}
            />
            <StatCard
              title="School Progress"
              covered={progressData.coveredSchools}
              total={progressData.totalSchools}
              icon={School}
            />
            <StatCard
              title="Student Progress"
              covered={progressData.coveredStudents}
              total={progressData.totalStudents}
              icon={Users}
            />
          </div>
        </div>

        {/* Program Goals Table */}
        <div className="bg-white rounded-2xl border-2 border-orange-200/60 shadow-xl overflow-hidden">
          <div className="p-6 border-b border-orange-100">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-orange-900">Year Wise Program Goals</h2>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1.5 bg-orange-50 rounded-lg text-orange-700 font-medium text-sm">
                  FY 2026-2028
                </div>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-orange-50/50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-orange-800">Sl No</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-orange-800">Attribute</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-orange-800">FY26</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-orange-800">FY27</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-orange-800">FY28</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-orange-800">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-orange-100">
                {programGoals.map((goal) => (
                  <tr key={goal.slNo} className="hover:bg-orange-50/30 transition-colors">
                    <td className="px-6 py-3">
                      <div className="h-6 w-6 rounded-full bg-orange-100 flex items-center justify-center">
                        <span className="text-sm font-semibold text-orange-700">{goal.slNo}</span>
                      </div>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm font-medium text-gray-900">{goal.attribute}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-gray-600">{goal.fy26.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-gray-600">{goal.fy27.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm text-gray-600">{goal.fy28.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-3">
                      <span className="text-sm font-medium text-orange-700">{goal.total.toLocaleString()}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
} 