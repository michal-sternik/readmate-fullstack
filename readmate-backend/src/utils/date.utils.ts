import { Dayjs } from 'dayjs';

export function convertDayjsToString(date: Dayjs | null): string | null {
  return date ? date.toISOString().split('T')[0] : null;
}
