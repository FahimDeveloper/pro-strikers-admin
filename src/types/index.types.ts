export type IncomingQueryType<T> = {
  message: string;
  count: number;
  results: T[];
};
