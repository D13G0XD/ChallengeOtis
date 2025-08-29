import React from 'react';
import { 
  Package, 
  Cog, 
  Factory, 
  Truck, 
  Wrench, 
  CheckCircle, 
  HandMetal, 
  Headphones,
  Clock
} from 'lucide-react';

const StatusBadge = ({ status, size = 'sm', showIcon = true, pulse = false }) => {
  const getStatusConfig = (status) => {
    const statusMap = {
      'Vendido': {
        classes: 'bg-gray-100 text-gray-800 border-gray-200',
        icon: Package,
        color: 'text-gray-600'
      },
      'Engenharia': {
        classes: 'bg-indigo-100 text-indigo-800 border-indigo-200',
        icon: Cog,
        color: 'text-indigo-600'
      },
      'Fabricação': {
        classes: 'bg-teal-100 text-teal-800 border-teal-200',
        icon: Factory,
        color: 'text-teal-600'
      },
      'Em Transporte': {
        classes: 'bg-amber-100 text-amber-800 border-amber-200',
        icon: Truck,
        color: 'text-amber-600'
      },
      'Instalação': {
        classes: 'bg-blue-100 text-blue-800 border-blue-200',
        icon: Wrench,
        color: 'text-blue-600'
      },
      'Comissionamento': {
        classes: 'bg-purple-100 text-purple-800 border-purple-200',
        icon: CheckCircle,
        color: 'text-purple-600'
      },
      'Handover': {
        classes: 'bg-green-100 text-green-800 border-green-200',
        icon: HandMetal,
        color: 'text-green-600'
      },
      'Pós-venda': {
        classes: 'bg-slate-100 text-slate-800 border-slate-200',
        icon: Headphones,
        color: 'text-slate-600'
      }
    };
    
    return statusMap[status] || {
      classes: 'bg-gray-100 text-gray-800 border-gray-200',
      icon: Clock,
      color: 'text-gray-600'
    };
  };

  const getSizeClasses = (size) => {
    const sizes = {
      xs: 'px-2 py-1 text-xs',
      sm: 'px-3 py-1 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2 text-base'
    };
    return sizes[size] || sizes.sm;
  };

  const statusConfig = getStatusConfig(status);
  const IconComponent = statusConfig.icon;

  return (
    <span className={`
      inline-flex items-center rounded-full font-medium border transition-all duration-200
      hover:scale-105 cursor-default select-none
      ${statusConfig.classes} 
      ${getSizeClasses(size)}
      ${pulse ? 'animate-pulse-subtle' : ''}
    `}>
      {showIcon && IconComponent && (
        <IconComponent className={`
          ${size === 'xs' ? 'h-3 w-3' : size === 'lg' ? 'h-5 w-5' : 'h-4 w-4'} 
          ${statusConfig.color} 
          ${size === 'xs' ? 'mr-1' : 'mr-2'}
        `} />
      )}
      <span className="font-semibold tracking-wide">
        {status}
      </span>
    </span>
  );
};

export default StatusBadge;
