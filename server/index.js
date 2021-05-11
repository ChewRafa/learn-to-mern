const express = require('express');
const userRouter = require('./routers/user');
const cors = require('cors');
const path = require('path');
require('./db');

const app = express();
const PORT = process.env.PORT || 3030;

app.use(express.static(path.join(__dirname, '..', 'build')));

app.use(express.json());

//enables same-site requests
// app.use(cors());
//allows to make API requests
app.use(userRouter);

app.get('/', (req, res) => {
  res.send('<h2>This is from index.js file</h2>');
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
