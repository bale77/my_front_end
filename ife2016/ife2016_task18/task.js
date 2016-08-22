/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-16 09:02:31
 * @version $Id$
 */
//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}

//遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递，后面用
function each(arr, fn) {
    for (var cur = 0; cur < arr.length; cur++) {
        fn(arr[cur], cur);
    }
}

window.onload = function() {
    var container = document.getElementById("container");
    var buttonList = document.getElementsByTagName("input");
    //定义队列的对象
    var queue = {
        str: [],
        leftPush: function(num) {
            this.str.unshift(num);
            this.paint();
        },
        rightPush: function(num) {
            this.str.push(num);
            this.paint();
        },
        isEmpty: function() {
            return (this.str.length == 0);
        },
        leftPop: function() {
            if (!this.isEmpty()) {
                console.log(this.str.shift());
                this.paint();
            }
            else {
                console.log("The queue is already empty!");
            }
        },
        rightPop: function() {
            if (!this.isEmpty()) {
                console.log(this.str.pop());
                this.paint();
            }
            else {
                console.log("The queue is already empty!");
            }
        },
        paint: function() {
            var str = "";
            each(this.str, function(item){str += ("<div>" + parseInt(item) + "</div>")});
            container.innerHTML = str;
            addDivDelEvent();//为container中的每个div绑定删除函数
        },
        deleteID: function(id) {
            console.log(id);
            this.str.splice(id, 1);
            this.paint();
        }
    }
    
    //为container中的每个div绑定删除函数
    function addDivDelEvent() {
        for (var cur = 0; cur < container.childNodes.length; cur++) {

            //这里要使用闭包，否则永远绑定到指定div上的delete函数的参数永远等于跳出时的cur值(length);
            addEvent(container.childNodes[cur], "click", function(cur) {
                return function(){return queue.deleteID(cur)};
            }(cur));
        }
    }
    
    //为4个按钮绑定函数
    addEvent(buttonList[1], "click", function() {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.leftPush(input);
        }
        else {
            console.log("Please enter an interger!");
        }
    });
    addEvent(buttonList[2], "click", function() {
        var input = buttonList[0].value;
        if ((/^[0-9]+$/).test(input)) {
            queue.rightPush(input);
        }
        else {
            console.log("Please enter an interger!");
        }
    });
    addEvent(buttonList[3], "click", function(){
        queue.leftPop();
    });
    addEvent(buttonList[4], "click", function(){
        queue.rightPop();
    });
}
