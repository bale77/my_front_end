## 介绍
qiankun 是一个基于 [single-spa](https://github.com/single-spa/single-spa) 的[微前端](https://micro-frontends.org/)实现库，旨在帮助大家能更简单、无痛的构建一个生产可用微前端架构系统。

qiankun 孵化自蚂蚁金融科技基于微前端架构的云产品统一接入平台，在经过一批线上应用的充分检验及打磨后，我们将其微前端内核抽取出来并开源，希望能同时帮助社区有类似需求的系统更方便的构建自己的微前端系统，同时也希望通过社区的帮助将 qiankun 打磨的更加成熟完善。

目前 qiankun 已在蚂蚁内部服务了超过 200+ 线上应用，在易用性及完备性上，绝对是值得信赖的。

## 什么是微前端
微前端架构具有以下几个核心价值：
- 技术栈无关（主框架不限制接入应用的技术栈，微应用具备完全自主权）
- 独立开发、独立部署（微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新）
- 增量升级（在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略）
- 独立运行时（每个微应用之间状态隔离，运行时状态不共享）

 ## qiankun微前端特性
 - 基于 single-spa封装
 - 技术栈无关
 - HTML Entry接入方式
 - 样式隔离
 - JS沙箱
 - 资源预加载
 - umi插件

## qiankun 官方API文档
[当前版本为2.x](https://qiankun.umijs.org/zh/api) 


## 实战注意事项

### 1. 导出相应的生命周期钩子

微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 bootstrap、mount、unmount 三个生命周期钩子，以供主应用在适当的时机调用。

```javascript
export async function bootstrap() {
  console.log('react app bootstraped');
}
export async function mount(props) {
  console.log(props);
  ReactDOM.render(<App />, document.getElementById('react15Root'));
}
export async function unmount() {
  ReactDOM.unmountComponentAtNode(document.getElementById('react15Root'));
}
```

### 2. 配置微应用打包工具

除了代码中暴露出相应的生命周期钩子之外，为了让主应用能正确识别微应用暴露出来的一些信息，微应用的打包工具需要增加如下配置：
以webpack为例:
```javascript
const packageName = require('./package.json').name;
module.exports = {
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
};
```

### 使用小结 & 踩过的坑
1. 所有的js脚本和css文件都在内存中缓存起来，子项目过多会不会导致浏览器卡死？
   浏览器可用的内存限制大都在500M以上，一个子项目的js和css体积一般在2-5M左右，所以基本上不用担心。

2. qiankun 多应用同时运行 js 沙箱的处理
   两个子应用同时存在, 又添加了两个全局变量 window.a, 如何保证这两个能同时运行但互不干扰？
   采用了 proxy 代理之后，所有子应用的全局变量变更都是在闭包中产生的，不会真正回写到 window 上，这样就能避免多实例之间的污染了。


## TODO

 1. 复用公共依赖
 2. 父子项目间的组件共享
...eg
后期结合项目实践情况进行使用。
