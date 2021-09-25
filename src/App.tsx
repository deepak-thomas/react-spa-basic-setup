import './App.css';
import { Route, Switch } from 'react-router';
import { useSessionContext } from './contexts/SessionContext';
import ProtectedRoute, { ProtectedRouteProps } from './components/ProtectedRoute';
import { lazy, Suspense } from 'react';
const Homepage = lazy(()=> import('./containers/HomePage/Homepage'));
const Dashboard = lazy(()=> import('./containers/Dashboard/Dashboard'));
const Protected = lazy(()=> import('./containers/Core/Protected'));
const Login = lazy(()=> import('./containers/Login/Login'));

function App() {
  const [sessionContext, updateSessionContext] = useSessionContext();

  const setRedirectPath = (path: string) => {
    updateSessionContext({ ...sessionContext, redirectPath: path });
  }

  const defaultProtectedRouteProps: ProtectedRouteProps = {
    isAuthenticated: !!sessionContext.isAuthenticated,
    authenticationPath: '/login',
    redirectPath: sessionContext.redirectPath,
    setRedirectPath: setRedirectPath
  };

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact={true} path='/' render={()=><Homepage></Homepage>} />
          <ProtectedRoute {...defaultProtectedRouteProps} path='/dashboard' render={()=><Dashboard></Dashboard>} />
          <ProtectedRoute {...defaultProtectedRouteProps} path='/protected' render={()=><Protected></Protected>} />
          <Route path='/login' render={()=><Login></Login>} />
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
