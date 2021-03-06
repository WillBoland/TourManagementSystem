import React from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const Whyus = (props) => {
  const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    //   margin: "5px",
    },
  });

  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12} sm={1}></Grid>
      <Grid item xs={12} sm={10}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  alt="Contemplative Reptile"
                  height="200"
                  width="300"
                  image={require("../../assets/img/image13.jpg")}
                  title="Contemplative Reptile"
                  className={classes.cover}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Why GoBike ? 
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                   the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          
          </Grid>
        </Grid>
        <Grid item direction="column" xs={12} sm={1}></Grid>
      </Grid>
    </Grid>
  );
};

export default Whyus;
