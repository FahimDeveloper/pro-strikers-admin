/* eslint-disable @typescript-eslint/no-explicit-any */
export function createTimeSlots(startTime: any, endTime: any, duration: any) {
  console.log(startTime, endTime, duration);
  let start = new Date(startTime);
  const end = new Date(endTime);
  const slots = [];
  const durationMillis = duration * 60 * 1000;

  // Ensure end time is after start time
  if (end <= start) {
    end.setDate(end.getDate() + 1);
  }

  while (start.getTime() + durationMillis <= end.getTime()) {
    const endSlot = new Date(start.getTime() + durationMillis);
    // Format hours and minutes
    const formatTime = (date: any) => {
      let hours = date.getHours();
      let minutes = date.getMinutes();
      const ampm = hours >= 12 ? "pm" : "am";
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return hours + ":" + minutes + " " + ampm;
    };

    const startTimeFormatted = formatTime(start);
    const endTimeFormatted = formatTime(endSlot);

    const slot = {
      value: `${startTimeFormatted} - ${endTimeFormatted}`,
      label: `${startTimeFormatted} - ${endTimeFormatted}`,
    };
    slots.push(slot);
    start = new Date(endSlot.getTime()); // Move to the next slot
  }

  return slots;
}
