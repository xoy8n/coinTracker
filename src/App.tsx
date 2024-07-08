import Router from "./Router";
// (1) 전역스타일 함수 import
import { createGlobalStyle } from "styled-components";
// (2) tanstack/react-query 기본설정 함수 import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// (1-1) 전역 스타일 컴포넌트 생성
const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
  /* http://meyerweb.com/eric/tools/css/reset/
     v5.0.1 | 20191019
     License: none (public domain)
  */

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, menu, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed,
  figure, figcaption, footer, header, hgroup,
  main, menu, nav, output, ruby, section, summary,
  time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure,
  footer, header, hgroup, main, menu, nav, section {
    display: block;
  }
  /* HTML5 hidden-attribute fix for newer browsers */
  *[hidden] {
    display: none;
  }
  body {
    line-height: 1;
  }
  menu, ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
      border-collapse: collapse;
      border-spacing: 0;
  }
  *{
    box-sizing: border-box;
  }
  body{
      font-weight: 300;
    font-family: 'Source Sans Pro', sans-serif;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
      line-height: 1.2;
  }
  a{
    text-decoration: none;
      color: inherit;
  }
`;

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
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
