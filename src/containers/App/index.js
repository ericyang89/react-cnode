import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import lazyme from 'lazy-load-react';

import {appActions} from '../../core/app';
import {TopicAllPage, TopicAskPage, TopicGoodPage, TopicJobPage, TopicSharePage} from '../TopicPage';
import AppHeader from './AppHeader';
import AppNav from '../../components/AppNav';
//import PrivateRoute from '../../components/PrivateRoute';
//import UserPage from '../UserPage';

import './index.css';

export class App extends Component {

  constructor() {
    super(...arguments);
    this.onHeaderLeftClick = this.onHeaderLeftClick.bind(this);
  }

  onHeaderLeftClick() {
    const {toggleAppNav, app} = this.props;
    toggleAppNav(!app.get('appNavIsShow'));
  }

  render() {
    const {props, onHeaderLeftClick} = this;
    const {toggleAppNav, app, me} = props;
    const appNavIsShow = app.get('appNavIsShow');

    return (
      <div className="root">
        <AppHeader onLeftBtnClick={onHeaderLeftClick}/>
        <AppNav toggleAppNav={toggleAppNav} appNavIsShow={appNavIsShow} me={me}/>
        <main className="app_main">
          <Route exact path="/" render={() => <Redirect to="/topics/all"/>}/>
          <Route path="/topics/all" component={TopicAllPage}/>
          <Route path="/topics/good" component={TopicGoodPage}/>
          <Route path="/topics/share" component={TopicSharePage}/>
          <Route path="/topics/ask" component={TopicAskPage}/>
          <Route path="/topics/job" component={TopicJobPage}/>
          <Route path="/user/:loginname" component={lazyme(() => System.import('../UserPage'))}/>
          <Route path="/login" component={lazyme(() => System.import('../LoginPage/'))}/>
        </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    app: state.app,
    me: state.user.get('me')
  };
};

const mapDispatchToProps = {
  toggleAppNav: appActions.toggleAppNav,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
