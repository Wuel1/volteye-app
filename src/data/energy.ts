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

export type AlertFilterKey = 'all' | 'important' | 'consumption' | 'connection';

export type AlertType =
  | 'constant_consumption'
  | 'daily_cost'
  | 'high_consumption'
  | 'long_usage'
  | 'offline'
  | 'peak_detected';

export type AlertSeverity = 'high' | 'medium' | 'low';

export type AlertStatus = 'new' | 'seen' | 'resolved';

export type AlertCategory = 'consumption' | 'connection';

export type AlertItem = {
  id: string;
  type: AlertType;
  title: string;
  deviceName: string;
  room: string;
  date: string;
  description: string;
  detail: string;
  explanation: string;
  recommendation: string;
  severity: AlertSeverity;
  status: AlertStatus;
  category: AlertCategory;
};

export type AlertsData = {
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
  summary: {
    activeAlerts: number;
    weeklyEvents: number;
    generalStatus: string;
  };
  recommendation: {
    title: string;
    description: string;
    actionLabel: string;
  };
  highlightedAlert: {
    id: string;
    type: AlertType;
    title: string;
    deviceName: string;
    date: string;
    description: string;
    severity: AlertSeverity;
    status: AlertStatus;
  } | null;
  alerts: AlertItem[];
};

export const alertsMock: AlertsData = {
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
  summary: {
    activeAlerts: 2,
    weeklyEvents: 5,
    generalStatus: 'Tomada principal online'
  },
  recommendation: {
    title: 'Recomendacao inteligente',
    description:
      'Voce tem 4 alertas nao criticos. Com base no seu uso, sugerimos ativar o modo Eco para reduzir consumo em espera.',
    actionLabel: 'Aplicar ajuste'
  },
  highlightedAlert: {
    id: 'alert-1',
    type: 'high_consumption',
    title: 'Atencao ao consumo de hoje',
    deviceName: 'Tomada principal',
    date: 'Hoje, 19:42',
    description: 'Sua tomada esta consumindo acima do padrao para este horario.',
    severity: 'high',
    status: 'new'
  },
  alerts: [
    {
      id: 'alert-1',
      type: 'high_consumption',
      title: 'Consumo acima do padrao',
      deviceName: 'Tomada principal',
      room: 'Sala',
      date: 'Hoje, 19:42',
      description: 'A tomada consumiu 42% acima da media para este horario.',
      detail: 'Hoje, entre 18h e 20h, a Tomada principal consumiu 42% acima da media registrada nesse mesmo horario.',
      explanation: 'Isso pode acontecer quando o equipamento conectado fica mais tempo ligado ou trabalha em maior potencia.',
      recommendation: 'Verifique se o equipamento conectado precisa permanecer ligado por tanto tempo.',
      severity: 'high',
      status: 'new',
      category: 'consumption'
    },
    {
      id: 'alert-2',
      type: 'long_usage',
      title: 'Tomada ligada por muito tempo',
      deviceName: 'Tomada principal',
      room: 'Sala',
      date: 'Hoje, 16:10',
      description: 'A tomada ficou ativa por mais de 6 horas seguidas.',
      detail: 'A Tomada principal permaneceu ativa por mais de 6 horas sem interrupcao relevante no consumo.',
      explanation: 'Esse comportamento pode indicar que o equipamento ficou ligado mesmo quando nao estava em uso.',
      recommendation: 'Considere desligar o equipamento quando ele nao estiver em uso.',
      severity: 'medium',
      status: 'new',
      category: 'consumption'
    },
    {
      id: 'alert-3',
      type: 'peak_detected',
      title: 'Pico de consumo detectado',
      deviceName: 'Tomada principal',
      room: 'Sala',
      date: 'Ontem, 20:05',
      description: 'O maior pico de consumo ocorreu entre 18h e 20h.',
      detail: 'O maior pico do dia aconteceu entre 18h e 20h, periodo em que a tomada concentrou mais energia.',
      explanation: 'Picos podem acontecer quando o equipamento exige mais potencia em um curto intervalo.',
      recommendation: 'Acompanhe se esse padrao se repete nos proximos dias.',
      severity: 'medium',
      status: 'seen',
      category: 'consumption'
    },
    {
      id: 'alert-4',
      type: 'offline',
      title: 'Dispositivo offline',
      deviceName: 'Tomada principal',
      room: 'Sala',
      date: 'Ontem, 08:15',
      description: 'Nao recebemos dados da tomada durante 20 minutos.',
      detail: 'A Tomada principal ficou sem enviar dados por cerca de 20 minutos.',
      explanation: 'Isso costuma acontecer por instabilidade no Wi-Fi, distancia do roteador ou queda temporaria de energia.',
      recommendation: 'Verifique a conexao Wi-Fi caso o problema volte a acontecer.',
      severity: 'low',
      status: 'resolved',
      category: 'connection'
    },
    {
      id: 'alert-5',
      type: 'daily_cost',
      title: 'Custo diario acima do esperado',
      deviceName: 'Tomada principal',
      room: 'Sala',
      date: 'Segunda, 21:30',
      description: 'O custo estimado do dia passou da media dos ultimos 7 dias.',
      detail: 'O custo estimado de hoje ficou acima da media registrada nos ultimos dias para esta tomada.',
      explanation: 'Esse aumento pode estar ligado a mais tempo de uso ou a um periodo com maior potencia.',
      recommendation: 'Veja o historico para identificar em qual horario o consumo aumentou.',
      severity: 'medium',
      status: 'seen',
      category: 'consumption'
    },
    {
      id: 'alert-6',
      type: 'constant_consumption',
      title: 'Consumo constante na madrugada',
      deviceName: 'Tomada principal',
      room: 'Sala',
      date: 'Domingo, 03:20',
      description: 'A tomada manteve consumo baixo, mas continuo, durante a madrugada.',
      detail: 'Durante a madrugada, a tomada registrou consumo constante por algumas horas.',
      explanation: 'Isso pode indicar modo standby ou algum equipamento que continuou funcionando em baixa potencia.',
      recommendation: 'Confira se o equipamento precisa ficar conectado durante a noite.',
      severity: 'low',
      status: 'seen',
      category: 'consumption'
    }
  ]
};

export type ProfileData = {
  user: {
    name: string;
    email: string;
    initials: string;
  };
  location: {
    id: string;
    name: string;
    type: string;
    devicesCount: number;
    connectedDevicesCount: number;
  };
  energyTariff: {
    value: number | null;
    unit: string;
    configured: boolean;
  };
  notifications: {
    enabled: boolean;
    alertsEnabled: boolean;
  };
  app: {
    version: string;
    description: string;
  };
};

export const profileMock: ProfileData = {
  user: {
    name: 'Wandson Emanuel',
    email: 'wandson@email.com',
    initials: 'WE'
  },
  location: {
    id: '1',
    name: 'Minha casa',
    type: 'Residencia',
    devicesCount: 1,
    connectedDevicesCount: 1
  },
  energyTariff: {
    value: 0.78,
    unit: 'kWh',
    configured: true
  },
  notifications: {
    enabled: true,
    alertsEnabled: true
  },
  app: {
    version: '1.0.0',
    description: 'O VoltEye ajuda voce a entender seu consumo de energia de forma simples.'
  }
};
