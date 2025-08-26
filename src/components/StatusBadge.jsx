import React from 'react';

const StatusBadge = ({ status, size = 'sm' }) => {
  const getStatusClasses = (status) => {
    const statusMap = {
      'Vendido': 'status-vendido',
      'Engenharia': 'status-engenharia', 
      'Fabricação': 'status-fabricacao',
      'Em Transporte': 'status-transporte',
      'Instalação': 'status-instalacao',
      'Comissionamento': 'status-comissionamento',
      'Handover': 'status-handover',
      'Pós-venda': 'status-pos-venda'
    };
    
    return statusMap[status] || 'badge bg-gray-100 text-gray-800';
  };

  const getSizeClasses = (size) => {
    return size === 'lg' ? 'px-3 py-1 text-sm' : 'px-2.5 py-0.5 text-xs';
  };

  return (
    <span className={`${getStatusClasses(status)} ${getSizeClasses(size)}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
