
import React from 'react';
import { Book } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

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
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 border-0">
      <div className={`h-3 bg-gradient-to-r ${gradient}`}></div>
      <CardContent className="p-0">
        <div className="p-6">
          {imageUrl ? (
            <div className="h-32 mb-4 rounded-md overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
            </div>
          ) : (
            <div className={`h-32 mb-4 bg-gradient-to-br ${gradient.replace('from-', 'from-opacity-20 ').replace('to-', 'to-opacity-10 ')} flex items-center justify-center rounded-md`}>
              <Book className="h-12 w-12 text-gray-400" />
            </div>
          )}
          
          <h3 className="font-semibold text-xl mb-1 line-clamp-2">{title}</h3>
          <p className="text-sm text-gray-500 mb-4">Instructor: {instructor}</p>
          
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span className="font-medium">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;
