function start(){
	console.log("Request handler 'start' was called.");
	function sleep(milliSeconds){
		var startTime = new Date().getTime();
		while(new Date().getTime() < startTime + milliSeconds);
	}
	sleep(10000);
	return "Hello Start";
}

function upload(){
	console.log("访问/upload时调用这个");
	return "Hello Upload";
}

exports.start = start;

exports.upload = upload;