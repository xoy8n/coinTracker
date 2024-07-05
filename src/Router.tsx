import { BrowserRouter, Switch, Route } from "react-router-dom";
import Movie from "./routes/Store";
import Movies from "./routes/Stores";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:storeId">
          <Movie />
        </Route>

        <Route path="/">
          <Movies />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
