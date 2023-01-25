<template>
  <div class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(item, index) in skuImageList" :key="item.id" @click="getImg(index)">
        <img :src="item.imgUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import bus from '@/utils/eventBus'
export default {
  name: 'ImageList',
  props: ['skuImageList'],
  methods: {
    getImg(i) {
      bus.emit('imgChange', i)
    }
  }
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }
}
</style>
