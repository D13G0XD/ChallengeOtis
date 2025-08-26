import React, { useState, useEffect } from 'react';
import { DollarSign, Calendar, TrendingUp, User } from 'lucide-react';
import KpiCard from '../components/KpiCard';
import StatusBadge from '../components/StatusBadge';
import { mockApi } from '../services/mockApi';
import { useTranslation } from '../config/i18n';

const Vendas = () => {
  const { t } = useTranslation();
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSales();
  }, []);

  const loadSales = async () => {
    try {
      const data = await mockApi.getSales();
      setSales(data);
    } catch (error) {
      console.error('Erro ao carregar vendas:', error);
    } finally {
      setLoading(false);
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
          {t('vendas')}
        </h1>
        <p className="text-gray-600 mt-8">
          Contratos e prazos prometidos
        </p>
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
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sales.map((sale) => (
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
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      sale.status === 'Ativo' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {sale.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendas;
