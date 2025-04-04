
import React, { useState } from 'react';
import { Search, Filter, BookOpen } from 'lucide-react';
import Navbar from '@/components/Navbar';
import CourseCard from '@/components/CourseCard';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const allCourses = [
    { id: 1, title: 'Introduction to Computer Science', instructor: 'Dr. Alan Turing', progress: 68, color: 'purple', category: 'Computer Science', level: 'Beginner' },
    { id: 2, title: 'Data Structures and Algorithms', instructor: 'Prof. Ada Lovelace', progress: 45, color: 'blue', category: 'Computer Science', level: 'Intermediate' },
    { id: 3, title: 'Web Development Fundamentals', instructor: 'Dr. Tim Berners-Lee', progress: 92, color: 'green', category: 'Development', level: 'Beginner' },
    { id: 4, title: 'Artificial Intelligence Basics', instructor: 'Prof. Andrew Ng', progress: 23, color: 'orange', category: 'Computer Science', level: 'Advanced' },
    { id: 5, title: 'Database Management Systems', instructor: 'Dr. Edgar Codd', progress: 54, color: 'purple', category: 'Information Technology', level: 'Intermediate' },
    { id: 6, title: 'Mobile App Development', instructor: 'Prof. Steve Jobs', progress: 32, color: 'blue', category: 'Development', level: 'Intermediate' },
    { id: 7, title: 'Cloud Computing Essentials', instructor: 'Dr. Werner Vogels', progress: 76, color: 'green', category: 'Information Technology', level: 'Advanced' },
    { id: 8, title: 'Machine Learning Fundamentals', instructor: 'Prof. Geoffrey Hinton', progress: 18, color: 'orange', category: 'Computer Science', level: 'Advanced' },
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || course.category.toLowerCase() === filter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Explore Courses</h1>
          <p className="text-gray-500">Find the perfect course to enhance your skills</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input 
              placeholder="Search courses or instructors" 
              className="pl-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="computer science">Computer Science</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="information technology">Information Technology</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={16} />
              More Filters
            </Button>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Badge 
            variant={filter === 'all' ? 'default' : 'outline'} 
            className="cursor-pointer px-3 py-1"
            onClick={() => setFilter('all')}
          >
            All
          </Badge>
          <Badge 
            variant={filter === 'computer science' ? 'default' : 'outline'} 
            className="cursor-pointer px-3 py-1"
            onClick={() => setFilter('computer science')}
          >
            Computer Science
          </Badge>
          <Badge 
            variant={filter === 'development' ? 'default' : 'outline'} 
            className="cursor-pointer px-3 py-1"
            onClick={() => setFilter('development')}
          >
            Development
          </Badge>
          <Badge 
            variant={filter === 'information technology' ? 'default' : 'outline'} 
            className="cursor-pointer px-3 py-1"
            onClick={() => setFilter('information technology')}
          >
            Information Technology
          </Badge>
        </div>

        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
            {filteredCourses.map(course => (
              <CourseCard
                key={course.id}
                title={course.title}
                instructor={course.instructor}
                progress={course.progress}
                color={course.color}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <BookOpen size={48} className="text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700">No courses found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Pagination */}
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Courses;
