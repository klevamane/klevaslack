import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Add semantic ui css
import 'semantic-ui-css/semantic.min.css';

import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';

// Actions
import { setUser, clearUser } from './actions';
import Spinner from './Spinner';

const store = createStore(rootReducer, composeWithDevTools());

class Root extends React.Component {
    componentDidMount() {
        // detects whether we have a user in our app
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                // the connect, and mapDispatchToProps takes the 
                // setUser action and put it on the props object of the component that is being wrapped with connect
                this.props.setUser(user)
                this.props.history.push('/');  
            } else {
                console.log('gotherr')
                this.props.clearUser() ;
                this.props.history.push('login');
                
            }
        })
    }
    render() { 
        return this.props.isLoading ? <Spinner /> : (
        <Switch>
            {/* exact keyword ensures that the right route is matched */}
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Switch>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.user.isLoading
});
// note that the functions { setUser, clearUser, ..}are mapDispatchToProps
const RootWithAuth = withRouter(connect(mapStateToProps, { setUser, clearUser })(Root));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
