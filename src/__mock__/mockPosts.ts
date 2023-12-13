import { faker } from '@faker-js/faker';
import { mockUsers, UserTypes } from './mockUsers.ts';
import { RoleTypes } from './mockRoles.ts';
import { CommentTypes, mockComments } from './mockComments.ts';

export interface PostTypes {
  id: number;
  title: string;
  description: string;
  body: string;
  uuid: string;
  createdAt: Date;
  updatedAt: Date;
  publishedAt: Date | null;
  likes: number;
  author: {
    uuid: string;
    username: string;
    email: string;
    avatar: string;
    role: RoleTypes;
  };
  comments: Array<CommentTypes>;
}

export const mockPosts: Array<PostTypes> = [];
export const randomizeLength = Math.floor(Math.random() * 300);
const draftChance = 25;

const users: Array<UserTypes> = mockUsers.filter((user) => user.role.id !== 4);
let allComments = mockComments;

for (let i = 0; i <= randomizeLength; i++) {
  const userId = faker.number.int({ min: 1, max: mockUsers.length });
  const postAuthor: Array<UserTypes> = users.filter(
    (user) => user.id === userId,
  );

  if (postAuthor.length > 0) {
    const comments: Array<CommentTypes> = [];
    const commentsLength = allComments.length >= 10 ? 10 : allComments.length;

    if (commentsLength > 0) {
      for (let j = 0; j <= commentsLength; j++) {
        const commentId = Math.floor(Math.random() * mockComments.length);
        comments.push(
          allComments.filter((comment) => comment.id === commentId)[0],
        );

        allComments = allComments.filter((comment) => comment.id !== commentId);
      }
    }

    const createdDate = faker.date.past();
    const isPublished = Math.floor(Math.random() * 100) <= draftChance;

    const post: PostTypes = {
      id: i + 1,
      title: faker.lorem.sentence({ min: 2, max: 6 }),
      description: faker.lorem.words({ min: 0, max: 14 }),
      body: faker.lorem.paragraphs({ min: 5, max: 29 }),
      uuid: faker.string.uuid(),
      createdAt: createdDate,
      updatedAt: createdDate,
      publishedAt: isPublished ? createdDate : null,
      likes: faker.number.int({ min: 0, max: 500 }),
      author: {
        uuid: postAuthor[0].uuid,
        username: postAuthor[0].username,
        email: postAuthor[0].email,
        avatar: postAuthor[0].avatar,
        role: postAuthor[0].role,
      },
      comments,
    };
    mockPosts.push(post);
  }
}
