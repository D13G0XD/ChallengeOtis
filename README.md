# OTIS LATAM - MVP Front-end

Sistema de acompanhamento padronizado de instalações de elevadores OTIS na América Latina.

## 🚀 Tecnologias Utilizadas

- **React 18** - Biblioteca JavaScript para construção de interfaces
- **Vite** - Build tool e servidor de desenvolvimento
- **TailwindCSS** - Framework CSS utilitário 
- **React Router Dom** - Roteamento para SPA
- **Recharts** - Biblioteca para gráficos e dashboards
- **Lucide React** - Ícones modernos e consistentes

## 🎯 Funcionalidades Implementadas

### ✅ Módulos Principais
- **Dashboard** - Visão geral com KPIs e gráficos
- **Vendas** - Contratos e prazos prometidos
- **Planejamento** - Cronograma e timeline dos projetos  
- **Fabricação** - Status de produção e envio
- **Instalação** - Atividades de campo e progresso
- **Qualidade** - Indicadores e feedback dos clientes
- **Portal do Cliente** - Acompanhamento público e avaliações

### ✅ Funcionalidades Técnicas
- Interface totalmente responsiva (mobile-first)
- Mock API com persistência em localStorage
- Sistema de i18n (pt-BR/es-419)
- Componentes reutilizáveis com TailwindCSS
- Pipeline de status customizável
- Formulários interativos e validação
- Navegação por abas e módulos

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 16+ 
- npm ou yarn

### Instalação e Execução

```bash
# 1. Clonar o repositório
git clone <url-do-repositorio>
cd otis-latam-mvp

# 2. Instalar dependências
npm install

# 3. Executar em modo desenvolvimento
npm run dev

# 4. Acessar no navegador
# http://localhost:3000
```

### Scripts Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.jsx
│   ├── Sidebar.jsx
│   ├── Layout.jsx
│   ├── KpiCard.jsx
│   ├── StatusBadge.jsx
│   └── Timeline.jsx
├── pages/               # Páginas/telas principais
│   ├── Dashboard.jsx
│   ├── Vendas.jsx
│   ├── Planejamento.jsx
│   ├── Fabricacao.jsx
│   ├── Instalacao.jsx
│   ├── InstallationDetail.jsx
│   ├── Qualidade.jsx
│   └── PortalCliente.jsx
├── mocks/               # Dados mockados
│   ├── installations.json
│   ├── fieldActivities.json
│   ├── factoryStatus.json
│   ├── sales.json
│   └── feedback.json
├── services/            # Serviços e APIs
│   └── mockApi.js
├── config/              # Configurações
│   └── i18n.js
├── App.jsx              # Componente raiz
├── main.jsx             # Ponto de entrada
└── index.css            # Estilos globais
```

## 🎨 Design System

### Cores Principais
- **Azul OTIS**: `#003DA5` (otis-blue)
- **Azul Escuro**: `#002B75` (otis-dark)  
- **Azul Claro**: `#E6F3FF` (otis-light)

### Componentes de Status
- **Vendido**: Cinza
- **Engenharia**: Índigo
- **Fabricação**: Teal
- **Em Transporte**: Âmbar
- **Instalação**: Azul
- **Comissionamento**: Roxo
- **Handover**: Verde
- **Pós-venda**: Slate

## 📊 Mock API

O sistema utiliza uma Mock API que simula um backend real:

### Funcionalidades
- Latência simulada (300ms)
- Persistência em localStorage
- CRUD completo de dados
- Filtros e buscas
- Cálculo de KPIs em tempo real

### Dados Principais
- **5 instalações** de exemplo
- **Múltiplos países** (BR, AR, CO, PE)
- **Pipeline completo** de status
- **Atividades de campo** por data
- **Feedback** de clientes
- **Status de fábrica** detalhado

## 🌐 Internacionalização

Sistema preparado para múltiplos idiomas:

- **pt-BR** - Português (Brasil) - Padrão
- **es-419** - Espanhol (América Latina)

Para alterar idioma: usar o seletor no header ou localStorage.

## 📱 Responsividade

- **Mobile First** - Otimizado para dispositivos móveis
- **Breakpoints TailwindCSS** - sm, md, lg, xl
- **Menu adaptativo** - Sidebar colapsível 
- **Tabelas responsivas** - Scroll horizontal em mobile
- **Cards flexíveis** - Layout adaptável

## 🔐 Rotas do Sistema

### Área Interna
- `/` - Dashboard principal
- `/vendas` - Módulo de vendas
- `/planejamento` - Cronogramas
- `/fabricacao` - Status da fábrica
- `/instalacao` - Lista de instalações
- `/instalacao/:id` - Detalhes da instalação
- `/qualidade` - Indicadores de qualidade

### Portal do Cliente
- `/cliente` - Dashboard do cliente
- `/cliente/instalacao/:id` - Detalhes para cliente
- `/cliente/feedback/:id` - Formulário de avaliação

## 🚧 Limitações do MVP

### Não Implementado
- ❌ Backend real
- ❌ Autenticação/autorização
- ❌ Upload real de arquivos
- ❌ Notificações push
- ❌ Relatórios em PDF
- ❌ Integração com sistemas externos

### Simulado/Mock
- ✅ API calls com latência
- ✅ Persistência local
- ✅ Upload de fotos (URLs placeholder)
- ✅ Envio de emails
- ✅ Notificações

## 📈 KPIs Implementados

- **Total de Instalações**
- **Taxa de Entregas no Prazo** 
- **Variação de Custo Médio**
- **Nota Média de Feedback**
- **Índice de Qualidade**
- **Total de Incidentes**
- **Lead Time Médio**

## 🔧 Próximos Passos

Para evoluir o MVP para produção:

1. **Backend Integration** - API REST real
2. **Authentication** - Login/logout seguro
3. **File Upload** - Storage de imagens
4. **Real-time Updates** - WebSockets
5. **Advanced Analytics** - Relatórios complexos
6. **Mobile App** - React Native
7. **Testing** - Unit/Integration tests
8. **CI/CD** - Pipeline de deploy

## 🤝 Contribuição

Para contribuir com o projeto:

1. Fork o repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob licença MIT - veja o arquivo LICENSE para detalhes.

---

**OTIS LATAM MVP** - Desenvolvido com ❤️ usando React + TailwindCSS
