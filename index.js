require('dotenv').load();

const http = require('http');
const path = require('path');
const cors = require('cors')
const express = require('express');
const tokenGenerator = require('./src/token_generator');

// Create Express webapp
const app = express();

app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  const identity = request.query.identity || 'identity';
  const room = request.query.room;
  response.status(200).json({ token: tokenGenerator(identity, room) })
});

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.trace(err);
  res.status(err.status || 500);
  res.send({
    message: err.message,
    error: {},
  });
});

// Create an http server and run it
const server = http.createServer(app);
const port = process.env.PORT || 3000;
server.listen(port, function() {
  console.log('Express server running on *:' + port);
});
