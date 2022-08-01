import "./App.css";
import LandingPage from "./Component/LandingPage";
import VideoPage from './Component/VideoPage';
import { Route, Switch } from "react-router-dom";
// https://f18dd986-cf75-49aa-8603-67c3dd491988.mock.pstmn.io/v1
export const config = {
  endpoint:`https://xflix-backend365.herokuapp.com/v1`
};
function App() {
  return (
    <div style={{ backgroundColor: "#181818", minHeight: "100vh" }}>
      <Switch>
      <Route  path="/" exact  >
        <LandingPage/>
      </Route>
      <Route path="/Video/:id">
        <VideoPage/>
      </Route>
      </Switch>
     
    </div>
  );
}

export default App;
