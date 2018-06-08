// 深拷贝
export const deepCopy = function (obj) {
  let str = '';
  let newobj = (obj && obj.constructor === Array) ? [] : {};
  if (typeof obj !== 'object') {
    return
  } else if (window.JSON) {
    // 系列化对象
    str = JSON.stringify(obj);
    // 还原
    newobj = JSON.parse(str);
  } else {
    for (let prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        newobj[prop] = typeof obj[prop] === 'object' ? deepCopy(obj[prop]) : obj[prop]
      }
    }
  }
  return newobj;
};

// 将o里面的属性复制到小对象n中
export const copyAll = function (n, o) {
  for (let k in n) {
    if (n.hasOwnProperty(k)) {
      // 如果o中含有n的标签, 把n拷贝给o
      if (o[k] !== undefined) {
        if (typeof o[k] !== 'object') {
          n[k] = o[k]
        } else {
          n[k] = deepCopy(o[k])
        }
      }
    }
  }
};

// 将o里面的属性复制到n大对象中
export const copySome = function (n, o) {
  // 如果o中所有的标签都给n
  for (let k in o) {
    if (o.hasOwnProperty(k)) {
      if (typeof o[k] !== 'object') {
        n[k] = o[k]
      } else {
        n[k] = deepCopy(o[k])
      }
    }
  }
};
