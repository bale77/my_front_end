const bar = () =>{
    console.log(1);
}
const repeat = (f,num)=>{
    for(let i=0;i<num;i++){
        f();
    }
}

// const repeat = (f,num)=>{
//     if(num <= 0){
//         return;
//     }
//     f();
//     return repeat(f,--num);
// }

module.exports = repeat;