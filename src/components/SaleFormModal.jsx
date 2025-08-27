import React, { useState, useEffect } from 'react';
import { X, Save, Loader2 } from 'lucide-react';

const SaleFormModal = ({ isOpen, onClose, onSave, sale = null, loading = false }) => {
  const [formData, setFormData] = useState({
    cliente: '',
    vendedor: '',
    dataVenda: '',
    valor: '',
    prazoPrometido: '',
    tipo: 'Elevador Residencial',
    andares: '',
    paradas: '',
    status: 'Ativo'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (sale) {
      setFormData({
        cliente: sale.cliente || '',
        vendedor: sale.vendedor || '',
        dataVenda: sale.dataVenda || '',
        valor: sale.valor || '',
        prazoPrometido: sale.prazoPrometido || '',
        tipo: sale.tipo || 'Elevador Residencial',
        andares: sale.andares || '',
        paradas: sale.paradas || '',
        status: sale.status || 'Ativo'
      });
    } else {
      setFormData({
        cliente: '',
        vendedor: '',
        dataVenda: '',
        valor: '',
        prazoPrometido: '',
        tipo: 'Elevador Residencial',
        andares: '',
        paradas: '',
        status: 'Ativo'
      });
    }
    setErrors({});
  }, [sale, isOpen]);

  const tiposElevador = [
    'Elevador Residencial',
    'Elevador Comercial',
    'Elevador Hospitalar',
    'Elevador Industrial',
    'Monta-cargas'
  ];

  const statusOptions = [
    'Ativo',
    'Concluído',
    'Cancelado',
    'Em Negociação'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.cliente.trim()) {
      newErrors.cliente = 'Cliente é obrigatório';
    }

    if (!formData.vendedor.trim()) {
      newErrors.vendedor = 'Vendedor é obrigatório';
    }

    if (!formData.dataVenda) {
      newErrors.dataVenda = 'Data de venda é obrigatória';
    }

    if (!formData.valor || formData.valor <= 0) {
      newErrors.valor = 'Valor deve ser maior que zero';
    }

    if (!formData.prazoPrometido) {
      newErrors.prazoPrometido = 'Prazo prometido é obrigatório';
    }

    if (!formData.andares || formData.andares <= 0) {
      newErrors.andares = 'Número de andares deve ser maior que zero';
    }

    if (!formData.paradas || formData.paradas <= 0) {
      newErrors.paradas = 'Número de paradas deve ser maior que zero';
    }

    // Validar se prazo prometido é posterior à data de venda
    if (formData.dataVenda && formData.prazoPrometido) {
      const dataVenda = new Date(formData.dataVenda);
      const prazoPrometido = new Date(formData.prazoPrometido);
      
      if (prazoPrometido <= dataVenda) {
        newErrors.prazoPrometido = 'Prazo prometido deve ser posterior à data de venda';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpar erro do campo quando o usuário começar a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const dataToSave = {
      ...formData,
      valor: parseFloat(formData.valor),
      andares: parseInt(formData.andares),
      paradas: parseInt(formData.paradas)
    };

    onSave(dataToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">
            {sale ? 'Editar Contrato' : 'Novo Contrato de Venda'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cliente */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Cliente *
              </label>
              <input
                type="text"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.cliente ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Nome do cliente"
              />
              {errors.cliente && (
                <p className="mt-1 text-sm text-red-600">{errors.cliente}</p>
              )}
            </div>

            {/* Vendedor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vendedor *
              </label>
              <input
                type="text"
                name="vendedor"
                value={formData.vendedor}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.vendedor ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Nome do vendedor"
              />
              {errors.vendedor && (
                <p className="mt-1 text-sm text-red-600">{errors.vendedor}</p>
              )}
            </div>

            {/* Tipo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Elevador
              </label>
              <select
                name="tipo"
                value={formData.tipo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {tiposElevador.map(tipo => (
                  <option key={tipo} value={tipo}>{tipo}</option>
                ))}
              </select>
            </div>

            {/* Data de Venda */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data de Venda *
              </label>
              <input
                type="date"
                name="dataVenda"
                value={formData.dataVenda}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.dataVenda ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.dataVenda && (
                <p className="mt-1 text-sm text-red-600">{errors.dataVenda}</p>
              )}
            </div>

            {/* Prazo Prometido */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Prazo Prometido *
              </label>
              <input
                type="date"
                name="prazoPrometido"
                value={formData.prazoPrometido}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.prazoPrometido ? 'border-red-300' : 'border-gray-300'
                }`}
              />
              {errors.prazoPrometido && (
                <p className="mt-1 text-sm text-red-600">{errors.prazoPrometido}</p>
              )}
            </div>

            {/* Valor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Valor (USD) *
              </label>
              <input
                type="number"
                name="valor"
                value={formData.valor}
                onChange={handleChange}
                min="0"
                step="0.01"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.valor ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
              {errors.valor && (
                <p className="mt-1 text-sm text-red-600">{errors.valor}</p>
              )}
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {statusOptions.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Andares */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Andares *
              </label>
              <input
                type="number"
                name="andares"
                value={formData.andares}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.andares ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.andares && (
                <p className="mt-1 text-sm text-red-600">{errors.andares}</p>
              )}
            </div>

            {/* Paradas */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de Paradas *
              </label>
              <input
                type="number"
                name="paradas"
                value={formData.paradas}
                onChange={handleChange}
                min="1"
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.paradas ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="0"
              />
              {errors.paradas && (
                <p className="mt-1 text-sm text-red-600">{errors.paradas}</p>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 transition-colors"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              <Save className="h-4 w-4" />
              <span>{sale ? 'Atualizar' : 'Salvar'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SaleFormModal;
