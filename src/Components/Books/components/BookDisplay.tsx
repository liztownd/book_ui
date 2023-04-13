import React, { useContext, MouseEvent } from "react";
import { Grid, Typography, Box, Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import {
  BooksContext,
  IGoogleBook,
  IUserBook,
} from "../../../contexts/BooksContext";
import LaunchIcon from "@mui/icons-material/Launch";
import ReadChip from "./ReadChip";
import Rating from "./RatingStars/Rating";
import genericBook from "../../../assets/genericBook.png";

interface Props {
  bookDetails: IGoogleBook;
  index: number;
  handleClick: (event: MouseEvent<HTMLButtonElement>, index: number) => void;
}

const BookDisplay: React.FunctionComponent<Props> = ({
  bookDetails,
  index,
  handleClick,
}) => {
  const { inUserList, deleteBook, addBook } = useContext(BooksContext);
  const { classes } = useStyles();

  const userBook = inUserList(bookDetails.id);

  const userBookInput: Partial<IUserBook> = {
    book_id: bookDetails?.id || "",
    title: bookDetails?.volumeInfo?.title || "",
    subtitle: bookDetails?.volumeInfo?.subtitle || "",
    authors: bookDetails?.volumeInfo?.authors?.join(",") || "",
    publishedDate: bookDetails?.volumeInfo?.publishedDate || "",
    description: bookDetails?.volumeInfo?.description || "",
    smallThumbnail: bookDetails?.volumeInfo?.imageLinks?.smallThumbnail || "",
    thumbnail: bookDetails?.volumeInfo?.imageLinks?.thumbnail || "",
    infoLink: bookDetails?.volumeInfo?.infoLink || "",
    read: false,
    rating: 0,
  };

  return (
    <Box className={classes.container}>
      <Grid container direction={"row"} spacing={3}>
        <Grid item sm={12} md={2}>
          <img
            src={
              bookDetails?.volumeInfo?.imageLinks?.smallThumbnail || genericBook
            }
            alt={bookDetails?.volumeInfo?.title}
            className={classes.image}
          />
        </Grid>
        <Grid item sm={12} md={10}>
          <Grid container direction={"column"}>
            <Grid item>
              <Typography variant={"h5"} color={"primary"} gutterBottom>
                {bookDetails?.volumeInfo?.title || ""}
                {bookDetails?.volumeInfo?.subtitle
                  ? `: ${bookDetails?.volumeInfo?.subtitle}`
                  : ""}
              </Typography>
            </Grid>
            <Grid item>
              <Typography gutterBottom>
                {bookDetails?.volumeInfo?.authors?.join(", ")}
              </Typography>
            </Grid>
            <Grid item>
              <div className={classes.descriptionContainer}>
                {bookDetails?.volumeInfo?.description || ""}
              </div>
            </Grid>
            <Grid item>
              <Typography variant={"subtitle2"} gutterBottom>
                Published: {bookDetails?.volumeInfo?.publishedDate || ""}
              </Typography>
            </Grid>
            <Grid item>
              <Grid
                container
                spacing={1}
                alignItems={"center"}
                className={classes.actionContainer}
              >
                <Grid item>
                  {userBook ? (
                    <div className={classes.userBookDiv}>
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
                      variant={"outlined"}
                      color={"primary"}
                      onClick={() => addBook(userBookInput)}
                    >
                      Add to shelf
                    </Button>
                  )}
                </Grid>
                <Grid item>
                  <Button
                    title="View details"
                    color={"secondary"}
                    onClick={(event) => {
                      handleClick(event, index);
                    }}
                  >
                    Details
                  </Button>
                </Grid>
                <Grid item>
                  <Button title="View on web">
                    <a
                      href={bookDetails?.volumeInfo?.infoLink}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <LaunchIcon fontSize={"small"} color={"secondary"} />
                    </a>
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default BookDisplay;

const useStyles = makeStyles({ name: "BookDisplay" })((theme) => ({
  container: {
    margin: theme.spacing(2),
  },
  image: {
    marginTop: theme.spacing(2),
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: "none",
  },
  descriptionContainer: {
    overflow: "hidden",
    maxHeight: "78px",
  },
  actionContainer: {
    margin: theme.spacing(2, 0),
  },
  userBookDiv: {
    display: "flex",
    alignItems: "center",
  },
}));
