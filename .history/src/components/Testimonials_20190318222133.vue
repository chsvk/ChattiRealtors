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
            <slideritem>
                <div class="item">
                    <h3>Vision</h3>
                    <h4>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet repellendus quibusdam minus, at ipsum obcaecati?</h4>
                </div>
            </slideritem>
            <slideritem>
                 <div class="item">
                    <h3>Mission</h3>
                    <h4>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Id aliquam dolorum officia earum. Ad, nemo.</h4>
                </div>
            </slideritem>
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
        color: black;
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
