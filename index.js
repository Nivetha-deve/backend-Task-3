const mentorRouter = require('./Routers/MentorRouter');
const studentRouter = require('./Routers/StudentRouter');
const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
app.use(cors());  /* To avoid cross-origin error */
app.use(express.json());

const PORT = process.env.PORT || 4100;
const URL = process.env.DB;
console.log('DB Connection URL:', process.env.DB);

if (!URL) {
  console.error('MongoDB connection URL is not defined');
 
  process.exit(1); // Exit the application if the URL is not defined
}

const mongoose = require('mongoose');
mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
//   useCreateIndex: true
});

const connection = mongoose.connection;

connection.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

connection.on('open', () => {
  console.log('MongoDB Connected');
});

connection.on('close', () => {
  console.log('MongoDB Connection Closed');
});

app.get('/', (req, res) => res.send(`<h1> Welcome to the Student Mentor API </h1>`));

app.use('/Mentors', mentorRouter);
app.use('/Students', studentRouter);

app.listen(PORT, () => console.log(`Server started in the port ${PORT}`));
