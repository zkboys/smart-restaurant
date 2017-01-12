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

## 开发热启动使用[nodemon](https://nodemon.io/)
nodemon debug不能停在断点，无法调试
/Users/wangshubin/.nvm/versions/node/v7.2.1/bin/nodemon
/Users/wangshubin/.nvm/versions/node/v7.2.1/bin/supervisor

## 查看端口占用
```
lsof -i:3000
```


## 使用pm2

```
// 启动 mp后端
npm run pro:mp

// 停止所有
pm2 stop all

```

