# generator-angular1

用于生成angular 1.\* 项目的模板，包括按需加载、HistoryApi、编译打包等功能

## 准备工作

1. 安装 [yo](https://github.com/yeoman/yo) 
    > npm install -g yo
2. 安装 generator-angular1 
    > npm install -g generator-angular1

## 使用步骤

1. 使用命令行工具切换到项目目录
2. 初始化配置，配置项参见《配置信息》 
    > yo angular1
3. 安装程序包 
    > npm install
4. 启动本机服务器 
    > npm start

## 配置信息

初始化配置步骤中，会有这些配置项需要输入，说明如下：
- 项目名称：随意
- 域名：也就是上线后的域名，不需要填开始的http://
- 本机端口号：一般是80，如果本机同时起了多个开发服务器，可以配置不同的端口号
- 接口服务器地址：也就是后端接口的服务器地址，比如：http://192.168.162.108

