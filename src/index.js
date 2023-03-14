const express = require('express');
const path = require('path');
const crypto = require('crypto');
const { readerJSON } = require('./utils/fsRead');
const { isValidLogin } = require('./middlewares/accountValidator');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

const talkerPath = path.join(__dirname, 'talker.json');

app.get('/talker', async (_req, res) => {
  const talkers = await readerJSON(talkerPath);
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readerJSON(talkerPath);
  const talkerId = talkers.find((talk) => talk.id === Number(id));
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerId);
});

app.post('/login', isValidLogin, (_req, res) => {
const tokenRandom = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: tokenRandom });
});

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
