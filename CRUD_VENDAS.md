# CRUD de Contratos de Venda - Documentação

## Funcionalidades Implementadas

### 1. **Listagem de Contratos**
- Visualização de todos os contratos de venda em uma tabela organizada
- Exibição de informações essenciais: ID do contrato, cliente, vendedor, tipo, valor, datas e status
- KPIs em tempo real: total de contratos, valor total, valor médio e contratos ativos

### 2. **Busca e Filtros**
- **Busca textual**: Por cliente, ID do contrato ou vendedor
- **Filtro por status**: Todos, Ativo, Concluído, Cancelado, Em Negociação
- Atualização automática da lista conforme os filtros aplicados

### 3. **Criação de Novos Contratos**
- Modal com formulário completo para inserção de novos contratos
- Campos obrigatórios: Cliente, Vendedor, Data de Venda, Valor, Prazo Prometido, Andares e Paradas
- Validações em tempo real:
  - Campos obrigatórios não podem estar vazios
  - Valores numéricos devem ser positivos
  - Prazo prometido deve ser posterior à data de venda
- Geração automática de ID único para o contrato

### 4. **Edição de Contratos**
- Modal pré-preenchido com dados do contrato selecionado
- Mesmas validações da criação
- Atualização instantânea na lista após salvar

### 5. **Exclusão de Contratos**
- Dialog de confirmação para evitar exclusões acidentais
- Remoção permanente do contrato após confirmação
- Atualização automática dos KPIs

## Estrutura de Dados

### Contrato de Venda
```javascript
{
  id: "SALE-001",                    // ID único gerado automaticamente
  contratoId: "LATAM-0001",          // ID do contrato para exibição
  cliente: "Edifício Aurora",        // Nome do cliente
  vendedor: "Ana Paula Silva",       // Nome do vendedor responsável
  dataVenda: "2025-06-01",          // Data da venda (YYYY-MM-DD)
  valor: 250000,                     // Valor em USD (número)
  prazoPrometido: "2025-09-01",     // Data prometida para entrega
  tipo: "Elevador Residencial",      // Tipo de elevador
  andares: 12,                       // Número de andares (inteiro)
  paradas: 13,                       // Número de paradas (inteiro)
  status: "Ativo"                    // Status do contrato
}
```

### Status Disponíveis
- **Ativo**: Contrato em andamento
- **Concluído**: Contrato finalizado com sucesso
- **Cancelado**: Contrato cancelado
- **Em Negociação**: Contrato em processo de negociação

### Tipos de Elevador
- Elevador Residencial
- Elevador Comercial
- Elevador Hospitalar
- Elevador Industrial
- Monta-cargas

## Componentes Criados

### 1. **SaleFormModal.jsx**
- Modal responsivo para criação/edição de contratos
- Formulário com validação completa
- Estados de loading durante operações
- Interface intuitiva e acessível

### 2. **ConfirmDialog.jsx**
- Componente reutilizável para confirmações
- Suporte a diferentes tipos (danger, warning, info)
- Design consistente com o resto da aplicação

## API Methods (mockApi.js)

### Métodos Implementados
```javascript
// Buscar todos os contratos
await mockApi.getSales(filters)

// Buscar contrato por ID
await mockApi.getSaleById(id)

// Criar novo contrato
await mockApi.createSale(saleData)

// Atualizar contrato existente
await mockApi.updateSale(id, saleData)

// Deletar contrato
await mockApi.deleteSale(id)
```

## Persistência de Dados

Os dados são armazenados no **localStorage** do navegador com a chave `otis_sales`, permitindo que os dados persistam entre sessões da aplicação.

### Inicialização
- Os dados iniciais são carregados do arquivo `src/mocks/sales.json`
- Se não houver dados no localStorage, os dados mock são utilizados
- Todas as operações CRUD são sincronizadas com o localStorage

## Validações Implementadas

### Campos Obrigatórios
- Cliente
- Vendedor  
- Data de Venda
- Valor (deve ser > 0)
- Prazo Prometido
- Número de Andares (deve ser > 0)
- Número de Paradas (deve ser > 0)

### Validações de Negócio
- Prazo prometido deve ser posterior à data de venda
- Valores numéricos devem ser positivos
- Campos de texto não podem estar vazios

## Interface do Usuário

### Características da UI
- **Responsiva**: Funciona em desktop, tablet e mobile
- **Acessível**: Tooltips, labels adequados e navegação por teclado
- **Intuitiva**: Ícones claros e feedback visual
- **Consistente**: Segue o design system existente da aplicação

### Estados Visuais
- Loading states durante operações
- Estados vazios quando não há dados
- Feedback de sucesso/erro
- Hover effects e transições suaves

## Como Usar

1. **Navegar para a página de Vendas**
2. **Ver todos os contratos** na tabela principal
3. **Criar novo contrato**: Clique no botão "Novo Contrato"
4. **Editar contrato**: Clique no ícone de edição na linha do contrato
5. **Excluir contrato**: Clique no ícone de lixeira e confirme
6. **Buscar/Filtrar**: Use os campos de busca e filtro acima da tabela

## Próximas Melhorias Sugeridas

- Exportação de dados para Excel/PDF
- Histórico de alterações nos contratos
- Integração com sistema de notificações
- Campos adicionais (observações, anexos)
- Bulk operations (edição/exclusão em massa)
- Ordenação por colunas na tabela
