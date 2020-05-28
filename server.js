const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const helmet = require('helmet');
const app = express();

const postsRoutes = require('./routes/posts.routes');
const usersRoutes = require('./routes/users.routes');


/* MIDDLEWARE */
app.use(helmet());
app.use(cors({
    // "origin": "http://localhost:3000",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', postsRoutes);
app.use('/api', usersRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
    res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, './client/build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});
app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

/* MONGOOSE */
// mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connect(`mongodb+srv://ollaWilk:bulletinBoard108@bulletinboard-r8pav.mongodb.net/bulletinBoard?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT|| 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+ port);
});