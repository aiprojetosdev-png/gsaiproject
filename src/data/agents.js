export const aiAgents = [
  {
    id: 'a1',
    name: 'Agente Prospecção',
    description: 'Identifica e qualifica novos leads',
    lastAction: 'Analisou perfil Magazine Luiza',
    lastActionTime: 3,
    status: 'active',
    actionsToday: 47,
  },
  {
    id: 'a2',
    name: 'Agente Relacionamento',
    description: 'Gerencia comunicação com clientes',
    lastAction: 'Enviou relatório semanal Nestlé',
    lastActionTime: 12,
    status: 'active',
    actionsToday: 23,
  },
  {
    id: 'a3',
    name: 'Agente Analytics',
    description: 'Gera insights e relatórios automáticos',
    lastAction: 'Gerou forecast Q3 2026',
    lastActionTime: 28,
    status: 'active',
    actionsToday: 18,
  },
]

export const toastMessages = [
  'Agente identificou novo lead: Magazine Luiza — Score 92',
  'Lead Renner aprovado automaticamente pela IA',
  'Relatório Nestlé gerado com sucesso',
  'Agente detectou risco de churn: Petz — NPS -3pts',
  'Novo contato em prospecção: Porto Seguro',
  'Meta de leads mensais atingida: 127/120',
  'Proposta Embraer visualizada — 3x em 24h',
  'Agente Analytics gerou forecast Q3 2026',
]

export const dashboardData = {
  kpis: {
    leadsMonth: 127,
    conversionRate: 23.4,
    mrr: 357500,
    npsAvg: 88,
  },
  weeklyLeads: [
    { week: 'Sem 1', leads: 22 },
    { week: 'Sem 2', leads: 31 },
    { week: 'Sem 3', leads: 28 },
    { week: 'Sem 4', leads: 46 },
  ],
  monthlyRevenue: [
    { month: 'Jan', revenue: 310000 },
    { month: 'Fev', revenue: 318000 },
    { month: 'Mar', revenue: 325000 },
    { month: 'Abr', revenue: 331000 },
    { month: 'Mai', revenue: 340000 },
    { month: 'Jun', revenue: 357500 },
  ],
  pendingApprovals: 7,
}
