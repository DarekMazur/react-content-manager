import { IPopulatedUser, IStrapiAttributeUser } from './userTypes.ts';
import { IStrapiMeta } from './strapiTypes.ts';
import { IStrapiAttributeArticle } from './articleTypes.ts';

export interface IStrapiCommentAttributes {
  body: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  shadowed: boolean;
  author: IStrapiAttributeUser;
  article: IStrapiAttributeArticle;
}

export interface ICommentTypes extends IStrapiCommentAttributes {
  id: number;
}

export interface ICommentData {
  id: number;
  attributes: IStrapiCommentAttributes;
}

export interface ICommentsDataTypes {
  data: Array<ICommentData>;
  meta: IStrapiMeta;
}

export interface ICommentPopulated {
  id: number;
  attributes: {
    body: string;
    uuid: string;
    createdAt: Date;
    updatedAt: Date;
    shadowed: boolean;
    author: IPopulatedUser;
    article: IStrapiAttributeArticle;
  };
}

export interface ICommentPopulatedData {
  data: ICommentPopulated;
  meta: Record<PropertyKey, never>;
}
