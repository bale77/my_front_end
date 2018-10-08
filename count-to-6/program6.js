 module.exports = function average(...args) {
 
let sum = args.reduce((i,j)=>i+j)

return sum / args.length

};
 
