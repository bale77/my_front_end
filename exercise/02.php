<?php 
	header('content-type:text/html; charset= utf-8');
	//if else
	$male = 'man';

	if ($male=='man') {
		echo '男人';
	}else{
		echo'女生';
	}
	echo '<br>';

	$day = '星期五';
	// switch case
	switch ($day) {
		case '星期一':
			echo '感觉自己被床封印了';
			break;
		case '星期五':
			echo '哇塞,明天就是休息的日子了 oh-yeah';
			break;
		default:
			echo '感觉自己被掏空';
			break;
	}

	echo'<br>';
	// 循环语句
	/*
		for(var i =0 ;i<10;i++){
	
		}
	*/

	//php中 拼接字符串的方式是 .  切记 切记
	for($i =0 ;$i <10;$i ++){
		echo '感觉自己萌萌哒^_^'.$i;
		echo '<br>';
	}

	echo '<br>';
	// while循环
	$num = 0;
	while ( $num<= 10) {
		echo '今天晚饭吃什么呢?'.$num;
		echo '<br>';
		$num++;
		if ($num==5) {
			break;
		}
	}


	// php 如果报错了 错误信息的最后 一般会有 错误的行号
	// 三元表达式
	$food='西兰花炒蛋';

	// 三元表达式
	$food2 = ($food=='西兰花炒蛋'?'好吃':'不好吃');

	// 输出food2
	echo $food2;
 ?>