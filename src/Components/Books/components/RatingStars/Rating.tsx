import React, { useState, useContext } from "react";
import { BooksContext } from "../../../../contexts/BooksContext";
import Star from "./Star";

interface Props {
  rating: number;
  id: number;
}

const Rating: React.FunctionComponent<Props> = ({ rating, id }) => {
  const { updateRating } = useContext(BooksContext);
  const [currentRating, setCurrentRating] = useState(rating);

  const saveRating = () => {
    if (!currentRating) {
      return;
    }
    updateRating(id, currentRating);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", margin: "10px" }}>
      <Star
        starNumber={1}
        originalRating={rating}
        rating={currentRating}
        setRating={setCurrentRating}
        saveRating={saveRating}
      />
      <Star
        starNumber={2}
        originalRating={rating}
        rating={currentRating}
        setRating={setCurrentRating}
        saveRating={saveRating}
      />
      <Star
        starNumber={3}
        originalRating={rating}
        rating={currentRating}
        setRating={setCurrentRating}
        saveRating={saveRating}
      />
      <Star
        starNumber={4}
        originalRating={rating}
        rating={currentRating}
        setRating={setCurrentRating}
        saveRating={saveRating}
      />
      <Star
        starNumber={5}
        originalRating={rating}
        rating={currentRating}
        setRating={setCurrentRating}
        saveRating={saveRating}
      />
    </div>
  );
};

export default Rating;
