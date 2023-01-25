<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="(i, index) in this.cartInfoList" :key="index">
          <li class="cart-list-con1">
            <input type="checkbox" :checked="i.isChecked" name="chk_list" @change="updateCheckedById(i)" />
          </li>
          <li class="cart-list-con2">
            <img :src="i.imgUrl" />
            <div class="item-msg">{{ i.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">{{ i.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="changeSkuNum('sub', -1, i)">-</a>
            <input autocomplete="off" type="text" :value="i.skuNum" class="itxt" @change="changeSkuNum('change', $event.target.value, i)" />
            <a href="javascript:void(0)" class="plus" @click="changeSkuNum('add', 1, i)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ i.skuPrice * i.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteCart(i.skuId)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked" @change="AllChecked" />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedGood">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费）:</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import throttle from 'lodash/throttle'
import { mapGetters } from 'vuex'
export default {
  name: 'ShopCart',
  created() {
    this.getData()
  },
  computed: {
    // 获取购物车数据
    ...mapGetters(['cartInfoList']),
    // 计算勾选商品总价
    totalPrice() {
      let sum = 0
      this.cartInfoList.forEach((element) => {
        sum += element.skuNum * element.skuPrice
      })
      return sum
    },
    // 全选按钮
    isAllChecked() {
      return this.cartInfoList.every((item) => item.isChecked === 1)
    }
  },
  methods: {
    // 获取购物车列表信息
    getData() {
      this.$store.dispatch('getCartList')
    },
    // 修改购物车中单个商品数量(节流)
    changeSkuNum: throttle(async function (type, disNum, cart) {
      let skuNum = disNum
      if (type === 'change') {
        if (isNaN(skuNum) || skuNum < 1) skuNum = 0
        else skuNum = parseInt(skuNum) - cart.skuNum
      }
      if (type === 'sub') {
        skuNum = cart.skuNum > 1 ? skuNum : 0
      }
      // console.log({ skuId: cart.id, skuNum: skuNum })
      try {
        await this.$store.dispatch('getShopCart', { skuId: cart.id, skuNum: skuNum })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }, 100),
    // 删除某个商品(接口不可用)
    async deleteCart(id) {
      try {
        await this.$store.dispatch('reqDeleteCart', id)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 删除全部商品
    async deleteAllCheckedGood() {
      try {
        await this.$store.dispatch('deleteAllCheckedGood')
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 更改商品勾选状态
    async updateCheckedById(i) {
      const isChecked = i.isChecked === 1 ? 0 : 1
      const skuId = i.skuId
      try {
        await this.$store.dispatch('updateCheckedById', { skuId, isChecked })
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 全选按钮
    async AllChecked(e) {
      const checked = e.target.checked
      try {
        await this.$store.dispatch('AllChecked', checked)
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con3 {
          width: 10%;

          .item-txt {
            text-align: center;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 15%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 12%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: 'Microsoft YaHei';
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
