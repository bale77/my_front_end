// module.exports = (inputArr) =>{
//     let b = {};
//     inputArr.reduce((p,n,i)=>{return b.hasOwnProperty(n)?b[n]++:b[n]=1})
//     return b;
// }

module.exports = function countWords(words) {
    return words.reduce(function(wordsTotal, word) {
        (++wordsTotal[word]) || (wordsTotal[word] = 1);
        return wordsTotal;
    }, {});
};