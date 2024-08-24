export interface IFacilitySchedule {
  _id: string;
  facility_name: string;
  sport: string;
  facility: string;
  facility_duration: number;
  trainer: string;
  description: string;
  price: number;
  lane: string;
  schedules: Array<IFacilityDaySchedule>;
}

export interface IFacilityDaySchedule {
  day: string;
  active: boolean;
  start_time: string;
  end_time: string;
}

export type IFacilityScheduleParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  facility: string | undefined;
  sport: string | undefined;
};
