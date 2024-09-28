export type IAppointmentSchedule = {
  _id: string;
  appointment_name: string;
  appointment_type: string;
  sport: string;
  duration?: number;
  trainer: string;
  description: string;
  price: number;
  capacity?: number;
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
  trainer: string | undefined;
  sport: string | undefined;
};

export interface IAppointmentGroupReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  appointment: IAppointmentSchedule;
  street_address: string;
  voucher_applied: boolean;
  city: string;
  state: string;
  sport: string;
  appointment_date: string;
  zip_code: string;
  trainer: {
    _id: string;
    first_name: string;
    last_name: string;
  };
}

export interface IAppointmentOneReservation {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  age: number;
  appointment: IAppointmentSchedule;
  street_address: string;
  voucher_applied: boolean;
  city: string;
  state: string;
  sport: string;
  zip_code: string;
  trainer: {
    _id: string;
    first_name: string;
    last_name: string;
  };
  bookings: IAppointmentBookings[];
}

export interface IAppointmentBookings {
  date: string;
  time_slot: string;
  training: string;
}
