interface IStrapiMeta {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

interface IStrapiImageFormat {
  ext: string;
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: string | null;
  size: number;
  width: number;
  height: number;
  provider_metadata: {
    public_id: string;
    resource_type: string;
  };
}

interface IArticleTypes {
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

export interface IStrapiFileTypes {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string | null;
      caption: string | null;
      width: number;
      height: number;
      formats: {
        large: IStrapiImageFormat;
        small: IStrapiImageFormat;
        medium: IStrapiFileTypes;
        thumbnail: IStrapiImageFormat;
        hash: string;
        ext: string;
        mime: string;
        size: number;
        url: string;
        previewUrl: null;
        provider: string;
        provider_metadata: {
          public_id: string;
          resource_type: string;
          createdAt: Date;
        };
        updatedAt: Date;
      };
    };
  };
}

interface IStrapiUserArticleTypes extends IArticleTypes {
  id: number;
}

export interface IStrapiArticlesAttributes extends IArticleTypes {
  cover: IStrapiFileTypes | null;
  categories: IDataTypes[];
  author: IUserTypes;
  comments: ICommentTypes[];
  localizations: string[];
}

export interface IStrapiCategoriesAttributes {
  title: string;
  uuid: string;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
  locale: string;
  articles: IDataTypes[];
  localizations: {
    data: string[];
  };
}

export interface IRolesTypes {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

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
  role: IRoleTypes;
  comment: ICommentTypes;
  articles: Array<IStrapiUserArticleTypes>;
}

export interface IStrapiAttributeUser {
  date: IStrapiData;
}

export interface IStrapiRoles extends IRolesTypes {
  nb_users: number;
}

export interface IStrapiData {
  id: number;
  attributes:
    | IStrapiArticlesAttributes
    | IStrapiCategoriesAttributes
    | IStrapiCommentAttributes
    | IUserTypes;
}

export interface IDataTypes {
  data: Array<IStrapiData>;
  meta: IStrapiMeta;
}

export interface IRoleTypes {
  roles: IStrapiRoles[];
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

export interface ITableHeaders {
  value: string;
  sortingKey: string | null;
}
