module.exports = function makeImportant(str,time) {
  if(isNaN(time)){
    time = str.length
  }
  return `${str}${'!'.repeat(time)}`


};

