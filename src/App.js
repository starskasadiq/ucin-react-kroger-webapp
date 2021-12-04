import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";
import DataPullPage from "./pages/DataPullPage";
import DataLoadPage from "./pages/DataLoadPage";
import DataAnalysisPage from "./pages/DataAnalysisPage";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/auth">
          <AuthPage />
        </Route>
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/data">
          {authCtx.isLoggedIn && <DataPullPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/load">
          {authCtx.isLoggedIn && <DataLoadPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
        <Route path="/analyze">
          {authCtx.isLoggedIn && <DataAnalysisPage />}
          {!authCtx.isLoggedIn && <Redirect to="/auth"></Redirect>}
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
