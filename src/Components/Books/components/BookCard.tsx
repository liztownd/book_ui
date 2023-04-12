import React, { MouseEvent, useContext } from "react";
import { BooksContext, IUserBook } from "../../../contexts/BooksContext";
import { Box, Card, CardContent, CardHeader, Button } from "@mui/material";
import { makeStyles } from "tss-react/mui";
import { Typography } from "@mui/material";
import ReadChip from "./ReadChip";
import Rating from "./RatingStars/Rating";

interface Props {
  book: IUserBook;
  getDetails: (event: MouseEvent<HTMLButtonElement>, bookId: string) => void;
}

const BookCard: React.FunctionComponent<Props> = ({ book, getDetails }) => {
  const { deleteBook } = useContext(BooksContext);
  const { classes } = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader>{book.title || ""}</CardHeader>
      <CardContent>
        <Box className={classes.container}>
          <img
            src={book.smallThumbnail || ""}
            alt={book.title}
            className={classes.image}
          />

          <div className={classes.detailsContainer}>
            <div>
              <Typography variant={"h6"}>{book.title || ""}</Typography>
              <Typography variant={"caption"}>{book.authors}</Typography>
            </div>
            <div className={classes.actionsContainer}>
              <ReadChip id={book.id} status={book.read || false} />
              <Rating rating={book.rating || 0} id={book.id} />
              <Button
                title="View details"
                onClick={(event) => getDetails(event, book.book_id)}
              >
                Details
              </Button>
              <Button
                title="Remove from shelf"
                onClick={() => deleteBook(book.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        </Box>
      </CardContent>
    </Card>
  );
};

export default BookCard;

const useStyles = makeStyles({ name: "BookCard" })((theme) => ({
  card: {
    width: "90%",
    margin: theme.spacing(2),
    overflow: "hidden",
  },
  actionsContainer: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    display: "flex",
    margin: theme.spacing(2),
  },
  image: {
    maxWidth: "100px",
    marginRight: theme.spacing(3),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
}));
