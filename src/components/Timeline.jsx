import React from 'react';
import { Check, Clock, AlertCircle } from 'lucide-react';

const Timeline = ({ etapas, prazoPrometido }) => {
  const allSteps = [
    'Vendido',
    'Engenharia', 
    'Fabricação',
    'Em Transporte',
    'Instalação',
    'Comissionamento',
    'Handover',
    'Pós-venda'
  ];

  const getStepStatus = (stepName) => {
    const step = etapas.find(e => e.nome === stepName);
    if (step) return 'completed';
    
    // Se não tem a etapa, verificar se é a próxima baseada na última completada
    const lastCompletedIndex = Math.max(...etapas.map(e => allSteps.indexOf(e.nome)));
    const currentStepIndex = allSteps.indexOf(stepName);
    
    if (currentStepIndex === lastCompletedIndex + 1) return 'current';
    return 'pending';
  };

  const getStepIcon = (status) => {
    switch (status) {
      case 'completed':
        return <Check className="h-4 w-4 text-white" />;
      case 'current':
        return <Clock className="h-4 w-4 text-white" />;
      default:
        return <div className="h-2 w-2 bg-white rounded-full" />;
    }
  };

  const getStepClasses = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500 border-green-500';
      case 'current':
        return 'bg-blue-500 border-blue-500';
      default:
        return 'bg-gray-300 border-gray-300';
    }
  };

  const getConnectorClasses = (index) => {
    const currentStep = allSteps[index];
    const nextStep = allSteps[index + 1];
    
    if (!nextStep) return '';
    
    const currentStatus = getStepStatus(currentStep);
    return currentStatus === 'completed' ? 'bg-green-500' : 'bg-gray-300';
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isDelayed = () => {
    const today = new Date();
    const promised = new Date(prazoPrometido);
    const lastStep = etapas[etapas.length - 1];
    
    return today > promised && lastStep?.nome !== 'Handover';
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Timeline do Projeto
        </h3>
        {isDelayed() && (
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span className="text-sm font-medium">Em atraso</span>
          </div>
        )}
      </div>

      <div className="relative">
        {allSteps.map((step, index) => {
          const status = getStepStatus(step);
          const stepData = etapas.find(e => e.nome === step);
          
          return (
            <div key={step} className="relative">
              <div className="flex items-center">
                {/* Ícone da etapa */}
                <div className={`
                  relative z-10 flex items-center justify-center w-8 h-8 
                  rounded-full border-2 ${getStepClasses(status)}
                `}>
                  {getStepIcon(status)}
                </div>
                
                {/* Conteúdo da etapa */}
                <div className="ml-4 flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className={`text-sm font-medium ${
                      status === 'completed' ? 'text-gray-900' : 
                      status === 'current' ? 'text-blue-600' : 'text-gray-500'
                    }`}>
                      {step}
                    </h4>
                    {stepData && (
                      <span className="text-xs text-gray-500">
                        {formatDate(stepData.data)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Conector para próxima etapa */}
              {index < allSteps.length - 1 && (
                <div className={`
                  absolute left-4 top-8 w-0.5 h-8 transform -translate-x-0.5
                  ${getConnectorClasses(index)}
                `} />
              )}
            </div>
          );
        })}
      </div>

      {/* Prazo prometido */}
      <div className="mt-6 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Prazo prometido:</span>
          <span className={`font-medium ${
            isDelayed() ? 'text-red-600' : 'text-gray-900'
          }`}>
            {formatDate(prazoPrometido)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Timeline;
