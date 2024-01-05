import { http, HttpResponse } from 'msw';
import { db } from '../db';
import { ArticleDataTypes } from '../../types/dataTypes';

export const handlers = [
  http.get('/api/articles', () => {
    return HttpResponse.json(db.article.getAll());
  }),
  http.patch('/api/articles', async ({ request }) => {
    const updatedArticle = (await request.json()) as ArticleDataTypes;
    if (updatedArticle) {
      db.article.update({
        where: {
          uuid: {
            equals: updatedArticle.uuid,
          },
        },
        data: {
          isSticky: () => updatedArticle.isSticky,
        },
      });
      return HttpResponse.json(updatedArticle, { status: 201 });
    }
  }),
];
