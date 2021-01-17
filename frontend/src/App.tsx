import {Route, Switch, withRouter} from 'react-router-dom'
import routes from './routes/index'

const App = () => <Switch>
  {routes.map(
    ({component, path, exact}, index) => <Route
      key={index}
      path={path}
      component={component}
      exact={exact}
    />
  )}
</Switch>

export default App
