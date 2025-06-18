import React from 'react'; import TopBar from '../components/TopBar'; import { ArrowRight, Calendar, Clock, AlertCircle, Info, CheckCircle, ExternalLink, FileText, Video, HelpCircle, ChevronRight, Eye, Bot, BarChart3, Package, Zap } from 'lucide-react';
const Dashboard: React.FC = () => {
const newFeatures = [
{
icon: Bot,
title: 'AI-Powered Inventory Prediction',
description: 'Automatically predict inventory needs based on historical data',
date: 'Dec 1, 2022',
color: 'bg-blue-50 text-blue-600'
},
{
icon: BarChart3,
title: 'Supplier Performance Dashboard',
description: 'Track and analyze supplier performance metrics in real-time',
date: 'Nov 28, 2022',
color: 'bg-green-50 text-green-600'
},
{
icon: Package,
title: 'Bulk Order Processing',
description: 'Process multiple orders simultaneously with our new batch system',
date: 'Nov 15, 2022',
color: 'bg-purple-50 text-purple-600'
}
];

const upcomingTraining = [
{
title: 'Getting Started with E-Procurement',
date: 'December 10, 2022',
time: '10:00 AM - 11:30 AM PST',
type: 'Webinar',
icon: Video
},
{
title: 'Advanced Inventory Management',
date: 'December 15, 2022',
time: '1:00 PM - 3:00 PM PST',
type: 'Workshop',
icon: FileText
},
{
title: 'Supplier Negotiation Strategies',
date: 'December 20, 2022',
time: '11:00 AM - 12:00 PM PST',
type: 'Webinar',
icon: Video
}
];

const announcements = [
{
title: 'System Maintenance Scheduled',
description: 'The e-Procurement system will be undergoing maintenance on December 12, 2022, from 2:00 AM to 4:00 AM PST.',
date: 'Dec 5, 2022',
priority: 'High Priority',
priorityColor: 'bg-red-100 text-red-800',
icon: AlertCircle,
iconColor: 'text-red-500'
},
{
title: 'New Supplier Onboarding Process',
description: "We've streamlined the supplier onboarding process. Check out the new documentation for details.",
date: 'Dec 3, 2022',
priority: 'Medium Priority',
priorityColor: 'bg-blue-100 text-blue-800',
icon: Info,
iconColor: 'text-blue-500'
},
{
title: 'Year-End Inventory Count',
description: 'Please complete your year-end inventory count by December 28, 2022.',
date: 'Dec 1, 2022',
priority: 'Normal Priority',
priorityColor: 'bg-green-100 text-green-800',
icon: CheckCircle,
iconColor: 'text-green-500'
}
];

const quickAccess = [
{ title: 'Create Purchase Request', icon: FileText },
{ title: 'View Purchase Orders', icon: Package },
{ title: 'Upload Payment', icon: ArrowRight }
];

const helpResources = [
{
title: 'User Guide',
description: 'Complete documentation for using the e-Procurement system',
icon: FileText
},
{
title: 'Video Tutorials',
description: 'Step-by-step video guides for common tasks',
icon: Video
},
{
title: 'Contact Support',
description: 'Get help from our support team',
icon: HelpCircle
}
];

return (
<>

  <TopBar Title='Dashboard' Text='Hello John!' Date='Wednesday 6, June 2025'/>

  <main className="flex-1 p-6 bg-gray-50">
    <div className="mx-auto">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 mb-8 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute right-0 top-0 w-1/2 h-full">
          <img 
            src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&fit=crop" 
            alt="Dental professional" 
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative z-10 max-w-lg">
          <div className="inline-flex items-center px-3 py-1 bg-blue-500 text-white text-sm rounded-full mb-4">
            <Zap className="w-4 h-4 mr-2" />
            New Product
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Introducing DentalOne Pro Suite
          </h1>
          <p className="text-blue-100 mb-6 leading-relaxed">
            Streamline your procurement process with our new integrated solution designed specifically for dental clinics.
          </p>
          <button className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors">
            Learn More
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-8">
        {/* Left Column */}
        <div className="col-span-8 space-y-8">
          {/* New System Features */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">New System Features</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {newFeatures.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center mb-4`}>
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="w-3 h-3 mr-1" />
                    {feature.date}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Training & Webinars */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Upcoming Training & Webinars</h2>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View Calendar
              </button>
            </div>
            <div className="space-y-4">
              {upcomingTraining.map((training, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <training.icon className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{training.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {training.date}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          {training.time}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                      {training.type}
                    </span>
                    <button className="p-2 text-blue-600 hover:text-blue-800">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Important Announcements */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Important Announcements</h2>
              <div className="flex items-center space-x-3">
                <button className="text-gray-600 hover:text-gray-800 text-sm">Archive</button>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {announcements.map((announcement, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${announcement.iconColor === 'text-red-500' ? 'bg-red-50' : announcement.iconColor === 'text-blue-500' ? 'bg-blue-50' : 'bg-green-50'}`}>
                        <announcement.icon className={`w-4 h-4 ${announcement.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mb-2">{announcement.description}</p>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center text-xs text-gray-500">
                            <Calendar className="w-3 h-3 mr-1" />
                            {announcement.date}
                          </div>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${announcement.priorityColor}`}>
                            {announcement.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 text-sm">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-4 space-y-6">
          {/* Quick Access */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Access</h3>
            <div className="space-y-3">
              {quickAccess.map((item, index) => (
                <button key={index} className="w-full flex items-center justify-between p-3 text-left border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center space-x-3">
                    <item.icon className="w-5 h-5 text-gray-400 group-hover:text-blue-600" />
                    <span className="text-gray-700 group-hover:text-gray-900">{item.title}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                </button>
              ))}
            </div>
          </div>

          {/* Supplier Promotions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Supplier Promotions</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                View All
              </button>
            </div>
            
            <div className="space-y-4">
              {/* Year-End Sale */}
              <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-500">MediDent Pro</span>
                  <button className="text-blue-600 hover:text-blue-800 text-xs">
                    View Details
                  </button>
                </div>
                <h4 className="font-semibold text-gray-900 mb-1">Year-End Sale: 20% Off All Instruments</h4>
                <p className="text-xs text-gray-600 mb-2">Valid until December 31, 2022</p>
                <div className="w-full bg-gray-200 rounded-full h-1">
                  <div className="bg-blue-500 h-1 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>

              {/* Cleaning Products Promotion */}
              <div className="border border-gray-200 rounded-lg overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/3845810/pexels-photo-3845810.jpeg?auto=compress&cs=tinysrgb&w=300&h=150&fit=crop" 
                  alt="Dental cleaning products" 
                  className="w-full h-24 object-cover"
                />
                <div className="p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">DentalTech Pro</span>
                    <button className="text-blue-600 hover:text-blue-800 text-xs">
                      View Details
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 text-sm mb-1">Buy 2 Get 1 Free on All Cleaning Products</h4>
                  <p className="text-xs text-gray-600">Valid until December 15, 2022</p>
                </div>
              </div>
            </div>
          </div>

          {/* Help & Resources */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Help & Resources</h3>
            <div className="space-y-3">
              {helpResources.map((resource, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <resource.icon className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 text-sm">{resource.title}</h4>
                    <p className="text-xs text-gray-600">{resource.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</>
);
};

export default Dashboard;