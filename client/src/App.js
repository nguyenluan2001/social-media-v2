import "./App.css"
import MainContent from "./layouts/mainContent/MainContent";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import MainSign from "./layouts/sign/mainSign/MainSign";
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import AuthProvider from "./services/context/Auth";
import PrivateRoute from "./components/PrivateRoute";
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),

})
function App() {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="App">
          <Router>
            {/* <Header></Header> */}
            <Switch>
              <PrivateRoute path="/" exact component={MainContent}></PrivateRoute>
              <Route path="/" exact component={MainContent}></Route>
              <Route path="/login" component={MainSign}></Route>
              <Route path="/register" component={MainSign}></Route>
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
