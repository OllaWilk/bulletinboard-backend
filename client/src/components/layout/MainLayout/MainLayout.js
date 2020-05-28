import React from 'react';
import PropTypes from 'prop-types';
import { Header } from '../Header/Header';
import styles from './MainLayout.module.scss';

import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';

import clsx from 'clsx';


const Component = ({ className, children }) => (
  <div className={clsx(className, styles.root)}>
    <Header />
    <Toolbar />
    <Container maxWidth="lg">
      {children}
    </Container>
  </div>
);

Component.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// const mapStateToProps = state => ({
//   someProp: reduxSelector(state),
// });

// const mapDispatchToProps = dispatch => ({
//   someAction: arg => dispatch(reduxActionCreator(arg)),
// });

// const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  Component as MainLayout,
  // Container as MainLayout,
  Component as MainLayoutComponent,
};
