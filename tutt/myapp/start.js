const express = require('express');
const app = express();

app.use('/', express.static(__dirname + '/public'));

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('myapp listening on port ' + port);
});