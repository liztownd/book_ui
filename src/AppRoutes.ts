export type AppRouteParams = {
  userId: string;
};

export const AppRouteBooks = {
  title: `Book search`,
  path: `/mybookshelf/books/:userId`,
};

export const AppRouteBooksSearch = {
  title: `Book search`,
  path: `/mybookshelf/books/:userId/search`,
};

export const AppRouteManageBooks = {
  title: `My books`,
  path: `/mybookshelf/books/:userId/manage`,
};
