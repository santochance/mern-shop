const connect = require('connect')
const app = connect()

function logger(req, res, next) {
  console.log(req.method, req.url)

  next()
}

function helloWorld(req, res, next) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('Hello World')
}

function goodbyeWorld(req, res, next) {
  res.setHeader('Content-Type', 'text/plain');
  res.end('Goodbye World');
};

app.use(logger);
debugger
app.use('/hello', helloWorld);
app.use('/goodbye', goodbyeWorld);
app.listen(3000);
