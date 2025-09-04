import React, { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const Planejamento = () => {
  const { t } = useTranslation();
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const data = await mockApi.listInstallations();
      setInstallations(data);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const calculateDaysRemaining = (prazoPrometido) => {
    const today = new Date();
    const deadline = new Date(prazoPrometido);
    const diffTime = deadline - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getStatusPriority = (status) => {
    const priorities = {
      'Vendido': 1,
      'Engenharia': 2,
      'Fabricação': 3,
      'Em Transporte': 4,
      'Instalação': 5,
      'Comissionamento': 6,
      'Handover': 7,
      'Pós-venda': 8
    };
    return priorities[status] || 0;
  };

  const calculateKPIs = () => {
    const totalProjects = installations.length;
    const onTime = installations.filter(inst => {
      const daysRemaining = calculateDaysRemaining(inst.prazoPrometido);
      return daysRemaining >= 0 || inst.status === 'Handover';
    }).length;
    
    const delayed = totalProjects - onTime;
    const completed = installations.filter(inst => 
      inst.status === 'Handover' || inst.status === 'Pós-venda'
    ).length;

    return {
      totalProjects,
      onTime,
      delayed,
      completed
    };
  };

  const kpis = calculateKPIs();

  // Agrupar por mês para visualização de cronograma
  const groupByMonth = () => {
    const grouped = {};
    installations.forEach(inst => {
      const date = new Date(inst.prazoPrometido);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (!grouped[monthKey]) {
        grouped[monthKey] = [];
      }
      grouped[monthKey].push(inst);
    });
    
    return Object.entries(grouped).sort();
  };

  const monthlySchedule = groupByMonth();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6 ml-8">
      {/* Cabeçalho */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mt-16">
          {t('planejamento')}
        </h1>
        <p className="text-gray-600 mt-8">
          Cronograma e timeline dos projetos
        </p>
      </div>

      {/* KPIs de Planejamento */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total de Projetos"
          value={kpis.totalProjects}
          color="blue"
        />
        <KpiCard
          title="No Prazo"
          value={kpis.onTime}
          color="green"
        />
        <KpiCard
          title="Em Atraso"
          value={kpis.delayed}
          color="red"
        />
        <KpiCard
          title="Concluídos"
          value={kpis.completed}
          color="purple"
        />
      </div>

      {/* Visão Kanban por Status */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {['Vendido', 'Engenharia', 'Fabricação', 'Instalação'].map(status => {
          const statusInstallations = installations.filter(inst => inst.status === status);
          
          return (
            <div key={status} className="card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{status}</h3>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
                  {statusInstallations.length}
                </span>
              </div>
              
              <div className="space-y-3">
                {statusInstallations.map(inst => {
                  const daysRemaining = calculateDaysRemaining(inst.prazoPrometido);
                  const isDelayed = daysRemaining < 0;
                  
                  return (
                    <div key={inst.id} className="p-3 bg-gray-50 rounded-lg border">
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {inst.cliente}
                      </div>
                      <div className="text-xs text-gray-500 mb-2">
                        {inst.id} • {inst.cidade}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs">
                          <Calendar className="h-3 w-3 mr-1 text-gray-400" />
                          <span className={isDelayed ? 'text-red-600' : 'text-gray-600'}>
                            {formatDate(inst.prazoPrometido)}
                          </span>
                        </div>
                        
                        {isDelayed ? (
                          <div className="flex items-center text-red-600">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">
                              {Math.abs(daysRemaining)}d atrasado
                            </span>
                          </div>
                        ) : (
                          <div className="flex items-center text-green-600">
                            <Clock className="h-3 w-3 mr-1" />
                            <span className="text-xs">
                              {daysRemaining}d restantes
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Cronograma Mensal */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Cronograma por Mês de Entrega
        </h3>
        
        <div className="space-y-6">
          {monthlySchedule.map(([monthKey, monthInstallations]) => {
            const [year, month] = monthKey.split('-');
            const monthName = new Date(year, month - 1).toLocaleDateString('pt-BR', { 
              month: 'long', 
              year: 'numeric' 
            });
            
            return (
              <div key={monthKey} className="border-l-4 border-otis-blue pl-4">
                <h4 className="text-lg font-medium text-gray-900 mb-3 capitalize">
                  {monthName}
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {monthInstallations.map(inst => {
                    const daysRemaining = calculateDaysRemaining(inst.prazoPrometido);
                    const isDelayed = daysRemaining < 0;
                    
                    return (
                      <div key={inst.id} className="p-4 bg-white border border-gray-200 rounded-lg">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h5 className="font-medium text-gray-900">{inst.cliente}</h5>
                            <p className="text-sm text-gray-500">{inst.id}</p>
                          </div>
                          <StatusBadge status={inst.status} size="sm" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">
                            {formatDate(inst.prazoPrometido)}
                          </span>
                          
                          {inst.status === 'Handover' ? (
                            <div className="flex items-center text-green-600">
                              <CheckCircle className="h-4 w-4 mr-1" />
                              <span className="font-medium">Concluído</span>
                            </div>
                          ) : isDelayed ? (
                            <div className="flex items-center text-red-600">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              <span className="font-medium">Atrasado</span>
                            </div>
                          ) : (
                            <div className="flex items-center text-blue-600">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{daysRemaining}d</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Planejamento;
