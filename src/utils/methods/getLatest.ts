import { IArticleDataTypes, ICommentTypes } from '../../types/dataTypes.ts';
import { getDate } from './getDate.ts';

export interface ILatestTypes {
  publishedDate: string | null;
  latest?: ICommentTypes | IArticleDataTypes;
}

export const getLatest = (array: Array<ICommentTypes | IArticleDataTypes>) => {
  const inputArray = [...array];
  const latest = inputArray.sort(
    (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
  )[0];

  const latestData: ILatestTypes = {
    publishedDate: latest.publishedAt ? getDate(latest.publishedAt) : null,
    latest,
  };
  return latestData;
};
