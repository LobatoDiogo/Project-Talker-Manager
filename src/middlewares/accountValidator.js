const BAD_REQ_STATUS = 400;
const UNATHORIZED_STATUS = 401;

const isValidLogin = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValid = emailRegex.test(email);
    if (!email) {
      return res.status(BAD_REQ_STATUS).json({ message: 'O campo "email" é obrigatório' });
    }
    if (!emailValid) {
      return res.status(400).json({ message: 'O "email" deve ter o formato "email@email.com"' });
    }
    if (!password) {
      return res.status(BAD_REQ_STATUS).json({ message: 'O campo "password" é obrigatório' });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
    }
    return next();
};

const isValidToken = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(UNATHORIZED_STATUS).json({ message: 'Token não encontrado' });
  }

  if (authorization.length !== 16) {
    return res.status(UNATHORIZED_STATUS).json({ message: 'Token inválido' });
  }
  return next();
};

const isValidName = (req, res, next) => {
  const { name } = req.body;
  if (!name) {
    return res.status(BAD_REQ_STATUS).json({ message: 'O campo "name" é obrigatório' });
  }

  if (name.length < 3) {
    return res.status(BAD_REQ_STATUS)
    .json({ message: 'O "name" deve ter pelo menos 3 caracteres' });
  }
  return next();
};

const isValidAge = (req, res, next) => {
  const { age } = req.body;
  if (!age) {
    return res.status(BAD_REQ_STATUS).json({ message: 'O campo "age" é obrigatório' });
  }

  if (!Number.isInteger(age) || age < 18) {
    return res.status(BAD_REQ_STATUS)
    .json({ message: 'O campo "age" deve ser um número inteiro igual ou maior que 18' });
  }
  return next();
};

const isValidTalk = (req, res, next) => {
  const { talk } = req.body;
  if (!talk) {
    return res.status(BAD_REQ_STATUS).json({ message: 'O campo "talk" é obrigatório' });
  }
  return next();
};

const isValidWatchedAt = (req, res, next) => {
  const { watchedAt } = req.body.talk;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  const dateValid = dateRegex.test(watchedAt);

  if (!watchedAt) {
    return res.status(BAD_REQ_STATUS).json({ message: 'O campo "watchedAt" é obrigatório' });
  }

  if (!dateValid) {
    return res.status(BAD_REQ_STATUS)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  return next();
};

const isValidRate = (req, res, next) => {
  const { rate } = req.body.talk;
  if (rate === undefined) {
    return res.status(BAD_REQ_STATUS).json({ message: 'O campo "rate" é obrigatório' });
  }

  if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
    return res.status(BAD_REQ_STATUS)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }
  return next();
};

module.exports = {
    isValidLogin,
    isValidToken,
    isValidName,
    isValidAge,
    isValidTalk,
    isValidWatchedAt,
    isValidRate,
};
