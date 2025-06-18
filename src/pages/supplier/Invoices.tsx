import React, { useState } from 'react';
import SupplierTopBar from '../../components/SupplierTopBar';
import { 
  Plus,
  Send,
  Download,
  Search,
  Filter,
  RefreshCw,
  Eye,
  Edit,
  Copy,
  MoreHorizontal,
  Calendar,
  ChevronDown,
  FileText,
  DollarSign,
  TrendingUp,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface Invoice {
  id: string;
  relatedPO: string;
  client: string;
  clientAvatar: string;
  issueDate: string;
  dueDate: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  lastReminder: string | null;
}

const Invoices: React.FC = () => {
  const [dateRange, setDateRange] = useState('Last 30 Days');
  const [statusFilter, setStatusFilter] = useState('All Statuses');
  const [clientFilter, setClientFilter] = useState('All Clients');
  const [amountFilter, setAmountFilter] = useState('Any Amount');
  const [searchTerm, setSearchTerm] = useState('');

  // Monthly invoice vs payment data
  const monthlyData = [
    { month: 'Jan', invoiced: 35000, paid: 32000 },
    { month: 'Feb', invoiced: 42000, paid: 38000 },
    { month: 'Mar', invoiced: 38000, paid: 35000 },
    { month: 'Apr', invoiced: 45000, paid: 42000 },
    { month: 'May', invoiced: 52000, paid: 48000 },
    { month: 'Jun', invoiced: 48000, paid: 45000 }
  ];

  // Payment status distribution
  const paymentStatusData = [
    { name: 'Paid', value: 65, color: '#3b82f6' },
    { name: 'Pending', value: 25, color: '#f59e0b' },
    { name: 'Overdue', value: 10, color: '#ef4444' }
  ];

  const invoices: Invoice[] = [
    {
      id: 'INV-2023-001',
      relatedPO: 'PO-2023-042',
      client: 'Joy Dental',
      clientAvatar: 'JD',
      issueDate: '2023-06-01',
      dueDate: '2023-07-01',
      amount: 4850.00,
      status: 'Paid',
      lastReminder: '2023-06-15'
    },
    {
      id: 'INV-2023-002',
      relatedPO: 'PO-2023-043',
      client: 'Bright Smile',
      clientAvatar: 'BS',
      issueDate: '2023-06-05',
      dueDate: '2023-07-05',
      amount: 3250.00,
      status: 'Paid',
      lastReminder: '2023-06-20'
    },
    {
      id: 'INV-2023-003',
      relatedPO: 'PO-2023-044',
      client: 'Dental Care Plus',
      clientAvatar: 'DC',
      issueDate: '2023-06-10',
      dueDate: '2023-07-10',
      amount: 5680.00,
      status: 'Pending',
      lastReminder: '2023-06-25'
    },
    {
      id: 'INV-2023-004',
      relatedPO: 'PO-2023-045',
      client: 'Perfect Teeth',
      clientAvatar: 'PT',
      issueDate: '2023-06-15',
      dueDate: '2023-07-15',
      amount: 2980.00,
      status: 'Pending',
      lastReminder: null
    },
    {
      id: 'INV-2023-005',
      relatedPO: 'PO-2023-046',
      client: 'Family Dentistry',
      clientAvatar: 'FD',
      issueDate: '2023-05-20',
      dueDate: '2023-06-20',
      amount: 4320.00,
      status: 'Overdue',
      lastReminder: '2023-06-25'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getClientColor = (initials: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey === 'invoiced' ? 'Invoiced' : 'Paid'}: ${entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-sm text-gray-600">{data.value}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <SupplierTopBar />
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Invoice Management</h1>
            <p className="text-gray-600">Manage billing and track payments</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search for anything..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 bg-blue-500 text-white rounded">
                <Search className="w-3 h-3" />
              </button>
            </div>
            
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
            </button>
            
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <div className="w-5 h-5 bg-gray-400 rounded"></div>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 bg-gray-50">
        {/* Stats Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Payment Status Distribution */}
          <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Status Distribution</h3>
            
            <div className="flex items-center justify-center mb-6">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={paymentStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {paymentStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-xs text-gray-500">Total Outstanding</span>
                  <span className="text-xl font-bold text-gray-900">$87,450</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {paymentStatusData.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-gray-600">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Monthly Invoice vs Payment */}
          <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Invoice vs. Payment</h3>
            
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="invoiced" 
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="paid" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="flex items-center justify-center space-x-6 text-sm mt-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600">Invoiced</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-gray-600">Paid</span>
              </div>
            </div>
          </div>

          {/* Payment Performance */}
          <div className="col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Payment Performance</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-600">Average Days to Payment</span>
                  <span className="text-2xl font-bold text-gray-900">14.5 days</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Target: 30 days</span>
                  <span className="text-green-600">-2.2%</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Paid This Month</div>
                  <div className="text-xl font-bold text-gray-900">$42,580</div>
                  <div className="text-xs text-green-600">+18.7%</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Overdue Amount</div>
                  <div className="text-xl font-bold text-gray-900">$23,890</div>
                  <div className="text-xs text-red-600">+15.4%</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                <Plus className="w-4 h-4" />
                <span>Generate from POs</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FileText className="w-4 h-4" />
                <span>Create New Invoice</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Send className="w-4 h-4" />
                <span>Send Reminders</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search invoices..."
                  className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="w-4 h-4" />
                <span>Filter</span>
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Date Range:</span>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select 
                    value={dateRange}
                    onChange={(e) => setDateRange(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg pl-10 pr-8 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    <option>Paid</option>
                    <option>Pending</option>
                    <option>Overdue</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Client:</span>
                <div className="relative">
                  <select 
                    value={clientFilter}
                    onChange={(e) => setClientFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>All Clients</option>
                    <option>Joy Dental</option>
                    <option>Bright Smile</option>
                    <option>Dental Care Plus</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">Amount:</span>
                <div className="relative">
                  <select 
                    value={amountFilter}
                    onChange={(e) => setAmountFilter(e.target.value)}
                    className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option>Any Amount</option>
                    <option>Under $1,000</option>
                    <option>$1,000 - $5,000</option>
                    <option>Over $5,000</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
            
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              Reset Filters
            </button>
          </div>
        </div>

        {/* Invoices Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Invoices</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Invoice #</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Related PO</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Client</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Issue Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Last Reminder</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <span className="text-blue-600 font-medium hover:underline cursor-pointer">
                        {invoice.id}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{invoice.relatedPO}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold text-xs ${getClientColor(invoice.clientAvatar)}`}>
                          {invoice.clientAvatar}
                        </div>
                        <span className="font-medium text-gray-900">{invoice.client}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{invoice.issueDate}</td>
                    <td className="py-4 px-4 text-gray-600">{invoice.dueDate}</td>
                    <td className="py-4 px-4 font-medium text-gray-900">
                      ${invoice.amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(invoice.status)}`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {invoice.lastReminder ? (
                        <div className="flex items-center space-x-1 text-gray-600">
                          <Clock className="w-3 h-3" />
                          <span className="text-sm">{invoice.lastReminder}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Send className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
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
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Showing 1 to 5 of 42 entries</span>
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
      </main>
    </>
  );
};

export default Invoices;