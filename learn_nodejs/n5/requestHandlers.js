function start(){
	console.log("访问/start时调用这个");
}

function upload(){
	console.log("访问/upload时调用这个");
}

exports.start = start;

exports.upload = upload;