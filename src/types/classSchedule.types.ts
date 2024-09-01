export interface IClassSchedule {
  _id: string;
  class_name: string;
  sport: string;
  description: string;
  facility: string;
  trainer: string;
  level: string;
  capacity: number;
  price: number;
  schedules: IClassDaySchedule[];
}

export interface IClassDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}

export type IClassScheduleParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  facility: string | undefined;
  trainer: string | undefined;
  sport: string | undefined;
  level: string | undefined;
};
