import "../styles/globals.scss";
import Router from "next/router";
import React, { useCallback, useEffect } from "react";
import { wrapper } from "../components/store/store";

function MyApp({ Component, pageProps }) {
  const resetWindowScrollPosition = useCallback(
    () => window.scrollTo(0, 0),
    []
  );

  useEffect(() => {
    Router.events.on("routeChangeComplete", resetWindowScrollPosition);

    return () => {
      Router.events.off("routeChangeComplete", resetWindowScrollPosition);
    };
  }, []);
  return <Component {...pageProps} />;
}

export default wrapper.withRedux(MyApp);
