import { http, HttpResponse } from  'msw'
import { db } from '../db';

export const handlers = [
  http.get('/api/articles', () => {
    return HttpResponse.json(
      db.article.getAll())
  })
];
