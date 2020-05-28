import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPostById, fetchAllPosts } from '../../../redux/postsRedux.js';
import { getUser } from '../../../redux/userRedux.js';
import {GoogleMapComponent} from '../../common/GoogleMapComponent';

import styles from './Post.module.scss';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

class Component extends React.Component {

  static propTypes = {
    className: PropTypes.string,
    post: PropTypes.object,
    user: PropTypes.object,
    fetchAllPosts: PropTypes.func,
  };

  componentDidMount() {
    const { fetchAllPosts } = this.props;
    fetchAllPosts();
  }

  render() {
    const { className, post, user } = this.props;

    return (
      <div className={clsx(className, styles.root)}>
        <Card  className={styles.el} key= {post.id} >
          <Card.Img className={styles.cardImage} src={post.image} variant="top" />
          <Card.Body>
            <Card.Title className={styles.title} >{post.title}</Card.Title>
            <Card.Text>
              {post.description}
              <p> State: {post.sellingState}</p>
            </Card.Text>
          </Card.Body>

          <ListGroup className="list-group-flush" >
            <ListGroup.Item  >
              <i className="fas fa-money-bill-wave">{' '} Price:</i>
              {' '}{post.price} $
            </ListGroup.Item>
            <ListGroup.Item >
              <i className="fas fa-dolly">{' '} delivery:</i>
              {' '}{post.shipping}
            </ListGroup.Item>
            <ListGroup.Item >
              <i className="fas fa-envelope">{' '} mail:</i>
              {' '}{post.mail}
            </ListGroup.Item>
            <ListGroup.Item >
              <i className="fas fa-map-marker-alt">{' '} Location:</i>
              {' '}{post.location}

              <div className={styles.map} >
                <GoogleMapComponent />
                {/*<WrappedMap >*/}
              </div>

            </ListGroup.Item>
            <ListGroup.Item >
            State: {post.status}
            </ListGroup.Item>
          </ListGroup>

          <Card.Footer >
            <div className={styles.footer}>
              <small  className="text-muted">Published: { post.date }</small>
              <small className="text-muted">Last update: { post.updateDate }</small>
            </div>
          </Card.Footer>
        </Card>
        {user.id === post.userId && user.authenticated ? (<Button className={styles.button} href={`/post/${post.id}/edit`} variant="dark">Edit post</Button>) : ''}
        <Button color="secondary" href="/" variant="contained">Return</Button>
      </div>
    );
  }
}



const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllPosts: () => dispatch(fetchAllPosts()),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as Post,
  // Container as Post,
  Container as Post,
  Component as PostComponent,
};
