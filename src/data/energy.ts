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
