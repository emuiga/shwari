export const WEEK_ORDER = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];

export const OPERATING_HOURS_LABELS: Record<string, string> = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
};

export const OPERATING_HOURS_SHORT_LABELS: Record<string, string> = {
  sun: 'Sun',
  mon: 'Mon',
  tue: 'Tue',
  wed: 'Wed',
  thu: 'Thu',
  fri: 'Fri',
  sat: 'Sat',
};

export function formatTime(time: string): string {
  const [hStr, mStr] = time.split(':');
  const hours = Number(hStr);
  if (Number.isNaN(hours)) return time;
  const minutes = mStr ?? '00';
  const period = hours >= 12 ? 'PM' : 'AM';
  const hour12 = hours % 12 === 0 ? 12 : hours % 12;
  return `${hour12}:${minutes} ${period}`;
}

export function formatHoursRange(range: string): string {
  const [start, end] = range.split('-').map((part) => part.trim());
  if (!start || !end) return range;
  return `${formatTime(start)} – ${formatTime(end)}`;
}

export interface OperatingHoursGroup {
  days: string[];
  range: string;
}

export function groupOperatingHours(hours: Record<string, string>): OperatingHoursGroup[] {
  const groups: OperatingHoursGroup[] = [];

  for (const day of WEEK_ORDER) {
    const range = hours[day];
    if (!range) continue;

    const lastGroup = groups[groups.length - 1];
    const lastDay = lastGroup?.days[lastGroup.days.length - 1];
    const isConsecutive = lastDay && WEEK_ORDER[WEEK_ORDER.indexOf(lastDay) + 1] === day;

    if (lastGroup && lastGroup.range === range && isConsecutive) {
      lastGroup.days.push(day);
    } else {
      groups.push({ days: [day], range });
    }
  }

  return groups;
}

export function formatDayGroupLabel(days: string[]): string {
  if (days.length === 1) return OPERATING_HOURS_LABELS[days[0]];
  if (days.length === 2) {
    return `${OPERATING_HOURS_SHORT_LABELS[days[0]]} & ${OPERATING_HOURS_SHORT_LABELS[days[1]]}`;
  }
  return `${OPERATING_HOURS_SHORT_LABELS[days[0]]} – ${OPERATING_HOURS_SHORT_LABELS[days[days.length - 1]]}`;
}

export function timeToMinutes(time: string): number {
  const [hStr, mStr] = time.split(':');
  return Number(hStr) * 60 + Number(mStr ?? 0);
}

export function isWithinOperatingHours(range: string, nowMinutes: number): boolean {
  const [start, end] = range.split('-').map((part) => part.trim());
  if (!start || !end) return false;
  return nowMinutes >= timeToMinutes(start) && nowMinutes < timeToMinutes(end);
}
