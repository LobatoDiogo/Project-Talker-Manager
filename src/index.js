const express = require('express');
const path = require('path');
const { readerJSON } = require('./utils/fsRead');

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

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});
