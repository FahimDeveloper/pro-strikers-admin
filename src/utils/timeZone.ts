import moment from "moment-timezone";

export const californiaTime = (time: Date) => {
  const zoneTime = moment(time).tz("America/Los_Angeles", true).format();
  return zoneTime;
};
