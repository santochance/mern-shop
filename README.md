## 简介

一个基于MERN（即MongoDB + Express + React + Node.js）架构的PC端电商类SPA（Single Page Application），涉及注册登录、商品展示、购物车、下单等功能，能实现完整的基本业务流程。

## 在线预览

预览版部署在LeanCloud：http://mernshop.leanapp.cn

## 实现功能

- [x] 注册， 登录，退出
- [x] 保持用户登录状态
- [x] 简单的商品搜索
- [x] 搜索结果的排序和价格过滤
- [x] 商品详情
- [x] 购物车交互
- [x] 提交订单
- [x] 模拟支付
- [x] 查看订单历史

## 使用技术

react + react-router + sass + fetch + node + express + mongoDB

## 部署运行

```shell
# 下载源码
git clone https://github.com/santochance/mern-shop.git

# 安装依赖
npm install
# npm源在国外，下载速度可能较慢，建议使用国内npm镜像，比如淘宝npm镜像
npm --registry https://registry.npm.taobao.org install

# 运行本地开发环境
npm start

# 打包代码
npm run build
```
