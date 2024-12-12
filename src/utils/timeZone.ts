import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const californiaTime = (time: Date) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const zoneTime = dayjs(time).tz("America/Los_Angeles", true).format();
  return zoneTime;
};
