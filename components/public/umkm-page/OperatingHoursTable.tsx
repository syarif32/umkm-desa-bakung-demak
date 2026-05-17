import type { OperatingHours } from '@/types/database';

const DAY_LABELS: Record<string, string> = {
  mon: 'Senin', tue: 'Selasa', wed: 'Rabu', thu: 'Kamis', fri: 'Jumat', sat: 'Sabtu', sun: 'Minggu',
};
const DAY_ORDER = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

export function OperatingHoursTable({ hours }: { hours: OperatingHours }) {
  const todayKey = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][new Date().getDay()];

  return (
    <table className="w-full text-sm">
      <tbody className="divide-y divide-amber-50">
        {DAY_ORDER.filter((d) => hours[d as keyof OperatingHours]).map((day) => {
          const isToday = day === todayKey;
          return (
            <tr key={day} className={isToday ? 'bg-amber-50 rounded' : ''}>
              <td className={`py-1.5 pr-3 font-medium ${isToday ? 'text-amber-700' : 'text-gray-600'}`}>
                {DAY_LABELS[day]}
                {isToday && <span className="ml-1.5 text-xs text-amber-500">(Hari ini)</span>}
              </td>
              <td className={`py-1.5 text-right ${isToday ? 'text-amber-700 font-semibold' : 'text-gray-500'}`}>
                {hours[day as keyof OperatingHours] ?? '—'}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}