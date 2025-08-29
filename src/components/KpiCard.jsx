import React from 'react';
import { TrendingUp, TrendingDown, Minus, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const KpiCard = ({ 
  title, 
  value, 
  unit = '', 
  variation = null, 
  trend = 'neutral', 
  description = '',
  color = 'blue',
  icon = null 
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <ArrowUpRight className="h-4 w-4 text-green-600" />;
      case 'down':
        return <ArrowDownRight className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-400" />;
    }
  };

  const getVariationColor = () => {
    if (variation === null) return 'text-gray-500';
    return variation >= 0 ? 'text-green-600' : 'text-red-600';
  };

  const getVariationBg = () => {
    if (variation === null) return 'bg-gray-50';
    return variation >= 0 ? 'bg-green-50' : 'bg-red-50';
  };

  const getColorClasses = () => {
    const colors = {
      blue: {
        border: 'border-l-blue-500',
        bg: 'bg-blue-50',
        icon: 'text-blue-600',
        accent: 'bg-blue-100'
      },
      green: {
        border: 'border-l-green-500',
        bg: 'bg-green-50',
        icon: 'text-green-600',
        accent: 'bg-green-100'
      },
      yellow: {
        border: 'border-l-yellow-500',
        bg: 'bg-yellow-50',
        icon: 'text-yellow-600',
        accent: 'bg-yellow-100'
      },
      red: {
        border: 'border-l-red-500',
        bg: 'bg-red-50',
        icon: 'text-red-600',
        accent: 'bg-red-100'
      },
      purple: {
        border: 'border-l-purple-500',
        bg: 'bg-purple-50',
        icon: 'text-purple-600',
        accent: 'bg-purple-100'
      },
      gray: {
        border: 'border-l-gray-500',
        bg: 'bg-gray-50',
        icon: 'text-gray-600',
        accent: 'bg-gray-100'
      },
      otis: {
        border: 'border-l-otis-600',
        bg: 'bg-otis-50',
        icon: 'text-otis-600',
        accent: 'bg-otis-100'
      }
    };
    return colors[color] || colors.blue;
  };

  const colorClasses = getColorClasses();

  return (
    <div className={`card-elevated border-l-4 ${colorClasses.border} ${colorClasses.bg} 
                     hover:shadow-otis-lg transition-all duration-300 hover:scale-105 
                     cursor-pointer group overflow-hidden relative`}>
      
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-12 translate-x-8 -translate-y-8">
        <div className={`w-full h-full ${colorClasses.accent} rounded-full`}></div>
      </div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                {title}
              </p>
              {icon && (
                <div className={`p-2 rounded-xl ${colorClasses.accent} ${colorClasses.icon} 
                               group-hover:scale-110 transition-transform duration-200`}>
                  {React.createElement(icon, { className: "h-5 w-5" })}
                </div>
              )}
            </div>
            
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-gray-900 group-hover:text-gray-700 transition-colors">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              {unit && (
                <span className="text-sm font-medium text-gray-500">
                  {unit}
                </span>
              )}
            </div>
            
            {variation !== null && (
              <div className={`flex items-center mt-3 px-3 py-1 rounded-full ${getVariationBg()} 
                             border border-current border-opacity-20 w-fit`}>
                {getTrendIcon()}
                <span className={`ml-1 text-sm font-semibold ${getVariationColor()}`}>
                  {variation >= 0 ? '+' : ''}{variation}%
                </span>
                <span className="ml-2 text-xs text-gray-500">
                  vs período anterior
                </span>
              </div>
            )}
            
            {description && (
              <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Progress bar se houver trend */}
        {trend !== 'neutral' && (
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
              <span>Performance</span>
              <span>{trend === 'up' ? 'Crescimento' : 'Declínio'}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-1000 ${
                  trend === 'up' ? 'bg-green-500' : 'bg-red-500'
                }`}
                style={{ 
                  width: `${Math.abs(variation || 0) > 100 ? 100 : Math.abs(variation || 50)}%` 
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default KpiCard;
