import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./components/Body";
import Feed from "./components/Feed";
import Login from "./components/Login";
import appStore from "./utils/appStore";
import Profile from "./components/Profile";

function App() {
  return (
    <Provider store={appStore}>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
