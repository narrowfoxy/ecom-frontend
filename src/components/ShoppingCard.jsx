import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import { Link } from "react-router-dom";

const ShoppingCard = ({ name, description, price, images, id }) => {
  const { url = "" } = images.length ? images[0] : {};

  return (
    <Link
      className="w-[45%] dweb:mb-4 dweb:w-[25%] flex justify-center"
      to={`product/${id}`}
    >
      <Card sx={{ maxWidth: "345px", width:"100%" }} className="mb-4 tablet:mr-4">
        <CardActionArea>
          <CardMedia
            component="img"
            height="140"
            image={'https://picsum.photos/200/300'}
            alt="product"
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="h-[40px] overflow-hidden"
            >
              {name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              className="h-[40px] overflow-hidden"
            >
              {description}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <div className="text-green-400 text-2xl">₹ {price}</div>
        </CardActions>
      </Card>
    </Link>
  );
};

export default ShoppingCard;
