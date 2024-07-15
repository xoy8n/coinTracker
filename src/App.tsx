import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Store from "./pages/Store";
import Stores from "./pages/Stores";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/:storeId" element={<Store />}></Route>
          <Route path="/" element={<Stores />}></Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
