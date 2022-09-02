import Main from "./pages/Main";
import { createGlobalStyle } from 'styled-components';

function App() {
  return (
    <div>
      <GlobalStyle />
      <Main />
    </div>
  );
}

export default App;

const GlobalStyle = createGlobalStyle`
  @import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);
  body { 
     font-family: 'Noto Sans KR', sans-serif;
  }
`;
