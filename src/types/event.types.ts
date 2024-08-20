export type IEvent = {
  _id: string;
  event_name: string;
  event_type: string;
  sport: string;
  start_date: string;
  end_date: string;
  location: string;
  registration_start: string;
  registration_end: string;
  allowed_registrations: number;
  registration: number;
  description: string;
  image: string;
  price: number;
};

export type IEventParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  sport: string | undefined;
  event_type?: string | undefined;
  skill_level?: string | undefined;
};

export type IEventIndividualReservation = {
  _id?: string;
  player_name: string;
  email: string;
  phone: string;
  age: number;
  event: string | IEvent;
  street_address: string;
  sport: string;
  city: string;
  state: string;
  zip_code: string;
  skill_level: string;
};

export interface IEventGroupReservation {
  _id?: string;
  first_name: string;
  last_name: string;
  skill_lavel: string;
  email: string;
  phone: string;
  age: number;
  preferred_time: string;
  preferred_date: string;
  event: string | IEvent;
  street_address: string;
  sport: string;
  city: string;
  state: string;
  zip_code: string;
  team_name: string;
  team: IEventGroupMembers[];
}

export interface IEventGroupMembers {
  first_name: string;
  last_name: string;
  age: number;
  email: string;
  contact: string;
}
