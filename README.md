# 毕业设计

## 项目描述

此项目作为本科毕业设计实现了一个基于Node.js技术的校园视频分享网站

## 项目节点

2016.3.9开始搭框架
2016.3 - 2016.5 code
2016.6 End

## 实现的功能
本系统主要有三大模块构成：用户信息、视频管理、个性分享。
用户管理：
用户分为三类：注册用户，游客，管理员
```
    注册用户需要通过注册进入网站，注册需要邮箱，手机号和密码，注册成功后自动进入首页。注册用户可以进入个人中心，修改密码，补全个人信息，查看个人收藏，同时可以观看视频，对视频进行点赞，收藏。
    游客不需要进行注册即可观看视频，但是不具有点赞和收藏功能。
    管理员的账号只能通过后台进行设置，除了具有注册用户的所有功能之外还可以对视频内容和用户信息进行管理。
```

视频管理：
```
    用户在进入网站后，可以在线观看视频，但是根据用户角色的不同，具有不同的权限限制。
    视频管理模块主要包含以下功能：视频检索、视频分类、视频上传、视频播放和视频下载功能。
```

个性分享：
```
    个性分享这一模块，主要包含以下功能：视频点赞、视频收藏、视频分享。
```
## 软件安装

需要安装的软件
- Node.js
- ffmpeg
- MongoDB

本次的毕业设计是一个基于Node.js 的校园视频分享网站，所以Node.js 是必不可缺少的。因为Node.js具有良好的跨平台的性质，所以可以windows、OSX、Linux上的平台进行安装。

### 安装Node.js
Node.js的官网为：https://nodejs.org/en/
官网上有Node.js 的下载源文件，但是并不推荐下载直接安装Node.js，推荐先安装NVM（Node Version Manager）
一个Node.js 的版本管理器，安装说明可以参考：https://github.com/creationix/nvm

####1 安装NVM
- Windows下安装nvm:

由于nvm不支持windows，所以提供两个windows 的解决方案
> nvm-windows ：https://github.com/coreybutler/nvm-windows
> nodist：https://github.com/coreybutler/nvm-windows

- Linux 下安装nvm:

To install or update nvm, you can use the install script using cURL:
为了安装和升级nvm，你可以使用下列的命令

```
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

or Wget:

```
wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

The script clones the nvm repository to ~/.nvm and adds the source line to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).

这个脚本会clone nvm 的软件库，到一个.nvm 的文件下并且将配置写入到你的(~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc)文件中。

验证安装：

执行以下命令：

```
command -v nvm
```
如果没有诸如提示 	command not found，显示出nvm 的命令，那么就安装成功了。

当然，你也可选择手动安装，参考：https://github.com/creationix/nvm#manual-install

####2 利用NVM安装Node.js
nvm 的常用命令如下，所有的命令请参考：https://github.com/creationix/nvm#usage

安装Node.js：(可以直接指定安装的node版本，这就是nvm 的好处)

```
nvm install 5.0
```

指定使用的Node版本：

```
nvm use 5.0
```

查看当前安装的所有的node 版本：

```
nvm ls
```
查看远程仓库中存在的node 版本：

```
nvm ls-remote 
```
设置node 的版本在任意一个shell中：

```
nvm alias default 5.0
```

此时已经安装好了Node.js

###安装ffmpeg
ffmpeg是一个很全面的视频的处理库，在本项目中大材小用，仅仅用于视频上传的截图。
中文使用说明：https://github.com/FiveYellowMice/how-to-convert-videos-with-ffmpeg-zh/blob/master/02-download-and-install.md

MAC OS下安装：
通过homebrew 安装
```
 brew install homebrew
```

官方的安装说明网址：https://trac.ffmpeg.org/wiki/CompilationGuide/MacOSX
其他的参考网址：http://depthlove.github.io/2015/09/24/install-ffmpeg-to-MacOSX-and-use-ffmpeg-to-transform-h264-to-mp4/


Windows下安装：
这个还没有尝试

Linux(Ubuntu安装):
可以直接执行以下网址的脚本进行一键安装，可能需要运行1个小时。
https://gist.github.com/xdamman/e4f713c8cd1a389a5917

Linux (Centos安装)：

在centos上安装ffmpeg
参考网址为：https://trac.ffmpeg.org/wiki/CompilationGuide/Centos

出现的问题：
在安装libvpx ，执行命令
```
./configure --prefix="$HOME/ffmpeg_build" --disable-examples
```
时出现报错。报错信息为：
```
make[1]: *** [vpx_dsp/x86/vpx_subpixel_8t_intrin_avx2.c.o] 错误 1
```
解决方法：
```
./configure --prefix="$HOME/ffmpeg_build" --disable-examples --disable-avx2 
```
在安装FFmpeg时的git clone 地址不对：
网页上的使用地址为：
```
git clone http://source.ffmpeg.org/git/ffmpeg.git
```
`实际应该使用`：
```
git clone https://git.ffmpeg.org/ffmpeg.git
```
以上地址链接为：
ffmpeg官网： https://ffmpeg.org/download.html#repositories
因为安装过程中需要编译，所以较慢。整个过程可能需要1个多小时。

###安装MongoDB

Linux 下安装：
- mongodb官网下载安装包
- 解压即可


##项目搭建
使用的主要技术

前端技术：
React + reflux
less
Html5
Jquery
Ajax

后端技术：
Node.js
mongoose

项目版本管理：
git

项目包管理：
npm

项目构建:
gulp

数据库：
mongodb


项目的文件结构：
(1) .git 文件夹： git 的版本管理的自生成文件夹
(2) .idea 文件夹： IDE 自生成文件夹
(3) config 文件夹： 项目提取出的配置文件
(4) controller 文件夹： 项目的控制器， 包含所有的路由处理的逻辑代码
(5) result： 结果样图
(6) gulp： gulp 的配置文件夹
(7) middleware： 提取出的中间件， 用于异常错误处理
(8) node_modules： npm 安装的插件目录
(9) public： Web 前端的资源目录
(10) routes： 路由分发
(11) services： 服务层， 用于数据库的连接
(12) source： 前端代码文件
(13) tools： 提取出的工具类


项目实现的大致思路：  使用前后端分离的结构

**前端实现**：
    public文件夹下新建html 文件作为浏览器的展示页面，因为前端开发还使用了 React 框架， 所以在source 文件夹下按照 React + Reflux 的模式书写前端 Javascript 代码。 在 source 下的 scripts 文件夹内编写 JSX 语法的 React 代码， 通过 gulp 的编译， 压缩并转换为 Javascript 代码， 放置到 public 下的 scripts文件夹内。
    样式文件使用 less 工具编写。在 less 文件夹内编写相应的 less 文件并利用 gulp 编译为 css， 将其放置到 public 下的 css 文件夹内， 在 html 文件中只需引入 css 和 Javascript 代码， 即可开发出一个前端网页。
    
**后端实现**：
    使用 Ajax 完成与后端数据的交互。 系统使用 Ajax 发送请求到 routers（ 路由文件）处， routers 根据请求 URL 的不同， 分配到相应的 controller 进行逻辑和业务处理， 后台完成处理后返回 json 格式的数据给前端的发送请求的地方， 前端得到的 json 数据进行处理， 重新渲染页面。

**数据库实现**：
    数据库的操作使用mongoose(一个操作mongodb数据库的ORM框架)，具体操作详见官网文档
    
    
###项目配置
**此小节和下一个小节的区别在于，本小节在叙述如何利用一个已经存在的项目代码，配置并使其可以运行，而下一小节（从0开始的项目搭建）在于叙述从一开始没有任何一句代码时的项目初始。**
    
1. 安装git
2. 使用以下命令在某一文件夹下的clone项目库

```
git clone git@github.com:sialvsic/time-machine.git
```

或

```
git clone https://github.com/sialvsic/time-machine.git
```
以上两条命令是用于将项目的库中所有代码从github中通过的clone 的方式拷贝到本地
3. 在命令行中使用如下命令进行所有插件的安装

```
npm install
```
此命令会自动根据package.json中的dependencies和devdependencies中的

3. 首先执行以下命令 ，用于项目前端代码的构建

```
gulp build
```
4. 启动mongdb数据库，这个因为不同的系统，不同安装方式略有差异，比如在Linux Centos 上
mongodb 安装到了/home/rjgc/mongodb-linux-i686-3.2.6/处
启动mongodb ，需要使用 root 账户 

```
cd /home/rjgc/mongodb-linux-i686-3.2.6/bin
```
文件夹下
执行以下命令：

```
 ./mongod --journal --storageEngine=mmapv1 --dbpath /data/db
```

5. 在项目的根目录下执行：

```
npm start
```
此时项目可以运行，默认打开的是5299端口，这个端口可以自由设定。


###从0开始的项目搭建：

1. 选择硬盘，新建文件夹，名称自定义，作为工程文件的根目录
2. 打开命令行，进入项目目录，执行npm init 命令初始化一个node工程，会在根目录下生成一个package.json的文件
注：
package.json为npm 包管理的一个配置文件，详情请见https://docs.npmjs.com/files/package.json）
有关npm的说明及其使用可以参考：
官网：https://docs.npmjs.com/files/package.json
深入浅出Node.js（二）：Node.js&NPM的安装与配置：http://www.infoq.com/cn/articles/nodejs-npm-install-config
npm 模块安装机制简介： http://www.ruanyifeng.com/blog/2016/01/npm-install.html	
NPM 使用介绍：http://www.runoob.com/nodejs/nodejs-npm.html

3. 因为本项目使用git 作为版本管理的工具，所以需要初始化git管理库
使用如下命令：

```
 git init  
```
此命令会在项目的根目录下初始化一个.git的文件夹，用于记录版本管理的信息。

有关于git 的使用可以参考如下的网址：


4. 使用Node.js开发最大的特色的就是完善的社区和插件包
本系统的服务器端是使用Express框架，首先需要安装Express，注意在本项目中，所有的包的安装都是通过npm install 命令来安装在命令行中执行 

```
npm install express --save
```

 会在 package.json 的 dependencies 中出现
"express"： "^4.13.4"

注：
Express框架：http://expressjs.com/en/index.html or http://expressjs.com/
Express中文网站：http://expressjs.com/zh/

5. 根目录下， 新建 README.md， 用于记录项目介绍
6.  根目录下， 新建.gitignore 用于忽略 git 追踪的文件夹
7.  根目录下， 新建 nodemon.json 用于配置 nodemon 的选项
8. 根目录下， 新建 app.js， 写入如下代码：

```
'use strict';
var express = require('express');
var multer = require('multer');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var app = express();
app.use(cookieParser());
app.use(session({
secret: 'Time-machine', resave: false, saveUninitialized: false,
store: new MongoStore({
url: config.database,
ttl: config.sessionTtl
})
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + '/public'));
route.setRoutes(app);
var server = app.listen(config.port, function () {
var port = server.address().port;
console.log('Current environment is: ' + env);
console.log('App listening at http://localhost:' + port);
mongoConn.start(config.database);
});
```
之后， 在命令行中执行 node app.js 即可启动一个用 Express 搭建的 Web 服务器。

9. 根据npm install 命令来安装各种插件
本项目使用的了大量的插件或者第三方的库，可参见package.json文件。

##结果预览
请见github的resultpreview文件夹下。
