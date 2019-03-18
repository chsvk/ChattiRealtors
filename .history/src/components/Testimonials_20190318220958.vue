<template>
    <div class="testy">
        <skeleton-carousel dots nav loop>
  <iron-image placeholder="https://source.unsplash.com/category/nature/10x10"
              data-src="https://source.unsplash.com/category/nature/500x300"
              sizing="cover"
              preload
              fade
              ></iron-image>
  <iron-image placeholder="https://source.unsplash.com/category/food/10x10"
              data-src="https://source.unsplash.com/category/food/500x300"
              sizing="cover"
              preload
              fade
              ></iron-image>
  <iron-image placeholder="https://source.unsplash.com/category/buildings/10x10"
              data-src="https://source.unsplash.com/category/buildings/500x300"
              sizing="cover"
              preload
              fade
              ></iron-image>
</skeleton-carousel>
    <swiper :options="swiperOption">
            <swiper-slide>
            <div class="item">
                <h3>Vision</h3>
                <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellendus quibusdam minus, at ipsum obcaecati?</h4>
            </div>
        </swiper-slide>
                <swiper-slide>
            <div class="item">
                <h3>Mission</h3>
                <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id aliquam dolorum officia earum. Ad, nemo.</h4>
            </div>
        </swiper-slide>
        
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    </div>
</template>

<script>
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
    data(){
        return{
            swiperOption: {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            }
        }
        }
    },
    components: {
        swiper,
        swiperSlide
    }
}
</script>

<style lang="scss" scoped>
.testy{
    .item{
        padding: 2em;
        h3{
            text-align: center;
            margin: 1em;
        }
        h4{
            font-weight: 100;
            text-align: center;
        }
    }
}
</style>
