import React from 'react';
import type { LucideProps } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
  iconColor?: 'blue' | 'green' | 'orange' | 'purple';
  stats?: Array<{
    icon: React.ComponentType<LucideProps>;
    label: string;
    value: string | number;
  }>;
  actions?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  icon: Icon,
  iconColor = 'blue',
  stats,
  actions
}) => {
  const iconColorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    orange: 'bg-orange-600',
    purple: 'bg-purple-600'
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className={`w-10 h-10 ${iconColorClasses[iconColor]} rounded-lg flex items-center justify-center`}>
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          
          {stats && stats.length > 0 && (
            <div className="flex items-center gap-4 text-sm text-gray-500">
              {stats.map((stat, index) => {
                const StatIcon = stat.icon;
                return (
                  <div key={index} className="flex items-center gap-2">
                    <StatIcon className="w-4 h-4" />
                    <span>{stat.label}: {stat.value}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {actions && (
          <div className="flex gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default PageHeader;
