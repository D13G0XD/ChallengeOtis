import installationsData from '../mocks/installations.json';
import fieldActivitiesData from '../mocks/fieldActivities.json';
import factoryStatusData from '../mocks/factoryStatus.json';
import salesData from '../mocks/sales.json';
import feedbackData from '../mocks/feedback.json';

// Simular latência de rede
const delay = (ms = 300) => new Promise(resolve => setTimeout(resolve, ms));

// Chaves para localStorage
const STORAGE_KEYS = {
  installations: 'otis_installations',
  fieldActivities: 'otis_field_activities',
  factoryStatus: 'otis_factory_status',
  sales: 'otis_sales',
  feedback: 'otis_feedback'
};

// Inicializar dados no localStorage se não existirem
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.installations)) {
    localStorage.setItem(STORAGE_KEYS.installations, JSON.stringify(installationsData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.fieldActivities)) {
    localStorage.setItem(STORAGE_KEYS.fieldActivities, JSON.stringify(fieldActivitiesData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.factoryStatus)) {
    localStorage.setItem(STORAGE_KEYS.factoryStatus, JSON.stringify(factoryStatusData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.sales)) {
    localStorage.setItem(STORAGE_KEYS.sales, JSON.stringify(salesData));
  }
  if (!localStorage.getItem(STORAGE_KEYS.feedback)) {
    localStorage.setItem(STORAGE_KEYS.feedback, JSON.stringify(feedbackData));
  }
};

// Obter dados do localStorage
const getStorageData = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

// Salvar dados no localStorage
const setStorageData = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

export const mockApi = {
  // Instalações
  async listInstallations(filters = {}) {
    await delay();
    initializeStorage();
    
    let installations = getStorageData(STORAGE_KEYS.installations);
    
    // Aplicar filtros
    if (filters.pais) {
      installations = installations.filter(i => i.pais === filters.pais);
    }
    if (filters.status) {
      installations = installations.filter(i => i.status === filters.status);
    }
    if (filters.busca) {
      const search = filters.busca.toLowerCase();
      installations = installations.filter(i => 
        i.cliente.toLowerCase().includes(search) || 
        i.id.toLowerCase().includes(search)
      );
    }
    
    return installations;
  },

  async getInstallation(id) {
    await delay();
    initializeStorage();
    
    const installations = getStorageData(STORAGE_KEYS.installations);
    return installations.find(i => i.id === id);
  },

  async updateInstallation(id, updates) {
    await delay();
    
    const installations = getStorageData(STORAGE_KEYS.installations);
    const index = installations.findIndex(i => i.id === id);
    
    if (index !== -1) {
      installations[index] = { ...installations[index], ...updates };
      setStorageData(STORAGE_KEYS.installations, installations);
      return installations[index];
    }
    
    throw new Error('Instalação não encontrada');
  },

  // Atividades de Campo
  async getFieldActivities(instalacaoId) {
    await delay();
    initializeStorage();
    
    const activities = getStorageData(STORAGE_KEYS.fieldActivities);
    return activities.filter(a => a.instalacaoId === instalacaoId);
  },

  async saveFieldActivity(instalacaoId, activityData) {
    await delay();
    
    const activities = getStorageData(STORAGE_KEYS.fieldActivities);
    const today = new Date().toISOString().split('T')[0];
    
    // Procurar atividade existente para hoje
    let todayActivity = activities.find(a => 
      a.instalacaoId === instalacaoId && a.data === today
    );
    
    if (!todayActivity) {
      // Criar nova atividade para hoje
      todayActivity = {
        instalacaoId,
        data: today,
        atividades: [],
        checklist: []
      };
      activities.push(todayActivity);
    }
    
    // Adicionar nova atividade
    const newActivity = {
      id: `act-${Date.now()}`,
      ...activityData,
      horaInicio: new Date().toLocaleTimeString('pt-BR', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
    
    todayActivity.atividades.push(newActivity);
    
    setStorageData(STORAGE_KEYS.fieldActivities, activities);
    return newActivity;
  },

  // Status da Fábrica
  async getFactoryStatus(instalacaoId = null) {
    await delay();
    initializeStorage();
    
    const factoryStatus = getStorageData(STORAGE_KEYS.factoryStatus);
    
    if (instalacaoId) {
      return factoryStatus.find(f => f.instalacaoId === instalacaoId);
    }
    
    return factoryStatus;
  },

  // Vendas
  async getSales(filters = {}) {
    await delay();
    initializeStorage();
    
    let sales = getStorageData(STORAGE_KEYS.sales);
    
    if (filters.status) {
      sales = sales.filter(s => s.status === filters.status);
    }
    
    return sales;
  },

  async getSaleById(id) {
    await delay();
    initializeStorage();
    
    const sales = getStorageData(STORAGE_KEYS.sales);
    return sales.find(s => s.id === id);
  },

  async createSale(saleData) {
    await delay();
    initializeStorage();
    
    const sales = getStorageData(STORAGE_KEYS.sales);
    
    // Gerar novo ID e contratoId
    const newId = `SALE-${String(sales.length + 1).padStart(3, '0')}`;
    const newContratoId = `LATAM-${String(sales.length + 1).padStart(4, '0')}`;
    
    const newSale = {
      id: newId,
      contratoId: newContratoId,
      ...saleData,
      status: saleData.status || 'Ativo'
    };
    
    sales.push(newSale);
    setStorageData(STORAGE_KEYS.sales, sales);
    
    return newSale;
  },

  async updateSale(id, saleData) {
    await delay();
    initializeStorage();
    
    const sales = getStorageData(STORAGE_KEYS.sales);
    const index = sales.findIndex(s => s.id === id);
    
    if (index === -1) {
      throw new Error('Contrato não encontrado');
    }
    
    sales[index] = { ...sales[index], ...saleData };
    setStorageData(STORAGE_KEYS.sales, sales);
    
    return sales[index];
  },

  async deleteSale(id) {
    await delay();
    initializeStorage();
    
    const sales = getStorageData(STORAGE_KEYS.sales);
    const index = sales.findIndex(s => s.id === id);
    
    if (index === -1) {
      throw new Error('Contrato não encontrado');
    }
    
    const deletedSale = sales.splice(index, 1)[0];
    setStorageData(STORAGE_KEYS.sales, sales);
    
    return deletedSale;
  },

  // Feedback
  async getFeedback(instalacaoId = null) {
    await delay();
    initializeStorage();
    
    const feedback = getStorageData(STORAGE_KEYS.feedback);
    
    if (instalacaoId) {
      return feedback.filter(f => f.instalacaoId === instalacaoId);
    }
    
    return feedback;
  },

  async saveFeedback(feedbackData) {
    await delay();
    
    const feedback = getStorageData(STORAGE_KEYS.feedback);
    const newFeedback = {
      id: `FB-${Date.now()}`,
      ...feedbackData,
      data: new Date().toISOString().split('T')[0],
      respondido: false
    };
    
    feedback.push(newFeedback);
    setStorageData(STORAGE_KEYS.feedback, feedback);
    
    return newFeedback;
  },

  // KPIs e Analytics
  async getKPIs() {
    await delay();
    initializeStorage();
    
    const installations = getStorageData(STORAGE_KEYS.installations);
    const feedback = getStorageData(STORAGE_KEYS.feedback);
    
    // Calcular KPIs
    const totalInstallations = installations.length;
    const completedInstallations = installations.filter(i => 
      i.status === 'Handover' || i.status === 'Pós-venda'
    ).length;
    
    const onTimeRate = installations.filter(i => {
      if (!i.etapas.find(e => e.nome === 'Handover')) return true;
      const handoverDate = new Date(i.etapas.find(e => e.nome === 'Handover').data);
      const promisedDate = new Date(i.prazoPrometido);
      return handoverDate <= promisedDate;
    }).length / totalInstallations * 100;
    
    const avgCostVariance = installations.reduce((acc, inst) => {
      return acc + ((inst.custoReal - inst.custoPlanejado) / inst.custoPlanejado * 100);
    }, 0) / totalInstallations;
    
    const avgFeedbackScore = feedback.length > 0 
      ? feedback.reduce((acc, fb) => acc + fb.nota, 0) / feedback.length 
      : 0;
    
    const totalIncidents = installations.reduce((acc, inst) => 
      acc + inst.incidentes.length, 0
    );
    
    return {
      totalInstallations,
      completedInstallations,
      onTimeRate: Math.round(onTimeRate),
      avgCostVariance: Math.round(avgCostVariance * 100) / 100,
      avgFeedbackScore: Math.round(avgFeedbackScore * 10) / 10,
      totalIncidents,
      avgLeadTime: 120 // dias (mock)
    };
  }
};

export default mockApi;
