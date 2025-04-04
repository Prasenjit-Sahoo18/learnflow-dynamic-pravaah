
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Award, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import CourseCard from './CourseCard';
import ProgressStats from './ProgressStats';
import UpcomingAssignment from './UpcomingAssignment';
import Profile from './Profile';

const Dashboard: React.FC = () => {
  const courses = [
    { id: 1, title: 'Introduction to Computer Science', instructor: 'Dr. Alan Turing', progress: 68, color: 'purple' },
    { id: 2, title: 'Data Structures and Algorithms', instructor: 'Prof. Ada Lovelace', progress: 45, color: 'blue' },
    { id: 3, title: 'Web Development Fundamentals', instructor: 'Dr. Tim Berners-Lee', progress: 92, color: 'green' },
    { id: 4, title: 'Artificial Intelligence Basics', instructor: 'Prof. Andrew Ng', progress: 23, color: 'orange' },
  ];

  const stats = [
    {
      title: 'Courses Enrolled',
      value: '8',
      description: 'Active courses',
      icon: <Book className="h-4 w-4" />,
    },
    {
      title: 'Assignments',
      value: '12',
      description: '3 due this week',
      icon: <CheckCircle className="h-4 w-4" />,
      trend: 'up' as const,
      trendValue: '2 new',
    },
    {
      title: 'Course Completion',
      value: '68%',
      description: 'Average progress',
      trend: 'up' as const,
      trendValue: '5%',
    },
    {
      title: 'Learning Hours',
      value: '24h',
      description: 'This month',
      icon: <Clock className="h-4 w-4" />,
      trend: 'up' as const,
      trendValue: '8h',
    },
  ];

  const assignments = [
    {
      title: 'Data Structures Assignment #4',
      course: 'Data Structures and Algorithms',
      dueDate: 'April 10, 2025',
      status: 'pending' as const,
      priority: 'high' as const,
    },
    {
      title: 'Web Development Project Milestone',
      course: 'Web Development Fundamentals',
      dueDate: 'April 15, 2025',
      status: 'pending' as const,
      priority: 'medium' as const,
    },
    {
      title: 'AI Weekly Quiz',
      course: 'Artificial Intelligence Basics',
      dueDate: 'April 8, 2025',
      status: 'submitted' as const,
    },
    {
      title: 'CS Midterm Paper',
      course: 'Introduction to Computer Science',
      dueDate: 'April 2, 2025',
      status: 'graded' as const,
    },
  ];

  const userBadges = [
    { 
      name: 'Early Submitter', 
      icon: <Clock className="h-3 w-3" />,
      color: 'bg-blue-50 text-blue-700 border-blue-200',
    },
    { 
      name: 'Perfect Attendance', 
      icon: <CheckCircle className="h-3 w-3" />,
      color: 'bg-green-50 text-green-700 border-green-200',
    },
    { 
      name: 'Top Performer', 
      icon: <Award className="h-3 w-3" />,
      color: 'bg-purple-50 text-purple-700 border-purple-200',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, Student!</h1>
        <p className="text-gray-500">Here's what's happening with your courses today.</p>
      </div>
      
      {/* Stats Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-medium mb-4">Learning Overview</h2>
        <ProgressStats stats={stats} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {/* My Courses Section */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">My Courses</h2>
              <Link to="/courses" className="text-purple-600 text-sm hover:underline">View all courses</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {courses.map(course => (
                <Link to={`/courses/${course.id}`} key={course.id} className="hover:no-underline">
                  <CourseCard
                    title={course.title}
                    instructor={course.instructor}
                    progress={course.progress}
                    color={course.color}
                  />
                </Link>
              ))}
            </div>
          </div>
          
          {/* Upcoming Assignments */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-medium">Upcoming Assignments</h2>
              <Link to="/assignments" className="text-purple-600 text-sm hover:underline">View all assignments</Link>
            </div>
            <div className="space-y-4">
              {assignments.map((assignment, index) => (
                <UpcomingAssignment
                  key={index}
                  title={assignment.title}
                  course={assignment.course}
                  dueDate={assignment.dueDate}
                  status={assignment.status}
                  priority={assignment.priority}
                />
              ))}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="space-y-6">
          {/* Profile Card */}
          <Profile
            name="Student Name"
            role="Computer Science Student"
            email="student@university.edu"
            department="School of Computer Science"
            badges={userBadges}
          />
          
          {/* AI Recommendations */}
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-2 flex items-center">
                <span className="mr-1 text-purple-600">AI</span> Recommendations
              </h3>
              <ul className="space-y-3">
                <li className="text-sm">
                  <Link to="/courses/2" className="text-gray-700 hover:text-purple-700 flex items-start">
                    <span className="bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                      <Book className="h-3 w-3 text-purple-600" />
                    </span>
                    <span>Review Chapter 5 before your upcoming Data Structures quiz</span>
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/assignments" className="text-gray-700 hover:text-purple-700 flex items-start">
                    <span className="bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                      <Clock className="h-3 w-3 text-purple-600" />
                    </span>
                    <span>Your AI Weekly Quiz is due in 3 days</span>
                  </Link>
                </li>
                <li className="text-sm">
                  <Link to="/courses/3" className="text-gray-700 hover:text-purple-700 flex items-start">
                    <span className="bg-purple-100 p-1 rounded-full mr-2 flex-shrink-0 mt-0.5">
                      <CheckCircle className="h-3 w-3 text-purple-600" />
                    </span>
                    <span>Complete your Web Development project to maintain your perfect streak</span>
                  </Link>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
