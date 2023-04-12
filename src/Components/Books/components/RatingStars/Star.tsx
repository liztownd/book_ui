import React, { Dispatch, SetStateAction } from "react";
import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

interface Props {
  starNumber: number;
  originalRating: number;
  rating: number;
  setRating: Dispatch<SetStateAction<Props["rating"]>>;
  saveRating: () => void;
}

const Star: React.FunctionComponent<Props> = ({
  starNumber,
  originalRating,
  rating,
  setRating,
  saveRating,
}) => {
  return (
    <>
      {rating >= starNumber ? (
        <StarIcon
          fontSize={"small"}
          color={"primary"}
          onMouseEnter={() => setRating(starNumber)}
          onMouseLeave={() => setRating(originalRating)}
          onClick={(event) => {
            event.preventDefault();
            saveRating();
          }}
        />
      ) : (
        <StarOutlineIcon
          fontSize={"small"}
          color={"secondary"}
          onMouseEnter={() => setRating(starNumber)}
          onMouseLeave={() => setRating(originalRating)}
          onClick={(event) => {
            event.preventDefault();
            saveRating();
          }}
        />
      )}
    </>
  );
};

export default Star;
