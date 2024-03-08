export interface IFilterTypes {
  type: string;
  value: (string | boolean)[];
}

export interface IFilterElementsTypes {
  label: string;
  type: string;
  elements: {
    label: string;
    id: string | number;
  }[];
}

export interface ITableHeaders {
  value: string;
  sortingKey: string | null;
}
