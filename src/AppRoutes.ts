export type AppRouteParams = {
  userId: string;
};

export const AppRouteBooks = {
  title: `Book search`,
  path: `/books/:userId`,
};

export const AppRouteBooksSearch = {
  title: `Book search`,
  path: `/books/:userId/search`,
};

export const AppRouteManageBooks = {
  title: `My books`,
  path: `/books/:userId/manage`,
};
