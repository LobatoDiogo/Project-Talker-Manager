const isValidLogin = (req, res, next) => {
    const { email, password } = req.body;
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    const emailValid = emailRegex.test(email);
    const BAD_REQ_STATUS = 400;
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

module.exports = {
    isValidLogin,
};
