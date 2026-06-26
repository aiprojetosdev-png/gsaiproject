export const initialPipeline = {
  prospeccao: {
    id: 'prospeccao',
    title: 'Prospecção',
    cards: [
      { id: 'p1', company: 'iFood', value: 240000, sector: 'FoodTech', owner: 'AL', days: 3 },
      { id: 'p2', company: 'Vivo', value: 1800000, sector: 'Telecom', owner: 'MR', days: 1 },
    ],
  },
  contato: {
    id: 'contato',
    title: 'Primeiro Contato',
    cards: [
      { id: 'c1', company: 'Porto Seguro', value: 560000, sector: 'Seguros', owner: 'TS', days: 5 },
      { id: 'c2', company: 'Raia Drogasil', value: 980000, sector: 'Farmácia', owner: 'AL', days: 2 },
    ],
  },
  proposta: {
    id: 'proposta',
    title: 'Proposta Enviada',
    cards: [
      { id: 'pr1', company: 'Embraer', value: 2400000, sector: 'Aeroespacial', owner: 'MR', days: 8 },
      { id: 'pr2', company: 'Camil Alimentos', value: 620000, sector: 'Alimentos', owner: 'TS', days: 4 },
    ],
  },
  negociacao: {
    id: 'negociacao',
    title: 'Negociação',
    cards: [
      { id: 'n1', company: 'Banco Inter', value: 3200000, sector: 'Fintech', owner: 'AL', days: 12 },
      { id: 'n2', company: 'JBS', value: 4800000, sector: 'Alimentos', owner: 'MR', days: 7 },
    ],
  },
  fechamento: {
    id: 'fechamento',
    title: 'Fechamento',
    cards: [
      { id: 'f1', company: 'Ultrapar', value: 1600000, sector: 'Energia', owner: 'TS', days: 15 },
    ],
  },
  cliente: {
    id: 'cliente',
    title: 'Cliente',
    cards: [
      { id: 'cl1', company: 'Nestlé Brasil', value: 840000, sector: 'Alimentos', owner: 'AL', days: 420 },
      { id: 'cl2', company: 'ArcelorMittal', value: 1260000, sector: 'Siderurgia', owner: 'MR', days: 890 },
    ],
  },
}

export const columnOrder = ['prospeccao', 'contato', 'proposta', 'negociacao', 'fechamento', 'cliente']
