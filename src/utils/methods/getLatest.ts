import { ArticleDataTypes, CommentTypes } from '../../types/dataTypes.ts';
import { getDate } from './getDate.ts';

export interface LatestTypes {
  publishedDate: string | null;
  latest?: CommentTypes | ArticleDataTypes;
}

export const getLatest = (array: Array<CommentTypes | ArticleDataTypes>) => {
  const inputArray = [...array];
  const latest = inputArray.sort(
    (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
  )[0];

  const latestData: LatestTypes = {
    publishedDate: latest.publishedAt ? getDate(latest.publishedAt) : null,
    latest,
  };
  return latestData;
};
