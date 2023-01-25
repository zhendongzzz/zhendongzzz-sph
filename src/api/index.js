// 当前这个模块：API进行统一管理

import request from './request'

// 引入 mock请求配置文件
import mockRequest from './mockRequest'

// 获取三级联动数据
export const reqcategoryList = () => request.get('/product/getBaseCategoryList')
// 获取 banner （Home）首页的轮播图数据
export const reqGetBannerList = () => mockRequest.get('/banner')
// 获取 floor 数据
export const reqFloorList = () => mockRequest.get('/floor')
// 获取 搜索按钮请求的数据
// 调用该接口至少传递一个空对象
export const reqSearchInfo = (data) => request({ url: '/list', method: 'post', data })
// 获取产品详情信息的接口
export const reqGoodsInfo = (skuId) => request({ url: `/item/${skuId}`, method: 'get' })
// 将产品添加到购物车中/更新购物车产品数量
export const reqShopCart = (skuId, skuNum) => request({ url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post' })
// 获取购物车列表
export const reqCartList = () => request.get('/cart/cartList')
// 删除购物车产品接口
// /api/cart/addToCart/{ skuId }/{ skuNum } /cart/checkCart/{skuID}/{isChecked}
export const reqDeleteCartGood = (skuId) => request({ url: `/cart/deleteCart/${skuId}`, method: 'DELETE' })
// 更新购物车选中商品数量
export const reqUpdateChecked = (skuID, isChecked) => request({ url: `/cart/checkCart/${skuID}/${isChecked}`, method: 'get' })

// 获取手机验证码
export const reqPhoneCode = (phone) => request.get(`/user/passport/sendCode/${phone}`)
// 用户注册
export const reqUserRegister = (data) => request({ url: '/user/passport/register', method: 'post', data })
// 用户登录
export const reqLogin = (data) => request({ url: '/user/passport/login', method: 'post', data })

// 获取用户信息(token 认证)
export const reqUserInfo = () => request.get('/user/passport/auth/getUserInfo')

// 退出登录
export const reqLogout = () => request.get('/user/passport/logout')

// 获取订单交易信息
export const reqTrade = () => request.get('/order/auth/trade')
// 提交订单信息
export const reqSubmitOrder = (tradeNo, data) => request({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, data, method: 'post' })
// 提交支付
export const reqPay = (orderId) => request.get(`/payment/weixin/createNative/${orderId}`)
// 获取支付状态
export const reqPayStatus = (orderId) => request.get(`/payment/weixin/queryPayStatus/${orderId}`)

// 获取我的订单信息
export const reqOrder = (page, limit) => request({ url: `/order/auth/${page}/${limit}`, method: 'get' })
