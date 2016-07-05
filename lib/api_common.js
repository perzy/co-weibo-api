'use strict';

// 本文件用于weibo API，基础文件，主要用于Token的处理和mixin机制
var urllib = require('urllib');

/**
 * 构造函数
 * @param {String} accessToken 用户通过Oauth获得的access_token
 */
var API = function (accessToken) {
  if (!(this instanceof API)) {
    return new API(accessToken);
  }

  this.access_token = accessToken;

  this.prefix = 'https://api.weibo.com/2/';
  this.oauthPrefix = 'https://api.weibo.com/oauth2/';
  this.defaults = {};
};

/**
 * 用于设置urllib的默认options 
 * 
 * Examples:
 * ```
 * api.setOpts({timeout: 15000});
 * ```
 * @param {Object} opts 默认选项
 */
API.prototype.setOpts = function (opts) {
  this.defaults = opts;
};

/**
 * 设置urllib的hook
 * 
 * @param {String} url url 
 * @param {Object} options options
 */
API.prototype.request = function* (url,options) {
  options = options || {};
  options.dataType = 'json';
  options.data = options.data || {};
  options.data.access_token = this.access_token;

  var res = yield urllib.request(url,options);

  if (res && res.error_code) {
    let err = new Error(res.err);
    err.name = 'WeiboAPIError';
    err.code = res.error_code;
    err.request = res.request;
    throw err;
  }

  return res;
};

/**
 * 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
 * Examples:
 * ```
 * // 媒体管理（上传、下载）
 * API.mixin(require('./lib/api_favorite'));
 * ```
 * @param {Object} obj 要合并的对象
 */
API.mixin = function (obj) {
  for (var key in obj) {
    if (API.prototype.hasOwnProperty(key)) {
      throw new Error('Don\'t allow override existed prototype method. method: '+ key);
    }
    API.prototype[key] = obj[key];
  }
};

module.exports = API;
