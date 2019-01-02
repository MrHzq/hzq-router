# [hzq-router](https://github.com/MrHzq/hzq-router)

[GitHub 源码](https://github.com/MrHzq/hzq-router)

[npm 包](https://www.npmjs.com/package/hzq-router)

## vue 路由封装插件

> 将传入的路由参数，转为 vue-router 指定的路由对象

安装：`npm i hzq-router -s`

然后在 src/router/index.js 里面统一处理

```ruby
import Vue from 'vue'
import Router from 'vue-router'
import hzqRouter from 'hzq-Router'
Vue.use(Router)

let routes = _hzqRouter({
    rc: require.context('@/views', true, /\.vue$/), // 页面级的.vue存放位置，必传
    meta: { // 路由元，以path为key，可选
        home: { add: true },
        login: { edit: true },
        'add-channel': { add: true },
        'edit-channel': { edit: true }
    },
    redirect: '/test',  // '/'的重定向，可选
    rootFile: 'views', // 页面级的.vue存放的文件夹，可选，默认为:views
})
export default new Router({ routes })

```

## 基础路由


### 假设 views 的目录结构如下：

```ruby
views/
--| user/
-----| user-edit.vue
-----| user-info.vue
--| login.vue
--| home.vue
```
### 那么，hzq-router 自动生成的路由配置如下：
```ruby
[
    {
        path:'/login',
        name:'login',
        component:import('@/views/login.vue')
    },
    {
        path:'/home',
        name:'home',
        component:import('@/views/home.vue')
    },
    {
        path:'/user-info',
        name:'user-info',
        component:import('@/views/user/user-info.vue')
    },
    {
        path:'/user-edit',
        name:'user-edit',
        component:import('@/views/user/user-edit.vue')
    }
]
```
## 嵌套路由

创建内嵌子路由，你需要添加一个 Vue 文件，同时添加一个**与该文件同名**的目录用来存放子视图组件。

### 假设 views 的目录结构如下：

```ruby
views/
--| home/
-----| about.vue
-----| product.vue
--| user/
-----| user-edit.vue
-----| user-info.vue
--| login.vue
--| home.vue
```
### 那么，hzq-router 自动生成的路由配置如下：
```ruby
[
    {
        path:'/login',
        name:'login',
        component:import('@/views/login.vue')
    },
    {
        path:'/home',
        name:'home',
        component:import('@/views/home.vue'),
        children:[
            {
                path:'product',
                name:'product',
                component:import('@/views/home/product.vue')
            },
            {
                path:'about',
                name:'about',
                component:import('@/views/home/about.vue')
            }
        ]
    },
    {
        path:'/user-info',
        name:'user-info',
        component:import('@/views/user/user-info.vue')
    },
    {
        path:'/user-edit',
        name:'user-edit',
        component:import('@/views/user/user-edit.vue')
    }
]
```
