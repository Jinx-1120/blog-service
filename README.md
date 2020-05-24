# Blog API Services

  这是一个本人开源的自建的博客系统，本项目主要是博客系统的service，通过使用Express+Mongoose搭建的。
  在了解、学习项目之前，建议先了解一下[Express](http://www.expressjs.com.cn/)、[Mongoose](https://mongoose.shujuwajue.com)

## 关于mongo的相关配置以及连接问题（这里主要介绍的是Mac环境下的mongo的安装以及使用）

### · 通过brew安装mongodb

```shell
brew list   #查看brew已安装软件
brew install mongodb  #安装mongodb

==> Caveats
To have launchd start mongodb now and restart at login:
  brew services start mongodb
Or, if you don't want/need a background service you can just run:
  mongod --config /usr/local/etc/mongod.conf
==> Summary
/usr/local/Cellar/mongodb/3.4.0: 17 files, 261.4M

#出现上面的提示信息表示安装成功
```

### · 将mongodb配置到环境变量里面

>再.bash_profile文件中配置mongodb

  ```shell
  cd ~
  vim .bash_profile
  #然后将下面的命令放到.bash_profile文件中
  ```

  ```js
  export MONGO_PATH=/usr/local/Cellar/mongodb
  export PATH=$PATH:$MONGO_PATH/bin
  ```

>使配置生效

```shell

source ~/.bash_profile
echo $PATH
## 输出的路径显示/usr/local/Cellar/mongodb表示配置成功
#启动mongod
mongod

```

启动成功后新开一个终端

```shell
#启动mongo
mongo

MongoDB shell version v3.6.3
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.6.3
Server has startup warnings:
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten]
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] ** WARNING: Access control is not enabled for the database.
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] **          Read and write access to data and configuration is unrestricted.
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten]
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] ** WARNING: This server is bound to localhost.
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] **          Remote systems will be unable to connect to this server.
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] **          Start the server with --bind_ip <address> to specify which IP
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] **          addresses it should serve responses from, or with --bind_ip_all to
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] **          bind to all interfaces. If this behavior is desired, start the
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten] **          server with --bind_ip 127.0.0.1 to disable this warning.
2018-07-24T16:29:36.179+0800 I CONTROL  [initandlisten]
>

##显示上面的内容表示安装启动成功
```

***service***

- 本地启动mongo
- 在service中配置mongoose以及experss
- 配置路由，添加项目中需要的表，以及controller

***相关表结构介绍***

- [用户User表结构](https://github.com/Jhaidi/blog_server/blob/master/api/models/users.model.js)
- [标签Tag表结构](https://github.com/Jhaidi/blog_server/blob/master/api/models/tags.model.js)
- [文章Article表结构](https://github.com/Jhaidi/blog_server/blob/master/api/models/article.model.js)

***相关controller介绍***

>建议大家将router的方法写在controller里面，这样会让你的整合项目的结构更清晰一些

- [User](https://github.com/Jhaidi/blog_server/blob/master/api/controller/user.controll.js)
- [Tag](https://github.com/Jhaidi/blog_server/blob/master/api/controller/tags.controll.js)
- [Article](https://github.com/Jhaidi/blog_server/blob/master/api/controller/article.controll.js)

### Action

[Action](https://github.com/Jhaidi/blog-service/blob/master/.github/workflows/server.yml)
