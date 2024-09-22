// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const collectBookingTimeSlots = (data: any, lane?: string) => {
  const slots = [];
  for (let i = 0; i < data?.length; i++) {
    slots.push(data[i]?.time_slot);
  }
  if (lane) {
    return [{ lane: lane!, slots }];
  } else {
    return slots;
  }
};
