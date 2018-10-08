
let inputs = process.argv.slice(2)

let results = inputs.map(i => i.slice(0,1)).reduce( (i,j) => i+j)

console.log(`[${inputs}] becomes "${results}"`)

