import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getMyAds } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux';

import AddIcon from '@material-ui/icons/Add';

import styles from './MyAds.module.scss';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Toolbar from '@material-ui/core/Toolbar';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';

const Component = ({ className, posts, user }) => (
    <div className={clsx(className, styles.root)}>
        {user.authenticated && (
        <Button className={styles.button} variant="success" href="/post/add">
            <AddIcon />
            Add new
        </Button>
        )}
        <CardDeck >
            <Col>
                <div className={styles.cards}>
                {posts.map((el) => (
                    <Card {...el} className={styles.el} key= {el.id} >
                        <Card.Img className={styles.cardImage} src={el.image} variant="top" />
                        <Card.Body>
                            <Card.Title className={styles.titleLink} ><a  href={`/post/${el.id}`}>{el.title}</a></Card.Title>
                            <Card.Text>
                                {el.description}
                            </Card.Text>
                        </Card.Body>

                        <ListGroup className="list-group-flush">
                            <ListGroup.Item >
                                <i className="fas fa-money-bill-wave"></i>
                                {' '} Price: {el.price} $
                            </ListGroup.Item>
                            <ListGroup.Item >
                                <i className="fas fa-map-marker-alt"></i>
                                {' '} Location: {el.location}
                            </ListGroup.Item>
                            <ListGroup.Item >
                                State: {el.sellingState}
                                </ListGroup.Item>
                        </ListGroup>

                        <Card.Footer>
                            <small className="text-muted">Published: {el.date}</small>
                            <small className="text-muted"> {' '} Last update: { el.updateDate }</small>
                        </Card.Footer>
                    </Card>
                ))}
                </div>
            </Col>
        </CardDeck>
        <Toolbar />
    </div>
);

Component.propTypes = {
  className: PropTypes.string,
  posts: PropTypes.array,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  user: getUser(state),
  posts: getMyAds(state),
});

const Container = connect(mapStateToProps, null )(Component);

export {
  // Component as MyAds,
  Container as MyAds,
  Component as MyAdsComponent,
};