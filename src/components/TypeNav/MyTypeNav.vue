<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- 事件委托，将子元素的事件写到父元素身上 -->
      <div @mouseleave="leaveShow" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 动画效果 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(i, index) in categoryList" :key="i.categoryId" :class="{ cur: currentIndex === index }">
                <h3 @mouseenter="changeIndex(index)">
                  <a href="#" :data-categoryName="i.categoryName" :data-categoryId1="i.categoryId">{{ i.categoryName }}</a>
                </h3>
                <!-- 二级、三级分类 -->
                <div class="item-list clearfix" :style="{ display: currentIndex === index ? 'block' : 'none' }">
                  <div class="subitem" v-for="j in i.categoryChild" :key="j.categoryId">
                    <dl class="fore">
                      <dt>
                        <a href="#" :data-categoryName="j.categoryName" :data-categoryId2="j.categoryId">{{ j.categoryName }}</a>
                      </dt>
                      <dd>
                        <em v-for="k in j.categoryChild" :key="k.categoryId">
                          <a href="#" :data-categoryName="k.categoryName" :data-categoryId3="k.categoryId">{{ k.categoryName }}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入 lodash的全部功能文件
// 按需引入
import throttle from 'lodash/throttle'
import { mapState } from 'vuex'
export default {
  name: 'MyTypeNav',
  data() {
    return {
      // 存储用户鼠标移动到哪一个一级分类
      currentIndex: -1,
      show: true
    }
  },
  mounted() {
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      categoryList: (store) => store.home.categoryList
    })
  },
  methods: {
    changeIndex: throttle(function (index) {
      // 鼠标进入修改响应式数据 currentIndex 属性
      this.currentIndex = index
    }, 50),
    goSearch(event) {
      const { categoryname, categoryid1, categoryid2, categoryid3 } = event.target.dataset
      if (categoryname) {
        const location = { name: 'search' }
        const query = { categoryName: categoryname }
        if (categoryid1) {
          query.category1Id = categoryid1
        } else if (categoryid2) {
          query.category2Id = categoryid2
        } else {
          query.category3Id = categoryid3
        }
        // 判断： 如果路由跳转的时候，带有 params 参数， 将其传递过去
        if (this.$route.params) {
          location.params = this.$route.params
          // 整理参数,为 location 对象添加 query 属性
          location.query = query
          // 路由跳转
          this.$router.push(location)
        }
      }
    },
    leaveShow() {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    },
    enterShow() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 500px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 12px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          // &:hover {
          //   .item-list {
          //     display: block;
          //   }
          // }
        }
        .cur {
          background: skyblue;
        }
      }
    }
    // 过渡动画样式
    //鼠标进入动画
    .sort-enter-from {
      height: 0px;
    }
    .sort-enter-to {
      height: 500px;
    }
    .sort-enter-active {
      transition: all 0.4s linear;
    }
    //鼠标离开动画
    .sort-leave-from {
      opacity: 1;
    }
    .sort-leave-to {
      opacity: 0;
    }
    .sort-leave-active {
      transition: all 0.4s ease;
    }
  }
}
</style>
