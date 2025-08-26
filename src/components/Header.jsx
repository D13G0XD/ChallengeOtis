import React from 'react';
import { Menu, Bell, User, Globe } from 'lucide-react';
import { useTranslation } from '../config/i18n';

const Header = ({ onMenuClick }) => {
  const { t, currentLang, setLanguage } = useTranslation();

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 fixed w-full top-0 z-50">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo e Menu */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center ml-4 lg:ml-0">
            <div className="w-8 h-8 bg-otis-blue rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">O</span>
            </div>
            <h1 className="ml-3 text-xl font-semibold text-gray-900">
              OTIS LATAM
            </h1>
          </div>
        </div>

        {/* Ações do cabeçalho */}
        <div className="flex items-center space-x-4">
          {/* Seletor de idioma */}
          <div className="relative">
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-otis-blue focus:border-transparent"
            >
              <option value="pt-BR">🇧🇷 PT</option>
              <option value="es-419">🇪🇸 ES</option>
            </select>
            <Globe className="absolute right-1 top-1 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>

          {/* Notificações */}
          <button className="p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-md">
            <Bell className="h-5 w-5" />
          </button>

          {/* Perfil do usuário */}
          <div className="flex items-center">
            <button className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-otis-blue">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <span className="ml-2 text-gray-700 hidden md:block">
                Admin OTIS
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
