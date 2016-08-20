/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2016-08-18 15:17:25
 * @version $Id$
 */
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),  //returnData={"2016-01-01":"100","2016-01-02":"200",}
  "上海": randomBuildData(300),  //returnData中一共有91天的数据从1月1日至3月31日
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart(city,cgy) {
  var oChart = document.getElementsByClassName('aqi-chart-wrap')[0];
  //var oBigwrap = document.getElementsByClassName('big-wrap')[0];

  oChart.innerHTML = '';
  //oBigwrap.setAttribute('data-type',cgy+'s');
  //console.log('aaaaaaaaaaaaa'+chartData[city][cgy]);
  var temp = chartData[city][cgy];
  var spans = 1;
  var maxAir = 500;
  var width = 5;
  // switch (cgy) {
  //   case 'day': var width = 5;break;
  //   case 'week': var width = 40;break;
  //   case 'month': var width = 200;break;
  // }
  for(str in temp){
    var color = '#999';//colors[random(0,colors.length-1)];
    var single = document.createElement('span');
    single.setAttribute("data-detail",str+' '+temp[str]);
    /*根据指数，不同的高度*/
    var percent = temp[str]/maxAir,
        bottom = 400 * percent;
    single.style.backgroundColor = color;
    single.style.width = width+'px';
    single.style.bottom = -450+bottom+'px';
    single.style.left = spans*width*1.8+'px';
    oChart.appendChild(single);
    spans++;
  }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(obj) {
  // 确定是否选项发生了变化 
  pageState.nowGraTime = obj.value;//将input的 时间 值传入
  //console.log("nowGraTime is :"+obj.value);
  // 设置对应数据
  //console.log(pageState.nowSelectCity,pageState.nowGraTime);
  renderChart(pageState.nowSelectCity,pageState.nowGraTime);
  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  pageState.nowSelectCity = this.value;//城市名字string
  //console.log(this.value);
  // 设置对应数据  
  renderChart(pageState.nowSelectCity,pageState.nowGraTime);
  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
//先不写，这里，默认按日显示
  var oFiled = document.getElementById('form-gra-time');
  oFiled.onchange = function(e){
  	//console.log('e.target is:'+e.target.value);
    graTimeChange(e.target);
  }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	//先不设置这里，默认按北京显示 
  var oSelect = document.getElementById('city-select'),
      innerHTML = '';
  for(str in aqiSourceData){
    innerHTML += '<option>'+str+'</option>' ;
  }
  oSelect.innerHTML = innerHTML;
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  pageState.nowSelectCity = oSelect[0].value;//初始化nowSelectCity
  oSelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式 得到chartData
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  	for (str1 in aqiSourceData){
		  var temp={"day":{},"week":{},"month":{}};
		  var dayNums=1;
		  var weektotal=0;
		  var monthtotal=0;
		  var monthday=1;
		  var x=0;
		  for (str in aqiSourceData[str1]){
		  	var date = new Date(str);
		  	var dateM = new Date(str);
		  	//按天
		  	temp["day"][dayNums] = parseInt(aqiSourceData[str1][str]);

		  	//按周
		  	if(dayNums%7==0){
		  		//表示第dayNums/7周的平均值保存在temp['week']中
		  		temp['week'][dayNums/7]=parseInt(weektotal/7);
		  		weektotal=0;
		  	}else{
		  		weektotal +=parseInt(aqiSourceData[str1][str]);
		  	}
		  	//按月
		  	//用x来计算一个月有多少天
		  	  dateM.setDate(dateM.getDate()+1);
		      if(dateM.getMonth()==monthday){
		        monthtotal += parseInt(aqiSourceData[str1][str]);
		        x++;
		      	monthaverage = parseInt(monthtotal/x);
		      	temp['month'][monthday]=monthaverage;
		        x=0;
		        monthday++;
		        monthtotal=0;

		        //monthtotal=aqiSourceData[str1][str];
		      }else{
		      	x++;
		        monthtotal += parseInt(aqiSourceData[str1][str]);
		      }
		  	dayNums++;
		  }
	  	  chartData[str1] = temp;
	}
	//renderChart('str1','day')
	//pageState.nowSelectCity="北京";
  	console.log(chartData);
	renderChart(pageState.nowSelectCity,pageState.nowGraTime);
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm();
  initCitySelector();
  initAqiChartData();
  //console.log(chartData['北京']['week']);
}

init();