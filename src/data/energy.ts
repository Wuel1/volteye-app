export const weeklyConsumption = [
  { day: 'Seg', kwh: 8.2 },
  { day: 'Ter', kwh: 7.4 },
  { day: 'Qua', kwh: 9.1 },
  { day: 'Qui', kwh: 6.8 },
  { day: 'Sex', kwh: 10.4 },
  { day: 'Sab', kwh: 11.2 },
  { day: 'Dom', kwh: 7.9 }
];

export const alerts = [
  {
    title: 'Pico de consumo detectado',
    description: 'A sala consumiu 28% acima da media entre 18h e 20h.',
    severity: 'warning'
  },
  {
    title: 'Meta mensal em dia',
    description: 'Voce esta 12% abaixo da previsao para este periodo.',
    severity: 'success'
  },
  {
    title: 'Equipamento em standby',
    description: 'A tomada da lavanderia manteve consumo durante a madrugada.',
    severity: 'danger'
  }
] as const;

export const recommendations = [
  'Programe o ar-condicionado para desligar 30 minutos antes de dormir.',
  'Concentre o uso da maquina de lavar fora do horario de pico.',
  'Revise aparelhos em standby nos comodos com menor uso.'
];
