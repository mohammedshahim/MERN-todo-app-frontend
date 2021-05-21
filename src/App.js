import TableView from "./components/TableView/TableView";
import AddNew from "./components/AddNew/AddNew";
import Edit from "./components/Edit/Edit";
import Navigation from "./components/Navigation/Navigation";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { viewData } from "./redux/Actions/Action";

let axiosHander = () =>
  axios
    .get("http://localhost:5000/")
    .then((res) => res.data)
    .catch((err) => console.log(err));

function App() {
  const dispatch = useDispatch();

  axiosHander()
    .then((res) => {
      dispatch(viewData(res));
      return res;
    })
    .catch((err) => console.log(err));

  return (
    <Router>
      <div>
        <Navigation />
        <h1 style={{ textAlign: "center" }}>Welcome to ToDo App</h1>
        <Switch>
          <Route path="/" exact component={TableView} />
          <Route path="/addnew" exact component={AddNew} />
          <Route path="/edit/:id" component={Edit} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
