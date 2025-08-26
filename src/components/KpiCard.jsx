import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

const KpiCard = ({ 
  title, 
  value, 
  unit = '', 
  variation = null, 
  trend = 'neutral', 
  description = '',
  color = 'blue' 
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getVariationColor = () => {
    if (variation === null) return 'text-gray-500';
    return variation >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getColorClasses = () => {
    const colors = {
      blue: 'border-blue-200 bg-blue-50',
      green: 'border-green-200 bg-green-50',
      yellow: 'border-yellow-200 bg-yellow-50',
      red: 'border-red-200 bg-red-50',
      purple: 'border-purple-200 bg-purple-50',
      gray: 'border-gray-200 bg-gray-50'
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className={`card border-l-4 ${getColorClasses()}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 mb-1">
            {title}
          </p>
          <div className="flex items-baseline">
            <p className="text-2xl font-bold text-gray-900">
              {value}
            </p>
            {unit && (
              <span className="ml-1 text-sm text-gray-500">
                {unit}
              </span>
            )}
          </div>
          {variation !== null && (
            <div className="flex items-center mt-1">
              {getTrendIcon()}
              <span className={`ml-1 text-sm ${getVariationColor()}`}>
                {variation >= 0 ? '+' : ''}{variation}%
              </span>
            </div>
          )}
          {description && (
            <p className="text-xs text-gray-500 mt-1">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default KpiCard;
