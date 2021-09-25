import './App.css';
import { Route, Switch } from 'react-router';
import { useSessionContext } from './contexts/SessionContext';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import Homepage from './containers/HomePage/Homepage';
import Dashboard from './containers/Dashboard/Dashboard';
import Protected from './containers/Core/Protected';
import Login from './containers/Login/Login';

function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({...sessionContext, redirectPath: path});
  }

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Switch>
        <Route exact={true} path='/' component={Homepage} />
        <ProtectedRoute {...defaultProtectedRouteProps} path='/dashboard' component={Dashboard} />
        <ProtectedRoute {...defaultProtectedRouteProps} path='/protected' component={Protected} />
        <Route path='/login' component={Login} />
      </Switch>
    </div>
  );
}

export default App;
