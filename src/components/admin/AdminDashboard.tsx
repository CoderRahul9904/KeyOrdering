import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import UserManagement from './UserManagement';
import AdminKeyOrdering from './AdminKeyOrdering';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  createdAt: string;
  orderCount: number;
}

interface Order {
  id: string;
  userId: string;
  userEmail: string;
  orderNo: string;
  srNo: string;
  createDate: string;
  reasonToOrder: string;
  description: string;
  status: 'pending' | 'approved' | 'completed' | 'rejected';
}

const AdminDashboard: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'user',
      createdAt: '2024-01-15',
      orderCount: 3,
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'user',
      createdAt: '2024-01-20',
      orderCount: 1,
    },
  ]);

  const [orders, setOrders] = useState<Order[]>([
    {
      id: '1',
      userId: '1',
      userEmail: 'john@example.com',
      orderNo: 'ORD-001',
      srNo: 'SR-001',
      createDate: '2024-01-25',
      reasonToOrder: 'lost',
      description: 'Lost office key',
      status: 'pending',
    },
    {
      id: '2',
      userId: '2',
      userEmail: 'jane@example.com',
      orderNo: 'ORD-002',
      srNo: 'SR-002',
      createDate: '2024-01-26',
      reasonToOrder: 'new',
      description: 'New employee key access',
      status: 'approved',
    },
  ]);

  const handleLogout = () => {
    // Handle logout logic here
    console.log('Logout clicked');
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  const handleDeleteOrder = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
  };

  const handleAddOrder = (newOrder: Omit<Order, 'id' | 'userId' | 'userEmail' | 'status'>) => {
    const order: Order = {
      ...newOrder,
      id: Date.now().toString(),
      userId: 'admin',
      userEmail: 'admin@system.com',
      status: 'pending',
    };
    setOrders(prev => [...prev, order]);
  };

  const stats = {
    totalUsers: users.length,
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    completedOrders: orders.filter(o => o.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage users and key orders</p>
          </div>
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalUsers}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.totalOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-accent">{stats.pendingOrders}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stats.completedOrders}</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="orders">Key Orders</TabsTrigger>
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="create">Create Order</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>All Key Orders</CardTitle>
                <CardDescription>
                  Manage and monitor all key orders from users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-table-header">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                          Order No.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                          User Email
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                          Sr. No.
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                          Reason
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {orders.map((order, index) => (
                        <tr
                          key={order.id}
                          className={`${
                            index % 2 === 0 ? 'bg-table-rowEven' : 'bg-table-rowOdd'
                          } hover:bg-table-hover transition-colors`}
                        >
                          <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                            {order.orderNo}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                            {order.userEmail}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                            {order.srNo}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                            {new Date(order.createDate).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-foreground">
                            {order.reasonToOrder}
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm">
                            <Badge 
                              variant={order.status === 'completed' ? 'default' : 
                                     order.status === 'approved' ? 'secondary' :
                                     order.status === 'rejected' ? 'destructive' : 'outline'}
                            >
                              {order.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm space-x-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value as Order['status'])}
                              className="text-xs border border-input rounded px-2 py-1 bg-background"
                            >
                              <option value="pending">Pending</option>
                              <option value="approved">Approved</option>
                              <option value="completed">Completed</option>
                              <option value="rejected">Rejected</option>
                            </select>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDeleteOrder(order.id)}
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
          </TabsContent>

          <TabsContent value="users" className="mt-6">
            <UserManagement users={users} />
          </TabsContent>

          <TabsContent value="create" className="mt-6">
            <AdminKeyOrdering onAddOrder={handleAddOrder} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;