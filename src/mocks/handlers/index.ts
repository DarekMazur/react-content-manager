import { http, HttpResponse } from  'msw'
import { db } from '../db';
import { TablePostDataTypes } from '../../components/Organisms/Table/Table';

export const handlers = [
  http.get('/api/articles', () => {
    return HttpResponse.json(
      db.article.getAll())
  }),
  http.patch('/api/articles', async ({request}) => {
    const requestBody = await request.json() as TablePostDataTypes
    console.log(requestBody)
    if (requestBody) {
      console.log(requestBody)
      db.article.update({
        where: {
          uuid: {
            equals: requestBody.uuid
          }
        },
        data: {
          isSticky: () => requestBody.isSticky
        }
      })  
    }    
  })
];
