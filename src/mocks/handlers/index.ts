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
  http.delete('/api/articles/:articleId', async ({ params }) => {
    const { articleId } = params;
    if (!isNaN(Number(articleId))) {
      db.article.delete({
        where: {
          id: {
            equals: Number(articleId),
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
  http.delete('/api/articles', async ({ request }) => {
    const articleIds = await request.json();
    if (articleIds) {
      db.article.deleteMany({
        where: {
          id: {
            in: articleIds as number[],
          },
        },
      });
      return HttpResponse.json();
    }

    return new HttpResponse(null, { status: 404 });
  }),
];
