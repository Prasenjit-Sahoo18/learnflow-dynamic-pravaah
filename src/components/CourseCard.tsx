
import React from 'react';
import { Book, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface CourseCardProps {
  title: string;
  instructor: string;
  progress: number;
  imageUrl?: string;
  color?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  instructor, 
  progress, 
  imageUrl,
  color = "purple"
}) => {
  const gradientMap: Record<string, string> = {
    purple: "from-purple-500 to-indigo-600",
    blue: "from-blue-500 to-cyan-600", 
    green: "from-green-500 to-emerald-600",
    orange: "from-orange-500 to-amber-600",
  };
  
  const gradient = gradientMap[color] || gradientMap.purple;
  
  const getStatusBadge = () => {
    if (progress === 100) return <Badge className="bg-green-500">Completed</Badge>;
    if (progress > 75) return <Badge className="bg-blue-500">Almost Done</Badge>;
    if (progress > 25) return <Badge className="bg-yellow-500">In Progress</Badge>;
    return <Badge className="bg-purple-500">Just Started</Badge>;
  };
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0 group h-full">
      <div className={`h-3 bg-gradient-to-r ${gradient}`}></div>
      <CardContent className="p-0 h-full">
        <div className="p-6 flex flex-col h-full">
          {imageUrl ? (
            <div className="h-32 mb-4 rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300" 
              />
            </div>
          ) : (
            <div className={`h-32 mb-4 bg-gradient-to-br ${gradient.replace('from-', 'from-opacity-20 ').replace('to-', 'to-opacity-10 ')} flex items-center justify-center rounded-md overflow-hidden group-hover:shadow-inner transition-all duration-300`}>
              <Book className="h-12 w-12 text-gray-400 group-hover:text-gray-500 transition-colors duration-300" />
            </div>
          )}
          
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <h3 className="font-semibold text-xl line-clamp-2 group-hover:text-purple-700 transition-colors duration-300">{title}</h3>
              <ExternalLink className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <p className="text-sm text-gray-500 mb-4">Instructor: {instructor}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span>Progress</span>
              <div className="flex items-center">
                {getStatusBadge()}
                <span className="font-medium ml-2">{progress}%</span>
              </div>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
