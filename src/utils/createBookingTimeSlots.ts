/* eslint-disable @typescript-eslint/no-explicit-any */
export function createTimeSlots(
  startTime: string,
  endTime: string,
  duration: number
): string[] {
  const start = new Date(startTime).getTime();
  let end = new Date(endTime).getTime();
  const durationMillis = duration * 60 * 1000;

  if (end <= start) {
    end += 24 * 60 * 60 * 1000; // Add a day if end time is earlier than start time
  }

  const slots = [];
  for (
    let current = start;
    current + durationMillis <= end;
    current += durationMillis
  ) {
    const startSlot = new Date(current);
    const endSlot = new Date(current + durationMillis);

    const formatTime = (date: Date) => {
      let hours = date.getHours();
      const minutes = date.getMinutes().toString().padStart(2, "0");
      const ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12; // Convert 24-hour time to 12-hour time
      return `${hours}:${minutes} ${ampm}`;
    };

    slots.push(`${formatTime(startSlot)} - ${formatTime(endSlot)}`);
  }

  return slots;
}
