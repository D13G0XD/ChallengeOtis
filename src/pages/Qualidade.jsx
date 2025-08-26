import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
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
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const Qualidade = () => {
  const { t } = useTranslation();
  const [installations, setInstallations] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [installationData, feedbackData] = await Promise.all([
        mockApi.listInstallations(),
        mockApi.getFeedback()
      ]);
      
      setInstallations(installationData);
      setFeedback(feedbackData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateQualityKPIs = () => {
    const totalIncidents = installations.reduce((sum, inst) => sum + inst.incidentes.length, 0);
    const totalRework = installations.reduce((sum, inst) => sum + inst.retrabalho, 0);
    const avgFeedback = feedback.length > 0 
      ? feedback.reduce((sum, fb) => sum + fb.nota, 0) / feedback.length 
      : 0;
    const qualityRate = installations.filter(inst => inst.incidentes.length === 0).length / installations.length * 100;

    return {
      totalIncidents,
      totalRework,
      avgFeedback: Math.round(avgFeedback * 10) / 10,
      qualityRate: Math.round(qualityRate)
    };
  };

  // Dados para gráficos
  const incidentsByType = installations.reduce((acc, inst) => {
    inst.incidentes.forEach(incident => {
      const existing = acc.find(item => item.name === incident.tipo);
      if (existing) {
        existing.value++;
      } else {
        acc.push({ name: incident.tipo, value: 1 });
      }
    });
    return acc;
  }, []);

  const feedbackTrend = [
    { mes: 'Jan', nota: 4.2 },
    { mes: 'Fev', nota: 4.1 },
    { mes: 'Mar', nota: 4.3 },
    { mes: 'Abr', nota: 4.4 },
    { mes: 'Mai', nota: 4.5 },
    { mes: 'Jun', nota: 4.3 },
  ];

  const qualityMetrics = [
    { metrica: 'Sem Incidentes', valor: 75 },
    { metrica: 'Incidentes Baixos', valor: 20 },
    { metrica: 'Incidentes Médios', valor: 4 },
    { metrica: 'Incidentes Altos', valor: 1 },
  ];

  const COLORS = ['#10B981', '#F59E0B', '#EF4444', '#DC2626'];

  const kpis = calculateQualityKPIs();

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
          {t('qualidade')}
        </h1>
        <p className="text-gray-600 mt-8">
          Indicadores de qualidade e satisfação
        </p>
      </div>

      {/* KPIs de Qualidade */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Taxa de Qualidade"
          value={kpis.qualityRate}
          unit="%"
          variation={3}
          trend="up"
          color="green"
        />
        <KpiCard
          title="Total de Incidentes"
          value={kpis.totalIncidents}
          color="red"
        />
        <KpiCard
          title="Retrabalhos"
          value={kpis.totalRework}
          color="yellow"
        />
        <KpiCard
          title="Nota Média"
          value={kpis.avgFeedback}
          unit="/5"
          color="purple"
        />
      </div>

      {/* Gráficos de Qualidade */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Evolução da Satisfação */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Evolução da Satisfação
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={feedbackTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis domain={[0, 5]} />
              <Tooltip formatter={(value) => [`${value}/5`, 'Nota Média']} />
              <Line 
                type="monotone" 
                dataKey="nota" 
                stroke="#7C3AED" 
                strokeWidth={3}
                dot={{ fill: '#7C3AED', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Distribuição de Qualidade */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Distribuição de Qualidade
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={qualityMetrics}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metrica" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
              <Bar dataKey="valor" fill="#003DA5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Incidentes e Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tipos de Incidentes */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Incidentes por Tipo
          </h3>
          {incidentsByType.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={incidentsByType}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {incidentsByType.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <div className="text-green-600 text-lg font-medium mb-2">🎉 Excelente!</div>
              <div>Nenhum incidente registrado</div>
            </div>
          )}
        </div>

        {/* Lista de Incidentes */}
        <div className="lg:col-span-2 card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Incidentes Recentes
          </h3>
          
          <div className="space-y-3">
            {installations
              .filter(inst => inst.incidentes.length > 0)
              .map(installation => 
                installation.incidentes.map((incident, index) => (
                  <div key={`${installation.id}-${index}`} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">
                        {installation.cliente}
                      </h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        incident.sev === 'Alta' ? 'bg-red-100 text-red-800' :
                        incident.sev === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {incident.sev}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">
                      <strong>Tipo:</strong> {incident.tipo}
                    </div>
                    <div className="text-sm text-gray-600">
                      <strong>Descrição:</strong> {incident.descricao}
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Instalação: {installation.id}
                    </div>
                  </div>
                ))
              )}
          </div>

          {installations.every(inst => inst.incidentes.length === 0) && (
            <div className="text-center py-8 text-gray-500">
              <div className="text-green-600 text-lg font-medium mb-2">✅ Perfeito!</div>
              <div>Nenhum incidente registrado nas instalações</div>
            </div>
          )}
        </div>
      </div>

      {/* Feedback dos Clientes */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Feedback dos Clientes
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {feedback.map(fb => (
            <div key={fb.id} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">
                  {fb.cliente}
                </h4>
                <div className="flex items-center">
                  <span className="text-yellow-400 mr-1">★</span>
                  <span className="font-medium">{fb.nota}/5</span>
                </div>
              </div>
              
              <div className="text-sm text-gray-600 mb-2">
                <strong>Categoria:</strong> {fb.categoria}
              </div>
              
              <div className="text-sm text-gray-700 mb-3">
                "{fb.comentario}"
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{fb.instalacaoId}</span>
                <span>{new Date(fb.data).toLocaleDateString('pt-BR')}</span>
              </div>
            </div>
          ))}
        </div>

        {feedback.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhum feedback recebido ainda
          </div>
        )}
      </div>
    </div>
  );
};

export default Qualidade;
