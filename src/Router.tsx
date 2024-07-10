import { BrowserRouter, Switch, Route } from "react-router-dom";
import Store from "./pages/Store";
import Stores from "./pages/Stores";

function Router() {
  return (
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
  );
}
export default Router;
