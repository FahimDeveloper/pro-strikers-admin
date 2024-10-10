export type IBrand = {
  _id: string;
  brand_name: string;
  brand_logo: string;
  category: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export type IBrandParams = {
  page: number;
  limit: number;
  search?: string;
  category?: string;
};
