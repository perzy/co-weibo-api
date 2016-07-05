'use strict';

/**
 * querymid.
 * 详情请见：<http://open.weibo.com/wiki/2/statuses/querymid>
 * 
 * Examples:
 * ```
 * api.querymid(3593940961627163);
 * ```
 * 
 */
exports.querymid = function* (id,type,isBatch) {
  type = type || 1;
  isBatch = isBatch || 0;

  var url = this.prefix + 'statuses/querymid.json';
  var params = {
    id: id,
    type: type,
    is_batch: isBatch
  };

  var options = {
    data: params
  };

  return yield* this.request(url, options);
};