const express = require('express');
const config = require('config');
const path = require('path')
const mongoose = require('mongoose');

const app = express();


app.use(express.json({ extended: true }));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/links', require('./routes/links.routes'));
app.use('/t', require('./routes/redirect.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res, next) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}


// Config variables
const PORT = config.get('port') || 8080;
const MONGO_URL = config.get('mongoURL');

async function startServer() {
  try {
    await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}...`));
  } catch (error) {
    console.log('DB Connection Error: ', error.message);
    process.exit(1);
  }
}

startServer();
