"use client"

import { useState } from "react"
import { Calendar, GraduationCap, Users, Briefcase, MapPin, Clock, ChevronDown, ChevronUp, Tv, BookOpen } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

type ActivityType = "smtv-installation" | "teacher-training" | "meeting" | "school-visit" | "lessons";

interface Activity {
  id: number;
  type: ActivityType;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  percentage?: number;
  user: {
    name: string;
    role: string;
    avatar: string;
  };
}

// Sample activity data with metrics
const activities: Activity[] = [
  {
    id: 1,
    type: "smtv-installation",
    title: "SMTV Installation Progress",
    date: "2024-03-22",
    time: "09:00 - 11:30",
    location: "District Office",
    description: "Current SMTV installation progress across schools",
    percentage: 75,
    user: {
      name: "Tech Team",
      role: "Installation Coordinator",
      avatar: "/abstract-letter-s.png",
    },
  },
  {
    id: 2,
    type: "teacher-training",
    title: "Teacher Training Completion",
    date: "2024-03-20",
    time: "13:00 - 16:00",
    location: "Training Center",
    description: "Progress of teacher training programs",
    percentage: 85,
    user: {
      name: "Training Team",
      role: "Training Coordinator",
      avatar: "/abstract-letter-s.png",
    },
  },
  {
    id: 3,
    type: "meeting",
    title: "Monthly Progress Review",
    date: "2024-03-19",
    time: "10:00 - 12:00",
    location: "Conference Room",
    description: "Review of all program metrics and progress",
    user: {
      name: "Management Team",
      role: "Program Manager",
      avatar: "/abstract-letter-s.png",
    },
  },
  {
    id: 4,
    type: "school-visit",
    title: "School Implementation Check",
    date: "2024-03-25",
    time: "10:00 - 14:00",
    location: "City Schools",
    description: "On-site verification of program implementation",
    user: {
      name: "Field Team",
      role: "Implementation Specialist",
      avatar: "/abstract-letter-s.png",
    },
  },
  {
    id: 5,
    type: "lessons",
    title: "Schools with 5+ Lessons",
    date: "2024-03-27",
    time: "09:00 - 17:00",
    location: "All Schools",
    description: "Progress of schools implementing 5 or more lessons",
    percentage: 65,
    user: {
      name: "Education Team",
      role: "Curriculum Specialist",
      avatar: "/abstract-letter-s.png",
    },
  }
]

// Sort activities by date
const sortedActivities = [...activities].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

export default function LiveFeed() {
  const [expandedActivity, setExpandedActivity] = useState<number | null>(null)

  // Format date to display in a more readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("en-US", options)
  }

  // Get icon based on activity type
  const getActivityIcon = (type: ActivityType) => {
    switch (type) {
      case "smtv-installation":
        return <Tv className="h-6 w-6" />
      case "teacher-training":
        return <Users className="h-6 w-6" />
      case "meeting":
        return <Briefcase className="h-6 w-6" />
      case "school-visit":
        return <MapPin className="h-6 w-6" />
      case "lessons":
        return <BookOpen className="h-6 w-6" />
      default:
        return <Calendar className="h-6 w-6" />
    }
  }

  // Get color class based on activity type
  const getActivityColorClass = (type: ActivityType) => {
    switch (type) {
      case "smtv-installation":
        return "bg-gradient-to-br from-blue-500 to-blue-600 text-white"
      case "teacher-training":
        return "bg-gradient-to-br from-violet-500 to-violet-600 text-white"
      case "meeting":
        return "bg-gradient-to-br from-emerald-500 to-emerald-600 text-white"
      case "school-visit":
        return "bg-gradient-to-br from-orange-500 to-orange-600 text-white"
      case "lessons":
        return "bg-gradient-to-br from-purple-500 to-purple-600 text-white"
      default:
        return "bg-gradient-to-br from-gray-500 to-gray-600 text-white"
    }
  }

  // Get border color class based on activity type
  const getActivityBorderClass = (type: ActivityType) => {
    switch (type) {
      case "smtv-installation":
        return "border-l-4 border-blue-500 hover:border-blue-600"
      case "teacher-training":
        return "border-l-4 border-violet-500 hover:border-violet-600"
      case "meeting":
        return "border-l-4 border-emerald-500 hover:border-emerald-600"
      case "school-visit":
        return "border-l-4 border-orange-500 hover:border-orange-600"
      case "lessons":
        return "border-l-4 border-purple-500 hover:border-purple-600"
      default:
        return "border-l-4 border-gray-500 hover:border-gray-600"
    }
  }

  // Toggle expanded state for an activity
  const toggleExpand = (id: number) => {
    if (expandedActivity === id) {
      setExpandedActivity(null)
    } else {
      setExpandedActivity(id)
    }
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl bg-gradient-to-b from-gray-50 to-white rounded-xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Activity Timeline</h1>
        <Badge variant="outline" className="text-sm px-3 py-1 bg-white/80 backdrop-blur-sm text-gray-600 border-gray-200 shadow-sm">
          All Activities
        </Badge>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gray-200 to-gray-100 rounded-full"></div>

        <div className="space-y-6">
          {sortedActivities.map((activity) => (
            <motion.div
              key={activity.id}
              className="relative pl-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.01 }}
            >
              {/* Timeline dot with icon */}
              <div
                className={`absolute left-8 top-6 w-8 h-8 rounded-full ${getActivityColorClass(
                  activity.type,
                )} flex items-center justify-center transform -translate-x-1/2 z-10 shadow-sm`}
              >
                {getActivityIcon(activity.type)}
              </div>

              <Card
                className={`p-0 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 ${getActivityBorderClass(activity.type)} bg-white/90 backdrop-blur-sm`}
              >
                <div
                  className="p-4 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  onClick={() => toggleExpand(activity.id)}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary" className="font-medium bg-gray-50/80 backdrop-blur-sm text-gray-700 border-gray-200">
                        {activity.type === "smtv-installation" && "SMTV Installation"}
                        {activity.type === "teacher-training" && "Teacher Training"}
                        {activity.type === "meeting" && "Meeting"}
                        {activity.type === "school-visit" && "School Visit"}
                        {activity.type === "lessons" && "Lessons Progress"}
                      </Badge>
                      <span className="text-sm text-gray-500">{formatDate(activity.date)}</span>
                    </div>
                    <h3 className="text-base font-medium text-gray-800">{activity.title}</h3>
                    {activity.percentage && (
                      <div className="mt-2">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className="h-2.5 rounded-full bg-blue-600" 
                            style={{ width: `${activity.percentage}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-600 mt-1 block">{activity.percentage}% Complete</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex flex-col items-end">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        <span>{activity.time}</span>
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{activity.location}</span>
                      </div>
                    </div>
                    {expandedActivity === activity.id ? (
                      <ChevronUp className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                </div>

                {expandedActivity === activity.id && (
                  <motion.div
                    className="px-4 pb-4 pt-2 border-t border-gray-100"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-sm text-gray-600 mb-4">{activity.description}</p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                        <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{activity.user.name}</p>
                        <p className="text-xs text-gray-500">{activity.user.role}</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
} 