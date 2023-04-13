import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  Typography,
  IconButton,
  Grid,
  Box,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { makeStyles } from "tss-react/mui";
import ReactHtmlParser from "react-html-parser";
import { BooksContext, IUserBook } from "../../../contexts/BooksContext";
import ReadChip from "./ReadChip";
import LaunchIcon from "@mui/icons-material/Launch";
import Rating from "./RatingStars/Rating";
import genericBook from "../../../assets/genericBook.png";

interface Props {
  isBookDialogOpen: boolean;
  setIsBookDialogOpen: Dispatch<SetStateAction<Props["isBookDialogOpen"]>>;
}

const BookDialog: React.FunctionComponent<Props> = ({
  isBookDialogOpen,
  setIsBookDialogOpen,
}) => {
  const { classes } = useStyles();
  const { addBook, selectedBook, inUserList, deleteBook } =
    useContext(BooksContext);

  const userBook = inUserList(selectedBook?.id || "");

  const userBookInput: Partial<IUserBook> = {
    book_id: selectedBook?.id || "",
    title: selectedBook?.volumeInfo?.title || "",
    subtitle: selectedBook?.volumeInfo?.subtitle || "",
    authors: selectedBook?.volumeInfo?.authors?.join(",") || "",
    publishedDate: selectedBook?.volumeInfo?.publishedDate || "",
    description: selectedBook?.volumeInfo?.description || "",
    smallThumbnail: selectedBook?.volumeInfo?.imageLinks?.smallThumbnail || "",
    thumbnail: selectedBook?.volumeInfo?.imageLinks?.thumbnail || "",
    infoLink: selectedBook?.volumeInfo?.infoLink || "",
    read: false,
    rating: 0,
  };

  return (
    <Dialog open={isBookDialogOpen}>
      {selectedBook && (
        <>
          <DialogTitle className={classes.title}>
            {selectedBook?.volumeInfo?.title}
            <IconButton
              title="Close dialog"
              onClick={() => setIsBookDialogOpen(false)}
            >
              <HighlightOffIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box className={classes.container}>
              <Grid container direction={"column"} spacing={3}>
                <Grid item>
                  <img
                    src={
                      selectedBook?.volumeInfo?.imageLinks?.thumbnail ||
                      genericBook
                    }
                    alt={selectedBook?.volumeInfo?.title}
                    className={classes.image}
                  />
                </Grid>
                <Grid item>
                  <a
                    href={selectedBook?.volumeInfo?.infoLink}
                    target="_blank"
                    rel="noreferrer"
                    className={classes.link}
                  >
                    <Typography variant={"h6"}>
                      {selectedBook?.volumeInfo?.title || ""}
                    </Typography>
                  </a>
                  <Typography>
                    {selectedBook?.volumeInfo?.authors?.join(",")}
                  </Typography>
                  {selectedBook?.volumeInfo?.description?.startsWith(`<`) ? (
                    <div>
                      {ReactHtmlParser(selectedBook?.volumeInfo?.description)}
                    </div>
                  ) : (
                    <Typography variant={"body1"}>
                      {selectedBook?.volumeInfo?.description || ""}
                    </Typography>
                  )}

                  <Typography variant={"subtitle2"}>
                    {selectedBook?.volumeInfo?.publishedDate || ""}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions className={classes.actionArea}>
            <Grid container spacing={1} alignItems={"center"}>
              <Grid item>
                {userBook ? (
                  <div className={classes.userDiv}>
                    <ReadChip
                      id={userBook.id}
                      status={Boolean(userBook?.read)}
                    />
                    <Rating rating={userBook.rating || 0} id={userBook.id} />

                    <Button
                      title="Remove from shelf"
                      color={"secondary"}
                      onClick={() => deleteBook(userBook.id)}
                    >
                      Remove from shelf
                    </Button>
                  </div>
                ) : (
                  <Button
                    title="Add to shelf"
                    variant={"contained"}
                    color={"primary"}
                    onClick={() => addBook(userBookInput)}
                  >
                    Add to shelf
                  </Button>
                )}
              </Grid>
              <Grid item>
                <Button title="View on web">
                  <a
                    href={selectedBook?.volumeInfo?.infoLink}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <LaunchIcon fontSize={"small"} color={"secondary"} />
                  </a>
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
};

export default BookDialog;

const useStyles = makeStyles({ name: "NewBookDialog" })((theme) => ({
  title: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    margin: theme.spacing(2),
  },
  image: {
    // maxWidth: "100px",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  actionArea: {
    padding: theme.spacing(3),
  },
  userDiv: {
    display: "flex",
    alignItems: "center",
  },
}));
