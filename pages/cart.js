import React from "react";
import { useContext } from "react";
import { Alert } from "@material-ui/lab";
import {
  Button,
  Card,
  CircularProgress,
  Grid,
  List,
  ListItem,
  MenuItem,
  Select,
  Slide,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import Link from "next/link";

import getCommerce from "../utils/commerce";
import Layout from "../components/Layout";
import { Store } from "../components/Store";
import { useStyles } from "../utils/styles";
import dynamic from "next/dynamic";
import { CART_RETRIEVE_SUCCESS } from "../utils/constant";
import Router from "next/router";

function Cart(props) {
  const classes = useStyles();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const removeFromCartHandler = async (lineItem) => {
    const commerce = getCommerce(props.commercePublicKey);
    const cartData = await commerce.cart.remove(lineItem.id);
    dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
  };

  const quantityChangeHandler = async (lineItem, quantity) => {
    const commerce = getCommerce(props.commercePublicKey);
    const cartData = await commerce.cart.update(lineItem.id, { quantity });
    dispatch({ type: CART_RETRIEVE_SUCCESS, payload: cartData.cart });
  };

  const processToCheckoutHandler = () => {
    Router.push("checkout").then(() => {});
  };

  return (
    <Layout title="home" commercePublicKey={props.commercePublicKey}>
      {cart.loading ? (
        <CircularProgress />
      ) : cart.data.line_items.length === 0 ? (
        <Alert icon={false} severity="error">
          Cart is empty. <Link href="/">Go Shopping</Link>
        </Alert>
      ) : (
        <React.Fragment>
          <Typography variant="h1" component="h1">
            ShoppingCart
          </Typography>
          <Slide direction="up" in>
            <Grid container spacing={1}>
              <Grid item md={9}>
                <TableContainer>
                  <Table area-label="orders">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cart.data.line_items.map((cartItem) => (
                        <TableRow key={cartItem.name}>
                          <TableCell component="th" scope="row">
                            {cartItem.name}
                          </TableCell>
                          <TableCell align="right">
                            <Select
                              labelId="quantity-label"
                              id="quantity"
                              onChange={(e) =>
                                quantityChangeHandler(cartItem, e.target.value)
                              }
                              value={cartItem.quantity}
                            >
                              {[...Array(10).keys()].map((x) => (
                                <MenuItem key={x + 1} value={x + 1}>
                                  {x + 1}
                                </MenuItem>
                              ))}
                            </Select>
                          </TableCell>
                          <TableCell align="right">
                            {cartItem.price.formatted_with_symbol}
                          </TableCell>
                          <TableCell align="right">
                            <Button
                              onClick={() => removeFromCartHandler(cartItem)}
                              variant="contained"
                              color="secondary"
                            >
                              X
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item md={3} xs={12}>
                <Card className={classes.card}>
                  <List>
                    <ListItem>
                      <Grid container>
                        <Typography cariant="h6">
                          Subtotal:{cart.data.subtotal.formatted_with_symbol}
                        </Typography>
                      </Grid>
                    </ListItem>
                    <ListItem>
                      {cart.data.total_items > 0 && (
                        <Button
                          type="button"
                          fullWidth
                          variant="contained"
                          color="primary"
                          onClick={processToCheckoutHandler}
                        >
                          Proceed to checkout
                        </Button>
                      )}
                    </ListItem>
                  </List>
                </Card>
              </Grid>
            </Grid>
          </Slide>
        </React.Fragment>
      )}
    </Layout>
  );
}

export default dynamic(() => Promise.resolve(Cart), {
  ssr: false,
});
