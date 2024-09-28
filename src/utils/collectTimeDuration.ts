export const collectTimeDuration = (
  start: Date | string | undefined,
  end: Date | string | undefined
) => {
  const startDate = new Date(start as Date);
  const endDate = new Date(end as Date);
  const durationInMilliseconds = endDate.getTime() - startDate.getTime();
  const durationInMinutes = Math.floor(durationInMilliseconds / (1000 * 60));
  return `${durationInMinutes} minutes`;
};
