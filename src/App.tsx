import Router from "./Router";
import { GlobalStyle } from "./style/GlobalStyle";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  /* options */
});

function App() {
  return (
    // (2-1) tanstack/react-query 기본설정(최상위 컴포넌트를 감싸도록)
    <QueryClientProvider client={queryClient}>
      {/* (1-2) 최상위 컴포넌트에 추가 : 하위 모든 컴포넌트에 일괄 스타일 적용 */}
      <GlobalStyle />
      <Router />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
