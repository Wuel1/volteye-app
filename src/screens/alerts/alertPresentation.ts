import {
  AlertTriangle,
  Clock3,
  DollarSign,
  Flame,
  Info,
  Moon,
  WifiOff
} from 'lucide-react-native';

import { AlertSeverity, AlertStatus, AlertType } from '../../data/energy';
import { colors } from '../../theme/theme';
import { alertsClasses, alertsPalette } from './styles';

export const severityLabel: Record<AlertSeverity, string> = {
  high: 'Alta',
  low: 'Baixa',
  medium: 'Media'
};

export const statusLabel: Record<AlertStatus, string> = {
  new: 'Novo',
  resolved: 'Resolvido',
  seen: 'Visto'
};

export function getAlertIcon(type: AlertType) {
  const icons = {
    constant_consumption: Moon,
    daily_cost: DollarSign,
    high_consumption: AlertTriangle,
    long_usage: Clock3,
    offline: WifiOff,
    peak_detected: Flame
  };

  return icons[type] ?? Info;
}

export function getSeverityTone(severity: AlertSeverity) {
  const tones = {
    high: {
      bg: alertsClasses.severityHigh,
      color: colors.danger,
      text: alertsClasses.severityHighText
    },
    low: {
      bg: alertsClasses.severityLow,
      color: alertsPalette.primary,
      text: alertsClasses.severityLowText
    },
    medium: {
      bg: alertsClasses.severityMedium,
      color: colors.warning,
      text: alertsClasses.severityMediumText
    }
  };

  return tones[severity];
}

export function getStatusTone(status: AlertStatus) {
  const tones = {
    new: {
      bg: alertsClasses.statusNew,
      text: alertsClasses.statusNewText
    },
    resolved: {
      bg: alertsClasses.statusResolved,
      text: alertsClasses.statusResolvedText
    },
    seen: {
      bg: alertsClasses.statusSeen,
      text: alertsClasses.statusSeenText
    }
  };

  return tones[status];
}
