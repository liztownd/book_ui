import { FunctionComponent, Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  AppRouteBooks,
  AppRouteBooksSearch,
  AppRouteManageBooks,
} from "./AppRoutes";
import PageLoading from "./Components/PageLoading/PageLoading";
import BooksContextProvider from "./Components/Books/BooksContextProvider";
const BooksSearch = lazy(() => import("./Components/Books/BooksSearch"));
const Welcome = lazy(() => import("./Components/Welcome/Welcome"));
const ManageBooks = lazy(() => import("./Components/Books/ManageBooks"));

interface Props {}

const Router: FunctionComponent<Props> = () => {
  return (
    <Suspense fallback={<PageLoading />}>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Welcome />} />
          <Route
            path={`${AppRouteBooks.path}`}
            element={<BooksContextProvider />}
          >
            <Route
              path={`${AppRouteBooksSearch.path}`}
              element={<BooksSearch />}
            />
            <Route
              path={`${AppRouteManageBooks.path}`}
              element={<ManageBooks />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};

export default Router;
