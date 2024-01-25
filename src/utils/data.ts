interface dataTypes {
  blogName: string;
  blogUrl: string;
  authorName: string;
  authorUrl: string;
}

export const data: dataTypes = {
  blogName: 'Leśny Gacek',
  blogUrl: 'https://lesnygacek.pl',
  authorName: 'Nerdistry',
  authorUrl: 'https://nerdistry.pl',
};

export const articlesTableHeaders = [
  '',
  'ID',
  'Status',
  'Title',
  'Author',
  'Sticky',
  'Categories',
  'Comments',
  'Likes',
  'Published at',
  '',
];

export const commentsTableHeaders = [
  '',
  'ID',
  'Status',
  "Comment's Author",
  'Article',
  'Comment',
  'Published at',
  '',
];

export const usersTableHeaders = [
  '',
  'ID',
  'Name',
  'Email',
  'Confirmed',
  'Blocked',
  'Role',
  '',
];
