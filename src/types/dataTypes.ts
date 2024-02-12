export interface IRoleTypes {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface ICategoriesTypes {
  id: number;
  title: string;
  description: string;
  uuid: string;
}

export interface IUserTypes {
  id: number;
  username: string;
  email: string;
  avatar: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  uuid: string;
  role: IRoleTypes;
}

export interface ICommentTypes {
  id: number;
  content: string;
  uuid: string;
  shadowed: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  author: IUserTypes;
  article: IArticleDataTypes;
}

export interface IArticleDataTypes {
  id: number;
  title: string;
  cover: string;
  isSticky: boolean;
  description: string;
  body: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  likes: number;
  categories: ICategoriesTypes[];
  tags: string[];
  author: IUserTypes;
  comments: Array<ICommentTypes> | null;
}

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
