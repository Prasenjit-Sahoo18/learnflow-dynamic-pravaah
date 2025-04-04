import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Book, Users, PlayCircle, FileText, Star, Clock, Calendar, Award } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const [activeModule, setActiveModule] = useState("module1");
  
  const course = {
    id: 1,
    title: 'Introduction to Computer Science',
    instructor: 'Dr. Alan Turing',
    description: 'This comprehensive course introduces the fundamental concepts of computer science, covering algorithms, data structures, and problem-solving techniques. Students will learn the building blocks of computational thinking.',
    progress: 68,
    enrollmentStatus: 'In Progress',
    duration: '12 weeks',
    level: 'Beginner',
    rating: 4.8,
    totalStudents: 1250,
    lastUpdated: 'March 15, 2025',
    totalLectures: 42,
    totalHours: 36,
    color: 'purple',
    modules: [
      {
        id: 'module1',
        title: 'Getting Started with Computer Science',
        progress: 100,
        lectures: [
          { id: 1, title: 'Introduction to the Course', duration: '10:25', completed: true },
          { id: 2, title: 'History of Computing', duration: '18:30', completed: true },
          { id: 3, title: 'Binary and Number Systems', duration: '22:15', completed: true }
        ]
      },
      {
        id: 'module2',
        title: 'Basic Programming Concepts',
        progress: 75,
        lectures: [
          { id: 4, title: 'Variables and Data Types', duration: '15:10', completed: true },
          { id: 5, title: 'Operators and Expressions', duration: '20:45', completed: true },
          { id: 6, title: 'Control Flow Statements', duration: '25:30', completed: false }
        ]
      },
      {
        id: 'module3',
        title: 'Data Structures',
        progress: 0,
        lectures: [
          { id: 7, title: 'Arrays and Lists', duration: '18:20', completed: false },
          { id: 8, title: 'Stacks and Queues', duration: '22:50', completed: false },
          { id: 9, title: 'Trees and Graphs', duration: '28:15', completed: false }
        ]
      }
    ]
  };

  if (!course) {
    return <div>Loading...</div>;
  }

  const totalLectures = course.modules.reduce((acc, module) => acc + module.lectures.length, 0);
  const completedLectures = course.modules.reduce(
    (acc, module) => acc + module.lectures.filter(l => l.completed).length, 
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className={`bg-gradient-to-r from-${course.color}-600 to-${course.color}-700 text-white py-12`}>
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="mb-2 flex items-center">
                <Badge variant="outline" className="border-white/40 text-white bg-white/10">
                  {course.level}
                </Badge>
                <span className="mx-2 text-white/60">•</span>
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-300 text-yellow-300 mr-1" />
                  <span>{course.rating}</span>
                  <span className="text-white/60 ml-1">({course.totalStudents} students)</span>
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
              <p className="mb-4">Instructor: {course.instructor}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.totalHours} hours</span>
                </div>
                <div className="flex items-center">
                  <PlayCircle className="h-4 w-4 mr-1" />
                  <span>{course.totalLectures} lectures</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>Last updated: {course.lastUpdated}</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-3">
              <Button size="lg" className="bg-white text-purple-700 hover:bg-white/90">
                Continue Learning
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 text-white hover:bg-white/10">
                <FileText className="h-4 w-4 mr-2" />
                Course Materials
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="content" className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="content">Course Content</TabsTrigger>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="notes">My Notes</TabsTrigger>
              </TabsList>
              
              <TabsContent value="content" className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-medium">Course Content</h2>
                  <div className="text-sm text-gray-500">
                    {completedLectures} / {totalLectures} lectures completed
                  </div>
                </div>
                
                <Progress value={course.progress} className="h-2 mb-8" />
                
                <Accordion type="single" collapsible defaultValue={activeModule}>
                  {course.modules.map((module) => (
                    <AccordionItem key={module.id} value={module.id}>
                      <AccordionTrigger className="hover:bg-gray-50 px-4 py-4 rounded-md">
                        <div className="flex flex-col items-start">
                          <div className="text-lg font-medium">{module.title}</div>
                          <div className="text-sm text-gray-500 mt-1">
                            {module.lectures.filter(l => l.completed).length} / {module.lectures.length} lectures • 
                            <Progress value={module.progress} className="h-1 w-24 inline-block ml-2 align-middle" />
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4">
                        <div className="space-y-2 mb-4">
                          {module.lectures.map((lecture) => (
                            <div 
                              key={lecture.id} 
                              className={`flex items-center justify-between p-3 rounded-md ${
                                lecture.completed ? "bg-green-50 text-green-900" : "bg-white hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center">
                                <PlayCircle className={`h-5 w-5 mr-3 ${lecture.completed ? "text-green-600" : "text-gray-400"}`} />
                                <span>{lecture.title}</span>
                                {lecture.completed && (
                                  <Badge variant="outline" className="ml-3 border-green-200 text-green-700 bg-green-50">
                                    Completed
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-gray-500">{lecture.duration}</div>
                            </div>
                          ))}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
              
              <TabsContent value="overview">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">About This Course</h2>
                    <p className="text-gray-700 mb-6">{course.description}</p>
                    
                    <h3 className="text-lg font-medium mb-3">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 text-green-500">✓</div>
                        <span>Understand core computer science concepts</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 text-green-500">✓</div>
                        <span>Implement basic algorithms and data structures</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 text-green-500">✓</div>
                        <span>Solve computational problems effectively</span>
                      </li>
                      <li className="flex items-start">
                        <div className="mr-2 mt-1 text-green-500">✓</div>
                        <span>Write pseudocode and basic programs</span>
                      </li>
                    </ul>
                    
                    <h3 className="text-lg font-medium mb-3">Requirements</h3>
                    <ul className="list-disc list-inside mb-6 text-gray-700 space-y-1">
                      <li>Basic mathematics knowledge (algebra)</li>
                      <li>No prior programming experience necessary</li>
                      <li>Critical thinking and problem-solving mindset</li>
                    </ul>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">Student Reviews</h2>
                    <div className="flex items-center mb-6">
                      <div className="text-4xl font-bold mr-4">4.8</div>
                      <div>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-5 w-5 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-yellow-400 text-yellow-400"}`} />
                          ))}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">Based on 248 reviews</div>
                      </div>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="border-b pb-6">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-medium mr-3">JS</div>
                          <div>
                            <div className="font-medium">Jane Smith</div>
                            <div className="text-sm text-gray-500">2 weeks ago</div>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700">
                          Excellent introduction to computer science! The explanations were clear and the practice problems helped reinforce the concepts.
                        </p>
                      </div>
                      
                      <div className="border-b pb-6">
                        <div className="flex items-center mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-medium mr-3">MJ</div>
                          <div>
                            <div className="font-medium">Michael Johnson</div>
                            <div className="text-sm text-gray-500">1 month ago</div>
                          </div>
                        </div>
                        <div className="flex mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-700">
                          Dr. Turing is an exceptional instructor. The content is well-structured and builds logically from basic to more complex topics.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="notes">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-medium mb-4">My Notes</h2>
                    <p className="text-gray-500 mb-6">Take notes while watching lectures to help with studying later.</p>
                    
                    <div className="p-6 text-center border border-dashed rounded-md">
                      <FileText className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium">No notes yet</h3>
                      <p className="text-gray-500">Start taking notes while watching lectures.</p>
                      <Button variant="outline" className="mt-4">Create First Note</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <Card className="sticky top-8">
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="font-medium mb-1">Your Progress</h3>
                  <Progress value={course.progress} className="h-2" />
                  <p className="text-sm text-gray-500 mt-2">{course.progress}% complete</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Enrollment Status:</span>
                    <Badge>{course.enrollmentStatus}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration:</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Level:</span>
                    <span>{course.level}</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">This Course Includes:</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <PlayCircle className="h-4 w-4 text-gray-500 mr-2" />
                      <span>{course.totalHours} hours on-demand video</span>
                    </div>
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-500 mr-2" />
                      <span>12 downloadable resources</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Certificate of completion</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-500 mr-2" />
                      <span>Forum access and discussions</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
