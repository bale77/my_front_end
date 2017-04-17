function start(){
	console.log("访问/start时调用这个");
	return "Hello Start";
}

function upload(){
	console.log("访问/upload时调用这个");
	return "Hello Upload";
}

exports.start = start;

exports.upload = upload;