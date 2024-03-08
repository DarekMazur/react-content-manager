import { IStrapiMeta } from './strapiTypes.ts';
import { IArticleData } from './articleTypes.ts';

export interface IStrapiCategoriesAttributes {
  title: string;
  uuid: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  locale: string;
  articles: Array<IArticleData>;
  localizations: {
    data: string[];
  };
}

export interface IAttributesCategories {
  data: ICategoryData[];
}

export interface ICategoryBaseAttrs {
  uuid: string;
  title: string;
  description: string;
}

export interface ICategoryBaseData {
  id: number;
  attributes: ICategoryBaseAttrs;
}

export interface ICategoryData {
  id: number;
  attributes: IStrapiCategoriesAttributes;
}

export interface ICategoriesDataTypes {
  data: Array<ICategoryData>;
  meta: IStrapiMeta;
}
