<template>
  <div class="pagination">
    <ul>
      <li @click="onPrev">
        <a v-show="this.pageNo > 1">«上一页</a>
      </li>
      <li @click="$emit('getPageNo', 1)">
        <a v-show="startNumAndEndNum.start > 1">1</a>
      </li>
      <li v-show="startNumAndEndNum.start > 2">
        <span>...</span>
      </li>
      <li :class="{ active: this.pageNo === i }" v-for="(i, index) in startNumAndEndNum.end" :key="index" v-show="i >= startNumAndEndNum.start">
        <a @click="$emit('getPageNo', i)">{{ i }}</a>
      </li>
      <li v-show="startNumAndEndNum.end < totalPage - 2">
        <span>...</span>
      </li>
      <li v-show="startNumAndEndNum.end < totalPage" @click="$emit('getPageNo', totalPage)">
        <a>{{ totalPage }}</a>
      </li>
      <li @click="$emit('getPageNo', this.pageNo + 1)" v-show="this.pageNo < this.totalPage">
        <a>下一页»</a>
      </li>
    </ul>
    <div class="tt">共{{ total }}条&nbsp;</div>
  </div>
</template>
<script>
export default {
  name: 'MyPagination',
  props: ['pageNo', 'pageSize', 'total', 'continues'],
  methods: {
    onPrev() {
      this.$emit('getPageNo', this.pageNo - 1)
    }
  },
  computed: {
    totalPage() {
      let totalPage = this.total / this.pageSize
      if (this.total % this.pageSize !== 0) {
        totalPage = this.total / this.pageSize + 1
      }
      return parseInt(totalPage)
    },
    startNumAndEndNum() {
      // 定义两个变量存储，起始页码值
      let start = 0
      let end = 0
      // 非正常状况：总页数小于连续页码数
      if (this.continues > this.total) {
        start = 1
        end = this.totalPage
      } else {
        // 正常状况
        start = this.pageNo - parseInt(this.continues / 2)
        end = this.pageNo + parseInt(this.continues / 2)
      }
      // 非正常状况
      if (start < 1) {
        start = 1
        end = this.continues
      }
      if (end > this.totalPage) {
        end = this.totalPage
        start = this.totalPage - this.continues + 1
      }
      return { start, end }
    }
  }
}
</script>

<style lang="less" scoped>
.pagination {
  width: 660px;
  height: 66px;
  overflow: hidden;
  margin: 0 auto;
  box-sizing: border-box;
  ul {
    height: 66px;
    vertical-align: middle;
    float: left;
    li {
      cursor: pointer;
      line-height: 66px;
      display: inline-block;
      a {
        position: relative;
        line-height: 18px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #e0e9ee;
        margin-left: -1px;
        font-size: 14px;
        padding: 9px 18px;
        color: #333;
      }

      span {
        cursor: default;
        position: relative;
        line-height: 18px;
        text-decoration: none;
        background-color: #fff;
        border: 1px solid #e0e9ee;
        margin-left: -1px;
        font-size: 14px;
        padding: 9px 18px;
        color: #333;
      }
    }
  }
  .active {
    a {
      background-color: #fff;
      color: red;
      border-color: #fff;
    }
  }
  .tt {
    width: auto;
    height: 66px;
    float: left;
    margin-left: 10px;
    line-height: 66px;
    color: #333;
    font-size: 14px;
  }
}
</style>
