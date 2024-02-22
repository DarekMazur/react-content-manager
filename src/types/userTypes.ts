import { IStrapiUserArticleTypes } from './articleTypes.ts';
import { IStrapiRoles } from './roleTypes.ts';
import { ICommentTypes } from './commentTypes.ts';
import { IStrapiImageAttributes, IStrapiMeta } from './strapiTypes.ts';

export interface IUserTypes {
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IStrapiUser extends IUserTypes {
  id: number;
  role: IStrapiRoles;
  comment: ICommentTypes;
  articles: Array<IStrapiUserArticleTypes>;
  avatar: IStrapiImageAttributes | null;
}

export interface IStrapiAttributeUser {
  data: IUserData;
}

export interface IUserData {
  id: number;
  attributes: IStrapiUser;
}

export interface IUserDataTypes {
  data: Array<IUserData>;
  meta: IStrapiMeta;
}
