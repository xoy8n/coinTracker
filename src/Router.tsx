import { BrowserRouter, Switch, Route } from "react-router-dom";
import Store from "./routes/Store";
import Stores from "./routes/Stores";

function Router() {
  return (
    //BrowserRouter는 기본적으로 루트 경로에서 시작하므로 별도의 basename 설정이 필요하지 않음
    <BrowserRouter>
      {/*  exact도 있지만 Switch를 사용해서 하나만 매칭되게해봄! */}
      <Switch>
        {/*  react-router에서는 동적으로 변하는 path부분은 :123 이런식으로 작성해야함
        ${storeId} - 단순 문자열로 인식! */}
        <Route path="/:storeId" component={Store} />
        <Route path="/" component={Stores} />
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
