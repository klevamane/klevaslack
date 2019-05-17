import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';

// Add semantic ui css
import 'semantic-ui-css/semantic.min.css';

class Root extends React.Component {
    componentDidMount() {
        // detects whether we have a user in our app
        firebase.auth().onAuthStateChanged(user => {
            if(user) {
                this.props.history.push('/');  
            }
        })
    }
    render() { 
        return(
        <switch>
            {/* exact keyword ensures that the right route is matched */}
            <Route exact path="/" component={App} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </switch>
        );
    }
}

const RootWithAuth = withRouter(Root);

ReactDOM.render(
<Router>
<RootWithAuth />
</Router>, 
document.getElementById('root'));
registerServiceWorker();
