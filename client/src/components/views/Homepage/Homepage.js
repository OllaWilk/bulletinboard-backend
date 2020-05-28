import React from 'react';
import PropTypes from 'prop-types';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getAll, fetchAllPosts } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux.js';

import styles from './Homepage.module.scss';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import Toolbar from '@material-ui/core/Toolbar';
import CardDeck from 'react-bootstrap/CardDeck';
import Col from 'react-bootstrap/Col';

class Component extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    posts: PropTypes.array,
    user: PropTypes.object,
    fetchAllPosts: PropTypes.func,
  }

  componentDidMount() {
    const { fetchAllPosts } = this.props;
    fetchAllPosts();
  }

  render() {
    const { className, posts, user } = this.props;
    console.log('posts on homepage: ', posts);

    return (
      <div className={clsx(className, styles.root)}>
          {user.authenticated ? (
            <Button  className={styles.button} href="/post/add" variant="success">+ write new ad</Button>
          ) : ''}

          <CardDeck >
            <Col>
              <div className={styles.cards}>
                {posts.map(el => (
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
    )
  }
}


const mapStateToProps = state => ({
  posts: getAll(state),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
});

const HomepageContainer = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Homepage,
  HomepageContainer as Homepage,
  Component as HomepageComponent,
};
