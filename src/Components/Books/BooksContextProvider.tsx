import { FunctionComponent } from "react";
import { Provider as BooksProvider } from "../../contexts/BooksContext";
import { Outlet } from "react-router-dom";

interface Props {}

const BooksContextProvider: FunctionComponent<Props> = () => {
  return (
    <BooksProvider>
      <Outlet />
    </BooksProvider>
  );
};

export default BooksContextProvider;
