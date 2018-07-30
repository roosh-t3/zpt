import React, {Component, Fragment} from 'react';
import './App.css';

import {connect} from 'react-redux'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom'
import Index from './pages/Index/Index'
import Chat from './pages/Chat/Chat'


class App extends Component {

    render() {
        let routes = (
            <Switch>
                <Route path="/" exact component={Index} />
                <Redirect to="/" />
            </Switch>
        );
        if(this.props.user !== null){
            routes = (
                <Switch>
                    <Route path="/" exact component={Index}/>
                    <Route path="/chat" exact component={Chat}/>
                    <Redirect to="/" />
                </Switch>
            );
        }

        return (
            <Fragment>
                {routes}
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
    };
};

export default withRouter(connect(mapStateToProps, null)(App));
