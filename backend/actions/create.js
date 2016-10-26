const models = require('../models');
const uuid = require('node-uuid');

const action = (req, res, next) => {
  // 入力値の取得
  if (!req.body) return res.sendStatus(400);
  const body = req.body['mock-body'];
  const isAuth = req.body['mock-is-auth'];

  // JSON構文チェック
  try {
    JSON.parse(body);
  } catch (err) {
    next(err);
  }

  const id = getRandomId();
  const url = getCallURL(req, id);
  const apiKey = isAuth ? getRandomId() : null;

  //作成
  models.mock.create({ id, body, apiKey })
    .then(() => res.json({
      status: 200,
      data: { url, apiKey }
    }))
    .catch((err) => next(err));
};

function getRandomId() {
  return uuid.v4().split('-').join('');
}

function getCallURL(req, id) {
  return `${req.protocol}://${req.get('host')}/call/${id}`;
}

module.exports = action;
