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
        size: 412.26;
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

export interface IStrapiArticleData {
  id: number;
  attributes: IStrapiArticlesAttributes;
}

export interface IStrapiArticlesAttributes {
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
  cover: IStrapiFileTypes | null;
  categories: ICategoriesTypes[];
  author: IUserTypes;
  comments: ICommentTypes[];
  localizations: string[];
}

export interface IStrapiRoles {
  id: number;
  name: string;
  description: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
  nb_users: number;
}

export interface IArticleDataTypes {
  data: IStrapiArticleData[];
  meta: IStrapiMeta;
}

export interface IRoleTypes {
  roles: IStrapiRoles[];
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
