const express = require('express');
const loginRouter = require('./routers/loginRouter');
const talkerRouter = require('./routers/talkerRouter');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

app.get('/', (_req, res) => {
  res.status(HTTP_OK_STATUS).json({ message: 'Welcome talker manager' });
});

app.use('/talker', talkerRouter);
app.use('/login', loginRouter);

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

module.exports = app;
