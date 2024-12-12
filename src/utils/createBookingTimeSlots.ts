import moment from "moment-timezone";

export function createTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  lane?: string
): [{ lane: string; slots: string[] }] | Array<string> {
  // Set California time zone (Pacific Time)
  const californiaTimeZone = "America/Los_Angeles";

  // Parse start and end times in California time zone
  const start = moment.tz(startTime, californiaTimeZone);
  const end = moment.tz(endTime, californiaTimeZone);

  const durationMillis = duration * 60 * 1000;
  const slots: string[] = [];

  const current = start.clone();

  while (current.valueOf() + durationMillis <= end.valueOf()) {
    const startSlot = current.clone();
    const endSlot = current.clone().add(durationMillis, "milliseconds");

    slots.push(`${startSlot.format("h:mm A")} - ${endSlot.format("h:mm A")}`);

    current.add(durationMillis, "milliseconds");
  }

  if (lane) {
    return [{ lane: lane!, slots }];
  } else {
    return slots;
  }
}
