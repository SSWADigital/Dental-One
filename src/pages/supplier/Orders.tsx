import React, { useState } from 'react';
import SupplierTopBar from '../../components/SupplierTopBar';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  Eye, 
  CheckCircle, 
  X, 
  Printer, 
  ChevronDown,
  Package,
  Clock,
  Truck,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail
} from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  sku: string;
  quantity: number;
  price: number;
  total: number;
}

interface Order {
  id: string;
  clinic: string;
  clinicCode: string;
  orderDate: string;
  items: number;
  totalValue: number;
  status: 'New' | 'Confirmed' | 'Shipped' | 'Completed' | 'Pending Review';
  statusColor: string;
  shippingAddress: string;
  contactPerson: string;
  contactEmail: string;
  contactPhone: string;
  orderItems: OrderItem[];
  statusHistory: {
    status: string;
    timestamp: string;
    note?: string;
  }[];
}

const Orders: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('Last 30 Days');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [clinicFilter, setClinicFilter] = useState('All Clinics');
  const [selectedOrder, setSelectedOrder] = useState<string>('PO-2023-8742');
  const [searchTerm, setSearchTerm] = useState('');

  const orders: Order[] = [
    {
      id: 'PO-2023-8742',
      clinic: 'Joy Dental',
      clinicCode: 'JD',
      orderDate: 'May 15, 2023',
      items: 12,
      totalValue: 3850.00,
      status: 'New',
      statusColor: 'bg-blue-100 text-blue-800',
      shippingAddress: '1234 Dental Ave, Suite 100, San Francisco, CA 94107',
      contactPerson: 'Dr. Sarah Johnson',
      contactEmail: 'sarah@joydental.com',
      contactPhone: '(415) 555-7890',
      orderItems: [
        {
          id: '1',
          name: 'Dental Implant Kit',
          sku: 'DIK-001',
          quantity: 2,
          price: 850.00,
          total: 1700.00
        },
        {
          id: '2',
          name: 'Orthodontic Brackets',
          sku: 'OB-4512',
          quantity: 5,
          price: 210.00,
          total: 1050.00
        },
        {
          id: '3',
          name: 'Composite Filling Material',
          sku: 'CFM-122',
          quantity: 3,
          price: 120.00,
          total: 360.00
        }
      ],
      statusHistory: [
        {
          status: 'Order Received',
          timestamp: 'May 15, 2023 - 10:23 AM by System'
        },
        {
          status: 'Pending Review',
          timestamp: 'May 15, 2023 - 10:24 AM by System'
        }
      ]
    },
    {
      id: 'PO-2023-8741',
      clinic: 'Bright Smile',
      clinicCode: 'BS',
      orderDate: 'May 14, 2023',
      items: 8,
      totalValue: 2450.00,
      status: 'Confirmed',
      statusColor: 'bg-green-100 text-green-800',
      shippingAddress: '5678 Smile Street, Los Angeles, CA 90210',
      contactPerson: 'Dr. Michael Chen',
      contactEmail: 'michael@brightsmile.com',
      contactPhone: '(323) 555-4567',
      orderItems: [],
      statusHistory: []
    },
    {
      id: 'PO-2023-8735',
      clinic: 'Dental Care Plus',
      clinicCode: 'DC',
      orderDate: 'May 12, 2023',
      items: 15,
      totalValue: 5680.00,
      status: 'Shipped',
      statusColor: 'bg-yellow-100 text-yellow-800',
      shippingAddress: '9012 Care Avenue, San Diego, CA 92101',
      contactPerson: 'Dr. Lisa Wang',
      contactEmail: 'lisa@dentalcareplus.com',
      contactPhone: '(619) 555-8901',
      orderItems: [],
      statusHistory: []
    },
    {
      id: 'PO-2023-8729',
      clinic: 'Perfect Teeth',
      clinicCode: 'PT',
      orderDate: 'May 10, 2023',
      items: 6,
      totalValue: 1850.00,
      status: 'Completed',
      statusColor: 'bg-purple-100 text-purple-800',
      shippingAddress: '3456 Perfect Lane, Oakland, CA 94601',
      contactPerson: 'Dr. James Rodriguez',
      contactEmail: 'james@perfectteeth.com',
      contactPhone: '(510) 555-2345',
      orderItems: [],
      statusHistory: []
    },
    {
      id: 'PO-2023-8724',
      clinic: 'Family Dentistry',
      clinicCode: 'FD',
      orderDate: 'May 08, 2023',
      items: 10,
      totalValue: 3250.00,
      status: 'New',
      statusColor: 'bg-blue-100 text-blue-800',
      shippingAddress: '7890 Family Road, Sacramento, CA 95814',
      contactPerson: 'Dr. Emily Davis',
      contactEmail: 'emily@familydentistry.com',
      contactPhone: '(916) 555-6789',
      orderItems: [],
      statusHistory: []
    }
  ];

  const stats = [
    {
      title: 'Total Orders',
      value: '78',
      subtitle: 'Last 30 days',
      change: '+18.5%',
      icon: Package,
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Pending Orders',
      value: '12',
      subtitle: 'Awaiting action',
      change: '+2.3%',
      icon: Clock,
      iconColor: 'text-orange-500',
      bgColor: 'bg-orange-50'
    },
    {
      title: 'In Transit',
      value: '28',
      subtitle: 'Currently shipping',
      change: '+12.7%',
      icon: Truck,
      iconColor: 'text-yellow-500',
      bgColor: 'bg-yellow-50'
    },
    {
      title: 'Fulfillment Rate',
      value: '92.4%',
      subtitle: 'Last 30 days',
      change: '+1.8%',
      icon: CheckCircle2,
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    }
  ];

  const selectedOrderData = orders.find(order => order.id === selectedOrder);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'New': return <Package className="w-4 h-4" />;
      case 'Confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'Shipped': return <Truck className="w-4 h-4" />;
      case 'Completed': return <CheckCircle2 className="w-4 h-4" />;
      case 'Pending Review': return <AlertCircle className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const handleOrderAction = (action: string) => {
    console.log(`${action} order ${selectedOrder}`);
    // Handle order actions here
  };

  return (
    <>
      <SupplierTopBar />
      
      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Time Period:</span>
              <div className="relative">
                <select 
                  value={timePeriod}
                  onChange={(e) => setTimePeriod(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>Last 30 Days</option>
                  <option>Last 7 Days</option>
                  <option>Last 90 Days</option>
                  <option>This Year</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Status:</span>
              <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Statuses</option>
                  <option>New</option>
                  <option>Confirmed</option>
                  <option>Shipped</option>
                  <option>Completed</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Clinic:</span>
              <div className="relative">
                <select 
                  value={clinicFilter}
                  onChange={(e) => setClinicFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Clinics</option>
                  <option>Joy Dental</option>
                  <option>Bright Smile</option>
                  <option>Dental Care Plus</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
            </div>
            
            <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
              <Filter className="w-4 h-4" />
              <span>More Filters</span>
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Export</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <MoreHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <main className="flex-1 p-6 bg-gray-50">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreHorizontal className="w-4 h-4" />
                </button>
              </div>
              <div className="mb-2">
                <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.subtitle}</p>
              </div>
              <div className="text-sm text-green-600 font-medium">
                {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Orders Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">Incoming Purchase Orders</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search orders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-blue-500 text-white rounded">
                  <Search className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Orders List */}
            <div className="w-1/2 border-r border-gray-200">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Order ID</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Clinic</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Order Date</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Items</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Total Value</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr 
                        key={order.id} 
                        className={`border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                          selectedOrder === order.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                        }`}
                        onClick={() => setSelectedOrder(order.id)}
                      >
                        <td className="py-4 px-4">
                          <span className="text-blue-600 font-medium">{order.id}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-xs">{order.clinicCode}</span>
                            </div>
                            <span className="font-medium text-gray-900">{order.clinic}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{order.orderDate}</td>
                        <td className="py-4 px-4 text-gray-600">{order.items}</td>
                        <td className="py-4 px-4 font-medium text-gray-900">
                          ${order.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(order.status)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${order.statusColor}`}>
                              {order.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <Eye className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-gray-600">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {/* Pagination */}
              <div className="p-4 border-t border-gray-200 flex items-center justify-between">
                <span className="text-sm text-gray-500">Showing 1 to 5 of 78 entries</span>
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50">
                    Previous
                  </button>
                  <div className="flex space-x-1">
                    <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm font-medium">1</button>
                    <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
                    <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
                  </div>
                  <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
                    Next
                  </button>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="w-1/2 flex flex-col">
              {selectedOrderData && (
                <>
                  {/* Order Header */}
                  <div className="p-6 border-b border-gray-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-xl font-semibold text-blue-600">{selectedOrderData.id}</span>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(selectedOrderData.status)}
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedOrderData.statusColor}`}>
                            {selectedOrderData.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600">
                          <Eye className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Clinic Information</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 font-semibold text-xs">{selectedOrderData.clinicCode}</span>
                            </div>
                            <span className="font-medium">{selectedOrderData.clinic}</span>
                          </div>
                          <p className="text-gray-600">Order Date: {selectedOrderData.orderDate}</p>
                          <p className="text-gray-600">Items: {selectedOrderData.items}</p>
                          <p className="text-gray-600 font-medium">
                            Total: ${selectedOrderData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </p>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Contact Information</h4>
                        <div className="space-y-1 text-sm">
                          <p className="font-medium">{selectedOrderData.contactPerson}</p>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{selectedOrderData.contactEmail}</span>
                          </div>
                          <div className="flex items-center space-x-2 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{selectedOrderData.contactPhone}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tabs */}
                  <div className="border-b border-gray-200">
                    <div className="flex space-x-8 px-6">
                      <button className="py-4 text-sm font-medium text-blue-600 border-b-2 border-blue-600">
                        Order Items
                      </button>
                      <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Shipping Information
                      </button>
                      <button className="py-4 text-sm font-medium text-gray-500 hover:text-gray-700">
                        Status History
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="flex-1 p-6">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left py-3 font-medium text-gray-700 text-sm">Item</th>
                            <th className="text-left py-3 font-medium text-gray-700 text-sm">Qty</th>
                            <th className="text-left py-3 font-medium text-gray-700 text-sm">Price</th>
                            <th className="text-left py-3 font-medium text-gray-700 text-sm">Total</th>
                          </tr>
                        </thead>
                        <tbody>
                          {selectedOrderData.orderItems.map((item) => (
                            <tr key={item.id} className="border-b border-gray-100">
                              <td className="py-3">
                                <div>
                                  <div className="font-medium text-gray-900">{item.name}</div>
                                  <div className="text-sm text-gray-500">{item.sku}</div>
                                </div>
                              </td>
                              <td className="py-3 text-gray-600">{item.quantity}</td>
                              <td className="py-3 text-gray-600">${item.price.toFixed(2)}</td>
                              <td className="py-3 font-medium text-gray-900">${item.total.toFixed(2)}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr className="border-t-2 border-gray-200">
                            <td colSpan={3} className="py-3 font-medium text-gray-900">Total</td>
                            <td className="py-3 font-bold text-gray-900">
                              ${selectedOrderData.totalValue.toFixed(2)}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </div>

                    {/* Shipping Information */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Shipping Information</h4>
                      <p className="text-sm text-gray-600">{selectedOrderData.shippingAddress}</p>
                      <div className="mt-2 text-sm text-gray-600">
                        <p>Contact Person: {selectedOrderData.contactPerson}</p>
                      </div>
                    </div>

                    {/* Status History */}
                    <div className="mt-6">
                      <h4 className="font-medium text-gray-900 mb-3">Status History</h4>
                      <div className="space-y-2">
                        {selectedOrderData.statusHistory.map((history, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <div className="text-sm">
                              <span className="font-medium text-gray-900">{history.status}</span>
                              <span className="text-gray-500 ml-2">{history.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex items-center justify-between">
                      <button 
                        onClick={() => handleOrderAction('print')}
                        className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Printer className="w-4 h-4" />
                        <span>Print</span>
                      </button>
                      
                      <div className="flex space-x-3">
                        <button 
                          onClick={() => handleOrderAction('reject')}
                          className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <X className="w-4 h-4" />
                          <span>Reject</span>
                        </button>
                        <button 
                          onClick={() => handleOrderAction('confirm')}
                          className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                        >
                          <CheckCircle className="w-4 h-4" />
                          <span>Confirm Order</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Orders;