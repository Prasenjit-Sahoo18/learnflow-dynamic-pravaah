
import React, { useState } from 'react';
import { Search, Filter, CalendarClock, AlertCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import UpcomingAssignment from '@/components/UpcomingAssignment';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const Assignments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const allAssignments = [
    {
      id: 1,
      title: 'Data Structures Assignment #4',
      course: 'Data Structures and Algorithms',
      dueDate: 'April 10, 2025',
      status: 'pending' as const,
      priority: 'high' as const,
    },
    {
      id: 2,
      title: 'Web Development Project Milestone',
      course: 'Web Development Fundamentals',
      dueDate: 'April 15, 2025',
      status: 'pending' as const,
      priority: 'medium' as const,
    },
    {
      id: 3,
      title: 'AI Weekly Quiz',
      course: 'Artificial Intelligence Basics',
      dueDate: 'April 8, 2025',
      status: 'submitted' as const,
      priority: 'medium' as const,
    },
    {
      id: 4,
      title: 'CS Midterm Paper',
      course: 'Introduction to Computer Science',
      dueDate: 'April 2, 2025',
      status: 'graded' as const,
      priority: 'high' as const,
    },
    {
      id: 5,
      title: 'Database Design Project',
      course: 'Database Management Systems',
      dueDate: 'April 20, 2025',
      status: 'pending' as const,
      priority: 'high' as const,
    },
    {
      id: 6,
      title: 'Cloud Architecture Assignment',
      course: 'Cloud Computing Essentials',
      dueDate: 'April 18, 2025',
      status: 'pending' as const,
      priority: 'low' as const,
    },
    {
      id: 7,
      title: 'Mobile App UI Mockups',
      course: 'Mobile App Development',
      dueDate: 'April 12, 2025',
      status: 'submitted' as const,
      priority: 'medium' as const,
    },
    {
      id: 8,
      title: 'Machine Learning Lab Exercise',
      course: 'Machine Learning Fundamentals',
      dueDate: 'April 5, 2025',
      status: 'graded' as const,
      priority: 'medium' as const,
    },
  ];

  const filteredAssignments = allAssignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         assignment.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || assignment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Count assignments by status
  const pendingCount = allAssignments.filter(a => a.status === 'pending').length;
  const submittedCount = allAssignments.filter(a => a.status === 'submitted').length;
  const gradedCount = allAssignments.filter(a => a.status === 'graded').length;
  
  // Get upcoming deadlines (due in the next 3 days)
  const today = new Date();
  const threeDaysFromNow = new Date();
  threeDaysFromNow.setDate(today.getDate() + 3);
  
  const upcomingDeadlines = allAssignments
    .filter(a => a.status === 'pending')
    .filter(a => {
      const dueDate = new Date(a.dueDate);
      return dueDate <= threeDaysFromNow;
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Assignments</h1>
          <p className="text-gray-500">Track and manage your assignments</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="all" className="mb-8" onValueChange={value => setStatusFilter(value === 'all' ? 'all' : value as 'pending' | 'submitted' | 'graded')}>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="all">
                    All
                    <Badge variant="secondary" className="ml-2">{allAssignments.length}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="pending">
                    Pending
                    <Badge variant="secondary" className="ml-2">{pendingCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="submitted">
                    Submitted
                    <Badge variant="secondary" className="ml-2">{submittedCount}</Badge>
                  </TabsTrigger>
                  <TabsTrigger value="graded">
                    Graded
                    <Badge variant="secondary" className="ml-2">{gradedCount}</Badge>
                  </TabsTrigger>
                </TabsList>

                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input 
                    placeholder="Search assignments" 
                    className="pl-10 w-full sm:w-[260px]" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <TabsContent value="all" className="space-y-4 mt-0">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map(assignment => (
                    <UpcomingAssignment
                      key={assignment.id}
                      title={assignment.title}
                      course={assignment.course}
                      dueDate={assignment.dueDate}
                      status={assignment.status}
                      priority={assignment.priority}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No assignments found matching your criteria.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="pending" className="space-y-4 mt-0">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map(assignment => (
                    <UpcomingAssignment
                      key={assignment.id}
                      title={assignment.title}
                      course={assignment.course}
                      dueDate={assignment.dueDate}
                      status={assignment.status}
                      priority={assignment.priority}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No pending assignments found.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="submitted" className="space-y-4 mt-0">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map(assignment => (
                    <UpcomingAssignment
                      key={assignment.id}
                      title={assignment.title}
                      course={assignment.course}
                      dueDate={assignment.dueDate}
                      status={assignment.status}
                      priority={assignment.priority}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No submitted assignments found.</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="graded" className="space-y-4 mt-0">
                {filteredAssignments.length > 0 ? (
                  filteredAssignments.map(assignment => (
                    <UpcomingAssignment
                      key={assignment.id}
                      title={assignment.title}
                      course={assignment.course}
                      dueDate={assignment.dueDate}
                      status={assignment.status}
                      priority={assignment.priority}
                    />
                  ))
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500">No graded assignments found.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>

          <div className="space-y-6">
            {/* Upcoming Deadlines Card */}
            <Card className="border-red-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <h3 className="font-semibold">Upcoming Deadlines</h3>
                </div>
                
                {upcomingDeadlines.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingDeadlines.map((assignment) => (
                      <div key={assignment.id} className="flex items-start">
                        <div className="bg-red-100 p-1.5 rounded-full mr-3 mt-0.5">
                          <CalendarClock className="h-4 w-4 text-red-600" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{assignment.title}</p>
                          <p className="text-xs text-gray-500">Due: {assignment.dueDate}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No upcoming deadlines in the next 3 days.</p>
                )}
              </CardContent>
            </Card>

            {/* Assignment Statistics Card */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Assignment Overview</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pending</span>
                      <span>{pendingCount} assignments</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-yellow-400 h-2.5 rounded-full" style={{ width: `${(pendingCount / allAssignments.length) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Submitted</span>
                      <span>{submittedCount} assignments</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-blue-500 h-2.5 rounded-full" style={{ width: `${(submittedCount / allAssignments.length) * 100}%` }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Graded</span>
                      <span>{gradedCount} assignments</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${(gradedCount / allAssignments.length) * 100}%` }}></div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    View All Submissions
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Assignment Filters */}
            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold mb-4">Filters</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Course</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Courses" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Courses</SelectItem>
                        <SelectItem value="ds">Data Structures and Algorithms</SelectItem>
                        <SelectItem value="web">Web Development Fundamentals</SelectItem>
                        <SelectItem value="ai">Artificial Intelligence Basics</SelectItem>
                        <SelectItem value="cs">Introduction to Computer Science</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Due Date</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Time</SelectItem>
                        <SelectItem value="today">Today</SelectItem>
                        <SelectItem value="this-week">This Week</SelectItem>
                        <SelectItem value="this-month">This Month</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="All Priorities" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Priorities</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assignments;
