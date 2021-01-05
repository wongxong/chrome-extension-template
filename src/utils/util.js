
export function toString(args) {
  return Object.prototype.toString.call(args);
};

export const hasOwn = Object.prototype.hasOwnProperty;

export function isNumeric(n) {
  return (n !== '' && !isNaN(parseFloat(n)) && isFinite(n));
}

export function isNumber(n) {
  return typeof n === 'number';
}

export function isString(s) {
  return typeof s === 'string';
}

export function isFunction(fn) {
  return typeof fn === 'function';
}

export function isArray(arr) {
  return Array.isArray(arr);
}

export function isObject(obj) {
  return obj && typeof obj === 'object';
}

export function isPlainObject(obj) {
  if (!obj || toString(obj) !== '[object Object]') return false;

  const proto = Object.getPrototypeOf(obj);

  if (!proto) {
    return true;
  }

  const Ctor = hasOwn.call(proto, 'constructor') && proto.constructor;

  return isFunction(Ctor) && hasOwn.toString.call(Ctor) === hasOwn.toString.call(Object);
}

export function isUndef(n) {
  return n === undefined || n === null;
}

export function isDef(n) {
  return n !== undefined && n !== null;
}

export function getValueByPath(obj, path, defaultValue) {
  if (!isPlainObject(obj) || !path) {
    return defaultValue;
  }

  let keys = isArray(path) ? path : path.split('.');

  let value = obj[keys.pop()];

  if (keys.length) {
    value = getValueByPath(value, keys, defaultValue);
  }

  return value;
}

export const guid = (function () {
  let uid = 0;

  return function (prefix = 'guid_') {
    return [prefix, (Math.random() + uid++).toString(16).replace('.', '')].join('');
  }
})();

export function dateFormat(date, fmt = 'yyyy-mm-dd hh:ii:ss') {
  date = new Date(date);

  let ret;
  const opt = {
    "y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "h+": date.getHours().toString(),           // 时
    "i+": date.getMinutes().toString(),         // 分
    "s+": date.getSeconds().toString()          // 秒
  };

  for(let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);

    if(ret) {
      fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")));
    }
  }

  return fmt;
}

export function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}