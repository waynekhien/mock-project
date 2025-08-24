import React from 'react';
import { Filter, type LucideProps } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
}

interface FilterSectionProps {
  title: string;
  icon?: React.ComponentType<LucideProps>;
  value: string;
  options: FilterOption[];
  onChange: (value: string) => void;
  placeholder?: string;
}

const FilterSection: React.FC<FilterSectionProps> = ({
  title,
  icon: Icon = Filter,
  value,
  options,
  onChange,

}) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Icon className="w-5 h-5 text-gray-600" />
          <span className="font-medium text-gray-900">{title}:</span>
        </div>
        
        <div className="relative">
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="appearance-none pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white transition-all min-w-48"
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
