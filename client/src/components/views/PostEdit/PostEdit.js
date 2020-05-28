import React from 'react';
import PropTypes from 'prop-types';
import { NotFound } from '../NotFound/NotFound';

import clsx from 'clsx';

import { connect } from 'react-redux';
import { getPostById, updatePostRequest } from '../../../redux/postsRedux';
import { getUser } from '../../../redux/userRedux';

import styles from './PostEdit.module.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

class Component extends React.Component {

  state = {
    postData: {
      id: this.props.post._id,
      title: this.props.post.title,
      description: this.props.post.description,
      date: this.props.post.date,
      mail: this.props.post.mail,
      sellingState: this.props.post.sellingState,
      location: this.props.post.location,
      shipping: this.props.post.shipping,
      image: this.props.post.image,
      price: this.props.post.price,
    },
    isError: false,
  }

  static propTypes = {
    post: PropTypes.object,
    className: PropTypes.string,
    user: PropTypes.object,
  };

  updateInputValue = ({ target }) => {
    const { postData } = this.state;
    const { value, name } = target;

    this.setState({ postData: { ...postData, [name]: value } });
  };

  setImage = ({ target }) => {
    const { postData } = this.state;
    const files = target.files;

    if (files) this.setState({ postData: { ...postData, image: files[0] } });
  }

  submitPost = async (e) => {
    const { postData } = this.state;
    //const { updatePost } = this.props;

    e.preventDefault();

    if (postData.title && postData.description && postData.mail) {
      const time = new Date();
      const displayTime = `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}`;
      const payload = {
        ...postData,
        updateDate: displayTime,
      };
      console.log('::: update Payload', payload);
      // await updatePost(postData);
    } else this.setState({ isError: true });
  };

  render() {
    const { className, user, post } = this.props;
    const { submitPost, updateInputValue, setImage } = this;
    const { postData } = this.state;

    return (
      user.id === post.userId ? (
        <div className={clsx(className, styles.root)}>
          <h2>PostEdit</h2>

          <Form onSubmit={submitPost}>
            <Form.Row>
              <Form.Group
                as={Col}
                controlId="formGridTitle"
              >
                <Form.Label>Title</Form.Label>
                <Form.Control
                  name="title"
                  type="text"
                  onChange={updateInputValue}
                  value={postData.title}
                  placeholder="use catching words"
                  minLength="10"
                  required
                />
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="postContent">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                onChange={updateInputValue}
                value={postData.description}
                placeholder="Describe the object or matter of your post"
                minLength="20"
                required
                rows="3"
              />
            </Form.Group>

            <Form.Row >
              <Form.Group
                as={Col}
                sm={12}
                md={4}
                controlId="formGridPrice"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  name="price"
                  type="text"
                  onChange={updateInputValue}
                  value={postData.price}
                  placeholder="Type price, for free item type 0"
                  required
                />
              </Form.Group>
              <Form.Group
                as={Col}
                sm={12}
                md={4}
                controlId="formGridLocation"
              >
                <Form.Label>Location</Form.Label>
                <Form.Control
                  name="location"
                  type="text"
                  onChange={updateInputValue}
                  value={postData.location}
                  placeholder="Enter your location"
                  required
                />
              </Form.Group>
              <Form.Group
                as={Col}
                sm={12}
                md={4}
                scontrolId="formGridEmail"
              >
                <Form.Label>E-mail</Form.Label>
                <Form.Control
                  name="mail"
                  type="email"
                  onChange={updateInputValue}
                  value={postData.mail}
                  placeholder="name@example.com"
                  required
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group
                as={Col}
                sm={12}
                md={4}
                controlId="postForm"
              >
                <Form.Label>What is state of item you are selling</Form.Label>
                <Form.Control
                  name="sellingState"
                  onChange={updateInputValue}
                  value={postData.sellingState}
                  required
                  as="select"
                >
                  <option>{post.sellingState}</option>
                  <option>new</option>
                  <option>used</option>
                  <option>broken</option>
                  <option>in parts</option>
                  <option>other</option>
                </Form.Control>
              </Form.Group>
              <Form.Group
                as={Col}
                controlId="postDelivery"
              >
                <Form.Label>Shipping</Form.Label>
                <Form.Control as="select">
                  <option >{post.shipping}</option>
                  <option>Only pickup</option>
                  <option>Delivery</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Form.Group controlId="postStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                name="status"
                defaultValue={post.status}
                readOnly
                type="text"
              />
            </Form.Group>
            <Form.Group id="formGridImg">
              <input name="image" onChange={setImage} type="file" />
            </Form.Group>
            <Button type="submit" variant="success" >Update post</Button>
            <Button color="secondary" href="/" variant="contained" >Return</Button>
          </Form>
        </div>
      ) :
        (
          <NotFound />
        )
    );
  }
}


const mapStateToProps = (state, props) => ({
  post: getPostById(state, props.match.params.id),
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  editPost: (id, data) => dispatch(updatePostRequest(id, data)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  // Component as PostEdit,
  Container as PostEdit,
  Component as PostEditComponent,

};
