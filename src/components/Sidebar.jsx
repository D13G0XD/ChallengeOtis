import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  BarChart3, 
  ShoppingCart, 
  Calendar, 
  Factory, 
  Wrench, 
  Shield, 
  Users,
  X 
} from 'lucide-react';
import { useTranslation } from '../config/i18n';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const navigation = [
    { name: t('dashboard'), href: '/', icon: BarChart3 },
    { name: t('vendas'), href: '/vendas', icon: ShoppingCart },
    { name: t('planejamento'), href: '/planejamento', icon: Calendar },
    { name: t('fabricacao'), href: '/fabricacao', icon: Factory },
    { name: t('instalacao'), href: '/instalacao', icon: Wrench },
    { name: t('qualidade'), href: '/qualidade', icon: Shield },
    { name: t('portalCliente'), href: '/cliente', icon: Users },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-12 left-0 z-40 w-64 h-full bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header do sidebar mobile */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <h2 className="text-lg font-semibold text-gray-900">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-gray-400 hover:text-gray-500"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="flex-1 mt-8 px-4 pb-4 space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                  isActive
                    ? 'bg-otis-light text-otis-blue border-r-2 border-otis-blue'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Footer do sidebar */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center text-xs text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Sistema Online
          </div>
          <div className="mt-1 text-xs text-gray-400">
            v1.0.0 - MVP
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
