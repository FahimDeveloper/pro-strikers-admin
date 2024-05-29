export interface ICourseSchedule {
  _id: string;
  course_name: string;
  sport: string;
  trainer: string;
  capacity: number;
  description: string;
  start_date: Date;
  end_date: Date;
  start_time: Date;
  end_time: Date;
  price: number;
}

export type ICourseScheduleParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  trainer: string | undefined;
  sport: string | undefined;
};
