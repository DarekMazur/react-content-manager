import { CommentTypes } from '../../__mock__/mockComments.ts';
import { PostTypes } from '../../__mock__/mockPosts.ts';

export const getLatest = (array: Array<CommentTypes | PostTypes>) => {
  const latest = array.sort(
    (a, b) => Number(b.publishedAt) - Number(a.publishedAt),
  )[0];

  interface LatestTypes {
    publishedDate: string;
    latest: CommentTypes | PostTypes;
  }
  const latestData: LatestTypes = {
    publishedDate: `${latest.publishedAt?.getDate()}.${
      latest.publishedAt?.getMonth() && latest.publishedAt?.getMonth() > 9
        ? latest.publishedAt?.getMonth()
        : `0${latest.publishedAt?.getMonth()}`
    }.${latest.publishedAt?.getFullYear()}, ${latest.publishedAt?.getHours()}:${
      latest.publishedAt?.getMinutes() && latest.publishedAt?.getMinutes() > 9
        ? latest.publishedAt?.getMinutes()
        : `0${latest.publishedAt?.getMinutes()}`
    }`,
    latest,
  };
  return latestData;
};
