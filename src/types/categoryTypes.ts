import { IStrapiMeta } from './strapiTypes.ts';
import { IArticleData } from './articleTypes.ts';

export interface IStrapiCategoriesAttributes {
  title: string;
  uuid: string;
  description: string | null;
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

export interface ICategoryData {
  id: number;
  attributes: IStrapiCategoriesAttributes;
}

export interface ICategoriesDataTypes {
  data: Array<ICategoryData>;
  meta: IStrapiMeta;
}
