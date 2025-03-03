const logRequisicao = (req, res, next) => {
  console.log(`Nova requisição: ${req.method} ${req.url}`);
  next();
};

module.exports = { logRequisicao };
