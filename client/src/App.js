import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { getUser } from './redux/userRedux.js';
import { getAll, fetchAllPosts } from './redux/postsRedux.js';

import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import { MainLayout } from './components/layout/MainLayout/MainLayout';
import { Homepage } from './components/views/Homepage/Homepage';
import { Post } from './components/views/Post/Post';
import { MyAds } from './components/views/MyAds/MyAds';
import { PostEdit } from './components/views/PostEdit/PostEdit';
import { PostAdd } from './components/views/PostAdd/PostAdd';
import { NotFound } from './components/views/NotFound/NotFound';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#2B4C6F' },
  },
});

class App extends React.Component {

  static propTypes = {
    fetchAllPosts: PropTypes.func,
    posts: PropTypes.array,
    user: PropTypes.object,
  }

  componentDidMount() {
    this.props.fetchAllPosts();
  }

  render() {
    return (

        <BrowserRouter>
          <StylesProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <MainLayout>
                <Switch>
                  <Route exact path='/' component={Homepage} />
                  <Route exact path="/myAds" component={MyAds} />
                  <Route exact path='/posts/add' component={PostAdd} />
                  <Route exact path='/posts/:id' component={Post} />
                  <Route exact path='/posts/:id/edit' component={PostEdit} />
                  <Route path='*' component={NotFound} />
                </Switch>
              </MainLayout>
            </ThemeProvider>
          </StylesProvider>
        </BrowserRouter>
    )
  }
}

const mapStateToProps = state => ({
  user: getUser(state),
  posts: getAll(state),
});

const mapDispatchToProps = dispatch => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(App);

export {
  Container as App,
};
