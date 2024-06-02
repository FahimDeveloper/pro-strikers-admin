export type IPost = {
  _id: string;
  title: string;
  image: string;
  category: string;
  description: string;
  content: string;
  createdAt: string;
};

export type IPostParams = {
  search: string | undefined;
  page: number | undefined;
  limit: number | undefined;
  category: string | undefined;
};
