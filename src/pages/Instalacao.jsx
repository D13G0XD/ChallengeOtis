import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Eye } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const Instalacao = () => {
  const { t } = useTranslation();
  const [installations, setInstallations] = useState([]);
  const [filteredInstallations, setFilteredInstallations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    busca: '',
    pais: '',
    status: ''
  });

  const countries = ['BR', 'AR', 'CO', 'PE', 'CL', 'MX'];
  const statusOptions = [
    'Vendido', 'Engenharia', 'Fabricação', 'Em Transporte', 
    'Instalação', 'Comissionamento', 'Handover', 'Pós-venda'
  ];

  useEffect(() => {
    loadInstallations();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [installations, filters]);

  const loadInstallations = async () => {
    try {
      const data = await mockApi.listInstallations();
      setInstallations(data);
    } catch (error) {
      console.error('Erro ao carregar instalações:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...installations];

    if (filters.busca) {
      const search = filters.busca.toLowerCase();
      filtered = filtered.filter(inst => 
        inst.cliente.toLowerCase().includes(search) ||
        inst.id.toLowerCase().includes(search) ||
        inst.cidade.toLowerCase().includes(search)
      );
    }

    if (filters.pais) {
      filtered = filtered.filter(inst => inst.pais === filters.pais);
    }

    if (filters.status) {
      filtered = filtered.filter(inst => inst.status === filters.status);
    }

    setFilteredInstallations(filtered);
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({ busca: '', pais: '', status: '' });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getProgressPercentage = (etapas) => {
    const totalSteps = 8; // Total de etapas possíveis
    return Math.round((etapas.length / totalSteps) * 100);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t('instalacao')}
        </h1>
        <p className="text-gray-600 mt-1">
          Acompanhamento de instalações em campo
        </p>
      </div>

      {/* Filtros */}
      <div className="card">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Busca */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder={t('buscar') + ' por cliente, ID ou cidade...'}
                value={filters.busca}
                onChange={(e) => handleFilterChange('busca', e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-otis-blue focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtro por País */}
          <div>
            <select
              value={filters.pais}
              onChange={(e) => handleFilterChange('pais', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-otis-blue focus:border-transparent"
            >
              <option value="">Todos os países</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>

          {/* Filtro por Status */}
          <div>
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-otis-blue focus:border-transparent"
            >
              <option value="">Todos os status</option>
              {statusOptions.map(status => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>

          {/* Limpar filtros */}
          {(filters.busca || filters.pais || filters.status) && (
            <button
              onClick={clearFilters}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Limpar
            </button>
          )}
        </div>
      </div>

      {/* Resumo */}
      <div className="text-sm text-gray-600">
        Mostrando {filteredInstallations.length} de {installations.length} instalações
      </div>

      {/* Tabela de Instalações */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ID / Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Localização
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progresso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prazo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Custo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredInstallations.map((installation) => {
                const progress = getProgressPercentage(installation.etapas);
                const costVariance = ((installation.custoReal - installation.custoPlanejado) / installation.custoPlanejado) * 100;
                
                return (
                  <tr key={installation.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {installation.id}
                        </div>
                        <div className="text-sm text-gray-500">
                          {installation.cliente}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {installation.cidade}
                      </div>
                      <div className="text-sm text-gray-500">
                        {installation.pais}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={installation.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-otis-blue h-2 rounded-full" 
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-900">{progress}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {formatDate(installation.prazoPrometido)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {formatCurrency(installation.custoReal)}
                      </div>
                      {costVariance !== 0 && (
                        <div className={`text-xs ${costVariance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                          {costVariance > 0 ? '+' : ''}{costVariance.toFixed(1)}%
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <Link
                        to={`/instalacao/${installation.id}`}
                        className="inline-flex items-center text-otis-blue hover:text-otis-dark"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Ver
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {filteredInstallations.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma instalação encontrada com os filtros aplicados.
          </div>
        )}
      </div>
    </div>
  );
};

export default Instalacao;
