const models = require('../models');

const action = (req, res, next) => {
  if (!req.params.mockId) return res.sendStatus(400);
  const mockId = req.params.mockId;

  // mock-bodyを検索
  models.mock.findById(mockId)
    .then(mock => {
      // 見つからない場合は404返却
      if (!mock) return res.sendStatus(404);
      // API KEYが設定されていれば、認証を行う
      const api_key = mock.api_key;
      if (api_key) {
        const is_auth = authenticate(api_key, req);
        if (!is_auth) return res.sendStatus(403);
      }
      // レスポンス
      res.json(JSON.parse(mock.body));
    })
    .catch(err => next(err));
};

function authenticate(api_key, req) {
  console.log(req.get('Authorization'));
  const auth_header = req.get('Authorization');
  if (!auth_header) return false;
  return auth_header.split(' ')[1] === api_key;
}

module.exports = action;
