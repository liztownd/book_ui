import React, {
  FunctionComponent,
  MouseEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import { BooksContext, IUserBook } from "../../contexts/BooksContext";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import PageContainer from "../PageContainers/PageContainer";
import Header from "../Header/Header";
import { AppRouteManageBooks } from "../../AppRoutes";
import AddBookCard from "./components/AddBookCard";
import BookCard from "./components/BookCard";
import BookDialog from "./components/BookDialog";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

interface Props {}

const ManageBooks: FunctionComponent<Props> = () => {
  const { userBooks, getBook } = useContext(BooksContext);
  const [isBookDialogOpen, setIsBookDialogOpen] = useState(false);

  const [filterBy, setFilterBy] = useState<string | undefined>();
  const [filteredBooks, setFilteredBooks] = useState<IUserBook[]>(userBooks);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filter = (): IUserBook[] => {
    switch (filterBy) {
      case "read":
        return userBooks.filter((book) => book.read === true);
      case "unread":
        return userBooks.filter((book) => book.read !== true);
      default:
        return userBooks;
    }
  };

  useEffect(() => {
    if (!userBooks) {
      return;
    }
    if (!filterBy) {
      setFilteredBooks(userBooks);
    }
    setFilteredBooks(filter());
  }, [filterBy, userBooks]);

  const getDetails = (event: MouseEvent<HTMLButtonElement>, bookId: string) => {
    event.preventDefault();
    getBook(bookId);
    setIsBookDialogOpen(true);
  };

  return (
    <PageContainer>
      <Header title={AppRouteManageBooks.title} />
      {!userBooks.length ? (
        <AddBookCard />
      ) : (
        <>
          <div>
            <IconButton
              id="filter-button"
              title="Filter"
              aria-controls={open ? "filter-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <FilterAltIcon color={"secondary"} />
            </IconButton>
            <Menu
              id="filter-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "filter-button",
              }}
            >
              <MenuItem disabled={true}>Filter by:</MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterBy("read");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <MenuBookIcon fontSize={"small"} />
                </ListItemIcon>
                <ListItemText>Read</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterBy("unread");
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <CollectionsBookmarkIcon fontSize={"small"} />
                </ListItemIcon>
                <ListItemText>Unread</ListItemText>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setFilterBy(undefined);
                  handleClose();
                }}
              >
                <ListItemIcon>
                  <FilterAltOffIcon fontSize={"small"} />
                </ListItemIcon>
                <ListItemText>Clear filters</ListItemText>
              </MenuItem>
            </Menu>
          </div>
          {filteredBooks.map((book) => (
            <BookCard book={book} key={book.id} getDetails={getDetails} />
          ))}
        </>
      )}
      <BookDialog
        isBookDialogOpen={isBookDialogOpen}
        setIsBookDialogOpen={setIsBookDialogOpen}
      />
    </PageContainer>
  );
};

export default ManageBooks;
