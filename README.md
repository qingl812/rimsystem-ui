# rimsystem-ui

- 道路信息管理系统的前端部分
- 后端链接 [https://github.com/qingl812/RIMSystem](https://github.com/qingl812/RIMSystem)
- 开发文档位于 `docs/道路信息管理系统.pdf`
- 采用 vue2 + typescript + element-ui 开发

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

## 项目介绍

- src/views 中包含所有的界面代码
    - 其中 GMain.vue 为主界面区别于不带导航栏和状态栏的 登陆界面
    - src/home 文件夹中包括导航栏跳转到的每个界面
    - 其他 src 中的文件夹即为 home 中每个界面的子界面
- src/typings/MyAxios.ts 中包括项目内所有向后端发送请求的代码
