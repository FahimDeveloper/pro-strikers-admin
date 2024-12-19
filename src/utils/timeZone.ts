import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

dayjs.extend(utc);
dayjs.extend(timezone);
export const californiaTime = (isoString: string) => {
  const time = dayjs(isoString).format();
  if (
    !dayjs(isoString).format().includes("-07:00") &&
    !dayjs(isoString).format().includes("-08:00")
  ) {
    const zoneTime = dayjs(time).tz("America/Los_Angeles", true).format();
    return zoneTime;
  }
  return time;
};
