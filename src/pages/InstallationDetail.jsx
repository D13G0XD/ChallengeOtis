import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Camera, Plus, Check, Clock } from 'lucide-react';
import Timeline from '../components/Timeline';
import StatusBadge from '../components/StatusBadge';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const InstallationDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [installation, setInstallation] = useState(null);
  const [fieldActivities, setFieldActivities] = useState([]);
  const [factoryStatus, setFactoryStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [newActivity, setNewActivity] = useState({
    tipo: '',
    responsavel: '',
    observacoes: ''
  });

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
    try {
      const [installationData, activitiesData, factoryData] = await Promise.all([
        mockApi.getInstallation(id),
        mockApi.getFieldActivities(id),
        mockApi.getFactoryStatus(id)
      ]);
      
      setInstallation(installationData);
      setFieldActivities(activitiesData);
      setFactoryStatus(factoryData);
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveActivity = async () => {
    if (!newActivity.tipo || !newActivity.responsavel) {
      alert('Preencha os campos obrigatórios');
      return;
    }

    try {
      await mockApi.saveFieldActivity(id, {
        ...newActivity,
        status: 'Em Andamento'
      });
      
      setNewActivity({ tipo: '', responsavel: '', observacoes: '' });
      setShowActivityForm(false);
      
      // Recarregar atividades
      const updatedActivities = await mockApi.getFieldActivities(id);
      setFieldActivities(updatedActivities);
      
      alert('Atividade salva com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar atividade:', error);
      alert('Erro ao salvar atividade');
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">{t('loading')}</div>
      </div>
    );
  }

  if (!installation) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900">Instalação não encontrada</h2>
        <Link to="/instalacao" className="text-otis-blue hover:text-otis-dark mt-2 inline-block">
          ← Voltar para lista
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Cabeçalho */}
      <div className="flex items-center justify-between">
        <div className="flex mt-16 items-center">
          <Link
            to="/instalacao"
            className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Voltar
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {installation.cliente}
            </h1>
            <p className="text-gray-600">
              {installation.id} • {installation.cidade}, {installation.pais}
            </p>
          </div>
        </div>
        <StatusBadge status={installation.status} size="lg" />
      </div>

      {/* Informações Gerais */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Timeline 
            etapas={installation.etapas} 
            prazoPrometido={installation.prazoPrometido} 
          />
        </div>
        
        <div className="space-y-6">
          {/* Resumo Financeiro */}
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Resumo Financeiro
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Planejado:</span>
                <span className="font-medium">{formatCurrency(installation.custoPlanejado)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Real:</span>
                <span className="font-medium">{formatCurrency(installation.custoReal)}</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Variação:</span>
                  <span className={`font-medium ${
                    installation.custoReal > installation.custoPlanejado 
                      ? 'text-red-600' 
                      : 'text-green-600'
                  }`}>
                    {formatCurrency(installation.custoReal - installation.custoPlanejado)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Status da Fábrica */}
          {factoryStatus && (
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Status da Fábrica
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Progresso:</span>
                  <span className="font-medium">{factoryStatus.progressoFabricacao}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-otis-blue h-2 rounded-full" 
                    style={{ width: `${factoryStatus.progressoFabricacao}%` }}
                  ></div>
                </div>
                <div className="text-sm text-gray-600">
                  <div>Início: {formatDate(factoryStatus.dataInicioFabricacao)}</div>
                  <div>Envio previsto: {formatDate(factoryStatus.dataEstimadaEnvio)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Atividades de Campo */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Atividades de Campo
          </h3>
          <button
            onClick={() => setShowActivityForm(!showActivityForm)}
            className="btn-primary flex items-center"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Atividade
          </button>
        </div>

        {/* Formulário de Nova Atividade */}
        {showActivityForm && (
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-gray-900 mb-4">Nova Atividade</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Atividade *
                </label>
                <select
                  value={newActivity.tipo}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, tipo: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-otis-blue focus:border-transparent"
                >
                  <option value="">Selecione...</option>
                  <option value="Instalação de Guias">Instalação de Guias</option>
                  <option value="Montagem da Cabina">Montagem da Cabina</option>
                  <option value="Instalação do Motor">Instalação do Motor</option>
                  <option value="Testes de Funcionamento">Testes de Funcionamento</option>
                  <option value="Ajustes Finais">Ajustes Finais</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Responsável *
                </label>
                <input
                  type="text"
                  value={newActivity.responsavel}
                  onChange={(e) => setNewActivity(prev => ({ ...prev, responsavel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-otis-blue focus:border-transparent"
                  placeholder="Nome do responsável"
                />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Observações
              </label>
              <textarea
                value={newActivity.observacoes}
                onChange={(e) => setNewActivity(prev => ({ ...prev, observacoes: e.target.value }))}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-otis-blue focus:border-transparent"
                placeholder="Descreva os detalhes da atividade..."
              />
            </div>
            <div className="flex justify-end mt-4 space-x-3">
              <button
                onClick={() => setShowActivityForm(false)}
                className="btn-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveActivity}
                className="btn-primary"
              >
                Salvar Atividade
              </button>
            </div>
          </div>
        )}

        {/* Lista de Atividades */}
        <div className="space-y-6">
          {fieldActivities.map((dayActivity) => (
            <div key={dayActivity.data} className="border-l-4 border-otis-blue pl-4">
              <h4 className="font-medium text-gray-900 mb-3">
                {formatDate(dayActivity.data)}
              </h4>
              
              <div className="space-y-4">
                {dayActivity.atividades.map((activity) => (
                  <div key={activity.id} className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{activity.tipo}</h5>
                      <div className="flex items-center">
                        {activity.status === 'Concluído' ? (
                          <Check className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <Clock className="h-4 w-4 text-blue-500 mr-1" />
                        )}
                        <span className={`text-sm ${
                          activity.status === 'Concluído' ? 'text-green-600' : 'text-blue-600'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="text-sm text-gray-600 mb-2">
                      <strong>Responsável:</strong> {activity.responsavel}
                    </div>
                    
                    {activity.horaInicio && (
                      <div className="text-sm text-gray-600 mb-2">
                        <strong>Horário:</strong> {activity.horaInicio}
                        {activity.horaFim && ` - ${activity.horaFim}`}
                      </div>
                    )}
                    
                    {activity.observacoes && (
                      <div className="text-sm text-gray-700 mb-3">
                        <strong>Observações:</strong> {activity.observacoes}
                      </div>
                    )}
                    
                    {activity.fotos && activity.fotos.length > 0 && (
                      <div className="flex items-center text-sm text-gray-600">
                        <Camera className="h-4 w-4 mr-1" />
                        <span>{activity.fotos.length} foto(s) anexada(s)</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Checklist do dia */}
              {dayActivity.checklist && dayActivity.checklist.length > 0 && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h6 className="font-medium text-gray-900 mb-2">Checklist do Dia</h6>
                  <div className="space-y-2">
                    {dayActivity.checklist.map((item, index) => (
                      <div key={index} className="flex items-center">
                        <div className={`w-4 h-4 rounded border-2 mr-2 flex items-center justify-center ${
                          item.concluido 
                            ? 'bg-green-500 border-green-500' 
                            : 'border-gray-300'
                        }`}>
                          {item.concluido && <Check className="h-3 w-3 text-white" />}
                        </div>
                        <span className={`text-sm ${
                          item.concluido ? 'text-gray-600 line-through' : 'text-gray-900'
                        }`}>
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {fieldActivities.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Nenhuma atividade de campo registrada ainda.
          </div>
        )}
      </div>
    </div>
  );
};

export default InstallationDetail;
