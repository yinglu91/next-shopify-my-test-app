import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import App from "next/app";
import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import "@shopify/polaris/dist/styles.css";
import translations from "@shopify/polaris/locales/en.json";

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    fetch: authenticatedFetch(app),
    fetchOptions: {
      credentials: "include",
    },
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

class MyApp extends App {
  render() {
    const { Component, pageProps, shopOrigin } = this.props;
    return (
      <AppProvider i18n={translations}>
        <Provider
          config={{
            apiKey: API_KEY,
            shopOrigin: shopOrigin,
            forceRedirect: true,
          }}
        >
          <MyProvider Component={Component} {...pageProps} />
        </Provider>
      </AppProvider>
    );
  }
}

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shopOrigin: ctx.query.shop,
  };
};

export default MyApp;

// https://www.youtube.com/watch?v=PIXN032XJJ8&t=124s
// How to Build a Shopify App with Node and React

// More info on how to build a Shopify App with Node and React on our developer documentation: https://bit.ly/2Y9pYWD​
// Learn how to install the App CLI on the GitHub page: https://bit.ly/3aIbYbL​
// More info on App Bridge: https://bit.ly/321LC02​
// The Polaris design system: https://bit.ly/343n9ud
