import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getUser, login, logoff } from '../../../redux/userRedux.js';
import clsx from 'clsx';
import styles from './Header.module.scss';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';


const Component = ({ className, user, login, logoff }) => {

  const authenticationHandler = (event) => {
    event.preventDefault();
    user.authenticated ? logoff(user) : login(user);
  };

  return (
    <div className={clsx(className, styles.root)}>
      <Navbar bg="dark" variant="dark" sticky="top">
        <Navbar.Brand href="/">Bulletin Board</Navbar.Brand>

        { user.authenticated ? (
          <Nav className="mr-auto">
            <Nav.Link href="/myAds">
              <i className="far fa-address-card"></i>{' '}
              My ads
            </Nav.Link>
            <Nav.Link href="/" onClick={authenticationHandler}>
              <i className="fas fa-sign-out-alt"></i>{' '}
              Logout
            </Nav.Link>
          </Nav>
        ) : (

          <Nav className="mr-auto">
            <Nav.Link href="https://google.com" onClick={authenticationHandler} >
              <i className="fas fa-user-alt" ></i>{' '}
            Login with Google
            </Nav.Link>
          </Nav>
        )}
      </Navbar>
    </div >
  )
};

Component.propTypes = {
  className: PropTypes.string,
  user: PropTypes.object,
};

const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  login: (payload) => dispatch(login(payload)),
  logoff: (payload) => dispatch(logoff(payload)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Header,
  Container as Header,
  Component as HeaderComponent,
};