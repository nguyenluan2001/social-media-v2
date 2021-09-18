import "./App.css"
import MainContent from "./layouts/mainContent/MainContent";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom"
import MainSign from "./layouts/sign/mainSign/MainSign";
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink } from "@apollo/client"
import { setContext } from '@apollo/client/link/context';
import { WebSocketLink } from '@apollo/client/link/ws';
import { split, HttpLink } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import AuthProvider from "./services/context/Auth";
import PrivateRoute from "./components/PrivateRoute";
const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
});
const wsLink = new WebSocketLink({
  uri: 'ws://localhost:5000/graphql',
  options: {
    reconnect: true
  }
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
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
      // true
    );
  },
  wsLink,
  authLink.concat(httpLink),
);
// const client = new ApolloClient({
//   cache: new InMemoryCache(),
//   link: authLink.concat(httpLink),

// })
const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies:{
      User:{
        fields:{
          savedPosts:{
            merge(existing=[],incoming=[])
            {
              console.log("incoming",incoming)
              return [...incoming]
            }
          }
        }
      }
    }
  }),
  link: splitLink,

})

function App() {
 
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <div className="App">
          <Router>
            {/* <Header></Header> */}
            <Switch>
              {/* <Route path="/" exact component={MainContent}></Route> */}
              <Route path="/login" component={MainSign}></Route>
              <Route path="/register" component={MainSign}></Route>
              <PrivateRoute path="/" component={MainContent}></PrivateRoute>
            </Switch>
          </Router>
        </div>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default App;
