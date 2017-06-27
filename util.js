const isBoolean = (obj) => Object.prototype.toString.call(obj) === '[object Boolean]';
const isNonEmptyString = (obj) => isString(obj) && obj.trim().length > 0;
const isNumber = (obj) => Object.prototype.toString.call(obj) === '[object Number]' && !isNaN(obj);
const isString = (obj) => Object.prototype.toString.call(obj) === '[object String]';

module.exports = { isBoolean, isNonEmptyString, isNumber, isString };
