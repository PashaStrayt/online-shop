export type ReviewType = {
  user_id: string;
  rate: 0 | 1 | 2 | 3 | 4 | 5;
  text: string;
  date: Date;
}