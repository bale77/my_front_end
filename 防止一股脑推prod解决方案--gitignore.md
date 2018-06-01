## 情景再现
 + 一个项目，前端三个程序猿（A,B,C）在开发。A，B写好一个功能推到qa分支，测试通过，可以push prod。这时候qa分支上还有C没通过测试的代码。一边着急要上，一边测试一时半会过不去。这时候git需要临时性忽略C的修改，而直接push prod。

## .gitignore
 + .gitignore这个文件是告诉git，那些文件忽略对比。一般在vue-cli会自动生成。
 + 将C涉及的代码文件路径放在其中，再push的时候就可以忽略未测试的文件。
 + 不过，当你一脸惬意写好.gitignore 准备push prod，同时想着周末去哪玩的时候。“生活就像巧克力，你不会知道下一颗什么味道”。它还是全部push上去了。（手动滑稽）
 + “原因是.gitignore只能忽略那些原来没有被追踪的文件，如果某些文件已经被纳入了版本管理中，则修改.gitignore是无效的”,对，就是说你在create或者clone的时候，它被追踪了，再来你即使添加后还是会被跟踪。
 + 那么解决方法就是先把本地缓存删除（改变成未被追踪状态）
 + 你可以先 `git rm -r --cached .`再`git add .` 这样新的gitignore就会被生效了。
 + 然后，你就可以暂时性将未测试的文件留在本地
 + 最后，愉快地准备周末（如果运气好的话）
## 弊端
 + 虽然听起来很爽，但是这只是应急方案，最好的解决方法是彻底避免问题。有一个错时提交qa的方案，还在思考中。
 + 希望各位大佬能扔出更好的解决方案。
## 划重点
 ```
 	rewrite .gitignore
 	git/ git rm -r --cached .
 	git/ git add .
 	git/ git commit -m"update"
 	git/ git push
 ```
 ## 参考
  + [廖雪峰的官方网站-git](https://www.liaoxuefeng.com/wiki/0013739516305929606dd18361248578c67b8067c8c017b000/0013758404317281e54b6f5375640abbb11e67be4cd49e0000)

  + [Git忽略规则和.gitignore规则不生效的解决办法](https://www.cnblogs.com/zhangxiaoliu/p/6008038.html)

 ## By Fancy