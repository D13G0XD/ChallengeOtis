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
  X,
  ChevronRight,
  Zap
} from 'lucide-react';
import { useTranslation } from '../config/i18n';

const Sidebar = ({ isOpen, onClose }) => {
  const { t } = useTranslation();

  const navigation = [
    { name: t('dashboard'), href: '/', icon: BarChart3, color: 'text-blue-600' },
    { name: t('vendas'), href: '/vendas', icon: ShoppingCart, color: 'text-green-600' },
    { name: t('planejamento'), href: '/planejamento', icon: Calendar, color: 'text-purple-600' },
    { name: t('fabricacao'), href: '/fabricacao', icon: Factory, color: 'text-orange-600' },
    { name: t('instalacao'), href: '/instalacao', icon: Wrench, color: 'text-blue-600' },
    { name: t('qualidade'), href: '/qualidade', icon: Shield, color: 'text-emerald-600' },
    { name: t('portalCliente'), href: '/cliente', icon: Users, color: 'text-indigo-600' },
  ];

  return (
    <>
      {/* Overlay para mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-16 left-0 z-40 w-72 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 
        transform transition-transform duration-300 ease-out lg:translate-x-0 shadow-lg overflow-y-auto
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        

        {/* Navegação */}
        <nav className="flex-1 px-4 pb-4 space-y-2 mt-8">
          {navigation.map((item, index) => (
            <NavLink
              key={item.name}
              to={item.href}
              onClick={() => onClose()}
              className={({ isActive }) =>
                `group flex items-center justify-between px-4 py-3 text-sm font-medium rounded-xl 
                 transition-all duration-200 hover:translate-x-1 relative overflow-hidden ${
                  isActive
                    ? 'bg-gradient-to-r from-otis-50 to-otis-100 text-otis-700 border-l-4 border-otis-600 shadow-otis'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <div className="flex items-center">
                    <item.icon
                      className={`mr-4 h-5 w-5 flex-shrink-0 transition-all duration-200 ${
                        isActive ? item.color : 'text-gray-400 group-hover:text-gray-600'
                      }`}
                      aria-hidden="true"
                    />
                    <span className="font-medium">
                      {item.name}
                    </span>
                  </div>
                  
                  {isActive && (
                    <ChevronRight className="h-4 w-4 text-otis-600 animate-pulse" />
                  )}
                  
                  {/* Indicador de ativo */}
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-otis-500 to-otis-700 rounded-r-full "></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Seção de estatísticas rápidas */}
        <div className="p-4 m-4 bg-gradient-to-br from-otis-50 to-otis-100 rounded-xl border border-otis-200 mt-12">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-otis-800">Sistema Status</h3>
            <Zap className="h-4 w-4 text-otis-600" />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-otis-700">Instalações Ativas</span>
              <span className="font-bold text-otis-800">12</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-otis-700">Alertas Pendentes</span>
              <span className="font-bold text-orange-600">3</span>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-otis-700">Taxa de Sucesso</span>
              <span className="font-bold text-green-600">94%</span>
            </div>
          </div>
        </div>

        {/* Footer do sidebar */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 mt-16">
          <div className="flex items-center text-xs text-gray-600 mb-2">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse-subtle"></div>
            Sistema Online - Conectado
          </div>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>v1.0.0 - MVP</span>
            <span className="text-otis-600 font-medium">OTIS LATAM</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
