<template>
    <div class="testy">
      
    <!-- <swiper :options="swiperOption">
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
    </swiper> -->
    <slider ref="slider" :options="options">
          <!-- slideritem wrapped package with the components you need -->
          <slideritem v-for="(item,index) in 10" :key="index" :style="item.style">{{item}}</slideritem>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
      </slider>
    </div>
</template>

<script>
import { slider, slideritem } from 'vue-concise-slider'
export default {
    data(){
        return{
            swiperOption: {
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev'
            },
            someList:[
          {
            html: 'slide1',
            style: {
              'background': '#1bbc9b'
            }
          },
          {
            html: 'slide2',
            style: {
              'background': '#4bbfc3'
            }
          },
          {
            html: 'slide3',
            style: {
              'background': '#7baabe'
            }
          }
        ],
        //Slider configuration [obj]
        options: {
          currentPage: 0
        }
        }
        }
    },
    components: {
        slider,
        slideritem
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
