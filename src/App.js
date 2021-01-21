import CustomerView from "./views/CustomerView";
import {Container} from "@material-ui/core";
import Nav from "./components/Nav";
import GlobalStyle from "./theme/Theme";

function App() {
  return (
      <>
          <GlobalStyle/>
          <Nav />
          <Container>
            <CustomerView />
          </Container>
      </>
  );
}

export default App;
