export type IAppointmentSchedule = {
  _id?: string;
  appointment_name: string;
  appointment_type: string;
  sport: string;
  appointment_duration: number;
  trainer: string;
  description: string;
  price: number;
  schedules: IAppointmentDaySchedule[];
};

type IAppointmentDaySchedule = {
  day: string;
  active: boolean;
  start_time: Date;
  end_time: Date;
};

export type IAppointmentScheduleParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  appointment_type: string | undefined;
  trainer: string | undefined;
  sport: string | undefined;
};
