import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const Table = ({ allExpense }) => {
  console.log("allExpense", allExpense);

  return (
    <div>
      {allExpense.map((data, index) => (
        <Card
          key={index}
          sx={{
            minWidth: 275,
            backgroundColor: "#959e9e",
            margin: "5px",
            maxWidth: 345,
          }}
        >
          <CardContent>
            <Typography variant="h5" component="div">
              {data.selectedUser}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              {data.desc}
            </Typography>
            <Typography variant="body2">{data.amount}</Typography>
          </CardContent>
          <CardActions>
            <IconButton aria-label="delete" size="large">
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </CardActions>
        </Card>
      ))}
    </div>
  );
};

export default Table;
