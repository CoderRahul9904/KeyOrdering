import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  orderCount: number;
}

interface UserManagementProps {
  users: User[];
}

const UserManagement: React.FC<UserManagementProps> = ({ users }) => {
  const handleViewUserOrders = (userId: string) => {
    // Handle viewing user orders
    console.log('View orders for user:', userId);
  };

  const handleToggleRole = (userId: string) => {
    // Handle role toggle
    console.log('Toggle role for user:', userId);
  };

  const handleDeleteUser = (userId: string) => {
    // Handle user deletion
    console.log('Delete user:', userId);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Management</CardTitle>
        <CardDescription>
          Manage user accounts and their permissions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-table-header">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                  Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                  Role
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                  Join Date
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {users.map((user, index) => (
                <tr
                  key={user.id}
                  className={`${
                    index % 2 === 0 ? 'bg-table-rowEven' : 'bg-table-rowOdd'
                  } hover:bg-table-hover transition-colors`}
                >
                  <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                    {user.name}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                    {user.email}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm">
                    <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                      {user.role}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                    <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
                      {user.orderCount}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewUserOrders(user.id)}
                    >
                      View Orders
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleToggleRole(user.id)}
                    >
                      Toggle Role
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserManagement;