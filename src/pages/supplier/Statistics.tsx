import React, { useState } from 'react';
import SupplierTopBar from '../../components/SupplierTopBar';
import { Download, MoreHorizontal, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const Statistics: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('Last 12 Months');
  const [clinic, setClinic] = useState('All Clinics');

  const monthlyOrdersData = [
    { month: 'Jan', orders: 42 },
    { month: 'Feb', orders: 38 },
    { month: 'Mar', orders: 52 },
    { month: 'Apr', orders: 48 },
    { month: 'May', orders: 58 },
    { month: 'Jun', orders: 62 },
    { month: 'Jul', orders: 68 },
    { month: 'Aug', orders: 72 },
    { month: 'Sep', orders: 75 },
    { month: 'Oct', orders: 82 },
    { month: 'Nov', orders: 88 },
    { month: 'Dec', orders: 92 }
  ];

  const invoicePaymentData = [
    { month: 'Jan', invoiced: 25000, paid: 23000 },
    { month: 'Feb', invoiced: 28000, paid: 26000 },
    { month: 'Mar', invoiced: 32000, paid: 30000 },
    { month: 'Apr', invoiced: 35000, paid: 33000 },
    { month: 'May', invoiced: 38000, paid: 36000 },
    { month: 'Jun', invoiced: 42000, paid: 40000 }
  ];

  const fulfillmentData = [
    { name: 'On Time', value: 85, color: '#3b82f6' },
    { name: 'Delayed', value: 12, color: '#f59e0b' },
    { name: 'Incomplete', value: 3, color: '#ef4444' }
  ];

  const clinicPerformance = [
    { name: 'Joy Dental', orders: 42, revenue: 38500, growth: 12.5, growthPositive: true },
    { name: 'Bright Smile', orders: 36, revenue: 32400, growth: 8.2, growthPositive: true },
    { name: 'Dental Care Plus', orders: 28, revenue: 25600, growth: -2.4, growthPositive: false },
    { name: 'Perfect Teeth', orders: 34, revenue: 31200, growth: 5.7, growthPositive: true },
    { name: 'Family Dentistry', orders: 22, revenue: 19800, growth: 3.1, growthPositive: true }
  ];

  const topProducts = [
    { name: 'Dental Implant Kit', sku: 'DIK-2023', unitsSold: 156, revenue: 42800, growth: 18.5, growthPositive: true },
    { name: 'Orthodontic Brackets', sku: 'OB-4512', unitsSold: 243, revenue: 36450, growth: 12.3, growthPositive: true },
    { name: 'Composite Filling Material', sku: 'CFM-1122', unitsSold: 312, revenue: 28080, growth: 9.7, growthPositive: true },
    { name: 'Dental Anesthetic', sku: 'DA-3301', unitsSold: 189, revenue: 22680, growth: 5.2, growthPositive: true },
    { name: 'Sterilization Equipment', sku: 'SE-7788', unitsSold: 78, revenue: 19500, growth: -2.1, growthPositive: false }
  ];

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <>
      <SupplierTopBar />

      {/* Filters */}
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
                  <option>Last 12 Months</option>
                  <option>Last 6 Months</option>
                  <option>Last 3 Months</option>
                  <option>This Year</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Clinic:</span>
              <div className="relative">
                <select 
                  value={clinic}
                  onChange={(e) => setClinic(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Clinics</option>
                  <option>Joy Dental</option>
                  <option>Bright Smile</option>
                  <option>Dental Care Plus</option>
                </select>
              </div>
            </div>
            
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              → More Filters
            </button>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <Download className="w-4 h-4" />
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
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">📋</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total POs</h3>
              <p className="text-3xl font-bold text-gray-900">728</p>
              <p className="text-xs text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+12.6%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">💰</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-600">Total Revenue</h3>
              <p className="text-3xl font-bold text-gray-900">$412,580</p>
              <p className="text-xs text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+8.2%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-lg">💳</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-600">Avg. Order Value</h3>
              <p className="text-3xl font-bold text-gray-900">$567</p>
              <p className="text-xs text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center text-sm">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-green-600 font-medium">+3.7%</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-lg">📦</span>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="mb-2">
              <h3 className="text-sm font-medium text-gray-600">Fulfillment Rate</h3>
              <p className="text-3xl font-bold text-gray-900">96.8%</p>
              <p className="text-xs text-gray-500">Last 12 months</p>
            </div>
            <div className="flex items-center text-sm">
              <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              <span className="text-red-600 font-medium">-1.2%</span>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Monthly Purchase Orders */}
          <div className="col-span-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Purchase Orders</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Monthly</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Quarterly</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Yearly</button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyOrdersData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="orders" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Invoice vs Payment */}
          <div className="col-span-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Invoice vs. Payment</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">6 Months</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">YTD</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">12 Months</button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={invoicePaymentData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="invoiced" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="paid" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-6">
          {/* Clinic Performance */}
          <div className="col-span-5 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Clinic Performance</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Clinic Name</th>
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Orders</th>
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Revenue</th>
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {clinicPerformance.map((clinic, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3 flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                          <span className="text-xs font-medium">🏥</span>
                        </div>
                        <span className="font-medium text-gray-900">{clinic.name}</span>
                      </td>
                      <td className="py-3 text-gray-600">{clinic.orders}</td>
                      <td className="py-3 text-gray-600">${clinic.revenue.toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          {clinic.growthPositive ? (
                            <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                          )}
                          <span className={`text-sm font-medium ${clinic.growthPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {clinic.growthPositive ? '+' : ''}{clinic.growth}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Order Fulfillment */}
          <div className="col-span-3 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Order Fulfillment</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <MoreHorizontal className="w-4 h-4" />
              </button>
            </div>
            <div className="h-48 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fulfillmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {fulfillmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {fulfillmentData.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-gray-600">{item.name}: {item.value}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Selling Products */}
          <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Top Selling Products</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Products →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Product Name</th>
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">SKU</th>
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Units Sold</th>
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Revenue</th>
                    <th className="text-left py-3 font-medium text-gray-700 text-sm">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {topProducts.map((product, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3">
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                            <span className="text-xs">📦</span>
                          </div>
                          <span className="font-medium text-gray-900 text-sm">{product.name}</span>
                        </div>
                      </td>
                      <td className="py-3 text-gray-600 text-sm">{product.sku}</td>
                      <td className="py-3 text-gray-600 text-sm">{product.unitsSold}</td>
                      <td className="py-3 text-gray-600 text-sm">${product.revenue.toLocaleString()}</td>
                      <td className="py-3">
                        <div className="flex items-center">
                          {product.growthPositive ? (
                            <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                          )}
                          <span className={`text-xs font-medium ${product.growthPositive ? 'text-green-600' : 'text-red-600'}`}>
                            {product.growthPositive ? '+' : ''}{product.growth}%
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Statistics;