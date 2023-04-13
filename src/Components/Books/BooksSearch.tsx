import React, {
  FormEventHandler,
  FunctionComponent,
  MouseEvent,
  useState,
} from "react";
import { useContext } from "react";
import { BooksContext } from "../../contexts/BooksContext";
import ManageSearchIcon from "@mui/icons-material/ManageSearch";
import PageContainer from "../PageContainers/PageContainer";
import Header from "../Header/Header";
import BookDisplay from "./components/BookDisplay";
import { AppRouteBooksSearch } from "../../AppRoutes";
import Search from "./components/Search";
import BookDialog from "./components/BookDialog";
import { Card, LinearProgress, Typography } from "@mui/material";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import { makeStyles } from "tss-react/mui";

interface Props {}

const BooksSearch: FunctionComponent<Props> = () => {
  const { setSelectedBook, bookSearch, searchResults, isSearchLoading } =
    useContext(BooksContext);

  const { classes } = useStyles();
  const [keyword, setKeyword] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");

  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);

  const handleClick = (event: MouseEvent<HTMLButtonElement>, index: number) => {
    event.preventDefault();
    if (!searchResults) {
      return;
    }
    setSelectedBook(searchResults[index]);
    setIsBookDialogOpen(true);
  };

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const searchParams = {
      keyword: keyword.trim().replace(" ", "%"),
      author: author.trim().replace(" ", "%"),
      title: title.trim().replace(" ", "%"),
      publisher: publisher.trim().replace(" ", "%"),
    };
    bookSearch(searchParams);
  };

  return (
    <PageContainer>
      <Header
        title={AppRouteBooksSearch.title}
        icon={<ManageSearchIcon fontSize={"large"} />}
      />
      <Search
        onSubmit={onSubmit}
        keyword={keyword}
        setKeyword={setKeyword}
        author={author}
        setAuthor={setAuthor}
        title={title}
        setTitle={setTitle}
        publisher={publisher}
        setPublisher={setPublisher}
      />
      <hr />
      {isSearchLoading && <LinearProgress color={"secondary"} />}
      {searchResults?.length ? (
        searchResults.map((book, index) => (
          <React.Fragment key={book.id}>
            <BookDisplay
              bookDetails={book}
              index={index}
              handleClick={handleClick}
            />
            <hr />
          </React.Fragment>
        ))
      ) : (
        <Card className={classes.noResults}>
          <QueryStatsIcon color={"secondary"} fontSize={"large"} />
          <Typography variant={"h6"}>
            Oops! Looks like we didn't find any good matches for your search.
            Please try again.
          </Typography>
        </Card>
      )}
      <BookDialog
        isBookDialogOpen={isBookDialogOpen}
        setIsBookDialogOpen={setIsBookDialogOpen}
      />
    </PageContainer>
  );
};

export default BooksSearch;

const useStyles = makeStyles({ name: "BookSearch" })((theme) => ({
  noResults: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: theme.spacing(3),
    marginTop: theme.spacing(3),
    height: theme.spacing(20),
  },
}));
