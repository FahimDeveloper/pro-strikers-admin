import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const californiaTime = (isoString: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  if (
    !dayjs(isoString).format().includes("-07:00") &&
    !dayjs(isoString).format().includes("-08:00")
  ) {
    const zoneTime = dayjs(isoString).tz("America/Los_Angeles", true).format();
    return zoneTime;
  }
  return isoString;
};
