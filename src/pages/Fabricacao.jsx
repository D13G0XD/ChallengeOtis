import React, { useState, useEffect } from 'react';
import { Package, Truck, Calendar, AlertCircle, CheckCircle } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const Fabricacao = () => {
  const { t } = useTranslation();
  const [factoryStatus, setFactoryStatus] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await mockApi.getFactoryStatus();
      setFactoryStatus(data);
    } catch (error) {
      console.error('Erro ao carregar dados da fábrica:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Não definido';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateKPIs = () => {
    const total = factoryStatus.length;
    const inProduction = factoryStatus.filter(f => f.status === 'Em Produção' || f.status === 'Iniciado').length;
    const completed = factoryStatus.filter(f => f.status === 'Enviado').length;
    const avgProgress = factoryStatus.reduce((sum, f) => sum + f.progressoFabricacao, 0) / total || 0;

    return {
      total,
      inProduction,
      completed,
      avgProgress: Math.round(avgProgress)
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Iniciado':
        return 'bg-yellow-100 text-yellow-800';
      case 'Em Produção':
        return 'bg-blue-100 text-blue-800';
      case 'Enviado':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getComponentStatusIcon = (status) => {
    switch (status) {
      case 'Concluído':
      case 'Enviado':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Em Produção':
        return <Package className="h-4 w-4 text-blue-500" />;
      case 'Aguardando':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />;
    }
  };

  const kpis = calculateKPIs();

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
          {t('fabricacao')}
        </h1>
        <p className="text-gray-600 mt-1">
          Status de fabricação e envio dos componentes
        </p>
      </div>

      {/* KPIs de Fabricação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total em Fábrica"
          value={kpis.total}
          color="blue"
        />
        <KpiCard
          title="Em Produção"
          value={kpis.inProduction}
          color="yellow"
        />
        <KpiCard
          title="Enviados"
          value={kpis.completed}
          color="green"
        />
        <KpiCard
          title="Progresso Médio"
          value={kpis.avgProgress}
          unit="%"
          color="purple"
        />
      </div>

      {/* Lista de Instalações na Fábrica */}
      <div className="space-y-6">
        {factoryStatus.map((factory) => (
          <div key={factory.instalacaoId} className="card">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {factory.instalacaoId}
                </h3>
                <div className="flex items-center mt-1">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(factory.status)}`}>
                    {factory.status}
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm text-gray-500">Progresso Geral</div>
                <div className="flex items-center mt-1">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-3">
                    <div 
                      className="bg-otis-blue h-2 rounded-full" 
                      style={{ width: `${factory.progressoFabricacao}%` }}
                    ></div>
                  </div>
                  <span className="text-lg font-semibold text-gray-900">
                    {factory.progressoFabricacao}%
                  </span>
                </div>
              </div>
            </div>

            {/* Datas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <span className="text-gray-500">Início:</span>
                  <span className="ml-1 text-gray-900">
                    {formatDate(factory.dataInicioFabricacao)}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center text-sm">
                <Truck className="h-4 w-4 text-gray-400 mr-2" />
                <div>
                  <span className="text-gray-500">Envio estimado:</span>
                  <span className="ml-1 text-gray-900">
                    {formatDate(factory.dataEstimadaEnvio)}
                  </span>
                </div>
              </div>
              
              {factory.dataEnvio && (
                <div className="flex items-center text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                  <div>
                    <span className="text-gray-500">Enviado em:</span>
                    <span className="ml-1 text-gray-900">
                      {formatDate(factory.dataEnvio)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Componentes */}
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3">
                Componentes
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {factory.componentes.map((component, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-900">
                        {component.nome}
                      </h5>
                      {getComponentStatusIcon(component.status)}
                    </div>
                    
                    <div className="mb-2">
                      <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                        <span>{component.status}</span>
                        <span>{component.progresso}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-1.5">
                        <div 
                          className={`h-1.5 rounded-full ${
                            component.progresso === 100 ? 'bg-green-500' :
                            component.progresso > 0 ? 'bg-blue-500' : 'bg-gray-300'
                          }`}
                          style={{ width: `${component.progresso}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {factoryStatus.length === 0 && (
        <div className="card text-center py-8">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma instalação em fabricação
          </h3>
          <p className="text-gray-500">
            Não há projetos atualmente na fábrica.
          </p>
        </div>
      )}
    </div>
  );
};

export default Fabricacao;
