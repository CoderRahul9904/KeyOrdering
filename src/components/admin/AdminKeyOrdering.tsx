import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface Order {
  orderNo: string;
  srNo: string;
  createDate: string;
  reasonToOrder: string;
  description: string;
}

interface AdminKeyOrderingProps {
  onAddOrder: (order: Order) => void;
}

const AdminKeyOrdering: React.FC<AdminKeyOrderingProps> = ({ onAddOrder }) => {
  const [formData, setFormData] = useState<Order>({
    orderNo: '',
    srNo: '',
    createDate: '',
    reasonToOrder: '',
    description: '',
  });

  const reasonOptions = [
    { value: '', label: 'Select a reason...' },
    { value: 'lost', label: 'Lost Key' },
    { value: 'damaged', label: 'Damaged Key' },
    { value: 'new', label: 'New Employee' },
    { value: 'replacement', label: 'Replacement' },
    { value: 'additional', label: 'Additional Access' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'security', label: 'Security Update' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.orderNo || !formData.srNo || !formData.createDate || !formData.reasonToOrder) {
      alert('Please fill in all required fields');
      return;
    }

    onAddOrder(formData);
    handleClear();
  };

  const handleClear = () => {
    setFormData({
      orderNo: '',
      srNo: '',
      createDate: '',
      reasonToOrder: '',
      description: '',
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Create Key Order</CardTitle>
        <CardDescription>
          Create a new key order as an administrator
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="orderNo">
                Order No. <span className="text-destructive">*</span>
              </Label>
              <Input
                id="orderNo"
                name="orderNo"
                value={formData.orderNo}
                onChange={handleInputChange}
                placeholder="Enter order number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="srNo">
                Sr. No. <span className="text-destructive">*</span>
              </Label>
              <Input
                id="srNo"
                name="srNo"
                value={formData.srNo}
                onChange={handleInputChange}
                placeholder="Enter serial number"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="createDate">
                Create Date <span className="text-destructive">*</span>
              </Label>
              <Input
                id="createDate"
                name="createDate"
                type="date"
                value={formData.createDate}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reasonToOrder">
                Reason to Order <span className="text-destructive">*</span>
              </Label>
              <select
                id="reasonToOrder"
                name="reasonToOrder"
                value={formData.reasonToOrder}
                onChange={handleInputChange}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                required
              >
                {reasonOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter additional details..."
              rows={3}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button type="submit">
              Create Order
            </Button>
            <Button type="button" variant="outline" onClick={handleClear}>
              Clear Form
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminKeyOrdering;