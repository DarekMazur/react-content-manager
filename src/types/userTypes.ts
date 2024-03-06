import { IStrapiUserArticleTypes } from './articleTypes.ts';
import { IRolesData, IStrapiRoles } from './roleTypes.ts';
import { ICommentTypes } from './commentTypes.ts';
import { IStrapiImageAttributes } from './strapiTypes.ts';

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
  comments: Array<ICommentTypes>;
  articles: Array<IStrapiUserArticleTypes>;
  avatar: IStrapiImageAttributes | null;
}

export interface IStrapiAttributeUser {
  data: IUserData;
}

export interface IPopulatedUserAttributes extends IUserTypes {
  role: IRolesData;
}

export interface IUserData {
  id: number;
  attributes: IStrapiUser;
}

export interface IPopulatedUser {
  data: {
    id: number;
    attributes: IPopulatedUserAttributes;
  };
}
