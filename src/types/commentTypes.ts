import { IStrapiAttributeUser } from './userTypes.ts';
import { IStrapiMeta } from './strapiTypes.ts';

export interface IStrapiCommentAttributes {
  body: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  shadowed: boolean;
  user: IStrapiAttributeUser;
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
