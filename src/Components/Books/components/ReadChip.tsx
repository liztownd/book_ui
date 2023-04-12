import React, { useContext, useState } from "react";
import { Chip } from "@mui/material";
import { BooksContext } from "../../../contexts/BooksContext";

interface Props {
  id: number;
  status: boolean;
}

const ReadChip: React.FunctionComponent<Props> = ({ id, status }) => {
  const { updateStatus } = useContext(BooksContext);
  const [chipStatus, setChipStatus] = useState(status);

  return (
    <Chip
      style={{ margin: "10px", width: "150px" }}
      label={chipStatus ? "Read" : "Mark as read"}
      variant={chipStatus ? "filled" : "outlined"}
      color={"secondary"}
      onClick={() => {
        setChipStatus(!chipStatus);
        updateStatus(id, !chipStatus);
      }}
    />
  );
};

export default ReadChip;
