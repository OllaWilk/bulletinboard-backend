import React from 'react';
import PropTypes from 'prop-types';
import styles from './PostAdd.module.scss';
import clsx from 'clsx';
import { NotFound } from '../NotFound/NotFound';
import randomID from '@ollawilk/randomid-generator';

import { connect } from 'react-redux';
import { getUser } from '../../../redux/userRedux.js';
import { addPostRequest } from '../../../redux/postsRedux.js';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';


class Component extends React.Component {

  state = {
    postData: {
      title: '',
      description: '',
      mail: '',
      sellingState: '',
      location: '',
      shipping: '',
      image: 'null',
      price: '',
    },
    isError: false,
  }

  static propTypes = {
    className: PropTypes.string,
    addPost: PropTypes.func,
    user: PropTypes.object,
  }

  updateInputValue = ({ target }) => {
    const { postData } = this.state;
    const { value, name } = target;

    this.setState({ postData: { ...postData, [name]: value } });
  }

  setImage = ({ target }) => {
    const { postData } = this.state;
    const files = target.files;

    if (files) this.setState({ postData: { ...postData, image: files[0] } });
  }

  submitPost = async (e) => {
    const { postData } = this.state;
    const { addPost, user } = this.props;

    e.preventDefault();

    if (postData.title && postData.description && postData.mail) {
      const time = new Date();
      const displayTime = `${time.getDate()}.${time.getMonth()}.${time.getFullYear()}, ${time.getHours()}:${time.getMinutes()}`;
      const payload = {
        ...postData,
        id:randomID(10), //id
        date: displayTime,
        updateDate: displayTime,
        status: 'Published',
        user: {
          id: user.id,
        },
      };
      await addPost(payload);
    } else this.setState({ isError: true });
  };

  render() {
    const { className, user } = this.props;
    const { submitPost, updateInputValue, setImage } = this;
    const { postData } = this.state;


    return (
      user.authenticated ? (
        <div className={clsx(className, styles.root)}>
          <div  maxWidth="lg">
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
                    <option>choose state</option>
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
                  <Form.Control
                    name="shipping"
                    onChange={updateInputValue}
                    value={postData.shipping}
                    required
                    as="select"
                  >
                    <option>choose shipping</option>
                    <option>Only pickup</option>
                    <option>Delivery</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>
              <Form.Group controlId="postStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control
                  name="status"
                  defaultValue="Draft"
                  readOnly
                  type="text"
                />
              </Form.Group>
              <Form.Group id="formGridImg">
                <input name="image" onChange={setImage} type="file" />
              </Form.Group>
              <Button type="submit" variant="success" >Save</Button>
              <Button color="secondary" href="/" variant="contained" >Return</Button>
            </Form>
          </div>
        </div>
      ) : (
        <NotFound />
      )
    );
  }
}


const mapStateToProps = state => ({
  user: getUser(state),
});

const mapDispatchToProps = dispatch => ({
  addPost: post => dispatch(addPostRequest(post)),
});

const Container = connect(mapStateToProps, mapDispatchToProps)(Component);

export {
  //Component as PostAdd,
  Container as PostAdd,
  Component as PostAddComponent,
};
