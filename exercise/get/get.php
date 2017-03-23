<?php 
	header('content-type:text/html; charset= utf-8');

	echo 'get提交的页面';
	echo "<br>";
	// 通过$_GET['key'] 即可获取数据 key 是提交的时候 表单元素的name属性的值
	echo $_GET['userName'];
	echo "<br>";
	echo $_GET['userSkill'];
	// 没有的可以 会报错
	// echo $_GET['hahaha'];
	echo '<h1>'.$_GET['userName'].'欢迎你<h1>';
 ?>