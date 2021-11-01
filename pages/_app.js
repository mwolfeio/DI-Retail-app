import fetch from "node-fetch";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App, { Container } from "next/app";
import Cookies from "js-cookie";
import { AppProvider } from "@shopify/polaris";
import { Provider } from "@shopify/app-bridge-react";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";
import ClientRouter from "../components/ClientRouter";

import { auth } from "../lib/firebase";

import "../style/global.css";

const client = new ApolloClient({
  uri: `${process.env.HOST}/api/shopify/admin/2020-10/graphql`,
  fetch: fetch,
  fetchOptions: {
    credentials: "include",
  },
});

console.log("The Host is: ", process.env.HOST);

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;
    const shopOrigin = pageProps.shopOrigin ?? Cookies.get("shopOrigin");

    //sign in the user
    auth.onAuthStateChanged((user) => {
      if (!user) {
        console.log("App unauthenticated");
        auth.signInWithEmailAndPassword(
          process.env.FBAUTHEMAIL,
          process.env.FBAUTHPASS
        );
      } else {
        console.log("App authenticated");
      }
    });

    console.log("shopOrigin: ", shopOrigin);
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: process.env.API_KEY,
            shopOrigin: shopOrigin,
            forceRedirect: true,
          }}
        >
          <ClientRouter />
          <ApolloProvider client={client}>
            <Component {...pageProps} />
          </ApolloProvider>
        </Provider>
      </AppProvider>
    );
  }
}

export default MyApp;
