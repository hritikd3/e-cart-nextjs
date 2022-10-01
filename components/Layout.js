import { AppBar, Badge, Box, CircularProgress, Container, CssBaseline, Link, ThemeProvider, Toolbar, Typography} from "@material-ui/core";
import Head from "next/head";
import React from "react";
import NextLink from 'next/link'
import { theme, useStyles } from "../utils/styles";

export default function Layout({
    children,
    commercePublicKey,
    title= 'E-Cart',
}){

    const  classes= useStyles();
    return (
      <React.Fragment>
        <Head>
          <meta charSet="utf-8" />
          <title>{`${title} - E-Cart`}</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="width-device-width,initial scale=1, shrink-to-filteer"
          />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar
            position="static"
            color="default"
            elevation={0}
            className={classes.appBar}
          >
            <Toolbar className={classes.toolbar}>
              <NextLink href="/">
                <Link
                  varient="h6"
                  color="inherit"
                  noWrap
                  href="/"
                  className={classes.toolbarTitile}
                >
                  E-Cart
                </Link>
              </NextLink>

              <nav>
                <NextLink href="/cart">
                  <Link
                    variant="button"
                    color="textPrimary"
                    href="/cart"
                    className={classes.link}
                  >
                    {cart.loading ? (
                      <CircularProgress />
                    ) : cart.data.total_items > 0 ? (
                      <Badge
                        badgeContent={cart.data.total_items}
                        color="primary"
                      >
                        Cart
                      </Badge>
                    ) : (
                      "Cart"
                    )}
                  </Link>
                </NextLink>
              </nav>
            </Toolbar>
          </AppBar>
          <Container component="main" className={classes.main}>
            {children}
          </Container>
          <Container maxWidth="md" component="footer">
            <Box mt={5}>
              <Typography variant="body2" color="textSecondary" align="center">
                {"© "}
                E-Cart
                {"."}
              </Typography>
            </Box>
          </Container>
        </ThemeProvider>
      </React.Fragment>
    );
}