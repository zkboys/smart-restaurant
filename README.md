# 智能餐厅系统

## 目录结构
```
core: 核心代码库，后端的controller，services， model等
mp: 用户管理平台，
ordering: Android IOS 服务员pad点餐后端

```


## 安装&启动
1. [node > 7.x](https://nodejs.org/en/)
2. [pm2](http://pm2.keymetrics.io/)
```
npm install

npm install pm2@latest -g

npm run pro:mp

访问 http://localhost:3080
```

## 开发热启动使用[nodemon](https://nodemon.io/)启动项目
存在问题：

1. nodemon debug不能停在断点，无法调试
1. 如果直接使用nodemon代替node启动，可以挺在断点位置，但是修改文件之后服务死掉

脚本位置：

1. /Users/wangshubin/.nvm/versions/node/v7.2.1/bin/nodemon
1. /Users/wangshubin/.nvm/versions/node/v7.2.1/bin/supervisor

参考资料：

1. http://stackoverflow.com/questions/19180702/how-can-i-run-nodemon-from-within-webstorm
1. https://vcfvct.wordpress.com/2015/02/13/debug-nodejs-with-nodemon-and-intellij/


## 正式环境，使用pm2启停项目

```
// 启动 mp后端
npm run pro:mp

// 停止所有
pm2 stop all

```

## 常用命名

1. 查看端口占用： lsof -i:3000

