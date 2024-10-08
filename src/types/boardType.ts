export type ReviewType = {
  _id: string;
  title: string;
  content: string;
  author: number;
  created_at: string;
  updated_at: string;
  views: number;
  authorName: string;
  location: string;
  address: string;
};

export type PlaceType = {
  placeName: string | undefined;
  address: string | undefined;
};
