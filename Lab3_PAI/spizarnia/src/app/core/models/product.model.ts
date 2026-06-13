export interface Product {
  id: number;
  name: string;
  category: string;
  amount: string;
  unit: string;
  expiry: string; // format ISO: 'YYYY-MM-DD'
  opened: boolean;
  notes: string;
}

export type ExpiryStatus = 'expired' | 'warning' | 'ok';

export function getExpiryStatus(expiry: string): ExpiryStatus {
  const diffDays = Math.ceil(
    (new Date(expiry).getTime() - Date.now()) / 86_400_000
  );
  if (diffDays < 0) return 'expired';
  if (diffDays <= 3) return 'warning';
  return 'ok';
}

export const EXPIRY_BADGE: Record<ExpiryStatus, { bg: string; text: string }> = {
  expired: { bg: 'danger', text: 'Przeterminowany' },
  warning: { bg: 'warning', text: 'Kończy się wkrótce' },
  ok: { bg: 'success', text: 'OK' },
};
