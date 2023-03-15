const { Router } = require('express');
const crypto = require('crypto');
const { isValidLogin } = require('../middlewares/accountValidator');

const loginRouter = Router();

const HTTP_OK_STATUS = 200;

loginRouter.post('/login', isValidLogin, (_req, res) => {
  const tokenRandom = crypto.randomBytes(8).toString('hex');
  return res.status(HTTP_OK_STATUS).json({ token: tokenRandom });
});

module.exports = loginRouter;