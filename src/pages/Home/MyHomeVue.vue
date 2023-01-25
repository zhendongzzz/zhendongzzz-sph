<template>
  <MyTypeNav />
  <my-list></my-list>
  <today-recommend></today-recommend>
  <MyRank></MyRank>
  <my-like></my-like>
  <my-floor v-for="item in floorList" :key="item.id" :list="item"></my-floor>
  <my-brand></my-brand>
</template>

<script>
import { mapState } from 'vuex'
import MyList from './List/MyList.vue'
import TodayRecommend from './TydayRecommend/TydayRecommend.vue'
import MyRank from './Rank/MyRank.vue'
import MyLike from './Like/MyLike.vue'
import MyFloor from './Floor/MyFloor.vue'
import MyBrand from './Brand/MyBrand.vue'
export default {
  name: 'MyHome',
  components: {
    MyList,
    TodayRecommend,
    MyRank,
    MyLike,
    MyFloor,
    MyBrand
  },
  mounted() {
    // 派发 actions ， 获取 floor 组件的数据
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.cateFloorList
    })
  }
}
</script>

<style></style>
