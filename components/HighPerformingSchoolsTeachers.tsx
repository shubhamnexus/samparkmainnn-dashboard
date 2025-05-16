import { getFilteredData } from "@/services/dataService"
import { useState } from "react";
import { DateRange } from "react-day-picker";
import { Target, TrendingUp, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface HighPerformingSchoolsTeachersProps {
  period: string;
}

// Dummy data for schools
const dummySchools = [
  { id: 1, name: "Delhi Public School", district: "New Delhi", count: 95 },
  { id: 2, name: "St. Mary's Convent", district: "Mumbai", count: 92 },
  { id: 3, name: "Modern Public School", district: "Bangalore", count: 90 },
  { id: 4, name: "Kendriya Vidyalaya", district: "Chennai", count: 88 },
  { id: 5, name: "DPS International", district: "Hyderabad", count: 87 },
  { id: 6, name: "St. Xavier's School", district: "Kolkata", count: 86 },
  { id: 7, name: "Delhi International", district: "New Delhi", count: 85 },
  { id: 8, name: "Global Academy", district: "Mumbai", count: 84 },
  { id: 9, name: "City Public School", district: "Bangalore", count: 83 },
  { id: 10, name: "National High School", district: "Chennai", count: 82 },
  { id: 11, name: "Royal Academy", district: "Hyderabad", count: 81 },
  { id: 12, name: "Bright Future School", district: "Kolkata", count: 80 },
  { id: 13, name: "Sunrise Public School", district: "Pune", count: 79 },
  { id: 14, name: "Green Valley School", district: "Ahmedabad", count: 78 },
  { id: 15, name: "Blue Bells School", district: "Lucknow", count: 77 },
  { id: 16, name: "Silver Oak School", district: "Jaipur", count: 76 },
  { id: 17, name: "Heritage School", district: "Bhopal", count: 75 },
  { id: 18, name: "Springfield School", district: "Indore", count: 74 },
  { id: 19, name: "Little Flower School", district: "Patna", count: 73 },
  { id: 20, name: "Sacred Heart School", district: "Chandigarh", count: 72 },
  { id: 21, name: "Mount Carmel School", district: "Nagpur", count: 71 },
  { id: 22, name: "St. Joseph's School", district: "Kanpur", count: 70 },
  { id: 23, name: "Oxford Public School", district: "Surat", count: 69 },
  { id: 24, name: "Cambridge School", district: "Ranchi", count: 68 },
  { id: 25, name: "St. Paul's School", district: "Guwahati", count: 67 },
  { id: 26, name: "Don Bosco School", district: "Vijayawada", count: 66 },
  { id: 27, name: "St. Anne's School", district: "Coimbatore", count: 65 },
  { id: 28, name: "Ryan International", district: "Thane", count: 64 },
  { id: 29, name: "DAV Public School", district: "Faridabad", count: 63 },
  { id: 30, name: "Bal Bharti School", district: "Ghaziabad", count: 62 },
];

// Dummy data for teachers
const dummyTeachers = [
  { id: 1, name: "Dr. Rajesh Kumar", district: "New Delhi", count: 98 },
  { id: 2, name: "Prof. Meera Sharma", district: "Mumbai", count: 97 },
  { id: 3, name: "Dr. Amit Patel", district: "Bangalore", count: 96 },
  { id: 4, name: "Ms. Priya Singh", district: "Chennai", count: 95 },
  { id: 5, name: "Dr. Sunil Verma", district: "Hyderabad", count: 94 },
  { id: 6, name: "Prof. Anjali Gupta", district: "Kolkata", count: 93 },
  { id: 7, name: "Dr. Rahul Mishra", district: "New Delhi", count: 92 },
  { id: 8, name: "Ms. Neha Kapoor", district: "Mumbai", count: 91 },
  { id: 9, name: "Dr. Vikram Singh", district: "Bangalore", count: 90 },
  { id: 10, name: "Prof. Deepa Sharma", district: "Chennai", count: 89 },
  { id: 11, name: "Dr. Karan Malhotra", district: "Hyderabad", count: 88 },
  { id: 12, name: "Ms. Ritu Verma", district: "Kolkata", count: 87 },
  { id: 13, name: "Dr. Suresh Nair", district: "Pune", count: 86 },
  { id: 14, name: "Ms. Anu Joseph", district: "Ahmedabad", count: 85 },
  { id: 15, name: "Dr. Pooja Sinha", district: "Lucknow", count: 84 },
  { id: 16, name: "Prof. Manoj Jain", district: "Jaipur", count: 83 },
  { id: 17, name: "Ms. Shalini Rao", district: "Bhopal", count: 82 },
  { id: 18, name: "Dr. Nitin Desai", district: "Indore", count: 81 },
  { id: 19, name: "Ms. Kavita Das", district: "Patna", count: 80 },
  { id: 20, name: "Dr. Ajay Mehta", district: "Chandigarh", count: 79 },
  { id: 21, name: "Prof. Sneha Kulkarni", district: "Nagpur", count: 78 },
  { id: 22, name: "Dr. Rakesh Singh", district: "Kanpur", count: 77 },
  { id: 23, name: "Ms. Preeti Joshi", district: "Surat", count: 76 },
  { id: 24, name: "Dr. Alok Pandey", district: "Ranchi", count: 75 },
  { id: 25, name: "Ms. Nisha George", district: "Guwahati", count: 74 },
  { id: 26, name: "Dr. Sangeeta Roy", district: "Vijayawada", count: 73 },
  { id: 27, name: "Prof. Arvind Kumar", district: "Coimbatore", count: 72 },
  { id: 28, name: "Ms. Radhika Menon", district: "Thane", count: 71 },
  { id: 29, name: "Dr. Prakash Iyer", district: "Faridabad", count: 70 },
  { id: 30, name: "Ms. Swati Sharma", district: "Ghaziabad", count: 69 },
];

export function HighPerformingSchoolsTeachers({ period }: HighPerformingSchoolsTeachersProps) {
  const filteredData = getFilteredData(period);
  const [selectedDuration, setSelectedDuration] = useState("FY26Q1");
  const [schoolsPage, setSchoolsPage] = useState(1);
  const [teachersPage, setTeachersPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const schoolsPerPage = pageSize;
  const teachersPerPage = pageSize;

  const totalSchoolsPages = Math.ceil(dummySchools.length / schoolsPerPage);
  const totalTeachersPages = Math.ceil(dummyTeachers.length / teachersPerPage);

  const currentSchools = dummySchools.slice(
    (schoolsPage - 1) * schoolsPerPage,
    schoolsPage * schoolsPerPage
  );

  const currentTeachers = dummyTeachers.slice(
    (teachersPage - 1) * teachersPerPage,
    teachersPage * teachersPerPage
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-xl overflow-hidden">
        <div className="px-6 py-6 bg-gradient-to-r from-blue-500/10 via-orange-400/5 to-blue-500/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 w-full">
            {/* Left: Title and Subtitle */}
            <div className="flex flex-col gap-1">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                High Performing Schools & Teachers
              </h1>
              <p className="text-gray-600/90 text-base md:text-lg">
                Monitor and recognize excellence in educational institutions and teaching staff
              </p>
            </div>
            {/* Right: Controls */}
            <div className="flex flex-row flex-wrap gap-3 mt-4 md:mt-0">
              <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm border-2 border-slate-100">
                <Calendar className="h-4 w-4 text-blue-600" />
                <Select value={selectedDuration} onValueChange={setSelectedDuration}>
                  <SelectTrigger className="w-[140px] border-none shadow-none focus:ring-0">
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

      {/* Tables Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Schools Table */}
        <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:border-blue-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight font-sans">Top Schools</h2>
              <div className="flex items-center gap-2">
                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">View 3</SelectItem>
                    <SelectItem value="10">View 10</SelectItem>
                    <SelectItem value="20">View 20</SelectItem>
                    <SelectItem value="50">View 50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl shadow-lg overflow-hidden border-separate border-spacing-0 backdrop-blur-md">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100/60 via-orange-100/40 to-blue-50/60 backdrop-blur-md bg-opacity-60">
                    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-800 rounded-tl-xl" style={{backdropFilter: 'blur(6px)'}}>Sl no</th>
                    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-800" style={{backdropFilter: 'blur(6px)'}}>School Name</th>
                    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-800 rounded-tr-xl" style={{backdropFilter: 'blur(6px)'}}>District</th>
                  </tr>
                </thead>
                <tbody className="bg-gradient-to-br from-white via-blue-50 to-orange-50">
                  {currentSchools.map((school, index) => (
                    <tr
                      key={school.id}
                      className={
                        `transition-all duration-200 ${index % 2 === 0 ? 'bg-white/80' : 'bg-slate-50/80'} hover:bg-blue-100/60 hover:scale-[1.015] group` +
                        ' ' + (index < 3 ? 'font-bold' : '')
                      }
                      style={{ boxShadow: index < 3 ? '0 2px 8px 0 rgba(255, 193, 7, 0.10)' : undefined }}
                    >
                      <td className={`px-6 py-4 text-md text-gray-900 font-semibold border-b border-slate-100 group-hover:border-l-4 group-hover:border-blue-400 rounded-l-lg relative`}>
                        {index === 0 && <span className="mr-2 text-2xl align-middle">🥇</span>}
                        {index === 1 && <span className="mr-2 text-2xl align-middle">🥈</span>}
                        {index === 2 && <span className="mr-2 text-2xl align-middle">🥉</span>}
                        {(schoolsPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-6 py-4 text-md text-gray-900 border-b border-slate-100">{school.name}</td>
                      <td className="px-6 py-4 text-md text-gray-900 border-b border-slate-100">{school.district}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setSchoolsPage(prev => Math.max(prev - 1, 1))}
                disabled={schoolsPage === 1}
                className="flex items-center gap-1 px-4 py-2 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-gray-400 rounded-xl shadow-md transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>
              <span className="text-base text-gray-700 font-semibold bg-white/70 px-4 py-2 rounded-lg shadow-sm">
                Page {schoolsPage} of {totalSchoolsPages}
              </span>
              <button
                onClick={() => setSchoolsPage(prev => Math.min(prev + 1, totalSchoolsPages))}
                disabled={schoolsPage === totalSchoolsPages}
                className="flex items-center gap-1 px-4 py-2 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-gray-400 rounded-xl shadow-md transition-all duration-200"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Top Teachers Table */}
        <div className="bg-white rounded-2xl border-2 border-slate-200/60 shadow-2xl overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] hover:border-blue-200">
          <div className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight font-sans">Top Teachers</h2>
              <div className="flex items-center gap-2">
                <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="View" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">View 3</SelectItem>
                    <SelectItem value="10">View 10</SelectItem>
                    <SelectItem value="20">View 20</SelectItem>
                    <SelectItem value="50">View 50</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full rounded-xl shadow-lg overflow-hidden border-separate border-spacing-0 backdrop-blur-md">
                <thead>
                  <tr className="bg-gradient-to-r from-blue-100/60 via-orange-100/40 to-blue-50/60 backdrop-blur-md bg-opacity-60">
                    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-800 rounded-tl-xl" style={{backdropFilter: 'blur(6px)'}}>Rank</th>
                    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-800" style={{backdropFilter: 'blur(6px)'}}>Teacher Name</th>
                    <th className="px-6 py-4 text-left text-lg font-extrabold text-gray-800 rounded-tr-xl" style={{backdropFilter: 'blur(6px)'}}>District</th>
                  </tr>
                </thead>
                <tbody className="bg-gradient-to-br from-white via-blue-50 to-orange-50">
                  {currentTeachers.map((teacher, index) => (
                    <tr
                      key={teacher.id}
                      className={
                        `transition-all duration-200 ${index % 2 === 0 ? 'bg-white/80' : 'bg-slate-50/80'} hover:bg-blue-100/60 hover:scale-[1.015] group` +
                        ' ' + (index < 3 ? 'font-bold' : '')
                      }
                      style={{ boxShadow: index < 3 ? '0 2px 8px 0 rgba(255, 193, 7, 0.10)' : undefined }}
                    >
                      <td className={`px-6 py-4 text-md text-gray-900 font-semibold border-b border-slate-100 group-hover:border-l-4 group-hover:border-blue-400 rounded-l-lg relative`}>
                        {index === 0 && <span className="mr-2 text-2xl align-middle">🥇</span>}
                        {index === 1 && <span className="mr-2 text-2xl align-middle">🥈</span>}
                        {index === 2 && <span className="mr-2 text-2xl align-middle">🥉</span>}
                        {(teachersPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="px-6 py-4 text-md text-gray-900 border-b border-slate-100">{teacher.name}</td>
                      <td className="px-6 py-4 text-md text-gray-900 border-b border-slate-100">{teacher.district}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setTeachersPage(prev => Math.max(prev - 1, 1))}
                disabled={teachersPage === 1}
                className="flex items-center gap-1 px-4 py-2 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-gray-400 rounded-xl shadow-md transition-all duration-200"
              >
                <ChevronLeft className="h-5 w-5" />
                Previous
              </button>
              <span className="text-base text-gray-700 font-semibold bg-white/70 px-4 py-2 rounded-lg shadow-sm">
                Page {teachersPage} of {totalTeachersPages}
              </span>
              <button
                onClick={() => setTeachersPage(prev => Math.min(prev + 1, totalTeachersPages))}
                disabled={teachersPage === totalTeachersPages}
                className="flex items-center gap-1 px-4 py-2 text-base font-semibold text-white bg-blue-500 hover:bg-blue-600 disabled:bg-slate-200 disabled:text-gray-400 rounded-xl shadow-md transition-all duration-200"
              >
                Next
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 