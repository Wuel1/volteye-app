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

export type HomeDeviceStatus = 'online' | 'offline';

export type HomeDevice = {
  id: string;
  name: string;
  room: string;
  status: HomeDeviceStatus;
  currentPowerWatts: number;
  lastKnownPowerWatts: number;
  lastUpdate: string;
};

export type HomeData = {
  userName: string;
  selectedDevice: HomeDevice | null;
  devices: HomeDevice[];
  summary: {
    todayCost: number;
    monthlyEstimate: number;
    todayConsumptionKwh: number;
    peakTime: string;
    comparisonText: string;
    statusText: string;
  };
  chart: {
    label: string;
    value: number;
  }[];
};

export const homeMock: HomeData = {
  userName: 'Wandson',
  selectedDevice: {
    id: '1',
    name: 'Tomada principal',
    room: 'Sala',
    status: 'online',
    currentPowerWatts: 328,
    lastKnownPowerWatts: 314,
    lastUpdate: 'Atualizado ha poucos segundos'
  },
  devices: [
    {
      id: '1',
      name: 'Tomada principal',
      room: 'Sala',
      status: 'online',
      currentPowerWatts: 328,
      lastKnownPowerWatts: 314,
      lastUpdate: 'Atualizado ha poucos segundos'
    },
    {
      id: '2',
      name: 'Geladeira cozinha',
      room: 'Cozinha',
      status: 'offline',
      currentPowerWatts: 0,
      lastKnownPowerWatts: 92,
      lastUpdate: 'Atualizado ha 2 horas'
    }
  ],
  summary: {
    todayCost: 2.37,
    monthlyEstimate: 71.2,
    todayConsumptionKwh: 3.8,
    peakTime: '18h as 20h',
    comparisonText: 'Hoje voce consumiu 12% mais energia que ontem ate este horario.',
    statusText: 'Consumo dentro do normal'
  },
  chart: [
    { label: '00h', value: 0.2 },
    { label: '06h', value: 0.4 },
    { label: '12h', value: 0.8 },
    { label: '18h', value: 1.4 },
    { label: '22h', value: 0.7 }
  ]
};

export const emptyHomeMock: HomeData = {
  userName: 'Wandson',
  selectedDevice: null,
  devices: [],
  summary: homeMock.summary,
  chart: homeMock.chart
};

export type ConsumptionPeriodKey = 'today' | 'week' | 'month';

export type ConsumptionComparisonDirection = 'up' | 'down';

export type ConsumptionPeriod = {
  totalKwh: number;
  estimatedCost: number;
  average: string;
  peak: string;
  comparison: {
    value: number;
    direction: ConsumptionComparisonDirection;
    text: string;
  };
  chart: {
    label: string;
    value: number;
  }[];
  peaks: {
    label: string;
    value: string;
  }[];
  insight: string;
};

export type ConsumptionData = {
  selectedDevice: {
    id: string;
    name: string;
    room: string;
    status: HomeDeviceStatus;
  } | null;
  devices: {
    id: string;
    name: string;
    room: string;
    status: HomeDeviceStatus;
  }[];
  periods: Record<ConsumptionPeriodKey, ConsumptionPeriod>;
};

export const consumptionMock: ConsumptionData = {
  selectedDevice: {
    id: '1',
    name: 'Tomada principal',
    room: 'Sala',
    status: 'online'
  },
  devices: [
    {
      id: '1',
      name: 'Tomada principal',
      room: 'Sala',
      status: 'online'
    },
    {
      id: '2',
      name: 'Geladeira cozinha',
      room: 'Cozinha',
      status: 'offline'
    }
  ],
  periods: {
    today: {
      totalKwh: 3.8,
      estimatedCost: 2.37,
      average: '0,48 kWh/h',
      peak: '18h as 20h',
      comparison: {
        value: 12,
        direction: 'up',
        text: 'Hoje voce consumiu 12% mais energia que ontem ate este horario.'
      },
      chart: [
        { label: '00h', value: 0.2 },
        { label: '03h', value: 0.1 },
        { label: '06h', value: 0.4 },
        { label: '09h', value: 0.5 },
        { label: '12h', value: 0.8 },
        { label: '15h', value: 0.7 },
        { label: '18h', value: 1.4 },
        { label: '21h', value: 0.9 }
      ],
      peaks: [
        { label: '18h as 20h', value: '1,4 kWh' },
        { label: '12h as 14h', value: '0,8 kWh' },
        { label: '21h as 22h', value: '0,7 kWh' }
      ],
      insight: 'Seu maior consumo aconteceu no periodo da noite, principalmente entre 18h e 20h.'
    },
    week: {
      totalKwh: 24.6,
      estimatedCost: 15.38,
      average: '3,5 kWh/dia',
      peak: 'Sexta-feira',
      comparison: {
        value: 8,
        direction: 'down',
        text: 'Esta semana esta 8% abaixo da semana passada.'
      },
      chart: [
        { label: 'Seg', value: 3.1 },
        { label: 'Ter', value: 2.8 },
        { label: 'Qua', value: 3.4 },
        { label: 'Qui', value: 3.7 },
        { label: 'Sex', value: 4.5 },
        { label: 'Sab', value: 3.9 },
        { label: 'Dom', value: 3.2 }
      ],
      peaks: [
        { label: 'Sexta-feira', value: '4,5 kWh' },
        { label: 'Sabado', value: '3,9 kWh' },
        { label: 'Quinta-feira', value: '3,7 kWh' }
      ],
      insight: 'O consumo foi maior no fim da semana, com destaque para sexta-feira.'
    },
    month: {
      totalKwh: 96.4,
      estimatedCost: 60.25,
      average: '24,1 kWh/semana',
      peak: 'Semana 3',
      comparison: {
        value: 14,
        direction: 'up',
        text: 'Este mes esta 14% acima do mes anterior.'
      },
      chart: [
        { label: 'Sem 1', value: 21.4 },
        { label: 'Sem 2', value: 23.8 },
        { label: 'Sem 3', value: 28.2 },
        { label: 'Sem 4', value: 23.0 }
      ],
      peaks: [
        { label: 'Semana 3', value: '28,2 kWh' },
        { label: 'Semana 2', value: '23,8 kWh' },
        { label: 'Semana 4', value: '23,0 kWh' }
      ],
      insight: 'O consumo mensal aumentou principalmente na terceira semana do mes.'
    }
  }
};
