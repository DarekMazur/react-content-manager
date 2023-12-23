import { CommentTypes } from '../../__mock__/mockComments.ts';
import { PostTypes } from '../../__mock__/mockPosts.ts';
import { getDate } from './getDate.ts';

export const getLatest = (array: Array<CommentTypes | PostTypes>) => {
  const latest = array.sort(
    (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
  )[0];

  interface LatestTypes {
    publishedDate: string | null;
    latest: CommentTypes | PostTypes;
  }
  const latestData: LatestTypes = {
    publishedDate: latest.publishedAt ? getDate(latest.publishedAt) : null,
    latest,
  };
  return latestData;
};
