## 需求背景
随着项目的迭代与新需求层出不穷，现有社会治理前端越来越繁杂，开发维护代码的成本越来越高。后期会有更多的新项目立项开发，有些项目既要能独立运行，又要求能作为子应用（社会治理的一个模块）运行。那么，**微前端**就来了。

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

3. 先访问子应用，再访问主应用，主应用样式会乱的问题
  
    [解决方法](https://github.com/umijs/qiankun/issues/578)

    > 产生这个问题的原因是：在子项目跳转到父项目时，子项目的卸载需要一点点的时间，在这段时间内，父项目加载了，插入了css，但是被子项目的css沙箱记录了，然后被移除了。父项目的事件监听也是一样的，所以需要在子项目卸载完成之后再跳转。
    > 
    > 临时解决办法：先复制一下HTMLHeadElement.prototype.appendChild和window.addEventListener，路由钩子函数beforeEach中判断一下，如果当前路由是子项目，并且去的路由是父项目的，则还原这两个对象.

      

4. 子应用图片未能正确加载
  
    解决方法：需要配置好webpack output publicPath

5. 微应用在setGlobeState时，如：
  props.setGlobalState(
    {
      foo:'vue micro application'
    }
  )
  foo一定要是已经在state的属性里已存在的
  若GlobeState不存在foo，那么不会触发onGlobalStateChange的监听事件。

6. qiankun微前端暂无官方文档前端缓存方案
  参考这位大神的[解决方法](https://github.com/umijs/qiankun/issues/361#issuecomment-644024542)，可以实现vue项目缓存。***但暂无react项目缓存案例。***

7. 微应用点击事件没有触发。排查原因：父子应用DOM重叠，微应用DOM z-index层级不够，没有点到那个dom上。作如下修改：（思路是当显示子应用时，隐藏主应用的dom）

    7.1 App.vue
    ```html
    <div id="microApp0" v-show='true' :style='{left:isShowMicroApp0?0:"-1920px",top:outContainerTop+"px",height:(windowInnerHeight-outContainerTop)+"px"}'>

    </div>
    <div id="microApp1" v-show='$route.fullPath.startsWith("/appreact")' :style='{top:outContainerTop+"px",height:(windowInnerHeight-outContainerTop)+"px"}'>

    </div>
    ```
    7.2 Dashboard/index.vue
    ```javascript
      watch: {
        $route: {
          immediate: true,
          handler (val) {
            const childRoute = [...MICRO_APP_ARR.map(i => i.url)]
            if (childRoute.some(i => i.startsWith(val.fullPath))) {
              this.isShowRoute = false
            } else {
              this.isShowRoute = true
            }

            // ... 业务逻辑
          }

        }
      }
    ```

8. 微应用axios的baseUrl不能写死，否则微应用接口会调用到window.location.origin去。

    解决方法：例如可以配置到项目环境变量中 
    ```
    VUE_APP_BASE_URL = http://http://10.22.233.180/
    ```

9. 如果使用沙箱模式，那么微应用的DOM为shasowDom，代码中不能使用BOM、DOM对象(window,document)，另外微应用中使用到的插件（如ElementUI\echarts等）可能会用到document.querySelector，同样也会报错。

    比如，shadow-dom 中的页面使用 element-ui 中的 tooltip 和 popover 会有(问题)[https://github.com/umijs/qiankun/issues/481]

    分析了一下ElementUI的源码，主要问题是popper.js文件中用到了这么几行代码
    ```javascript
    function getStyleComputedProperty(element, property) {
        // NOTE: 1 DOM access here
        var css = root.getComputedStyle(element, null);
        return css[property];
    }
    ```
    这里的root就是window对象，当点击时间选择框，显示弹框时，变量element正常来说只会是DOM对象，但这里的element会是shadowDOM，而shadowDOM是没有getComputedStyle原生方法的，从而导致报错。我尝试重写getComputedStyle方法，无效。

    因此建议：sandbox要设置成false

    但随之而来的问题是，存在css污染的情况，鱼和熊掌不可兼得。

---

## 如何新增一个微应用

1. [参考上述](#实战注意事项)，配置好微应用的入口文件mian.js及webpack配置文件。
   
2. 主应用配置文件
   
    在config.js文件中配置MICRO_APP_ARR数组（注意数组顺序）
    ```javscript
    const MICRO_APP_ARR = [
      {
        url: '/weijiayuanDatav',
        meta: '微家园',
        entry: process.env.VUE_APP_WJY_URL.slice(5, -3)
      }
    ]
    ```

    在micro-app.js文件中配置apps数组
    ```javascript
      const apps = [
        {
          name: 'weijiayuanDatav',
          entry: MICRO_APP_ARR[0].entry,
          container: '#microApp0',
          activeRule: '#' + MICRO_APP_ARR[0].url,
          props: {
            isWeijiayuanDatavVerifyOk: false
          }
        }
      ]
    ```

3. 涉及到测试环境、沙箱环境、生成环境不同的url，可以在.env中配置（参考VUE_APP_WJY_URL）。
  
    如微应用的开发地址可以配置在.env.development中,微应用的生产地址可以配置在.env.build中。

4. 涉及到父子应用需共享状态的字段，在micro-app.js文件中做好初始化。如

    ```javascript
      const actions = initGlobalState(
        {
          isWeijiayuanDatavVerifyOk: false, // 共治服务敏感信息验证
          wjyToDetail: '' // 微家园大屏跳转事件详情字段，默认为空 ''
        }
      )
    ```

---

## 最后提测遇到的问题

开发环境development在本地测试完成之后，打包上线，原以为会很顺利。没想到npm run build之后还会有大坑。（开发环境正常，生产环境有问题）

### 坑1： 

主应用部署地址为192.168.1.1/foo/#/index

微应用部署地址为192.168.1.1/bar/#/bar

在主应用中注册微应用地址为192.168.1.1/foo/#/bar

在浏览器中输入192.168.1.1/foo/#/bar回车之后，直接跳转192.168.1.1/#/ 显示白屏了

why?

花了大半天时间排查问题考虑了前端vue-router跳转？nginx跳转？在本地开启nginx服务排查了很多种情况，最后竟然发现跟qiankun的配置文件有关

```javascript
  const apps = [
    {
      name: 'weijiayuanDatav',
      entry: MICRO_APP_ARR[0].entry,
      container: '#microApp0',
      // 写法1
      // activeRule: '#/weijiayuanDatav',
      // 写法2
      // activeRule: ['#' + MICRO_APP_ARR[0].url],
      // 写法3
      // activeRule: location.hash.startsWith('#' + MICRO_APP_ARR[0].url),
      // 写法4
      activeRule: location => {
        return location.hash.startsWith('#' + MICRO_APP_ARR[0].url)
      },
      props: {
        isWeijiayuanDatavVerifyOk: false
      }
    }
  ]
```

qiankun注册微应用的方法为registerMicroApps，这个方法接收的第一个参数就是数组apps，[坑1](###坑1)的问题就是跟activeRule这个字段有关，根据qiankun官方文档，这个字段可以是string\function\array

但是，

当用写法1、4的时候，会产生上述的跳转白屏的问题

当用写法3的时候，不会有上述白屏问题，但浏览器控制台会有个single-spa的报错，code=24，查了下

> #24: The activityFunction argument must be a function

**这样，导致两个相斥的bug不能同时解决！！！**

然后又排查了很久，最后的解决方案是采用写法4，然后在主应用中去掉setDefaultMountApp('/')这一行代码

就是**不用设置默认绑定的微应用**

### 坑2：

微应用的图片、字体路径不正确

GitHub Issue上有[解决方案](https://github.com/umijs/qiankun/issues/217#issuecomment-616283390)

产生bug的原因是插件import-html-entry库不兼容微应用。

### 坑3：

这个坑是后续（上线之后一段时间）发现的

表现：微应用打不开，一片空白。控制台报错 

```
Uncaugh Error: only one instance of babel-polyfill is allowed
```

修复方法：去掉微应用package.json中的babel-polyfill。重装依赖包
