
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProfileProps {
  name: string;
  role: string;
  email: string;
  department?: string;
  avatarUrl?: string;
  badges?: Array<{
    name: string;
    icon?: React.ReactNode;
    color?: string;
  }>;
}

const Profile: React.FC<ProfileProps> = ({
  name,
  role,
  email,
  department = '',
  avatarUrl,
  badges = [],
}) => {
  return (
    <Card className="overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-purple-500 to-blue-500"></div>
      <CardContent className="relative pt-12">
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
          {avatarUrl ? (
            <img 
              src={avatarUrl} 
              alt={name} 
              className="w-20 h-20 rounded-full border-4 border-white"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-300 to-blue-300 border-4 border-white flex items-center justify-center text-white text-xl font-bold">
              {name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </div>
          )}
        </div>
        
        <div className="text-center mb-4">
          <h3 className="text-xl font-bold">{name}</h3>
          <p className="text-gray-500">{role}</p>
          <p className="text-sm text-gray-500">{email}</p>
          {department && <p className="text-sm text-gray-500">{department}</p>}
        </div>
        
        {badges.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {badges.map((badge, index) => (
              <Badge key={index} variant="outline" className={`${badge.color || 'bg-purple-50 text-purple-700 border-purple-200'} font-normal`}>
                {badge.icon && <span className="mr-1">{badge.icon}</span>}
                {badge.name}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Profile;
