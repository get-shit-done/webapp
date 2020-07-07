const express = require('express')
const app = express()

app.get('*.js', (req, res, next) => {
  if (req.header('Accept-Encoding').includes('br')) {
    req.url = req.url + '.br';
    res.set('Content-Encoding', 'br');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  } else {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'application/javascript; charset=UTF-8');
  }
  next();
});

app.use(express.static('../client/public'))

const listener = app.listen(process.env.PORT, function() {
  console.log('Listening on port ' + listener.address().port);
});
