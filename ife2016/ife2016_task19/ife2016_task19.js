var btns = document.querySelectorAll('button');
var linBtn = btns[0],   
	rinBtn = btns[1],
	loutBtn = btns[2],
	routBtn = btns[3],
	messBtn = btns[4],
	bubbleBtn = btns[5];
	selectBtn = btns[6];
	insertBtn = btns[7];
var queue = document.querySelector('ul');
var inputText = document.querySelector('input');

	linBtn.addEventListener('click',leftIn,false); 
	rinBtn.addEventListener('click',rightIn,false); 
	loutBtn.addEventListener('click',leftOut,false); 
	routBtn.addEventListener('click',rightOut,false); 
	queue.addEventListener('click',deleteEle,false);
	messBtn.addEventListener('click',init,false);
	bubbleBtn.addEventListener('click',bubbleSort,false);
	selectBtn.addEventListener('click',selectSort,false);
	insertBtn.addEventListener('click',insertSort,false);

	init(queue,linBtn);

function leftIn(){
	var newEle = document.createElement('li');
	var temp;
	var oldEle = document.querySelectorAll('li')[0];

	if (!(temp=transValue(inputText))){
		return false;
	}

	newEle.style.height = temp + 'px';
	if(queryLength(queue)>=60){
		alert("队列满了");
	}else if(!oldEle){
		queue.appendChild(newEle);
	}else{
		queue.insertBefore(newEle,oldEle);
	}
}

function rightIn(){
	var newEle = document.createElement('li');
	var temp;
	if(!(temp=transValue(inputText))){
		return false;
	}
	newEle.style.height=temp+'px';
	if(queryLength(queue)>=60){
		alert("队列满了");
	}else{
		queue.appendChild(newEle);
	}
}
function leftOut(){
	var oldEle = queue.querySelectorAll('li')[0];
	if(!oldEle){
		alert("队列空了");
	}else{
		// console.log('leftOut is:'+oldEle.offsetHeight);
		queue.removeChild(oldEle);
	}
}
function rightOut(){
	var oldEle = queue.lastChild;
	if(!oldEle){
		alert("队列空了");
	}else{
		// console.log('rightOut is:'+oldEle.offsetHeight);
		queue.removeChild(oldEle);
	}
}
function deleteEle(e){
	queue.removeChild(e.target);
}
function transValue(input){
	//\D  非数字字符
	var res = parseInt(input.value.replace(/\D/g,''));
	if(res>100 || res<10){
		input.value = "input must gt 10 & lt 100";
		return false;
	}else{
		return res;
	}
}

function queryLength(queue){
	return queue.querySelectorAll('li').length;
}

function init(){
	queue.innerHTML = '';
	for(var i=0;i<10;i++){
		inputText.value = Math.floor(Math.random() * 90) + 10;
		linBtn.click();
	}
}
function swap(ele1,ele2){
	var temp = ele1.offsetHeight;
	ele1.style.height = ele2.offsetHeight+'px';
	ele1.offsetHeight = ele2.offsetHeight;
	ele2.style.height = temp+'px';
	ele2.offsetHeight = temp;
}
function btnDisable(b){
	for(var i=0;i<btns.length;i++){
		btns[i].disabled=b;
	}
}
function bubbleSort(){
	var oli = queue.querySelectorAll('li');
	var len = oli.length;
	var timer;
	var j=0;
	var i=len-1;
	console.log("bubble sort is beginning!");
	
	// console.log(oli.length);
	// console.log("oli is:"+oli[9].offsetHeight);
	// console.log("oli is:"+oli[9].style.height);
	timer = setInterval(function(){	
		// console.log("j is:"+j);
		btnDisable(true);
		// console.log("oli[j].offsetHeight is:"+oli[j].offsetHeight);
		if(oli[j].offsetHeight>oli[j+1].offsetHeight){
			swap(oli[j],oli[j+1]);/*交换两个数据*/		
		}
		j++;
		if(j==i){
			i--;
			j=0;
			if(i==0){
				btnDisable(false);
				clearInterval(timer);
			}
		}
	},100);
	
}
function selectSort(){
	var oli = queue.querySelectorAll('li');
	var len = oli.length;
	var timer;
	var i=len-1;
	var j=0;
	var max = oli[j].offsetHeight;
	var index = j;
	timer = setInterval(function(){
		btnDisable(true);
		console.log('j:'+j);
		if(oli[j].offsetHeight>max){
			max=oli[j].offsetHeight;
			index=j;
		}
		j++;
		if(j==i+1){
			swap(oli[index],oli[i]);
			i--;
			j=0;
			index=0;
			max=oli[index].offsetHeight;
			if(i==0){
				btnDisable(false);
				clearInterval(timer);
			}
		}
	},100);
}
function insertSort(){
	btnDisable(true);
	var oli = queue.querySelectorAll('li');
	var len = oli.length;
	var i;
	var j;
	var k;
	var temp;
	var timer;
	/*要找到需要插入的位置j*/
	/*outerLoop可以理解为找到正确的插入位置*/
	/*innerLoop是实现一层插入排序*/
	var outerLoop=true;
	var innerLoop=false;
	i=0;
	j=0;
	timer = setInterval(function(){
		if(outerLoop){
			if(oli[i+1].offsetHeight<oli[j].offsetHeight){
				outerLoop=false;
				innerLoop=true;
				temp=oli[i+1].offsetHeight;
				k=i;
			}
			else{
				j++;
				if(j==i+1){
					i++;
					j=0;
					if(i==len-1){
						btnDisable(false);
						clearInterval(timer);
					}
				}
			}
		}
		if(innerLoop){
			if(k>=j){
				swap(oli[k],oli[k+1]);
				k--;
			}
			else{
				oli[j].offsetHeight=temp;
				oli[j].style.height=temp;
				i++;
				j=0;
				outerLoop=true;
				innerLoop=false;
				if(i==len-1){
					btnDisable(false);
					clearInterval(timer);
				}
			}

		}
	},100);
}