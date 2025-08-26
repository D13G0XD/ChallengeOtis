export const translations = {
  'pt-BR': {
    // Navegação
    dashboard: 'Dashboard',
    vendas: 'Vendas',
    planejamento: 'Planejamento',
    fabricacao: 'Fabricação',
    instalacao: 'Instalação',
    qualidade: 'Qualidade',
    portalCliente: 'Portal do Cliente',
    
    // Status
    vendido: 'Vendido',
    engenharia: 'Engenharia',
    fabricacao_status: 'Fabricação',
    transporte: 'Em Transporte',
    instalacao_status: 'Instalação',
    comissionamento: 'Comissionamento',
    handover: 'Handover',
    posVenda: 'Pós-venda',
    
    // Geral
    cliente: 'Cliente',
    pais: 'País',
    cidade: 'Cidade',
    status: 'Status',
    prazo: 'Prazo',
    custo: 'Custo',
    progresso: 'Progresso',
    atividades: 'Atividades',
    feedback: 'Feedback',
    detalhes: 'Detalhes',
    filtrar: 'Filtrar',
    buscar: 'Buscar',
    salvar: 'Salvar',
    cancelar: 'Cancelar',
    loading: 'Carregando...',
    
    // KPIs
    totalInstalacoes: 'Total de Instalações',
    instalacoesConcluidas: 'Instalações Concluídas',
    pontuacaoOnTime: 'Entregas no Prazo',
    variacaoCusto: 'Variação de Custo',
    notaMedia: 'Nota Média',
    incidentes: 'Incidentes',
    tempoMedio: 'Tempo Médio',
    
    // Formulários
    adicionarAtividade: 'Adicionar Atividade',
    tipoAtividade: 'Tipo de Atividade',
    responsavel: 'Responsável',
    observacoes: 'Observações',
    anexarFoto: 'Anexar Foto',
    avaliacaoServico: 'Avaliação do Serviço',
    comentarios: 'Comentários',
    enviarFeedback: 'Enviar Feedback',
    
    // Mensagens
    dadosCarregados: 'Dados carregados com sucesso',
    erroCarregamento: 'Erro ao carregar dados',
    feedbackEnviado: 'Feedback enviado com sucesso',
    atividadeSalva: 'Atividade salva com sucesso'
  },
  
  'es-419': {
    // Navegação
    dashboard: 'Panel',
    vendas: 'Ventas',
    planejamento: 'Planificación',
    fabricacao: 'Fabricación',
    instalacao: 'Instalación',
    qualidade: 'Calidad',
    portalCliente: 'Portal del Cliente',
    
    // Status
    vendido: 'Vendido',
    engenharia: 'Ingeniería',
    fabricacao_status: 'Fabricación',
    transporte: 'En Transporte',
    instalacao_status: 'Instalación',
    comissionamento: 'Comisionamiento',
    handover: 'Entrega',
    posVenda: 'Post-venta',
    
    // Geral
    cliente: 'Cliente',
    pais: 'País',
    cidade: 'Ciudad',
    status: 'Estado',
    prazo: 'Plazo',
    custo: 'Costo',
    progresso: 'Progreso',
    atividades: 'Actividades',
    feedback: 'Retroalimentación',
    detalhes: 'Detalles',
    filtrar: 'Filtrar',
    buscar: 'Buscar',
    salvar: 'Guardar',
    cancelar: 'Cancelar',
    loading: 'Cargando...',
    
    // KPIs
    totalInstalacoes: 'Total de Instalaciones',
    instalacoesConcluidas: 'Instalaciones Completadas',
    pontuacaoOnTime: 'Entregas a Tiempo',
    variacaoCusto: 'Variación de Costo',
    notaMedia: 'Puntuación Promedio',
    incidentes: 'Incidentes',
    tempoMedio: 'Tiempo Promedio',
    
    // Formulários
    adicionarAtividade: 'Agregar Actividad',
    tipoAtividade: 'Tipo de Actividad',
    responsavel: 'Responsable',
    observacoes: 'Observaciones',
    anexarFoto: 'Adjuntar Foto',
    avaliacaoServico: 'Evaluación del Servicio',
    comentarios: 'Comentarios',
    enviarFeedback: 'Enviar Retroalimentación',
    
    // Mensagens
    dadosCarregados: 'Datos cargados exitosamente',
    erroCarregamento: 'Error al cargar datos',
    feedbackEnviado: 'Retroalimentación enviada exitosamente',
    atividadeSalva: 'Actividad guardada exitosamente'
  }
};

export const useTranslation = () => {
  const currentLang = localStorage.getItem('otis_language') || 'pt-BR';
  
  const t = (key) => {
    return translations[currentLang][key] || key;
  };
  
  const setLanguage = (lang) => {
    localStorage.setItem('otis_language', lang);
    window.location.reload(); // Recarregar para aplicar mudanças
  };
  
  return { t, currentLang, setLanguage };
};
