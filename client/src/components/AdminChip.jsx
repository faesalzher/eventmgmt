import React from "react";
import {
  Chip,
} from "@material-ui/core";


export default function AdminChip(props) {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 'fit-content' }}>
      <Chip
        size="small"
        color="secondary"
        variant="outlined"
        label={"Admin"}
      />
    </div>
  );
}
