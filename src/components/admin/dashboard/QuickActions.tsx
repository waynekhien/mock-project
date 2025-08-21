import React from 'react';
import { ArrowRight, type LucideProps } from 'lucide-react';

interface QuickAction {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  href: string;
  color?: 'blue' | 'green' | 'orange' | 'purple';
}

interface QuickActionsProps {
  actions: QuickAction[];
}

const QuickActions: React.FC<QuickActionsProps> = ({ actions }) => {
  const colorClasses = {
    blue: 'bg-blue-100 text-blue-600',
    green: 'bg-green-100 text-green-600',
    orange: 'bg-orange-100 text-orange-600',
    purple: 'bg-purple-100 text-purple-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Thao tác nhanh</h2>
        <p className="text-gray-600 text-sm mt-1">Truy cập nhanh các chức năng</p>
      </div>
      
      <div className="p-6 space-y-2">
        {actions.map((action, index) => {
          const Icon = action.icon;
          const colorClass = colorClasses[action.color || 'blue'];
          
          return (
            <button
              key={index}
              className="w-full flex items-center gap-3 p-3 text-left hover:bg-gray-50 rounded-lg transition-colors"
              onClick={() => window.location.href = action.href}
            >
              <div className={`p-2 rounded-lg ${colorClass}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-900 block">{action.title}</span>
                <span className="text-gray-600 text-sm">{action.description}</span>
              </div>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default QuickActions;
