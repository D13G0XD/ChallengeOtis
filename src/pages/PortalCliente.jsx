import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useParams } from 'react-router-dom';
import { Star, ArrowLeft, Send } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import Timeline from '../components/Timeline';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const ClientPortalLayout = ({ children }) => {
  const { t } = useTranslation();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-otis-blue rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <h1 className="ml-3 text-xl font-semibold text-gray-900">
                OTIS - Portal do Cliente
              </h1>
            </div>
            <Link
              to="/"
              className="text-otis-blue hover:text-otis-dark text-sm font-medium"
            >
              Acesso Interno →
            </Link>
          </div>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

const ClientDashboard = () => {
  const [installations, setInstallations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstallations();
  }, []);

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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Acompanhe sua Instalação
        </h1>
        <p className="text-gray-600 mt-1">
          Veja o progresso da sua instalação OTIS em tempo real
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {installations.map((installation) => {
          const progress = Math.round((installation.etapas.length / 8) * 100);
          
          return (
            <div key={installation.id} className="card hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{installation.cliente}</h3>
                <StatusBadge status={installation.status} />
              </div>
              
              <div className="space-y-3">
                <div className="text-sm text-gray-600">
                  <strong>ID:</strong> {installation.id}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Localização:</strong> {installation.cidade}, {installation.pais}
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Prazo prometido:</strong> {formatDate(installation.prazoPrometido)}
                </div>
                
                <div>
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Progresso</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-otis-blue h-2 rounded-full" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex justify-between">
                <Link
                  to={`/cliente/instalacao/${installation.id}`}
                  className="text-otis-blue hover:text-otis-dark text-sm font-medium"
                >
                  Ver detalhes →
                </Link>
                <Link
                  to={`/cliente/feedback/${installation.id}`}
                  className="text-gray-600 hover:text-gray-800 text-sm font-medium"
                >
                  Avaliar
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const ClientInstallationDetail = () => {
  const { id } = useParams();
  const [installation, setInstallation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInstallation();
  }, [id]);

  const loadInstallation = async () => {
    try {
      const data = await mockApi.getInstallation(id);
      setInstallation(data);
    } catch (error) {
      console.error('Erro ao carregar instalação:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!installation) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-900">Instalação não encontrada</h2>
        <Link to="/cliente" className="text-otis-blue hover:text-otis-dark mt-2 inline-block">
          ← Voltar
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Link
          to="/cliente"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Timeline 
            etapas={installation.etapas} 
            prazoPrometido={installation.prazoPrometido} 
          />
        </div>
        
        <div className="space-y-6">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Informações do Projeto
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Status atual:</span>
                <StatusBadge status={installation.status} />
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Progresso:</span>
                <span className="font-medium">
                  {Math.round((installation.etapas.length / 8) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Prazo:</span>
                <span className="font-medium">
                  {new Date(installation.prazoPrometido).toLocaleDateString('pt-BR')}
                </span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Ações
            </h3>
            <div className="space-y-3">
              <Link
                to={`/cliente/feedback/${installation.id}`}
                className="block w-full btn-primary text-center"
              >
                Avaliar Serviço
              </Link>
              <button className="w-full btn-secondary">
                Contatar Equipe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientFeedback = () => {
  const { id } = useParams();
  const [installation, setInstallation] = useState(null);
  const [feedback, setFeedback] = useState({
    nota: 5,
    comentario: '',
    categoria: 'Atendimento'
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadInstallation();
  }, [id]);

  const loadInstallation = async () => {
    try {
      const data = await mockApi.getInstallation(id);
      setInstallation(data);
    } catch (error) {
      console.error('Erro ao carregar instalação:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await mockApi.saveFeedback({
        instalacaoId: id,
        cliente: installation.cliente,
        ...feedback
      });
      
      alert('Feedback enviado com sucesso! Obrigado pela avaliação.');
      setFeedback({ nota: 5, comentario: '', categoria: 'Atendimento' });
    } catch (error) {
      console.error('Erro ao enviar feedback:', error);
      alert('Erro ao enviar feedback. Tente novamente.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center">
        <Link
          to={`/cliente/instalacao/${id}`}
          className="flex items-center text-gray-500 hover:text-gray-700 mr-4"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Voltar
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Avaliar Serviço
          </h1>
          <p className="text-gray-600">
            {installation?.cliente} • {installation?.id}
          </p>
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Como você avalia nosso serviço?
            </label>
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, nota: star }))}
                  className={`text-2xl ${
                    star <= feedback.nota ? 'text-yellow-400' : 'text-gray-300'
                  } hover:text-yellow-400 transition-colors`}
                >
                  <Star className="h-8 w-8 fill-current" />
                </button>
              ))}
              <span className="ml-2 text-lg font-medium">
                {feedback.nota}/5
              </span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Categoria da avaliação
            </label>
            <select
              value={feedback.categoria}
              onChange={(e) => setFeedback(prev => ({ ...prev, categoria: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-otis-blue focus:border-transparent"
            >
              <option value="Atendimento">Atendimento</option>
              <option value="Qualidade">Qualidade</option>
              <option value="Prazo">Prazo</option>
              <option value="Comunicação">Comunicação</option>
              <option value="Geral">Geral</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentários (opcional)
            </label>
            <textarea
              value={feedback.comentario}
              onChange={(e) => setFeedback(prev => ({ ...prev, comentario: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-otis-blue focus:border-transparent"
              placeholder="Conte-nos sobre sua experiência..."
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary flex items-center disabled:opacity-50"
            >
              {submitting ? (
                'Enviando...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Enviar Avaliação
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const PortalCliente = () => {
  return (
    <ClientPortalLayout>
      <Routes>
        <Route index element={<ClientDashboard />} />
        <Route path="instalacao/:id" element={<ClientInstallationDetail />} />
        <Route path="feedback/:id" element={<ClientFeedback />} />
      </Routes>
    </ClientPortalLayout>
  );
};

export default PortalCliente;
