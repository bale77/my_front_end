Array.prototype.myReduce = function(reducer, initValue){
    const arr = this
    function reduce(prev, index){
        const next = arr[index]
        const nextValue = reducer(prev, next)
        return index < arr.length ? reduce(nextValue, index + 1) : prev
    }
    
    return reduce(initValue, 0)
}

const arr = [1,2,3,4,5]

function reducer(a,b){
    return a+b;
}

console.log(arr.myReduce(reducer, 0))