import React, { useState } from 'react';
import SupplierTopBar from '../../components/SupplierTopBar';
import { 
  Star, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  MessageCircle, 
  Eye, 
  Filter,
  ChevronDown,
  Download,
  MoreHorizontal,
  Calendar
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface Review {
  id: string;
  clinic: string;
  clinicAvatar: string;
  rating: number;
  date: string;
  categories: string[];
  feedback: string;
  actions: string[];
}

const Reviews: React.FC = () => {
  const [timePeriod, setTimePeriod] = useState('Last 30 days');
  const [ratingFilter, setRatingFilter] = useState('All Ratings');
  const [categoryFilter, setCategoryFilter] = useState('All Categories');
  const [searchTerm, setSearchTerm] = useState('');

  // Monthly rating trends data
  const monthlyTrends = [
    { month: 'Jan', rating: 4.0 },
    { month: 'Feb', rating: 4.1 },
    { month: 'Mar', rating: 3.9 },
    { month: 'Apr', rating: 4.2 },
    { month: 'May', rating: 4.0 },
    { month: 'Jun', rating: 4.3 },
    { month: 'Jul', rating: 4.1 },
    { month: 'Aug', rating: 4.4 },
    { month: 'Sep', rating: 4.2 },
    { month: 'Oct', rating: 4.5 },
    { month: 'Nov', rating: 4.3 },
    { month: 'Dec', rating: 4.1 }
  ];

  // Category performance data
  const categoryPerformance = [
    { category: 'Service Quality', score: 95 },
    { category: 'Product Quality', score: 88 },
    { category: 'Delivery Speed', score: 82 },
    { category: 'Communication', score: 92 },
    { category: 'Value for Money', score: 85 }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      clinic: 'Bright Smile',
      clinicAvatar: 'BS',
      rating: 4.8,
      date: 'Dec 15, 2023',
      categories: ['Service Quality', 'Product Quality'],
      feedback: 'Excellent service and product quality. The dental supplies arrived ahead of schedule and were exactly what we ordered. Very satisfied with the communication throughout the process.',
      actions: ['👁️', '💬']
    },
    {
      id: '2',
      clinic: 'Advanced Orthodontics',
      clinicAvatar: 'AO',
      rating: 4.5,
      date: 'Dec 10, 2023',
      categories: ['Product Quality', 'Delivery Speed'],
      feedback: 'The quality of the orthodontic brackets was excellent. However, delivery took longer than expected. Would appreciate more accurate delivery estimates in the future.',
      actions: ['👁️', '💬']
    },
    {
      id: '3',
      clinic: 'Family Dental Care',
      clinicAvatar: 'FD',
      rating: 3.2,
      date: 'Dec 8, 2023',
      categories: ['Service Quality', 'Product Quality'],
      feedback: 'Disappointed with the recent order. Several items were missing and it took multiple follow-ups to resolve the issue. The quality of the composite filling material was below expectations.',
      actions: ['👁️', '💬', '⚠️']
    },
    {
      id: '4',
      clinic: 'Pediatric Dental Specialists',
      clinicAvatar: 'PD',
      rating: 4.9,
      date: 'Dec 5, 2023',
      categories: ['Service Quality', 'Communication', 'Delivery Speed'],
      feedback: 'Outstanding service! The team was very responsive to our specific requirements for pediatric dental supplies. Products were high quality and delivery was prompt.',
      actions: ['👁️', '💬']
    },
    {
      id: '5',
      clinic: 'Elite Dental Surgery',
      clinicAvatar: 'ED',
      rating: 2.8,
      date: 'Nov 28, 2023',
      categories: ['Product Quality', 'Service Quality', 'Communication'],
      feedback: 'The sterilization equipment we received had manufacturing defects. Customer service was slow to respond and the resolution process was frustrating. Expecting better quality control and service.',
      actions: ['👁️', '💬', '⚠️']
    },
    {
      id: '6',
      clinic: 'Cosmetic Dental Arts',
      clinicAvatar: 'CD',
      rating: 4.7,
      date: 'Nov 25, 2023',
      categories: ['Product Quality', 'Value for Money'],
      feedback: 'Very pleased with the dental impression materials. The quality is consistent and the pricing is competitive. Always a pleasure doing business with your company.',
      actions: ['👁️', '💬']
    },
    {
      id: '7',
      clinic: 'University Dental Hospital',
      clinicAvatar: 'UD',
      rating: 3.5,
      date: 'Nov 20, 2023',
      categories: ['Product Quality', 'Value for Money', 'Communication'],
      feedback: 'The dental chairs are of good quality but the price point is higher than competitors. Installation service was excellent, though we had some initial communication issues.',
      actions: ['👁️', '💬']
    }
  ];

  const criticalFeedback = reviews.filter(review => review.rating < 3.5);

  const getClinicInitials = (clinic: string) => {
    return clinic.split(' ').map(word => word[0]).join('').toUpperCase();
  };

  const getClinicColor = (initials: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 
      'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const index = initials.charCodeAt(0) % colors.length;
    return colors[index];
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : i < rating 
              ? 'text-yellow-400 fill-current opacity-50' 
              : 'text-gray-300'
        }`}
      />
    ));
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Service Quality': 'bg-red-100 text-red-800',
      'Product Quality': 'bg-green-100 text-green-800',
      'Delivery Speed': 'bg-blue-100 text-blue-800',
      'Communication': 'bg-purple-100 text-purple-800',
      'Value for Money': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-3">
          <p className="font-medium text-gray-900">{label}</p>
          <p className="text-sm text-blue-600">
            Rating: {payload[0]?.value}
          </p>
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
            <h1 className="text-2xl font-bold text-gray-900">Clinic Ratings</h1>
            <p className="text-gray-600">Monitor feedback and improve service quality</p>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search feedback..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-4 h-4 bg-gray-400 rounded"></div>
              </div>
            </div>
            
            <div className="relative">
              <select 
                value={timePeriod}
                onChange={(e) => setTimePeriod(e.target.value)}
                className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
                <option>This year</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 bg-gray-50">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Average Rating</div>
                <div className="text-3xl font-bold text-gray-900">4.1</div>
                <div className="flex items-center justify-end mt-1">
                  {renderStars(4.1)}
                  <span className="text-xs text-gray-500 ml-2">(7 reviews)</span>
                </div>
                <div className="flex items-center justify-end text-sm mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">4.4% vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Positive Feedback</div>
                <div className="text-3xl font-bold text-gray-900">43%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '43%' }}></div>
                </div>
                <div className="flex items-center justify-end text-sm mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">2.8% vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-red-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Negative Feedback</div>
                <div className="text-3xl font-bold text-gray-900">29%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '29%' }}></div>
                </div>
                <div className="flex items-center justify-end text-sm mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">1.5% vs last month</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-purple-600" />
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 uppercase tracking-wider">Response Rate</div>
                <div className="text-3xl font-bold text-gray-900">92%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
                <div className="flex items-center justify-end text-sm mt-1">
                  <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                  <span className="text-green-600 font-medium">5.2% vs last month</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-12 gap-6 mb-6">
          {/* Monthly Rating Trends */}
          <div className="col-span-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Monthly Rating Trends</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">Rating</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Reviews</button>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrends}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 5]} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line 
                    type="monotone" 
                    dataKey="rating" 
                    stroke="#3b82f6" 
                    strokeWidth={3}
                    dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Performance */}
          <div className="col-span-4 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Category Performance</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded">All</button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Last 30 days</button>
              </div>
            </div>
            <div className="space-y-4">
              {categoryPerformance.map((item, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{item.category}</span>
                    <span className="text-sm font-medium">{item.score}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${item.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Critical Feedback Section */}
        {criticalFeedback.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-semibold text-gray-900">Critical Feedback Requiring Attention</h3>
              </div>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All Issues →
              </button>
            </div>
            
            <div className="space-y-4">
              {criticalFeedback.map((review) => (
                <div key={review.id} className="border-l-4 border-red-500 bg-red-50 p-4 rounded-r-lg">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getClinicColor(review.clinicAvatar)}`}>
                      {review.clinicAvatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <h4 className="font-medium text-gray-900">{review.clinic}</h4>
                          <div className="flex items-center space-x-2">
                            <div className="flex">{renderStars(review.rating)}</div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                          Respond
                        </button>
                      </div>
                      <p className="text-gray-700 mb-3">{review.feedback}</p>
                      <div className="flex flex-wrap gap-2">
                        {review.categories.map((category, index) => (
                          <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All Clinic Feedback */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">All Clinic Feedback</h3>
            <div className="flex items-center space-x-3">
              <div className="relative">
                <select 
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Ratings</option>
                  <option>5 Stars</option>
                  <option>4 Stars</option>
                  <option>3 Stars</option>
                  <option>2 Stars</option>
                  <option>1 Star</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <div className="relative">
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option>All Categories</option>
                  <option>Service Quality</option>
                  <option>Product Quality</option>
                  <option>Delivery Speed</option>
                  <option>Communication</option>
                  <option>Value for Money</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              </div>
              
              <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 text-sm font-medium">
                <Filter className="w-4 h-4" />
                <span>More Filters</span>
              </button>
            </div>
          </div>

          {/* Reviews Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Clinic</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Rating</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Categories</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Feedback</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700 text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {reviews.map((review) => (
                  <tr key={review.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm ${getClinicColor(review.clinicAvatar)}`}>
                          {review.clinicAvatar}
                        </div>
                        <span className="font-medium text-gray-900">{review.clinic}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="font-medium text-gray-900">{review.rating}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-600">{review.date}</td>
                    <td className="py-4 px-4">
                      <div className="flex flex-wrap gap-1">
                        {review.categories.map((category, index) => (
                          <span key={index} className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(category)}`}>
                            {category}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 px-4 max-w-md">
                      <p className="text-gray-700 text-sm line-clamp-2">{review.feedback}</p>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                          <MessageCircle className="w-4 h-4" />
                        </button>
                        {review.rating < 3.5 && (
                          <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                            <AlertCircle className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-500">Showing 1-7 of 42 reviews</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Items per page:</span>
                <select className="border border-gray-300 rounded px-2 py-1 text-sm">
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1 text-gray-600 hover:text-gray-800 disabled:opacity-50">
                  Previous
                </button>
                <div className="flex space-x-1">
                  <button className="w-8 h-8 rounded bg-blue-600 text-white text-sm font-medium">1</button>
                  <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">2</button>
                  <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">3</button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="w-8 h-8 rounded text-gray-600 hover:bg-gray-100 text-sm">5</button>
                </div>
                <button className="px-3 py-1 text-gray-600 hover:text-gray-800">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Reviews;