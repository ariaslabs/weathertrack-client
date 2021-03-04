import Home from './views/Home.jsx'
import City from './views/City.jsx'
import {
  Switch,
  Route,
  useHistory,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  let history = useHistory();

  const handleHistory = (path) => {
    history.push(path);
  } 

  return (
    <div className="App">
      <div>
        <nav>
          <Link id="title" to="/">Weathertrack</Link>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <div>
          <Switch>
            <Route path="/city/">
              <City />
            </Route>
            <Route path="/">
              <Home history={handleHistory} />
            </Route>
          </Switch>
        </div>
      </div>
    </div>
  );
}


export default App;
