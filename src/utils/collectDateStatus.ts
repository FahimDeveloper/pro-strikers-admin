export const collectDateStatus = (
  training_end_date: Date | string,
  training_start_date?: Date | string
) => {
  // Helper function to compare dates by year, month, and day
  const equalDates = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const compareDates = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() >= date2.getDate()
    );
  };

  // Get the current date
  const currentDate = new Date();
  const trainingEndDate = new Date(training_end_date);

  if (!training_start_date) {
    if (equalDates(currentDate, trainingEndDate)) {
      return "today";
    } else if (compareDates(trainingEndDate, currentDate)) {
      return "upcoming";
    } else if (currentDate > trainingEndDate) {
      return "completed";
    }
  }

  if (training_start_date) {
    const trainingStartDate = new Date(training_start_date);
    if (
      compareDates(currentDate, trainingStartDate) &&
      compareDates(trainingEndDate, currentDate)
    ) {
      return "running";
    } else if (compareDates(trainingEndDate, currentDate)) {
      return "upcoming";
    } else if (currentDate > trainingEndDate) {
      return "completed";
    }
  }
};
