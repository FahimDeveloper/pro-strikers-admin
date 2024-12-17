export interface IBundleCreditPackResponse {
  _id: string;
  package: string;
  email: string;
  hours: number;
  validity: string;
  attendance: Array<IAttendance>;
  piching_machine: boolean;
  active: boolean;
}

export interface IBundleCreditPackRequest {
  package: string;
  email: string;
  hours: number;
  validity: string;
  attendance: Array<IAttendance>;
  piching_machine: boolean;
  active: boolean;
}

export interface IAttendance {
  date: string;
  times: Array<IAttendanceTime>;
}

export interface IAttendanceTime {
  cage: string;
  hour: number;
  start_time: string;
  end_time: string;
}

export type IPurchasedBundleCreditPackParams = {
  search: string | undefined;
  active: boolean | undefined;
  piching_machine: boolean | undefined;
  page: number | undefined;
  limit: number | undefined;
};
