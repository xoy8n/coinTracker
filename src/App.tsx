import { BrowserRouter, Switch, Route } from "react-router-dom";
import { GlobalStyle } from "./style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import Store from "./pages/Store";
import Stores from "./pages/Stores";

const queryClient = new QueryClient({
  /* options */
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Switch>
          <Route path="/:storeId">
            <Store />
          </Route>
          <Route path="/">
            <Stores />
          </Route>
        </Switch>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
