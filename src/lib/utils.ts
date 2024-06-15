import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string) {
  const parsedDate = new Date(date);
  const formattedDate = `${parsedDate.getDate().toString().padStart(2, '0')}-${(parsedDate.getMonth() + 1).toString().padStart(2, '0')}-${parsedDate.getFullYear()}`;
  return formattedDate;
}
export function getImage(data) {
  if (!data) {
    return [];
  }
  return data.map((item) => item.replace('\\r\\', ''));
}

export const changeTimeToMinutes = (time: string) => {
  const match = time.match(/(\d+)H(\d+)M/);
  if (match) {
    const hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);
    return hours * 60 + minutes;
  }
  return 0;
};
export const getTimeFromData = (data: string) => {
  const hourMatch = data.match(/(\d+)H/);
  const minuteMatch = data.match(/(\d+)M/);

  const hours = hourMatch ? parseInt(hourMatch[1], 10) : 0;
  const minutes = minuteMatch ? parseInt(minuteMatch[1], 10) : 0;

  return { hours, minutes };
};

export const handleHourChange = (newHour: number, currentData: string) => {
  const { minutes } = getTimeFromData(currentData);
  return newHour === 0 ? `${minutes}M` : `${newHour}H`;
};

export const handleMinuteChange = (newMinute: number, currentData: string) => {
  const { hours } = getTimeFromData(currentData);
  return newMinute === 0 ? `${hours}H` : `${newMinute}M`;
};

export const handleChangeTotalTime = (prepTime: string, cookTime: string) => {
  const { hours: prepHours, minutes: prepMinutes } = getTimeFromData(prepTime);
  const { hours: cookHours, minutes: cookMinutes } = getTimeFromData(cookTime);

  let totalHours = prepHours + cookHours;
  let totalMinutes = prepMinutes + cookMinutes;

  if (totalMinutes >= 60) {
    totalHours += Math.floor(totalMinutes / 60);
    totalMinutes = totalMinutes % 60;
  }

  return `${totalHours}H${totalMinutes}M`;
};
