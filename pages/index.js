import React from "react";
import { Alert } from "@material-ui/lab";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  makeStyles,
  Slide,
  Typography,
} from "@material-ui/core";
import Link from "next/link";

import getCommerce from "../utils/commerce";
import Layout from "../components/Layout";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 160,
  },
});

export default function Home(props) {
  const classes = useStyles();

  const { products } = props;
  return (
    <Layout title="home" commercePublicKey={props.commercePublicKey}>
      {products.length === 0 && <Alert>No product found</Alert>}
      <Grid container spacing={1}>
        {products?.map((product) => (
          <Grid item md={3} key={product.id}>
            <Slide direction="up" in={true}>
              <Card>
                <Link href={`/products/${product.permalink}`} passHref>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      component="img"
                      alt={product.name}
                      image={product.media.source}
                    />
                    <CardContent>
                      <Typography
                        gutterButtom
                        variant="body2"
                        color="textPrimary"
                        component="p"
                      >
                        {product.name}
                      </Typography>
                      <Box>
                        <Typography
                          variant="body1"
                          color="textPrimary"
                          component="p"
                        >
                          {product.price.formatted_with_symbol}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Link>
              </Card>
            </Slide>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

export async function getStaticProps() {
  const commerce = getCommerce();
  const { data: products } = await commerce.products.list();
  return {
    props: {
      products,
    },
  };
}
