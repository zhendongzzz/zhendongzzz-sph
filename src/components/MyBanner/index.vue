<template>
  <!--二次封装的banner轮播-->
  <swiper :modules="modules" navigation :pagination="{ clickable: true }" loop autoplay>
    <swiper-slide v-for="item in bannerList" :key="item.id">
      <img :src="item.imgUrl" />
    </swiper-slide>
  </swiper>
</template>

<script>
// // 这里导入了 swiper的所有相关css
// import 'swiper/css/bundle'

// 优化：按需引入 swiper 组件所需要的 css
// import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
// 按需导入模块
import { Autoplay, Navigation, Pagination } from 'swiper'
// 导入 vue 中的 swiper 组件
import { Swiper, SwiperSlide } from 'swiper/vue'
export default {
  name: 'MyBanner',
  props: ['bannerList'],
  components: {
    Swiper,
    SwiperSlide
  },
  // Composition API（组合API）的入口
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay]
    }
  }
}
</script>

<style></style>
