import { BrowserRouter, Switch, Route, } from "react-router-dom";
import Store from "./routes/Store";
import Stores from "./routes/Stores";

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:storeId" component={Store} />
        <Route path="/" component={Stores}/>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
