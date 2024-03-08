import { getDate } from './getDate.ts';
import { ICommentData } from '../../types/commentTypes.ts';
import { IArticleData } from '../../types/articleTypes.ts';

export interface ILatestTypes {
  publishedDate: string | null;
  latest?: ICommentData | IArticleData;
}

export const getLatest = (array: Array<ICommentData | IArticleData>) => {
  const inputArray = [...array];
  const latest = inputArray.sort((a, b) =>
    'publishedAt' in a.attributes && 'publishedAt' in b.attributes
      ? Number(b.attributes.publishedAt) - Number(a.attributes.publishedAt)
      : Number(b.attributes.createdAt) - Number(a.attributes.createdAt),
  )[0];

  const date =
    'publishedAt' in latest.attributes
      ? latest.attributes.publishedAt
      : latest.attributes.createdAt;

  const latestData: ILatestTypes = {
    publishedDate: date ? getDate(date) : null,
    latest,
  };
  return latestData;
};
