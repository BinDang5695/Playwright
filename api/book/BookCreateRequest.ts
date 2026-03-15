export interface BookCreateRequest {
  name: string;
  category_id: number;
  price: number;
  release_date: string;
  image_ids: number[];
  status: boolean;
}
