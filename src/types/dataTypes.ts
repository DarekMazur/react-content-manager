export interface RoleTypes {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface UserTypes {
  id: number;
  username: string;
  email: string;
  avatar: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  uuid: string;
  role: RoleTypes;
}

export interface CommentTypes {
  id: number;
  content: string;
  uuid: string;
  shadowed: boolean;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date;
  author: UserTypes;
  article: ArticleDataTypes;
}

export type ArticleDataTypes = {
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
  categories: string;
  tags: string[];
  author: {
    uuid: string;
    username: string;
    email: string;
    avatar: string;
    role: RoleTypes;
  };
  comments: Array<CommentTypes> | null;
};
