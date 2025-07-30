import React, { useState } from 'react';

interface Order {
  id: string;
  orderNo: string;
  srNo: string;
  createDate: string;
  reasonToOrder: string;
  description: string;
}

interface FormData {
  orderNo: string;
  srNo: string;
  createDate: string;
  reasonToOrder: string;
  description: string;
}

const KeyOrdering: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    orderNo: '',
    srNo: '',
    createDate: '',
    reasonToOrder: '',
    description: '',
  });

  const [orders, setOrders] = useState<Order[]>([]);

  const reasonOptions = [
    { value: '', label: 'Select a reason...' },
    { value: 'lost', label: 'Lost Key' },
    { value: 'damaged', label: 'Damaged Key' },
    { value: 'new', label: 'New Employee' },
    { value: 'replacement', label: 'Replacement' },
    { value: 'additional', label: 'Additional Access' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.orderNo || !formData.srNo || !formData.createDate || !formData.reasonToOrder) {
      alert('Please fill in all required fields');
      return;
    }

    const newOrder: Order = {
      id: Date.now().toString(),
      ...formData,
    };

    setOrders(prev => [...prev, newOrder]);
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
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground">KeyOrdering</h1>
          <p className="text-muted-foreground mt-2">Manage key orders efficiently</p>
        </div>

        {/* Form Section */}
        <div className="bg-card rounded-lg shadow-lg p-6 mb-8 border border-border">
          <form onSubmit={handleAddOrder} className="space-y-6">
            {/* Grid Layout for Form Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Order No. */}
              <div className="space-y-2">
                <label htmlFor="orderNo" className="block text-sm font-medium text-foreground">
                  Order No. <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="orderNo"
                  name="orderNo"
                  value={formData.orderNo}
                  onChange={handleInputChange}
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  placeholder="Enter order number"
                  required
                />
              </div>

              {/* Sr. No. */}
              <div className="space-y-2">
                <label htmlFor="srNo" className="block text-sm font-medium text-foreground">
                  Sr. No. <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  id="srNo"
                  name="srNo"
                  value={formData.srNo}
                  onChange={handleInputChange}
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  placeholder="Enter serial number"
                  required
                />
              </div>

              {/* Create Date */}
              <div className="space-y-2">
                <label htmlFor="createDate" className="block text-sm font-medium text-foreground">
                  Create Date <span className="text-destructive">*</span>
                </label>
                <input
                  type="date"
                  id="createDate"
                  name="createDate"
                  value={formData.createDate}
                  onChange={handleInputChange}
                  className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors"
                  required
                />
              </div>

              {/* Reason to Order */}
              <div className="space-y-2">
                <label htmlFor="reasonToOrder" className="block text-sm font-medium text-foreground">
                  Reason to Order <span className="text-destructive">*</span>
                </label>
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

            {/* Description */}
            <div className="space-y-2">
              <label htmlFor="description" className="block text-sm font-medium text-foreground">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-input rounded-md px-3 py-2 text-sm bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-colors resize-vertical"
                placeholder="Enter additional details..."
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-hover text-primary-foreground font-medium rounded-md px-6 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Add Order
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-secondary hover:bg-secondary-hover text-secondary-foreground font-medium rounded-md px-6 py-2 transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                Clear
              </button>
            </div>
          </form>
        </div>

        {/* List View / Table */}
        <div className="bg-card rounded-lg shadow-lg border border-border overflow-hidden">
          <div className="bg-table-header px-6 py-4">
            <h2 className="text-lg font-semibold text-table-headerForeground">Order List</h2>
          </div>
          
          {orders.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p>No orders added yet. Add your first order using the form above.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-table-header">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                      Order No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                      Sr. No.
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                      Create Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                      Reason to Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-table-headerForeground uppercase tracking-wider">
                      Description
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
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                        {order.orderNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {order.srNo}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {new Date(order.createDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                        {reasonOptions.find(option => option.value === order.reasonToOrder)?.label || order.reasonToOrder}
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground max-w-xs">
                        <div className="truncate" title={order.description}>
                          {order.description || '—'}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyOrdering;