import { IStrapiAttributeUser } from './userTypes.ts';
import { ICommentTypes } from './commentTypes.ts';
import { IStrapiFileTypes, IStrapiMeta } from './strapiTypes.ts';
import { IAttributesCategories } from './categoryTypes.ts';

export interface IArticleTypes {
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  locale: string;
  isSticky: boolean;
  title: string;
  description: string;
  likes: number;
  tags: string;
  body: string;
}

export interface IStrapiUserArticleTypes extends IArticleTypes {
  id: number;
}

export interface IStrapiArticlesAttributes extends IArticleTypes {
  cover: IStrapiFileTypes | null;
  categories: IAttributesCategories;
  author: IStrapiAttributeUser;
  comments: ICommentTypes[];
  localizations: string[];
}

export interface IArticleData {
  id: number;
  attributes: IStrapiArticlesAttributes;
}

export interface IArticlesDataTypes {
  data: Array<IArticleData>;
  meta: IStrapiMeta;
}
