var API = require('./lib/api_common');
// 微博接口
API.mixin(require('./lib/api_statuses'));
// 收藏接口
API.mixin(require('./lib/api_favorite'));

module.exports = API;
