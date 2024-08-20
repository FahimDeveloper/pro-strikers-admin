export interface ICourseSchedule {
  _id: string;
  course_name: string;
  sport: string;
  trainer: string;
  capacity: number;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  price: number;
}

export type ICourseParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  trainer: string | undefined;
  sport: string | undefined;
};

export type ICourseReservation = {
  _id?: string;
  player_name: string;
  email: string;
  phone: string;
  age: number;
  course: string | ICourseSchedule;
  trainer: string;
  street_address: string;
  sport: string;
  city: string;
  state: string;
  zip_code: string;
  skill_level: string;
};
