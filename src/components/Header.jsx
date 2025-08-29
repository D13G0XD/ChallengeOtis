import React from 'react';
import { Menu, Bell, User, Globe, Settings } from 'lucide-react';
import { useTranslation } from '../config/i18n';

const Header = ({ onMenuClick }) => {
  const { t, currentLang, setLanguage } = useTranslation();

  return (
    <header className="bg-white shadow-otis border-b border-otis-100 fixed w-full top-0 z-50 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo e Menu */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-xl text-gray-400 hover:text-otis-600 hover:bg-otis-50 lg:hidden transition-all duration-200"
          >
            <Menu className="h-6 w-6" />
          </button>
          
          <div className="flex items-center ml-4 lg:ml-0">
            {/* Logo OTIS Melhorado */}
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-otis-600 to-otis-800 rounded-xl flex items-center justify-center shadow-otis">
                  <span className="text-white font-bold text-lg tracking-wider">O</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse-subtle"></div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold text-gray-900 tracking-tight">
                  OTIS
                  <span className="text-otis-600 ml-1 font-normal">LATAM</span>
                </h1>
                <span className="text-xs text-gray-500 -mt-1 hidden sm:block">
                  Sistema de Acompanhamento
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Ações do cabeçalho */}
        <div className="flex items-center space-x-3">
          {/* Seletor de idioma aprimorado */}
          <div className="relative">
            <select
              value={currentLang}
              onChange={(e) => setLanguage(e.target.value)}
              className="form-select text-sm border-gray-200 bg-gray-50 hover:bg-white focus:bg-white 
                         transition-all duration-200 text-gray-700 font-medium min-w-20"
            >
              <option value="pt-BR">🇧🇷 PT</option>
              <option value="es-419">🇪🇸 ES</option>
            </select>
          </div>

          {/* Notificações */}
          <button className="relative p-2 text-gray-400 hover:text-otis-600 hover:bg-otis-50 rounded-xl transition-all duration-200">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border border-white"></span>
          </button>

          {/* Configurações */}
          <button className="p-2 text-gray-400 hover:text-otis-600 hover:bg-otis-50 rounded-xl transition-all duration-200 hidden md:block">
            <Settings className="h-5 w-5" />
          </button>

          {/* Perfil do usuário */}
          <div className="flex items-center">
            <button className="flex items-center space-x-3 text-sm rounded-xl hover:bg-otis-50 p-2 
                               focus:outline-none focus:ring-2 focus:ring-otis-500 focus:ring-offset-2 
                               transition-all duration-200">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-gray-600" />
              </div>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-gray-700 font-medium text-sm">
                  Admin OTIS
                </span>
                <span className="text-gray-500 text-xs">
                  Administrador
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
      
      {/* Linha gradiente decorativa */}
      <div className="h-1 w-full gradient-otis"></div>
    </header>
  );
};

export default Header;
