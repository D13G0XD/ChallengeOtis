import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, TrendingUp, User, Plus, Edit2, Trash2, Search, Filter } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import SaleFormModal from '../components/SaleFormModal';
import ConfirmDialog from '../components/ConfirmDialog';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const Vendas = () => {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [filteredSales, setFilteredSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editingSale, setEditingSale] = useState(null);
  const [deletingSale, setDeletingSale] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadSales();
  }, []);

  useEffect(() => {
    filterSales();
  }, [sales, searchTerm, statusFilter]);

  const loadSales = async () => {
    try {
      setLoading(true);
      const data = await mockApi.getSales();
      setSales(data);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterSales = () => {
    let filtered = [...sales];

    if (searchTerm) {
      filtered = filtered.filter(sale => 
        sale.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.contratoId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.vendedor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter) {
      filtered = filtered.filter(sale => sale.status === statusFilter);
    }

    setFilteredSales(filtered);
  };

  const handleCreateSale = async (saleData) => {
    try {
      setActionLoading(true);
      const newSale = await mockApi.createSale(saleData);
      setSales(prev => [...prev, newSale]);
      setIsModalOpen(false);
      setEditingSale(null);
    } catch (error) {
      console.error('Erro ao criar contrato:', error);
      alert('Erro ao criar contrato. Tente novamente.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateSale = async (saleData) => {
    try {
      setActionLoading(true);
      const updatedSale = await mockApi.updateSale(editingSale.id, saleData);
      setSales(prev => prev.map(sale => 
        sale.id === editingSale.id ? updatedSale : sale
      ));
      setIsModalOpen(false);
      setEditingSale(null);
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      alert('Erro ao atualizar contrato. Tente novamente.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteSale = async () => {
    try {
      setActionLoading(true);
      await mockApi.deleteSale(deletingSale.id);
      setSales(prev => prev.filter(sale => sale.id !== deletingSale.id));
      setIsConfirmOpen(false);
      setDeletingSale(null);
    } catch (error) {
      console.error('Erro ao deletar contrato:', error);
      alert('Erro ao deletar contrato. Tente novamente.');
    } finally {
      setActionLoading(false);
    }
  };

  const openEditModal = (sale) => {
    setEditingSale(sale);
    setIsModalOpen(true);
  };

  const openDeleteConfirm = (sale) => {
    setDeletingSale(sale);
    setIsConfirmOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingSale(null);
  };

  const closeConfirm = () => {
    setIsConfirmOpen(false);
    setDeletingSale(null);
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

  const calculateKPIs = () => {
    const totalValue = sales.reduce((sum, sale) => sum + sale.valor, 0);
    const avgValue = sales.length > 0 ? totalValue / sales.length : 0;
    const activeSales = sales.filter(sale => sale.status === 'Ativo').length;
    
    return {
      totalSales: sales.length,
      totalValue,
      avgValue,
      activeSales
    };
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Ativo':
        return 'bg-green-100 text-green-800';
      case 'Concluído':
        return 'bg-blue-100 text-blue-800';
      case 'Cancelado':
        return 'bg-red-100 text-red-800';
      case 'Em Negociação':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const uniqueStatuses = [...new Set(sales.map(sale => sale.status))];

  const kpis = calculateKPIs();

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
      <div className="flex justify-between items-center mt-16">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {t('vendas')}
          </h1>
          <p className="text-gray-600 mt-2">
            Contratos e prazos prometidos
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-60 0 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>Novo Contrato</span>
        </button>
      </div>

      {/* Filtros e Busca */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Buscar por cliente, contrato ou vendedor..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border bg-white border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="sm:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none bg-white"
              >
                <option value="">Todos os Status</option>
                {uniqueStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* KPIs de Vendas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard
          title="Total de Contratos"
          value={kpis.totalSales}
          color="blue"
        />
        <KpiCard
          title="Valor Total"
          value={formatCurrency(kpis.totalValue)}
          color="green"
        />
        <KpiCard
          title="Valor Médio"
          value={formatCurrency(kpis.avgValue)}
          color="purple"
        />
        <KpiCard
          title="Contratos Ativos"
          value={kpis.activeSales}
          color="yellow"
        />
      </div>

      {/* Tabela de Contratos */}
      <div className="card overflow-hidden">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Contratos de Venda
          </h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contrato
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tipo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Valor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Data Venda
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prazo Prometido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ações
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSales.map((sale) => (
                <tr key={sale.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {sale.contratoId}
                    </div>
                    <div className="text-sm text-gray-500">
                      {sale.andares} andares / {sale.paradas} paradas
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {sale.cliente}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-gray-400 mr-1" />
                      <div className="text-sm text-gray-900">
                        {sale.vendedor}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {sale.tipo}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <DollarSign className="h-4 w-4 text-green-500 mr-1" />
                      <div className="text-sm font-medium text-gray-900">
                        {formatCurrency(sale.valor)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-gray-400 mr-1" />
                      <div className="text-sm text-gray-900">
                        {formatDate(sale.dataVenda)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 text-blue-500 mr-1" />
                      <div className="text-sm text-gray-900">
                        {formatDate(sale.prazoPrometido)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(sale.status)}`}>
                      {sale.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        onClick={() => openEditModal(sale)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                        title="Editar contrato"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => openDeleteConfirm(sale)}
                        className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                        title="Excluir contrato"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredSales.length === 0 && !loading && (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm || statusFilter 
                  ? 'Nenhum contrato encontrado com os filtros aplicados.' 
                  : 'Nenhum contrato cadastrado ainda.'
                }
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modais */}
      <SaleFormModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSave={editingSale ? handleUpdateSale : handleCreateSale}
        sale={editingSale}
        loading={actionLoading}
      />

      <ConfirmDialog
        isOpen={isConfirmOpen}
        onClose={closeConfirm}
        onConfirm={handleDeleteSale}
        title="Excluir Contrato"
        message={`Tem certeza que deseja excluir o contrato ${deletingSale?.contratoId}? Esta ação não pode ser desfeita.`}
        confirmText="Excluir"
        cancelText="Cancelar"
        type="danger"
      />
    </div>
  );
};

export default Vendas;
