'use strict';

/**
 * 获取用户收藏列表接口.
 * 详情请见：<http://open.weibo.com/wiki/2/favorites>
 * 
 * Examples:
 * ```
 * api.getFavorites(2,50);
 * ```
 * 
 * @param {Number} page 页数
 * @param {Number} count 每页数量
 */
exports.getFavorites = function* (page,count) {
  var url = this.prefix + 'favorites.json';
  var params = {
    page: page,
    count: count
  };

  var options = {
    data: params
  };

  return yield* this.request(url, options);
};