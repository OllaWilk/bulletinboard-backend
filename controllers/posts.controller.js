const Post = require('../models/post.model');
const datePicker = require('date-and-time');


const now = new Date();
const generateDate = datePicker.format(now, 'DD.MM.YYYY');

exports.getAll = async (req, res) => {

    try {
      const result = await Post
        .find()
        .sort({ date: -1 });
      if (!result) res.status(404).json({ post: 'Not found' });
      else res.json(result);
    } catch (err) {
      res.status(500).json(err);
    }
};

exports.getPartPosts = async (req, res) => {

    try {
        const result = await Post
            .find({ status: 'published' })
            .select('title description price location sellingState date updateDate image ')
            .sort({ date: -1 });
        if (!result) res.status(404).json({ post: 'Not found' });
        else res.json(result);
    }
        catch (err) {
        res.status(500).json(err);
    }
};

exports.getOne = async (req, res) => {

    try {
        const result = await Post
        .findById(req.params.id);

        if (!result) {
        res.status(404).json({ message: 'Post not found...' });
    } else {
        res.json(result);
    }
    } catch(err) {
        res.status(500).json(err);
    }
};

exports.getPost =  async (req, res) => {
    console.log('!!!!', req.body)

    const { title, description, generateDate, mail, sellingState, location, shipping, image, price } = req.body;

    try {
        const newPost = new Post({
            title: title,
            description: description,
            date: generateDate,
            updateDate: null,
            mail: mail,
            status: 'published',
            sellingState: sellingState,
            location: location,
            shipping: shipping,
            image: image,
            price: price,
        });
      await newPost.save();
      res.json({ newPost });

    } catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getPut = async (req, res) => {

    const { title, description, generateDate, mail, status, sellingState, location, shipping, image, price } = req.body;

    try {
      const result = await(Post.findById(req.params.id));
      if(result) {
        await Post.updateOne({ _id: req.params.id }, { $set: {
            title: title,
            description: description,
            updateDate: generateDate,
            mail: mail,
            status: status,
            sellingState: sellingState,
            location: location,
            shipping: shipping,
            image: image,
            price: price,
        }});
        res.json({ post });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};

exports.getDelete = async (req, res) => {

    try {
      const result = await(Post.findById(req.params.id));
      if(result) {
        await Post.deleteOne({ _id: req.params.id });
        res.json({ message: 'OK' });
      }
      else res.status(404).json({message: 'Not found...'});
    }
    catch(err) {
      res.status(500).json({ message: err });
    }
};