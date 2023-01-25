<template>
  <my-header-vue></my-header-vue>
  <router-view></router-view>
  <my-footer></my-footer>
</template>

<script>
// 导入
import MyFooter from './components/Footer/MyFooter.vue'
import MyHeaderVue from './components/Header/MyHeaderVue.vue'
export default {
  name: 'MyApp',
  created() {
    // 派发一个 action || 获取商品分类的三级列表数据
    this.$store.dispatch('categoryList')
  },
  components: { MyHeaderVue, MyFooter }
}
</script>

<style></style>
