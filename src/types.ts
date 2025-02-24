export interface ITableItem {
  id: string;
  url: string;
  name: string;
  gender: string;
  birth_year: string;
}

export interface IPeopleDetails {
  id: string;
  url: string;
  name: string;
  gender: string;
  birth_year: string;
  eye_color: string;
  hair_color: string;
  skin_color: string;
  height: string;
  mass: string;
}

export interface IResponse<T> {
  count: string;
  next: string;
  previous: string;
  results: T;
}

export type Theme = 'light' | 'dark';
