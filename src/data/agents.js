export const aiAgents = [
  {
    id: 'a1',
    name: 'Agente Prospecção',
    description: 'Identifica e qualifica novos leads automaticamente',
    lastAction: 'Analisou perfil Magazine Luiza — Score 92',
    lastActionTime: 3,
    status: 'active',
    actionsToday: 47,
    totalLeads: 312,
  },
  {
    id: 'a2',
    name: 'Agente Relacionamento',
    description: 'Gerencia comunicação e follow-ups com clientes',
    lastAction: 'Enviou relatório semanal Nestlé Brasil',
    lastActionTime: 12,
    status: 'active',
    actionsToday: 23,
    totalLeads: 0,
  },
  {
    id: 'a3',
    name: 'Agente Analytics',
    description: 'Gera insights, relatórios e projeções automáticas',
    lastAction: 'Gerou forecast Q3/2026 com 290% ROI',
    lastActionTime: 28,
    status: 'active',
    actionsToday: 18,
    totalLeads: 0,
  },
]

export const toastMessages = [
  'Agente identificou novo lead: Magazine Luiza — Score 92',
  'Lead Renner aprovado automaticamente pela IA',
  'Relatório Nestlé gerado com sucesso',
  'Agente detectou risco de churn: Petz — NPS -3pts',
  'Novo lead em prospecção: Porto Seguro (Score 79)',
  'Meta de leads mensais atingida: 127/120 ✓',
  'Proposta Embraer visualizada 3x nas últimas 24h',
  'Agente Analytics gerou forecast Q3/2026',
  'Renovação ArcelorMittal em 129 dias — iniciar negociação',
  'Upsell identificado: Aramis — módulo e-commerce',
]

export const dashboardData = {
  kpis: {
    leadsMonth: 127,
    conversionRate: 23.4,
    mrr: 357500,
    npsAvg: 88,
  },
  weeklyLeads: [
    { week: 'Sem 23', leads: 22 },
    { week: 'Sem 24', leads: 31 },
    { week: 'Sem 25', leads: 28 },
    { week: 'Sem 26', leads: 46 },
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

  recentActivity: [
    { id: 1, type: 'lead',    text: 'Lead Magazine Luiza qualificado — Score 92',          time: '3 min',  icon: 'lead' },
    { id: 2, type: 'client',  text: 'Reunião Nestlé Brasil confirmada para 02/07',         time: '18 min', icon: 'client' },
    { id: 3, type: 'deal',    text: 'Proposta Embraer: R$ 2.4M enviada por Marcos R.',     time: '47 min', icon: 'deal' },
    { id: 4, type: 'ai',      text: 'Agente Analytics gerou forecast Q3 — ROI 290%',       time: '1h',     icon: 'ai' },
    { id: 5, type: 'alert',   text: 'Queda NPS Petz: 79 → 76 — CS notificado',            time: '2h',     icon: 'alert' },
    { id: 6, type: 'deal',    text: 'Banco Inter avançou para negociação — R$ 3.2M',       time: '3h',     icon: 'deal' },
    { id: 7, type: 'client',  text: 'Renovação Pharmanexo confirmada — R$ 660k/ano',       time: '5h',     icon: 'client' },
    { id: 8, type: 'lead',    text: 'Grupo Soma identificado pela IA como oportunidade',    time: '6h',     icon: 'lead' },
  ],
}
