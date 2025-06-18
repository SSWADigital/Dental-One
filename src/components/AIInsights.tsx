import React from 'react';
import { Brain, TrendingUp, Users } from 'lucide-react';

const AIInsights = () => {
  const insights = [
    {
      icon: Brain,
      title: 'Optimize Stock Levels',
      description: '15 items could be reduced by 30% based on usage patterns, potentially saving $3,500.',
      iconColor: 'text-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      icon: TrendingUp,
      title: 'Seasonal Trend Detected',
      description: 'Increase orthodontic supplies by 15% for upcoming back-to-school season based on historical data.',
      iconColor: 'text-green-500',
      bgColor: 'bg-green-50'
    },
    {
      icon: Users,
      title: 'Supplier Recommendation',
      description: 'Consider consolidating orders from Supplier A and B to qualify for 8% bulk discount.',
      iconColor: 'text-purple-500',
      bgColor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-blue-50 rounded-xl border border-blue-200 p-6 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center">
          <Brain className="w-4 h-4 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="flex items-start space-x-3">
              <div className={`p-2 rounded-lg ${insight.bgColor} flex-shrink-0`}>
                <insight.icon className={`w-4 h-4 ${insight.iconColor}`} />
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-1">{insight.title}</h4>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIInsights;