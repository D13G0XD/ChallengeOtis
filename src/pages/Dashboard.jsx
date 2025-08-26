import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer 
} from 'recharts';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const Dashboard = () => {
  const { t } = useTranslation();
  const [kpis, setKpis] = useState(null);
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [kpiData, installationData] = await Promise.all([
          mockApi.getKPIs(),
          mockApi.listInstallations()
        ]);
        
        setKpis(kpiData);
        setInstallations(installationData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Dados para gráficos
  const leadTimeData = [
    { mes: 'Jan', leadTime: 115 },
    { mes: 'Fev', leadTime: 118 },
    { mes: 'Mar', leadTime: 122 },
    { mes: 'Abr', leadTime: 119 },
    { mes: 'Mai', leadTime: 116 },
    { mes: 'Jun', leadTime: 120 },
  ];

  const onTimeData = [
    { mes: 'Jan', onTime: 85, atrasado: 15 },
    { mes: 'Fev', onTime: 78, atrasado: 22 },
    { mes: 'Mar', onTime: 82, atrasado: 18 },
    { mes: 'Abr', onTime: 88, atrasado: 12 },
    { mes: 'Mai', onTime: 90, atrasado: 10 },
    { mes: 'Jun', onTime: 87, atrasado: 13 },
  ];

  const statusDistribution = installations.reduce((acc, inst) => {
    const existing = acc.find(item => item.name === inst.status);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: inst.status, value: 1 });
    }
    return acc;
  }, []);

  const COLORS = ['#003DA5', '#0066CC', '#3399FF', '#66B3FF', '#99CCFF'];

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
          {t('dashboard')}
        </h1>
        <p className="text-gray-600 mt-1">
          Visão geral das operações OTIS LATAM
        </p>
      </div>

      {/* KPIs */}
      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard
            title={t('totalInstalacoes')}
            value={kpis.totalInstallations}
            color="blue"
          />
          <KpiCard
            title={t('pontuacaoOnTime')}
            value={kpis.onTimeRate}
            unit="%"
            variation={5}
            trend="up"
            color="green"
          />
          <KpiCard
            title={t('variacaoCusto')}
            value={Math.abs(kpis.avgCostVariance)}
            unit="%"
            variation={kpis.avgCostVariance}
            trend={kpis.avgCostVariance <= 0 ? 'up' : 'down'}
            color={kpis.avgCostVariance <= 0 ? 'green' : 'red'}
          />
          <KpiCard
            title={t('notaMedia')}
            value={kpis.avgFeedbackScore}
            unit="/5"
            color="purple"
          />
        </div>
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Lead Time */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Lead Time Médio (dias)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={leadTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="leadTime" 
                stroke="#003DA5" 
                strokeWidth={2}
                dot={{ fill: '#003DA5' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* On-time Rate */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Entregas no Prazo vs Atrasadas (%)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={onTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" fill="#10B981" name="No Prazo" />
              <Bar dataKey="atrasado" fill="#EF4444" name="Atrasado" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status Distribution e Instalações Recentes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Distribuição por Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição por Status
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={statusDistribution}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {statusDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Instalações Recentes */}
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Instalações em Andamento
            </h3>
            <Link 
              to="/instalacao"
              className="text-otis-blue hover:text-otis-dark text-sm font-medium"
            >
              Ver todas →
            </Link>
          </div>
          
          <div className="space-y-3">
            {installations.slice(0, 5).map((installation) => (
              <div key={installation.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {installation.cliente}
                    </h4>
                    <StatusBadge status={installation.status} />
                  </div>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <span>{installation.id}</span>
                    <span className="mx-2">•</span>
                    <span>{installation.cidade}, {installation.pais}</span>
                  </div>
                </div>
                <Link
                  to={`/instalacao/${installation.id}`}
                  className="ml-4 text-otis-blue hover:text-otis-dark text-sm font-medium"
                >
                  Ver →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
