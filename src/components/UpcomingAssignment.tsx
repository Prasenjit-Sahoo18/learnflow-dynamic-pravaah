
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UpcomingAssignmentProps {
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'overdue' | 'graded';
  priority?: 'low' | 'medium' | 'high';
}

const UpcomingAssignment: React.FC<UpcomingAssignmentProps> = ({
  title,
  course,
  dueDate,
  status,
  priority = 'medium',
}) => {
  const getStatusColor = () => {
    switch(status) {
      case 'submitted': return 'bg-green-100 text-green-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      case 'graded': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getStatusText = () => {
    switch(status) {
      case 'submitted': return 'Submitted';
      case 'overdue': return 'Overdue';
      case 'graded': return 'Graded';
      default: return 'Pending';
    }
  };

  const getPriorityColor = () => {
    switch(priority) {
      case 'high': return 'bg-red-50 border-red-200 text-red-700';
      case 'low': return 'bg-green-50 border-green-200 text-green-700';
      default: return 'bg-yellow-50 border-yellow-200 text-yellow-700';
    }
  };

  // Calculate days remaining for pending assignments
  const getDaysRemaining = () => {
    const dueDateTime = new Date(dueDate).getTime();
    const currentTime = new Date().getTime();
    const differenceInTime = dueDateTime - currentTime;
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    
    return differenceInDays > 0 ? `${differenceInDays} days` : 'Due today';
  };
  
  return (
    <Card className="hover:shadow-md transition-shadow duration-300 group">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              {priority && (
                <Badge variant="outline" className={getPriorityColor()}>
                  {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
                </Badge>
              )}
              <Badge variant="secondary" className={getStatusColor()}>
                {getStatusText()}
              </Badge>
            </div>
            <h3 className="font-medium text-lg group-hover:text-purple-700 transition-colors duration-300">{title}</h3>
            <p className="text-sm text-gray-500">{course}</p>
          </div>
        </div>
        
        <div className="flex items-center mt-4 text-sm text-gray-500">
          <Calendar className="h-4 w-4 mr-1" />
          <span className="mr-3">Due: {dueDate}</span>
          {status !== 'submitted' && status !== 'graded' && (
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>Time remaining: {getDaysRemaining()}</span>
            </span>
          )}
        </div>
        
        <div className="mt-4 flex space-x-2">
          {status === 'pending' && (
            <Link to="/assignments">
              <Button size="sm" variant="default">Start Now</Button>
            </Link>
          )}
          {status === 'submitted' && (
            <Link to="/assignments">
              <Button size="sm" variant="outline">View Submission</Button>
            </Link>
          )}
          {status === 'graded' && (
            <Link to="/assignments">
              <Button size="sm" variant="outline">View Feedback</Button>
            </Link>
          )}
          <Link to="/assignments">
            <Button size="sm" variant="outline">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingAssignment;
