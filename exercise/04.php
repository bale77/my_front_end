<?php 
	// php中 '' ""的区别
	header('content-type:text/html; charset= utf-8');
	
	echo "双引号中的字符串";
	echo '<br>';
	echo '单引号中的字符串';
	echo '<br>';

	$person = '葫芦娃';

	// php中 单双引号的区别 在 字符串的 内容 跟变量名一致时可以看出
	// 双引号 会将 变量的值 放进去
	// 单引号 就是字符串
	// 单双引号 可以混用 避免 一对
	echo "$person";
	echo '<br>';
	echo '$person';
	echo "<input type='button' value='你好吗'>";
 ?>