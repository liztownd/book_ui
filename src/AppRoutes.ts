export type AppRouteParams = {
  userId: string;
};

export const AppRouteBooks = {
  title: `Books`,
  path: `/mybookshelf/books/:userId`,
};

export const AppRouteBooksSearch = {
  title: `Search`,
  path: `/mybookshelf/books/:userId/search`,
};

export const AppRouteManageBooks = {
  title: `My books`,
  path: `/mybookshelf/books/:userId/manage`,
};
