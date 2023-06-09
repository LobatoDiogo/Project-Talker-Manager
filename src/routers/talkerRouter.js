const { Router } = require('express');
const path = require('path');
const {
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidRate,
  isValidWatchedAt,
} = require('../middlewares/accountValidator');
const { readerJSON } = require('../utils/fsRead');
const { writerJSON } = require('../utils/fsWrite');

const talkerRouter = Router();
const HTTP_OK_STATUS = 200;
const NO_CONTENT_STATUS = 204;
const talkerPath = path.join(__dirname, '../talker.json');

const getTalkers = async (_req, res) => {
  const talkers = await readerJSON(talkerPath);
  if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
  return res.status(HTTP_OK_STATUS).json(talkers);
};

const getTalkerById = async (req, res) => {
  const { id } = req.params;
  const talkers = await readerJSON(talkerPath);
  const talkerId = talkers.find((talk) => talk.id === Number(id));
  if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  return res.status(HTTP_OK_STATUS).json(talkerId);
};

const postTalker = async (req, res) => {
  const { name, age, talk: { watchedAt, rate } } = req.body;
  const talkers = await readerJSON(talkerPath);
  const newTalker = {
    id: talkers.length + 1,
    name,
    age,
    talk: {
      watchedAt,
      rate,
    },
  };
  talkers.push(newTalker);
  writerJSON(talkers);
  return res.status(201).json(newTalker);
};

const updateTalker = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, talk: { watchedAt, rate } } = req.body;
    const talkers = await readerJSON(talkerPath);
    const talkerId = talkers.find((talk) => talk.id === Number(id));
    if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    talkerId.name = name;
    talkerId.age = age;
    talkerId.talk.watchedAt = watchedAt;
    talkerId.talk.rate = rate;
    writerJSON(talkers);
    return res.status(HTTP_OK_STATUS).json(talkerId);
  } catch (error) {
    console.error(error);
  }
};

const deleteTalker = async (req, res) => {
  try {
    const { id } = req.params;
    const talkers = await readerJSON(talkerPath);
    const talkerDeleted = talkers.find((talk) => talk.id === Number(id));
    const index = talkers.indexOf(talkerDeleted);
    talkers.splice(index, 1);
    await writerJSON(talkers);
    return res.status(NO_CONTENT_STATUS).end();
  } catch (error) {
    console.error(error);
  }
};

const searchTalker = async (req, res) => {
  const { q } = req.query;
  const talkers = await readerJSON(talkerPath);
  const talkerName = talkers.filter((talk) => talk.name.includes(q));
  
  if (!talkers) return res.status(HTTP_OK_STATUS).json([]);

  return res.status(HTTP_OK_STATUS).json(talkerName);
};

const validators = [
  isValidToken,
  isValidName,
  isValidAge,
  isValidTalk,
  isValidWatchedAt,
  isValidRate,
];

talkerRouter
  .get('/search', isValidToken, searchTalker)
  .get('/', getTalkers)
  .get('/:id', getTalkerById)
  .post('/', ...validators, postTalker)
  .put('/:id', ...validators, updateTalker)
  .delete('/:id', isValidToken, deleteTalker);

module.exports = talkerRouter;
