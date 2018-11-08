if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express');
const checkRecords = require('./src/controllers/checkRecords');

const server = express();
const port = process.env.PORT || 5000;

server.get('/', checkRecords);

server.listen(port, () => {
  console.log('Listening on port %i', port);
});
