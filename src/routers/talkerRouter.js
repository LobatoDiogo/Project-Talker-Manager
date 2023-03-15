const { Router } = require('express');
const path = require('path');
const { readerJSON } = require('../utils/fsRead');

const talkerRouter = Router();

const HTTP_OK_STATUS = 200;
const talkerPath = path.join(__dirname, '../talker.json');

talkerRouter.get('/talker', async (_req, res) => {
    const talkers = await readerJSON(talkerPath);
    if (talkers.length === 0) return res.status(HTTP_OK_STATUS).json([]);
    return res.status(HTTP_OK_STATUS).json(talkers);
});

talkerRouter.get('/talker/:id', async (req, res) => {
    const { id } = req.params;
    const talkers = await readerJSON(talkerPath);
    const talkerId = talkers.find((talk) => talk.id === Number(id));
    if (!talkerId) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    return res.status(HTTP_OK_STATUS).json(talkerId);
});

module.exports = talkerRouter;
