import moment from "moment-timezone";

export function createTimeSlots(
  startTime: string,
  endTime: string,
  duration: number,
  lane?: string
): [{ lane: string; slots: string[] }] | Array<string> {
  // Set California time zone (Pacific Time)
  const californiaTimeZone = "America/Los_Angeles";

  const start = moment.tz(startTime, californiaTimeZone).valueOf();
  let end = moment.tz(endTime, californiaTimeZone).valueOf();
  const durationMillis = duration * 60 * 1000;

  if (end <= start) {
    end += 24 * 60 * 60 * 1000;
  }

  const slots = [];
  for (
    let current = start;
    current + durationMillis <= end;
    current += durationMillis
  ) {
    const startSlot = moment(current).tz(californiaTimeZone);
    const endSlot = moment(current + durationMillis).tz(californiaTimeZone);

    const formatTime = (time: moment.Moment) => {
      return time.format("h:mm A");
    };

    slots.push(`${formatTime(startSlot)} - ${formatTime(endSlot)}`);
  }

  if (lane) {
    return [{ lane: lane!, slots }];
  } else {
    return slots;
  }
}
