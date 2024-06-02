export type IEvent = {
  _id: string;
  event_name: string;
  event_type: string;
  sport: string;
  start_date: Date;
  end_date: Date;
  location: string;
  registration_start: Date;
  registration_end: Date;
  allowed_registrations: number;
  registration: number;
  description: string;
  price: number;
};

export type IEventParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  sport: string | undefined;
  event_type: string | undefined;
};
