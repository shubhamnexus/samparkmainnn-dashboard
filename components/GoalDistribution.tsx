import { useMemo, useState } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, Home } from "lucide-react"

interface GoalDistributionProps {
  programPlan: {
    attribute: string
    year1: number
    year2: number
    year3: number
    total: number
  }[]
}

type YearKey = 'year1' | 'year2' | 'year3' | 'total';

export function GoalDistribution({ programPlan }: GoalDistributionProps) {
  // Year filter state
  const [selectedYear, setSelectedYear] = useState<YearKey>('year1');

  // Helper to get value for selected year from programPlan
  const getValue = (attribute: string) => {
    const plan = programPlan.find(p => p.attribute === attribute)
    return plan ? plan[selectedYear] : 0
  }

  // Local state for covered values per year
  const [districtCovered, setDistrictCovered] = useState({ year1: 8, year2: 7, year3: 5, total: 20 })
  const [blockCovered, setBlockCovered] = useState({ year1: 25, year2: 22, year3: 15, total: 62 })
  const [schoolCovered, setSchoolCovered] = useState({ year1: 80, year2: 70, year3: 50, total: 200 })
  const [teachersTrained, setTeachersTrained] = useState({ year1: 70, year2: 60, year3: 50, total: 180 })

  // Totals from programPlan for selected year
  const investment = getValue("Investment")
  const totalDistrict = getValue("No of District to be Covered")
  const totalBlock = getValue("No of Blocks to be Covered")
  const totalSchool = getValue("No of Schools to be Covered")
  const teachersToBeTrained = getValue("No of Teachers to be Trained")
  const kits = getValue("No of Kits to be Distributed")
  const samparkTV = getValue("No of Sampark TV to be Distributed")
  const tv = getValue("No of TV to be Distributed")

  // Calculated percentages for selected year
  const districtPercent = totalDistrict ? Math.round((districtCovered[selectedYear] / totalDistrict) * 100) : 0
  const blockPercent = totalBlock ? Math.round((blockCovered[selectedYear] / totalBlock) * 100) : 0
  const schoolPercent = totalSchool ? Math.round((schoolCovered[selectedYear] / totalSchool) * 100) : 0
  const teacherPercent = teachersToBeTrained ? Math.round((teachersTrained[selectedYear] / teachersToBeTrained) * 100) : 0

  // Handlers for covered/trained fields
  const handleCoveredChange = (setter: any, state: any) => (e: any) => {
    const value = Number(e.target.value)
    setter({ ...state, [selectedYear]: value })
  }

  return (
    <div className="space-y-4 px-4 pb-4 pt-0 max-w-7xl mx-auto">
      {/* Header Section (orange theme) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-br from-orange-50 via-orange-100/60 to-orange-50 p-4 py-8 rounded-3xl border-2 border-orange-200/70 shadow-lg">
        <div className="space-y-1">
          <h1 className="text-5xl font-bold leading-[1.3] py-1 bg-gradient-to-r from-orange-600 via-orange-700 to-orange-800 bg-clip-text text-transparent">
            Goal Distribution & Coverage
          </h1>
          <p className="text-orange-600/90 text-xl font-medium">
            Track and manage program coverage across different parameters
          </p>
        </div>
        <div className="flex gap-4">
          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm border border-orange-200">
            <BarChart className="h-5 w-5 text-orange-600" />
            <span className="text-orange-800 font-medium">Coverage Metrics</span>
          </div>
          <div className="flex items-center gap-2 bg-white/80 p-3 rounded-xl shadow-sm border border-orange-200">
            <Home className="h-5 w-5 text-orange-600" />
            <span className="text-orange-800 font-medium">Distribution Goals</span>
          </div>
        </div>
      </div>

      {/* Year Filter */}
      <div className="flex justify-end">
        <Select value={selectedYear} onValueChange={v => setSelectedYear(v as YearKey)}>
          <SelectTrigger className="w-40 bg-orange-50/60 border-orange-200 text-orange-700 font-semibold focus:ring-2 focus:ring-orange-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white border-orange-200">
            <SelectItem value="year1">Year 1</SelectItem>
            <SelectItem value="year2">Year 2</SelectItem>
            <SelectItem value="year3">Year 3</SelectItem>
            <SelectItem value="total">Total</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Annual Budget Card */}
      <Card className="p-4 shadow-lg border-2 border-orange-200 bg-orange-50/40 rounded-2xl">
        <Label className="text-lg font-semibold text-orange-800 mb-2 block">Annual Budget</Label>
        <Input
          type="number"
          value={investment}
          readOnly
          className="w-full bg-orange-50/60 border-orange-200 text-orange-700 font-semibold"
        />
      </Card>

      {/* Second Row: District Info & Block Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* District Info Card */}
        <Card className="p-4 shadow-lg border-2 border-orange-200 bg-white/90 rounded-2xl hover:shadow-xl transition-shadow">
          <Label className="text-lg font-semibold text-orange-700 mb-2 block">District Info</Label>
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">Total District</Label>
              <Input type="number" value={totalDistrict} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">District Covered</Label>
              <Input type="number" value={districtCovered[selectedYear]} onChange={handleCoveredChange(setDistrictCovered, districtCovered)} className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">%</Label>
              <Input type="text" value={districtPercent + '%'} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
          </div>
        </Card>
        {/* Block Info Card */}
        <Card className="p-4 shadow-lg border-2 border-orange-200 bg-white/90 rounded-2xl hover:shadow-xl transition-shadow">
          <Label className="text-lg font-semibold text-orange-700 mb-2 block">Block Info</Label>
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">Total Block</Label>
              <Input type="number" value={totalBlock} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">Blocks Covered</Label>
              <Input type="number" value={blockCovered[selectedYear]} onChange={handleCoveredChange(setBlockCovered, blockCovered)} className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">%</Label>
              <Input type="text" value={blockPercent + '%'} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
          </div>
        </Card>
      </div>

      {/* Third Row: School Info & Teacher Training Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* School Info Card */}
        <Card className="p-4 shadow-lg border-2 border-orange-200 bg-white/90 rounded-2xl hover:shadow-xl transition-shadow">
          <Label className="text-lg font-semibold text-orange-700 mb-2 block">School Info</Label>
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">Total Schools in State</Label>
              <Input type="number" value={totalSchool} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">Schools Covered</Label>
              <Input type="number" value={schoolCovered[selectedYear]} onChange={handleCoveredChange(setSchoolCovered, schoolCovered)} className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">%</Label>
              <Input type="text" value={schoolPercent + '%'} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
          </div>
        </Card>
        {/* Teacher Training Info Card */}
        <Card className="p-4 shadow-lg border-2 border-orange-200 bg-white/90 rounded-2xl hover:shadow-xl transition-shadow">
          <Label className="text-lg font-semibold text-orange-700 mb-2 block">Teacher Training Info</Label>
          <div className="grid grid-cols-3 gap-4 items-end">
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">Teachers to be Trained</Label>
              <Input type="number" value={teachersToBeTrained} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">Teachers Trained</Label>
              <Input type="number" value={teachersTrained[selectedYear]} onChange={handleCoveredChange(setTeachersTrained, teachersTrained)} className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
            <div className="flex flex-col">
              <Label className="text-orange-700 mb-1">%</Label>
              <Input type="text" value={teacherPercent + '%'} readOnly className="bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
            </div>
          </div>
        </Card>
      </div>

      {/* Assets Distribution Card */}
      <Card className="p-4 shadow-lg border-2 border-orange-200 bg-white/90 rounded-2xl">
        <Label className="text-lg font-semibold text-orange-700 mb-2 block">Assets Distribution</Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div className="flex flex-col">
            <Label className="text-orange-700 mb-1">Kits Distribution</Label>
            <Input type="number" value={kits} readOnly className="w-full bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
          </div>
          <div className="flex flex-col">
            <Label className="text-orange-700 mb-1">Sampark TV Distribution</Label>
            <Input type="number" value={samparkTV} readOnly className="w-full bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
          </div>
          <div className="flex flex-col">
            <Label className="text-orange-700 mb-1">TV Distribution</Label>
            <Input type="number" value={tv} readOnly className="w-full bg-orange-50/60 border-orange-200 text-orange-700 font-semibold" />
          </div>
        </div>
      </Card>
    </div>
  )
} 